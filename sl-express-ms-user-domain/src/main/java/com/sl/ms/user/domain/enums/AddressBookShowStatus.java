package com.sl.ms.user.domain.enums;

import cn.hutool.core.util.EnumUtil;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * 地址薄展示状态
 */
public enum AddressBookShowStatus {
    /**
     * 展示
     */
    SHOW_STATUS(1, "展示"),

    /**
     * 不展示
     */
    NOT_SHOW_STATUS(0, "不展示");

    AddressBookShowStatus(Integer code, String value) {
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

    public static AddressBookShowStatus codeOf(Integer code) {
        return EnumUtil.getBy(AddressBookShowStatus::getCode, code);
    }

}
