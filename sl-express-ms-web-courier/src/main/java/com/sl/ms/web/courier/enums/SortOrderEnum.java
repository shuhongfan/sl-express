package com.sl.ms.web.courier.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 排序方式
 */
public enum SortOrderEnum implements BaseEnum {
    /**
     * 正序
     */
    POSITIVE_SEQUENCE(1, "正序"),

    /**
     * 倒序
     */
    REVERSE_ORDER(2, "倒序");

    SortOrderEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    /**
     * 类型编码
     */
    @EnumValue
    @JsonValue
    private final Integer code;

    /**
     * 类型值
     */
    private final String value;

    @Override
    public Integer getCode() {
        return code;
    }

    @Override
    public String getValue() {
        return value;
    }

    public static SortOrderEnum codeOf(Integer code) {
        return EnumUtil.getBy(SortOrderEnum::getCode, code);
    }
}
