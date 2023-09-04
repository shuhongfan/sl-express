package com.sl.transport.info.enums;

import com.sl.transport.common.enums.BaseExceptionEnum;

/**
 * 异常枚举
 */
public enum ExceptionEnum implements BaseExceptionEnum {

    NOT_FOUND(1001, 404, "查询的运单不存在");

    private Integer code;
    private Integer status;
    private String value;

    ExceptionEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
        this.status = 500;
    }

    ExceptionEnum(Integer code, Integer status, String value) {
        this.code = code;
        this.status = status;
        this.value = value;
    }

    @Override
    public Integer getCode() {
        return this.code;
    }

    @Override
    public String getValue() {
        return this.value;
    }

    @Override
    public Integer getStatus() {
        return this.status;
    }
}
