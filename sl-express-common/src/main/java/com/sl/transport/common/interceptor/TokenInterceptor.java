package com.sl.transport.common.interceptor;

import cn.hutool.core.text.CharSequenceUtil;
import com.itheima.auth.factory.AuthTemplateFactory;
import com.itheima.auth.sdk.AuthTemplate;
import com.sl.transport.common.annotation.NoAuthorization;
import com.sl.transport.common.util.AuthTemplateThreadLocal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Token拦截器
 * 用于将包含token的AuthTemplate实例存放到ThreadLocal的拦截器
 * 方便后续服务根据AuthTemplate实例访问权限系统
 * 顺序在用户信息拦截器之后
 */
@Component
@Slf4j
public class TokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        HandlerMethod handlerMethod = (HandlerMethod) handler;
        if (handlerMethod.hasMethodAnnotation(NoAuthorization.class)) {
            //不需要校验，直接放行
            return true;
        }

        // 从请求头获取token
        String token = request.getHeader("token");
        if (CharSequenceUtil.isEmpty(token)) {
            response.setStatus(403);
            return false;
        }

        AuthTemplate authTemplate = AuthTemplateFactory.get(token);
        AuthTemplateThreadLocal.set(authTemplate);
        log.info("拦截器拦截到请求：{}", request.getRequestURI());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        AuthTemplateThreadLocal.remove();
        log.info("请求结束：{}", request.getRequestURI());
    }
}
