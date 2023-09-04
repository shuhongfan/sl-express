package com.sl.ms.work.domain.enums.pickupDispatchtask;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 取派件任务分配状态
 */
public enum PickupDispatchTaskAssignedStatus implements BaseEnum {
    /**
     * 已分配
     */
    DISTRIBUTED(2, "已分配"),
    /**
     * 待人工分配
     */
    MANUAL_DISTRIBUTED(3, "待人工分配");

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

    PickupDispatchTaskAssignedStatus(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public static PickupDispatchTaskAssignedStatus codeOf(Integer code) {
        return EnumUtil.getBy(PickupDispatchTaskAssignedStatus::getCode, code);
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

}
