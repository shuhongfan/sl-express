package com.sl.transport.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 调度方式，1转运次数最少，2成本最低
 */
public enum DispatchMethodEnum implements BaseEnum {

    /**
     * 1转运次数最少
     */
    SHORTEST_PATH(1, "转运次数最少"),

    /**
     * 2成本最低
     */
    LOWEST_PATH(2, "成本最低");

    DispatchMethodEnum(Integer code, String value) {
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
        return null;
    }

    @Override
    public String getValue() {
        return null;
    }

    public static DispatchMethodEnum codeOf(Integer code) {
        return EnumUtil.getBy(DispatchMethodEnum::getCode, code);
    }
}
