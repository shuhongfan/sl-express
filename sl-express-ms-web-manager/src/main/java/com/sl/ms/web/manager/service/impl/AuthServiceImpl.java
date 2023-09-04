package com.sl.ms.web.manager.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.ObjectUtil;
import com.itheima.auth.sdk.AuthTemplate;
import com.itheima.auth.sdk.common.Result;
import com.itheima.auth.sdk.dto.*;
import com.sl.ms.base.api.common.WorkSchedulingFeign;
import com.sl.ms.base.domain.base.WorkSchedulingDTO;
import com.sl.ms.base.domain.enums.StatusEnum;
import com.sl.ms.base.domain.enums.WorkUserTypeEnum;
import com.sl.ms.web.manager.service.AuthService;
import com.sl.ms.web.manager.vo.agency.AgencySimpleVO;
import com.sl.ms.web.manager.vo.auth.CourierVO;
import com.sl.ms.web.manager.vo.auth.SysUserVO;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.AuthTemplateThreadLocal;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import com.wf.captcha.ArithmeticCaptcha;
import com.wf.captcha.ChineseCaptcha;
import com.wf.captcha.GifCaptcha;
import com.wf.captcha.SpecCaptcha;
import com.wf.captcha.base.Captcha;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * 鉴权服务
 * 登录 验证码 员工列表 快递员列表 角色
 */
