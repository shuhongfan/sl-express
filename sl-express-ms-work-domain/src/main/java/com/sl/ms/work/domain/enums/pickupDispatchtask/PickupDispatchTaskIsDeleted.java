package com.sl.ms.work.domain.enums.pickupDispatchtask;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 取派件任务状态
 */
public enum PickupDispatchTaskIsDeleted implements BaseEnum {

    /**
     * 未删除
     */
    NOT_DELETED(0, "未删除"),
    /**
     * 已删除
     */
    IS_DELETED(1, "已删除");


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

    PickupDispatchTaskIsDeleted(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public static PickupDispatchTaskIsDeleted codeOf(Integer code) {
        return EnumUtil.getBy(PickupDispatchTaskIsDeleted::getCode, code);
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

}
