package com.sl.ms.work.domain.enums.transporttask;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 运输任务满载状态
 *
 * @author itcast
 */

public enum TransportTaskLoadingStatus implements BaseEnum {

    /**
     * 半载
     */
    HALF(1, "半载"),

    /**
     * 满载
     */
    FULL(2, "满载"),

    /**
     * 空载
     */
    EMPTY(3, "空载");

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

    TransportTaskLoadingStatus(Integer code, String value) {
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
