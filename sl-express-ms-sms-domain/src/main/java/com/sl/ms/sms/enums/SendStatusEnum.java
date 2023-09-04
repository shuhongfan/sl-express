package com.sl.ms.sms.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 发送状态枚举
 */
public enum SendStatusEnum implements BaseEnum {

    SUCCESS(1, "成功"),
    FAIL(2, "失败");

    @EnumValue
    @JsonValue
    private Integer code;
    private String value;

    SendStatusEnum(Integer code, String value) {
        this.code = code;
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

    public static SendStatusEnum codeOf(Integer code) {
        return EnumUtil.getBy(SendStatusEnum::getCode, code);
    }
}
