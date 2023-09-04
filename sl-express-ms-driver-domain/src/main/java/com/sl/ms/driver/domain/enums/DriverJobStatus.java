package com.sl.ms.driver.domain.enums;

import cn.hutool.core.util.EnumUtil;
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
     * 已交付，对应 已交付
     */
    DELIVERED(4, "已交付"),
    /**
     * 已作废
     */
    CANCELLED(5, "已作废"),
    /**
     * 已完成
     */
    COMPLETED(6, "已完成");


    DriverJobStatus(Integer code, String value) {
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

    public static DriverJobStatus codeOf(Integer code) {
        return EnumUtil.getBy(DriverJobStatus::getCode, code);
    }

}
