package com.sl.ms.courier.domain.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 取派件任务分配状态
 *
 * @author itcast
 */

public enum PickupDispatchTaskAssignedStatus {
    /**
     * 待分配
     */
    TO_BE_DISTRIBUTED(1, "待分配"),
    /**
     * 已分配
     */
    DISTRIBUTED(2, "已分配"),
    /**
     * 待人工分配
     */
    MANUAL_DISTRIBUTED(3, "待人工分配");


    PickupDispatchTaskAssignedStatus(Integer code, String value) {

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
    private static final Map<Integer, PickupDispatchTaskAssignedStatus> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (PickupDispatchTaskAssignedStatus statusEnum : EnumSet.allOf(PickupDispatchTaskAssignedStatus.class)) {

            LOOKUP.put(statusEnum.code, statusEnum);
        }
    }

    /**
     * 根据code获取枚举项
     *
     * @param code 值
     * @return 值
     */
    public static PickupDispatchTaskAssignedStatus lookup(Integer code) {
        return LOOKUP.get(code);
    }

}
