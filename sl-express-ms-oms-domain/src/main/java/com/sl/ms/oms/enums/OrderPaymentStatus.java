package com.sl.ms.oms.enums;

/**
 * 订单支付状态枚举
 */
public enum OrderPaymentStatus {
    UNPAID(1, "未支付"), PAID(2, "已支付");
    private Integer status;
    private String name;

    OrderPaymentStatus(Integer status, String name) {
        this.status = status;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Integer getStatus() {
        return status;
    }

    public static OrderPaymentStatus getEnumByStatus(Integer status) {
        if (null == status) {
            return null;
        }
        for (OrderPaymentStatus temp : OrderPaymentStatus.values()) {
            if (temp.getStatus().equals(status)) {
                return temp;
            }
        }
        return null;
    }
}
