package com.sl.ms.web.courier.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 任务信息相关
 */
public enum TaskInformationEnum implements BaseEnum {
    /**
     * 1任务关联寄件人信息
     */
    SEND(1, "任务关联寄件人信息"),
    /**
     * 2任务关联收件人信息
     */
    RECEIVE(2, "任务关联收件人信息");


    TaskInformationEnum(Integer code, String value) {
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

    public static TaskInformationEnum codeOf(Integer code) {
        return EnumUtil.getBy(TaskInformationEnum::getCode, code);
    }
}
