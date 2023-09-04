package com.sl.ms.base.domain.enums;

/***
 * @author wangxiaobing
 *
 * 车次周期枚举
 */
public enum TruckTripsPeriodEnum {
    /**
     * 天
     */
    DAY(1, "DAY"),

    /**
     * 周
     */
    WEEK(2, "WEEK"),

    /**
     * 月
     */
    MONTH(3, "MONTH");


    TruckTripsPeriodEnum(Integer code, String value) {
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
}
