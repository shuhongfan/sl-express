package com.sl.ms.base.domain.enums;

/***
 * @author wangxiaobing
 *
 * 通用状态枚举
 */
public enum StatusEnum {
    /**
     * 禁用
     */
    DISABLED(0, "DISABLED"),

    /**
     * 正常
     */
    NORMAL(1, "NORMAL");

    StatusEnum(Integer code, String value) {
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
