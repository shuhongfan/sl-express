package com.sl.ms.work.domain.enums.pickupDispatchtask;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 取派件任务状态
 */
public enum PickupDispatchTaskStatus implements BaseEnum {

    NEW(1, "新任务"),
    COMPLETED(2, "已完成"),
    CANCELLED(3, "已取消");

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

    PickupDispatchTaskStatus(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public static PickupDispatchTaskStatus codeOf(Integer code) {
        return EnumUtil.getBy(PickupDispatchTaskStatus::getCode, code);
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

}
