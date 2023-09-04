package com.sl.ms.user.domain.enums;

import cn.hutool.core.util.EnumUtil;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * 地址薄类型
 */
public enum AddressBookType {
    /**
     * 寄件
     */
    SEND(1, "寄件"),

    /**
     * 收件
     */
    RECEIPT(2, "收件");

    AddressBookType(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    /**
     * 类型编码
     */
    @JsonValue
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

    public static AddressBookType codeOf(Integer code) {
        return EnumUtil.getBy(AddressBookType::getCode, code);
    }

}
