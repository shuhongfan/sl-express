package com.sl.ms.web.customer.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.DesensitizedUtil;
import cn.hutool.core.util.IdcardUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import com.sl.ms.base.domain.enums.StatusEnum;
import com.sl.ms.user.api.MemberFeign;
import com.sl.ms.user.domain.dto.MemberDTO;
import com.sl.ms.web.customer.service.MemberService;
import com.sl.ms.web.customer.service.TokenService;
import com.sl.ms.web.customer.service.WechatService;
import com.sl.ms.web.customer.vo.user.MemberVO;
import com.sl.ms.web.customer.vo.user.RealNameVerifyVO;
import com.sl.ms.web.customer.vo.user.UserLoginRequestVO;
import com.sl.ms.web.customer.vo.user.UserLoginVO;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.service.RealNameVerifyService;
import com.sl.transport.common.util.ObjectUtil;
import com.sl.transport.common.util.UserThreadLocal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.Map;

/**
 * 用户管理
 */
@Slf4j
@Service
public class MemberServiceImpl implements MemberService {

    @Resource
    private MemberFeign memberFeign;

    @Resource
    private TokenService tokenService;

    @Resource
    private WechatService wechatService;

    @Resource
    private RealNameVerifyService realNameVerifyService;

    //实名认证默认关闭
    @Value("${real-name-registration.enable}")
    private String realNameVerify;

    @Override
    public MemberVO detail(Long userId) {
        log.info("查找用户信息:{}", userId);
        MemberDTO member = memberFeign.detail(userId);
        log.info("查找用户信息:{} Result:{}", userId, member);
        MemberVO memberVO = BeanUtil.toBean(member, MemberVO.class);
        memberVO.setName(DesensitizedUtil.chineseName(memberVO.getName()));
        memberVO.setIdCardNo(DesensitizedUtil.idCardNum(memberVO.getIdCardNo(), 6, 4));
        return memberVO;
    }

    /**
     * 新增
     *
     * @param user 用户信息
     */
    @Override
    public void save(MemberDTO user) {
        memberFeign.save(user);
    }

    /**
     * 根据openid查询用户
     *
     * @param openid 微信ID
     * @return 用户信息
     */
    @Override
    public MemberDTO getByOpenid(String openid) {
        return memberFeign.detailByOpenId(openid);
    }

    /**
     * 登录
     *
     * @param userLoginRequestVO 登录code
     * @return 用户信息
     */
    @Override
    public UserLoginVO login(UserLoginRequestVO userLoginRequestVO) throws IOException {
        // 1 调用微信开放平台小程序的api，根据code获取openid
        JSONObject jsonObject = wechatService.getOpenid(userLoginRequestVO.getCode());
        // 2 若code不正确，则获取不到openid，响应失败
        if (ObjectUtil.isNotEmpty(jsonObject.getInt("errcode"))) {
            throw new SLWebException(jsonObject.getStr("errmsg"));
        }
        String openid = jsonObject.getStr("openid");

        /*
        * 3 根据openid从数据库查询用户
        * 3.1 如果为新用户，此处返回为null
        * 3.2 如果为已经登录过的老用户，此处返回为user对象 （包含openId,phone,unionId等字段）
         */
        MemberDTO user = getByOpenid(openid);

        /*
         * 4 构造用户数据，设置openId,unionId
         * 4.1 如果user为null，则为新用户，需要构建新的user对象，并设置openId,unionId
         * 4.2 如果user不为null，则为老用户，无需设置openId,unionId
         */
        user = ObjectUtil.isNotEmpty(user) ? user : MemberDTO.builder()
                // openId
                .openId(openid)
                // 平台唯一ID
                .authId(jsonObject.getStr("unionid"))
                .build();


        // 5 调用微信开放平台小程序的api获取微信绑定的手机号
        String phone = wechatService.getPhone(userLoginRequestVO.getPhoneCode());

        /*
         * 6 新用户绑定手机号或者老用户更新手机号
         * 6.1 如果user.getPhone()为null，则为新用户，需要设置手机号，并保存数据库
         * 6.2 如果user.getPhone()不为null，但是与微信获取到的手机号不一样 则表示用户改了微信绑定的手机号，需要设置手机号，并保存数据库
         * 以上俩种情况，都需要重新设置手机号，并保存数据库
         */
        if (ObjectUtil.notEqual(user.getPhone(), phone)) {
            user.setPhone(phone);
            save(user);
        }


        // 7 如果为新用户，查询数据库获取用户ID
        if (ObjectUtil.isEmpty(user.getId())) {
            user = getByOpenid(openid);
        }

        // 8 将用户ID存入token
        Map<String, Object> claims = MapUtil.<String, Object>builder()
                .put(Constants.GATEWAY.USER_ID, user.getId()).build();

        // 9 封装用户信息和双token，响应结果
        return UserLoginVO
                .builder()
                .openid(openid)
                .accessToken(this.tokenService.createAccessToken(claims))
                .refreshToken(this.tokenService.createRefreshToken(claims))
                .binding(StatusEnum.NORMAL.getCode())
                .build();
    }

