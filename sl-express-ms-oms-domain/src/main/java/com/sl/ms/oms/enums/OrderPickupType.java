package com.sl.ms.oms.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 订单类型枚举
 */
public enum OrderPickupType {

    /**
     * 网点自寄
     */
    NO_PICKUP(1, "网点自寄"),

    /**
     * 上门取件
     */
    PICKUP(2, "上门取件");

    OrderPickupType(Integer code, String value) {
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
    private static final Map<Integer, OrderPickupType> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (OrderPickupType orderPickupType : EnumSet.allOf(OrderPickupType.class)) {

            LOOKUP.put(orderPickupType.code, orderPickupType);
        }
    }

    /**
     * 根据code获取枚举项
     * ¬
     *
     * @param code 值
     * @return 值
     */
    public static OrderPickupType lookup(Integer code) {
        return LOOKUP.get(code);
    }
}
