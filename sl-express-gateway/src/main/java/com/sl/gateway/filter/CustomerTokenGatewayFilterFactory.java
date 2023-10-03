package com.sl.gateway.filter;

import com.itheima.auth.sdk.dto.AuthUserInfoDTO;
import com.sl.gateway.config.MyConfig;
import com.sl.gateway.properties.JwtProperties;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.util.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Map;

/**
 * 用户端token拦截处理
 */
@Slf4j
@Component
public class CustomerTokenGatewayFilterFactory extends AbstractGatewayFilterFactory<Object> implements AuthFilter {

    @Resource
    private MyConfig myConfig;

    @Resource
    private JwtProperties jwtProperties;

    @Override
    public GatewayFilter apply(Object config) {
        return new TokenGatewayFilter(this.myConfig, this);
    }

    @Override
    public AuthUserInfoDTO check(String token) {
        // 普通用户的token没有对接权限系统，需要自定实现
        try {
//        基于JwtUtils解析token获取Claims内容
            Map<String, Object> claims = JwtUtils.checkToken(jwtProperties.getPublicKey(), token);

//        在解析的内容中获取用户ID
            Long userId = (Long) claims.get("userId");

//        封装AuthUserInfoDTO对象返回
            AuthUserInfoDTO authUserInfoDTO = new AuthUserInfoDTO();
            authUserInfoDTO.setUserId(userId);
            return authUserInfoDTO;
        } catch (Exception e) {
            log.error(">>>>>>>>>>>>>>>>>> 解析用户登录token失败 >>>>>>>>>>>>>>>>");
            return null;
        }
    }

    @Override
    public Boolean auth(String token, AuthUserInfoDTO authUserInfoDTO, String path) {
        //普通用户不需要校验角色
        return true;
    }

    @Override
    public String tokenHeaderName() {
        return Constants.GATEWAY.ACCESS_TOKEN;
    }
}