    /**
     * 实名认证
     *
     * @param vo 身份证号 姓名
     * @return 是否通过认证
     */
    @Override
    public RealNameVerifyVO realNameVerify(RealNameVerifyVO vo) {
        if (!ObjectUtil.isEmpty(vo.getFlag()) && !vo.getFlag()) {
            // 删除实名认证
            // 保存用户表
            MemberDTO memberDTO = MemberDTO
                    .builder()
                    .id(UserThreadLocal.getUserId())
                    .idCardNoVerify(StatusEnum.DISABLED.getCode())
                    .build();
            save(memberDTO);
            vo.setFlag(true);
            return vo;
        }

        RealNameVerifyVO realNameVerifyVO = new RealNameVerifyVO();
        realNameVerifyVO.setName(DesensitizedUtil.chineseName(vo.getName()));
        realNameVerifyVO.setIdCard(DesensitizedUtil.idCardNum(vo.getIdCard(), 6, 4));
        realNameVerifyVO.setSex(IdcardUtil.getGenderByIdCard(vo.getIdCard()));
        realNameVerifyVO.setFlag(false);


        //1.校验身份证号规则
        if (!IdcardUtil.isValidCard(vo.getIdCard())) {
            return realNameVerifyVO;
        }


        //2.实名认证（校验身份证号和姓名的一致性）
        //实名认证收费，免费次数有限，请慎重使用
        if (Boolean.parseBoolean(realNameVerify)) {
            try {
                if (!realNameVerifyService.realNameVerify(vo.getName(), vo.getIdCard())) {
                    // 不通过
                    return realNameVerifyVO;
                }
            } catch (IOException e) {
                throw new SLWebException("实名认证方法执行失败");
            }
        }
        realNameVerifyVO.setFlag(true);
        // 保存用户表
        MemberDTO memberDTO = MemberDTO
                .builder()
                .id(UserThreadLocal.getUserId())
                .name(vo.getName())
                .idCardNo(vo.getIdCard())
                .idCardNoVerify(StatusEnum.NORMAL.getCode())
                .build();
        save(memberDTO);
        return realNameVerifyVO;
    }

    /**
     * 删除用户
     */
    @Override
    public void del() {
        Long userId = UserThreadLocal.getUserId();
        memberFeign.del(userId);
    }

    /**
     * 更新用户
     *
     * @param vo 用户
     */
    @Override
    public void update(MemberVO vo) {
        Long userId = UserThreadLocal.getUserId();
        MemberDTO memberDTO = BeanUtil.toBean(vo, MemberDTO.class);
        memberDTO.setId(userId);
        memberFeign.update(userId, memberDTO);
    }

    @Override
    public UserLoginVO refresh(String refreshToken) {
        return this.tokenService.refreshToken(refreshToken);
    }
}
