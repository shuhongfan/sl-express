package com.sl.transport.common.util;

import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.vo.AuthUserInfo;

public class UserThreadLocal {

    private static final ThreadLocal<AuthUserInfo> LOCAL = new ThreadLocal<>();

    private UserThreadLocal() {

    }

    /**
     * 将authUserInfo放到ThreadLocal中
     *
     * @param authUserInfo {@link AuthUserInfo}
     */
    public static void set(AuthUserInfo authUserInfo) {
        LOCAL.set(authUserInfo);
    }

    /**
     * 从ThreadLocal中获取authUserInfo
     */
    public static AuthUserInfo get() {
        return LOCAL.get();
    }

    /**
     * 从当前线程中删除authUserInfo
     */
    public static void remove() {
        LOCAL.remove();
    }

    /**
     * 从当前线程中获取用户id
     * @return 用户id
     */
    public static Long getUserId() {
        AuthUserInfo userInfo = LOCAL.get();
        if (userInfo == null || userInfo.getUserId() == null) {
            throw new SLException("token异常");
        }
        return userInfo.getUserId();
    }

}
