package com.sl.ms.oms.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 订单状态枚举
 */
public enum OrderStatus {

    /**
     * 已关闭 快递员取件时拒收
     */
    CLOSE(22000, "CLOSE"),

    /**
     * 待取件
     */
    PENDING(23000, "PENDING"),

    /**
     * 已取件
     */
    PICKED_UP(23001, "PICKED_UP"),

    /**
     * 网点自寄
     */
    OUTLETS_SINCE_SENT(23002, "OUTLETS_SINCE_SENT"),

    /**
     * 网点入库
     */
    OUTLETS_WAREHOUSE(23003, "OUTLETS_WAREHOUSE"),


    /**
     * 待装车
     */
    FOR_LOADING(23004, "FOR_LOADING"),


    /**
     * 运输中
     */
    IN_TRANSIT(23005, "IN_TRANSIT"),


    /**
     * 网点出库
     */
    OUTLETS_EX_WAREHOUSE(23006, "OUTLETS_EX_WAREHOUSE"),

    /**
     * 待派送
     */
    TO_BE_DISPATCHED(23007, "TO_BE_DISPATCHED"),

    /**
     * 派送中
     */
    DISPATCHING(23008, "DISPATCHING"),

    /**
     * 已签收
     */
    RECEIVED(23009, "RECEIVED"),

    /**
     * 用户拒收
     */
    REJECTION(23010, "REJECTION"),

    /**
     * 已删除
     */
    DEL(0, "DEL"),

    /**
     * 已取消
     */
    CANCELLED(230011, "CANCELLED");


    OrderStatus(Integer code, String value) {

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
    private static final Map<Integer, OrderStatus> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (OrderStatus orderEnum : EnumSet.allOf(OrderStatus.class)) {

            LOOKUP.put(orderEnum.code, orderEnum);
        }
    }

    /**
     * 根据code获取枚举项
     *
     * @param code 值
     * @return 值
     */
    public static OrderStatus lookup(Integer code) {
        return LOOKUP.get(code);
    }
}
