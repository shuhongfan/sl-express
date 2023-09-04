package com.sl.ms.work.domain.enums.pickupDispatchtask;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 取派件任务类型
 */
public enum PickupDispatchTaskType implements BaseEnum {
    /**
     * 取件任务
     */
    PICKUP(1, "取件任务"),

    /**
     * 派件任务
     */
    DISPATCH(2, "派件任务");

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

    PickupDispatchTaskType(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public static PickupDispatchTaskType codeOf(Integer code) {
        return EnumUtil.getBy(PickupDispatchTaskType::getCode, code);
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

}
