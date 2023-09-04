package com.sl.ms.oms.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 订单类型枚举
 */
public enum OrderType {

    /**
     * 同城订单
     */
    INCITY(1, "同城订单"),

    /**
     * 城际订单
     */
    OUTCITY(2, "城际订单");

    OrderType(Integer code, String value) {
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
    private static final Map<Integer, OrderType> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (OrderType orderType : EnumSet.allOf(OrderType.class)) {

            LOOKUP.put(orderType.code, orderType);
        }
    }

    /**
     * 根据code获取枚举项
     *¬
     * @param code 值
     * @return 值
     */
    public static OrderType lookup(Integer code) {
        return LOOKUP.get(code);
    }
}
