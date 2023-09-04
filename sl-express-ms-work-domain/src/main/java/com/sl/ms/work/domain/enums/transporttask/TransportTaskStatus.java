package com.sl.ms.work.domain.enums.transporttask;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 运输任务状态
 *
 * @author itcast
 */
public enum TransportTaskStatus implements BaseEnum {
    /**
     * 待执行,对应 待提货
     */
    PENDING(1, "待执行"),
    /**
     * 进行中，对应 在途
     */
    PROCESSING(2, "进行中"),
    /**
     * 待确认，保留状态
     */
    CONFIRM(3, "待确认"),
    /**
     * 已完成，对应 已交付
     */
    COMPLETED(4, "已完成"),
    /**
     * 已取消
     */
    CANCELLED(5, "已取消");

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

    TransportTaskStatus(Integer code, String value) {
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
