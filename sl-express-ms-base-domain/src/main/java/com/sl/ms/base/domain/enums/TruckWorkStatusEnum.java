package com.sl.ms.base.domain.enums;

/***
 * @author wangxiaobing
 *
 * 车辆运行状态枚举
 */
public enum TruckWorkStatusEnum {
    /**
     * 启用
     */
    WORKING(1, "WORKING"),

    /**
     * 停用
     */
    STOP(0, "STOP");

    TruckWorkStatusEnum(Integer code, String value) {
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
