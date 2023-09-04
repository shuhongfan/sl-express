package com.sl.ms.work.domain.enums.driverjob;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 司机任务状态
 *
 * @author itcast
 */
public enum DriverJobStatus implements BaseEnum {
    /**
     * 待执行,对应 待提货
     */
    PENDING(1, "待执行"),
    /**
     * 进行中，对应 在途
     */
    PROCESSING(2, "进行中"),
    /**
     * 改派，对应已交付
     */
    CONFIRM(3, "改派"),
    /**
     * 已完成，对应 已交付
     */
    COMPLETED(4, "已完成"),
    /**
     * 已作废
     */
    CANCELLED(5, "已作废");


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

    DriverJobStatus(Integer code, String value) {
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
