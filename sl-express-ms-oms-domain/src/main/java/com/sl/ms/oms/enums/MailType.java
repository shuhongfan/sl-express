package com.sl.ms.oms.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 订单类型枚举
 */
public enum MailType {

    /**
     * 寄件
     */
    SEND(1, "寄件"),

    /**
     * 收件
     */
    RECEIVE(2, "收件"),

    ALL(3, "全部");

    MailType(Integer code, String value) {
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
    private static final Map<Integer, MailType> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (MailType orderType : EnumSet.allOf(MailType.class)) {

            LOOKUP.put(orderType.code, orderType);
        }
    }

    /**
     * 根据code获取枚举项
     *¬
     * @param code 值
     * @return 值
     */
    public static MailType lookup(Integer code) {
        return LOOKUP.get(code);
    }
}
