package com.sl.ms.courier.domain.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 取派件任务类型
 *
 * @author itcast
 */

public enum PickupDispatchTaskType {
    /**
     * 取件任务
     */
    PICKUP(1, "取件任务"),

    /**
     * 派件任务
     */
    DISPATCH(2, "派件任务");


    PickupDispatchTaskType(Integer code, String value) {

        this.code = code;
        this.value = value;
    }

    /**
     * 类型编码
     */
    private final Integer code;

    /**
     * 类型值
     */
    private final String value;


    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }


    /**
     * 循环变量
     */
    private static final Map<Integer, PickupDispatchTaskType> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (PickupDispatchTaskType taskType : EnumSet.allOf(PickupDispatchTaskType.class)) {

            LOOKUP.put(taskType.code, taskType);
        }
    }

    /**
     * 根据code获取枚举项
     *
     * @param code 值
     * @return 值
     */
    public static PickupDispatchTaskType lookup(Integer code) {
        return LOOKUP.get(code);
    }

}
