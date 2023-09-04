package com.sl.ms.web.customer.service;

import com.sl.ms.web.customer.vo.user.UserLoginVO;

import java.util.Map;

/**
 * 用户登录令牌的处理
 */
public interface TokenService {

    /**
     * 生成短令牌
     *
     * @param claims token中存储的数据
     * @return 短令牌
     */
    String createAccessToken(Map<String, Object> claims);

    /**
     * 生成长令牌
     *
     * @param claims token中存储的数据
     * @return 长令牌
     */
    String createRefreshToken(Map<String, Object> claims);

    /**
     * 刷新token
     *
     * @param refreshToken 原长令牌，需要否则校验其合法性以及可用性
     * @return 登录对象，包含长短令牌
     */
    UserLoginVO refreshToken(String refreshToken);

}
