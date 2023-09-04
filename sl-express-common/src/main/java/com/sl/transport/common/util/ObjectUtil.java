package com.sl.transport.common.util;

import cn.hutool.core.util.ArrayUtil;

/**
 * 扩展hutool中的方法
 *
 * @author zzj
 * @version 1.0
 */
public class ObjectUtil extends cn.hutool.core.util.ObjectUtil {

    /**
     * 给定对象是否与提供的中任一对象相同，相同则返回{@code true}，没有相同的返回{@code false}<br>
     * 如果参与比对的对象列表为空，返回{@code false}
     *
     * @param obj1 给定需要检查的对象
     * @param objs 需要参与比对的对象列表
     * @return 是否相同
     */
    public static boolean equalsAny(Object obj1, Object... objs) {
        if (ArrayUtil.isEmpty(objs)) {
            return false;
        }
        for (Object obj : objs) {
            if (cn.hutool.core.util.ObjectUtil.equal(obj1, obj)) {
                return true;
            }
        }
        return false;
    }

}
