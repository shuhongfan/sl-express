package com.sl.ms.web.customer.service;


import com.sl.ms.user.domain.dto.MemberDTO;
import com.sl.ms.web.customer.vo.user.MemberVO;
import com.sl.ms.web.customer.vo.user.RealNameVerifyVO;
import com.sl.ms.web.customer.vo.user.UserLoginRequestVO;
import com.sl.ms.web.customer.vo.user.UserLoginVO;

import java.io.IOException;

/**
 * 用户管理
 */
public interface MemberService {

    /**
     * 详情
     *
     * @param userId 用户ID
     * @return 用户信息
     */
    MemberVO detail(Long userId);

    /**
     * 新增
     *
     * @param user 用户信息
     */
    void save(MemberDTO user);

    /**
     * 根据openid查询用户
     *
     * @param openid 微信ID
     * @return 用户信息
     */
    MemberDTO getByOpenid(String openid);

    /**
     * 登录
     *
     * @param userLoginRequestVO 登录code
     * @return 用户信息
     * @throws IOException IO异常
     */
    UserLoginVO login(UserLoginRequestVO userLoginRequestVO) throws IOException;

    /**
     * 实名认证
     *
     * @param verifyVo 身份证号 姓名
     * @return 是否通过认证
     */
    RealNameVerifyVO realNameVerify(RealNameVerifyVO verifyVo);

    /**
     * 删除用户
     */
    void del();

    /**
     * 更新用户
     *
     * @param vo 用户
     */
    void update(MemberVO vo);

    /**
     * 刷新token
     *
     * @param refreshToken 原长令牌
     * @return 长/短令牌
     */
    UserLoginVO refresh(String refreshToken);
}
