package com.sl.ms.oms.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 订单类型枚举
 */
public enum OrderPaymentMethod {

    /**
     * 预结
     */
    PRE_PAY(1, "预结"),

    /**
     * 到付
     */
    END_PAY(2, "到付");

    OrderPaymentMethod(Integer code, String value) {
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
    private static final Map<Integer, OrderPaymentMethod> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (OrderPaymentMethod orderPaymentMethod : EnumSet.allOf(OrderPaymentMethod.class)) {

            LOOKUP.put(orderPaymentMethod.code, orderPaymentMethod);
        }
    }

    /**
     * 根据code获取枚举项
     * ¬
     *
     * @param code 值
     * @return 值
     */
    public static OrderPaymentMethod lookup(Integer code) {
        return LOOKUP.get(code);
    }
}
