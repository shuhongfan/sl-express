package com.sl.transport.common.util;

import com.itheima.auth.sdk.AuthTemplate;

/**
 * 包含token的权限系统client
 * 存储在ThreadLocal
 */
public class AuthTemplateThreadLocal {

    private static final ThreadLocal<AuthTemplate> LOCAL = new ThreadLocal<>();

    private AuthTemplateThreadLocal() {

    }

    /**
     * 将authTemplate放到ThreadLocal中
     *
     * @param authTemplate {@link AuthTemplate}
     */
    public static void set(AuthTemplate authTemplate) {
        LOCAL.set(authTemplate);
    }

    /**
     * 从ThreadLocal中获取authTemplate
     */
    public static AuthTemplate get() {
        return LOCAL.get();
    }

    /**
     * 从当前线程中删除authTemplate
     */
    public static void remove() {
        LOCAL.remove();
    }

}
