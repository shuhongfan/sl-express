package com.sl.ms.sms.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 短信内容类型枚举
 */
public enum SmsContentTypeEnum implements BaseEnum {

    WORD_MESSAGE(1, "文字类型短信"),
    VOICE(2, "语音类型短信");

    @EnumValue
    @JsonValue
    private Integer code;
    private String value;

    SmsContentTypeEnum(Integer code, String value) {
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

    public static SmsContentTypeEnum codeOf(Integer code) {
        return EnumUtil.getBy(SmsContentTypeEnum::getCode, code);
    }
}
