package com.sl.transport.common.interceptor;

import cn.hutool.core.codec.Base64;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.sl.transport.common.annotation.NoAuthorization;
import com.sl.transport.common.util.UserThreadLocal;
import com.sl.transport.common.vo.AuthUserInfo;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 统一对请求的合法性进行校验，需要进行2个方面的校验，
 * 一、请求头中是否携带了X-Request-From，判断是否来源网关
 * 二、请求头中是否存在userInfo，如果不存在则说明是非法请求，响应403状态码
 * 如果是合法请求，将userInfo存储到ThreadLocal中
 */
@Component
public class UserInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        HandlerMethod handlerMethod = (HandlerMethod) handler;
        if (handlerMethod.hasMethodAnnotation(NoAuthorization.class)) {
            //不需要校验，直接放行
            return true;
        }

        String from = request.getHeader("X-Request-From");
        if (!StrUtil.equals(from, "sl-express-gateway")) {
            response.setStatus(403);
            return false;
        }

        String userInfo = request.getHeader("userInfo");
        if (Base64.isBase64(userInfo)) {
            userInfo = Base64.decodeStr(userInfo);
        }
        if (StrUtil.isEmpty(userInfo)) {
            response.setStatus(403);
            return false;
        }

        UserThreadLocal.set(JSONUtil.toBean(userInfo, AuthUserInfo.class));

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        UserThreadLocal.remove();
    }
}
