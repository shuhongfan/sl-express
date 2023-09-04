package com.sl.ms.base.domain.enums;

/***
 * @author wangxiaobing
 *
 * 车辆运行状态枚举
 */
public enum TruckRunStatusEnum {
    /**
     * 已达到
     */
    ARRIVED(1, "ARRIVED"),

    /**
     * 运输中
     */
    RUNNING(0, "RUNNING");

    TruckRunStatusEnum(Integer code, String value) {
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
