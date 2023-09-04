package com.sl.ms.sms.enums;

import com.sl.transport.common.enums.BaseExceptionEnum;

/**
 * 交易枚举
 */
public enum SmsExceptionEnum implements BaseExceptionEnum {

    SMS_CHANNEL_DOES_NOT_EXIST(1001, "短信通道不存在");

    private Integer code;
    private Integer status;
    private String value;

    SmsExceptionEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
        this.status = 500;
    }

    SmsExceptionEnum(Integer code, Integer status, String value) {
        this.code = code;
        this.value = value;
        this.status = status;
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return this.value;
    }

    @Override
    public Integer getStatus() {
        return this.status;
    }
}
