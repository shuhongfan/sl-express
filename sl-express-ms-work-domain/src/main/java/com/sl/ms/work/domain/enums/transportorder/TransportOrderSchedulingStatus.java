package com.sl.ms.work.domain.enums.transportorder;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 运单-调度状态
 */

public enum TransportOrderSchedulingStatus implements BaseEnum {

    TO_BE_SCHEDULED(1, "待调度"),
    NO_MATCH_TRANSPORT_LINE(2, "未匹配到线路"),
    SCHEDULED(3, "已调度");

    @EnumValue
    @JsonValue
    private final Integer code;
    private final String value;
    TransportOrderSchedulingStatus(Integer code, String value) {
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
