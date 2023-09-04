package com.sl.ms.work.domain.enums.transporttask;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 运输任务分配状态
 */
public enum TransportTaskAssignedStatus implements BaseEnum {
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

    TransportTaskAssignedStatus(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }


}