@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Resource
    private AuthTemplate authTemplate;

    @Value("${role.courier}")
    private String roleId;

    @Resource
    private WorkSchedulingFeign workSchedulingFeign;

    /**
     * 登录获取token
     *
     * @param account  账号
     * @param password 密码
     * @return 登录信息
     */
    @Override
    public R<LoginDTO> login(String account, String password) {
        //账号密码登录
        Result<LoginDTO> loginResult = authTemplate.opsForLogin().token(account, password);

        //校验登录是否成功
        if (loginResult.getCode() != Result.success().getCode()) {
            return R.error(loginResult.getMsg());
        }
        return R.success(loginResult.getData());
    }

    @Override
    public void create(String key, HttpServletResponse response) throws IOException {
        if (StringUtils.isBlank(key)) {
            throw new SLException("验证码key不能为空");
        }
        setHeader(response, "arithmetic");

        Captcha captcha = createCaptcha("arithmetic");
        redisTemplate.opsForValue().set(key, StringUtils.lowerCase(captcha.text()), 1, TimeUnit.MINUTES);
        captcha.out(response.getOutputStream());
    }

    @Override
    public boolean check(String key, String value) {
        if (StringUtils.isBlank(value)) {
            throw new SLException("请输入验证码");
        }
        String code = redisTemplate.opsForValue().get(key);
        if (code == null) {
            throw new SLException("验证码已过期");
        }
        if (!StringUtils.equalsIgnoreCase(value, code)) {
            throw new SLException("验证码不正确");
        }
        redisTemplate.expire(key, 1, TimeUnit.SECONDS);
        return true;
    }

    private Captcha createCaptcha(String type) {
        Captcha captcha = null;
        if (StringUtils.equalsIgnoreCase(type, "gif")) {
            captcha = new GifCaptcha(115, 42, 4);
        } else if (StringUtils.equalsIgnoreCase(type, "png")) {
            captcha = new SpecCaptcha(115, 42, 4);
        } else if (StringUtils.equalsIgnoreCase(type, "arithmetic")) {
            captcha = new ArithmeticCaptcha(115, 42);
        } else if (StringUtils.equalsIgnoreCase(type, "chinese")) {
            captcha = new ChineseCaptcha(115, 42);
        }
        captcha.setCharType(2);
        return captcha;
    }

    private void setHeader(HttpServletResponse response, String type) {
        if (StringUtils.equalsIgnoreCase(type, "gif")) {
            response.setContentType(MediaType.IMAGE_GIF_VALUE);
        } else {
            response.setContentType(MediaType.IMAGE_PNG_VALUE);
        }
        response.setHeader(HttpHeaders.PRAGMA, "No-cache");
        response.setHeader(HttpHeaders.CACHE_CONTROL, "No-cache");
        response.setDateHeader(HttpHeaders.EXPIRES, 0L);
    }

    /**
     * 转换用户
     *
     * @param userDTO 用户DTO
     * @return 用户VO
     */
    @Override
    public SysUserVO parseUser2Vo(UserDTO userDTO) {
        SysUserVO vo = new SysUserVO();
        //填充基本信息
        vo.setUserId(userDTO.getId());
        vo.setAvatar(userDTO.getAvatar());
        vo.setEmail(userDTO.getEmail());
        vo.setMobile(userDTO.getMobile());
        vo.setAccount(userDTO.getAccount());
        vo.setName(userDTO.getName());
        vo.setStatus(userDTO.isStatus() ? StatusEnum.NORMAL.getCode() : StatusEnum.DISABLED.getCode());

        //处理所属机构信息
        AgencySimpleVO agency = new AgencySimpleVO();
        agency.setName(userDTO.getOrgName());
        vo.setAgency(agency);

        //处理岗位信息
        vo.setStationName(userDTO.getStationName());
        // 角色
        vo.setRoleNames(userDTO.getRoleNames());
        return vo;
    }

    /**
     * 获取用户信息
     *
     * @param id 用户id
     * @return 执行结果
     */
    @Override
    public SysUserVO user(Long id) {
        Result<UserDTO> result = AuthTemplateThreadLocal.get().opsForUser().getUserById(id);
        if (result.getCode() != 0) {
            return new SysUserVO();
        }
        return parseUser2Vo(result.getData());
    }

    /**
     * 批量获取用户信息
     *
     * @param ids 用户id
     * @return 执行结果
     */
    @Override
    public List<SysUserVO> users(List<Long> ids) {
        List<Long> longList = ids.stream().filter(Objects::nonNull).collect(Collectors.toList());
        Result<List<UserDTO>> result = AuthTemplateThreadLocal.get().opsForUser().list(longList);
        if (result.getCode() != 0) {
            return new ArrayList<>();
        }
        return result.getData().parallelStream().map(this::parseUser2Vo).collect(Collectors.toList());
    }

    /**
     * 员工分页
     *
     * @param page     页数
     * @param pageSize 页大小
     * @param agencyId 机构ID
     * @return 员工列表
     */
    @Override
    public PageResponse<SysUserVO> findUserByPage(Integer page,
                                                  Integer pageSize,
                                                  Long agencyId,
                                                  String account,
                                                  String name,
                                                  String mobile) {
        Result<PageDTO<UserDTO>> result = AuthTemplateThreadLocal.get().opsForUser()
                .getUserByPage(new UserPageDTO(page, pageSize, account, name, ObjectUtil.isNotEmpty(agencyId) ? agencyId : null, mobile));
        return getPageResponseR(page, pageSize, result);
    }

    /**
     * 快递员分页
     *
     * @param page     页数
     * @param pageSize 页大小
     * @param name     名称
     * @param mobile   手机号
     * @return 快递员列表
     */
    @Override
    public PageResponse<SysUserVO> findCourierByPage(Integer page,
                                                     Integer pageSize,
                                                     String name,
                                                     String mobile,
                                                     String account,
                                                     Long orgId) {
        UserPageDTO userPageDTO = new UserPageDTO(page, pageSize, account, name, orgId, mobile);
        userPageDTO.setRoleId(roleId);
        Result<PageDTO<UserDTO>> result = AuthTemplateThreadLocal.get().opsForUser().getUserByPage(userPageDTO);

        // 转换vo
        PageResponse<SysUserVO> pageResponseR = getPageResponseR(page, pageSize, result);
        if (CollUtil.isEmpty(pageResponseR.getItems())) {
            return pageResponseR;
        }

        List<Long> userIds = pageResponseR.getItems().parallelStream().map(SysUserVO::getUserId).collect(Collectors.toList());
        if (CollUtil.isEmpty(userIds)) {
            return pageResponseR;
        }

        // 补充数据
        String bidStr = CollUtil.isEmpty(userIds) ? "" : CharSequenceUtil.join(",", userIds);
        List<WorkSchedulingDTO> workSchedulingDTOS = workSchedulingFeign.monthSchedule(bidStr, null, WorkUserTypeEnum.COURIER.getCode(), LocalDateTimeUtil.toEpochMilli(LocalDateTimeUtil.now()));
        if (CollUtil.isEmpty(workSchedulingDTOS)) {
            return pageResponseR;
        }
        Map<Long, Boolean> workMap = workSchedulingDTOS.parallelStream()
                .filter(workSchedulingDTO -> ObjectUtil.isNotEmpty(workSchedulingDTO.getWorkSchedules()))
                .collect(Collectors.toMap(WorkSchedulingDTO::getUserId, workSchedulingDTO -> workSchedulingDTO.getWorkSchedules().get(0)));

        pageResponseR.getItems().parallelStream().forEach(userDTO -> {
            // 上班状态
            try {
                Boolean aBoolean = workMap.get(userDTO.getUserId());
                if (ObjectUtil.isNotEmpty(aBoolean)) {
                    userDTO.setWorkStatus(aBoolean ? 1 : 0);
                }
            } catch (Exception ignored) {
                log.info("Exception:{}", ignored.getMessage());
            }
        });
        return pageResponseR;
    }

    /**
     * 转换用户返回结果
     *
     * @param page     页数
     * @param pageSize 页大小
     * @param result   用户信息
     * @return 用户信息
     */
    private PageResponse<SysUserVO> getPageResponseR(@RequestParam(name = "page") Integer page, @RequestParam(name = "pageSize") Integer pageSize, Result<PageDTO<UserDTO>> result) {
        if (result.getCode() == 0 && ObjectUtil.isNotEmpty(result.getData())) {
            PageDTO<UserDTO> userPage = result.getData();
            //处理对象转换
            List<SysUserVO> voList = userPage.getRecords().parallelStream().map(this::parseUser2Vo).collect(Collectors.toList());
            return PageResponse.of(voList, page, pageSize, userPage.getTotal() % userPage.getSize(), userPage.getTotal());
        }
        return PageResponse.getInstance();
    }

    /**
     * 根据机构查询快递员
     *
     * @param agencyId 机构id
     * @return 快递员列表
     */
    @Override
    public List<CourierVO> findByAgencyId(Long agencyId) {
        //构件查询条件
        UserPageDTO userPageDTO = new UserPageDTO(1, 999, null, null, agencyId, null);
        userPageDTO.setRoleId(roleId);

        //分页查询
        Result<PageDTO<UserDTO>> result = AuthTemplateThreadLocal.get().opsForUser().getUserByPage(userPageDTO);
        if (ObjectUtil.isEmpty(result.getData().getRecords())) {
            return Collections.emptyList();
        }

        //组装响应结果
        return result.getData().getRecords().stream().map(userDTO -> BeanUtil.toBean(userDTO, CourierVO.class)).collect(Collectors.toList());
    }

    /**
     * 登录
     * @param login 用户登录信息
     * @return 登录结果
     */
    @Override
    public R<LoginDTO> login(LoginParamDTO login) {
        if (this.check(login.getKey(), login.getCode())) {
            return this.login(login.getAccount(), login.getPassword());
        }
        return R.error("验证码错误");
    }
}
