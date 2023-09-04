package com.sl.ms.work.domain.enums.pickupDispatchtask;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 签收人
 */
public enum SignRecipientEnum implements BaseEnum {

    OWN(1, "本人"),
    OTHER(2, "他人");

    /**
     * 类型编码
     */
    @JsonValue
    @EnumValue
    private final Integer code;
    /**
     * 类型值
     */
    private final String value;

    SignRecipientEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public static SignRecipientEnum codeOf(Integer code) {
        return EnumUtil.getBy(SignRecipientEnum::getCode, code);
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

}
