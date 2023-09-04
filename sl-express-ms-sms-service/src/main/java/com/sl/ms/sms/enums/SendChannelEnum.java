package com.sl.ms.sms.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 三方发送平台枚举
 */
public enum SendChannelEnum implements BaseEnum {

    ALI_YUN(1, "阿里云短信平台，详情：https://www.aliyun.com/product/sms");

    @EnumValue
    @JsonValue
    private Integer code;
    private String value;

    SendChannelEnum(Integer code, String value) {
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

    public static SendChannelEnum codeOf(Integer code) {
        return EnumUtil.getBy(SendChannelEnum::getCode, code);
    }
}
