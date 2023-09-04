package com.sl.ms.courier.domain.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 取派件任务签收状态
 *
 * @author itcast
 */

public enum PickupDispatchTaskSignStatus {
    /**
     * 已签收
     */
    RECEIVED(1, "已签收"),
    /**
     * 拒收
     */
    REJECTION(2, "拒收");


    PickupDispatchTaskSignStatus(Integer code, String value) {

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
    private static final Map<Integer, PickupDispatchTaskSignStatus> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (PickupDispatchTaskSignStatus statusEnum : EnumSet.allOf(PickupDispatchTaskSignStatus.class)) {

            LOOKUP.put(statusEnum.code, statusEnum);
        }
    }

    /**
     * 根据code获取枚举项
     *
     * @param code 值
     * @return 值
     */
    public static PickupDispatchTaskSignStatus lookup(Integer code) {
        return LOOKUP.get(code);
    }

}
