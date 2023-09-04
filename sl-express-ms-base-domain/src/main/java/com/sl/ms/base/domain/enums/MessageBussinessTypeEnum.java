package com.sl.ms.base.domain.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 1：用户端，2：司机端，3：快递员端，4：后台管理系统
 */

public enum MessageBussinessTypeEnum implements BaseEnum {
    /**
     * 1：用户端
     */
    USER(1, "用户端"),
    /**
     * 2：司机端
     */
    DRIVER(2, "司机端"),
    /**
     * 3：快递员端
     */
    COURIER(3, "快递员端"),
    /**
     * 4：后台管理系统
     */
    MANAGER(4, "后台管理系统");


    MessageBussinessTypeEnum(Integer code, String value) {

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

    public static MessageBussinessTypeEnum codeOf(Integer code) {
        return EnumUtil.getBy(MessageBussinessTypeEnum::getCode, code);
    }
}
