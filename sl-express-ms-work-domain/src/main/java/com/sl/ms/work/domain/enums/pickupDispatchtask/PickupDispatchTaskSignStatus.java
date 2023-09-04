package com.sl.ms.work.domain.enums.pickupDispatchtask;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 取派件任务签收状态
 */
public enum PickupDispatchTaskSignStatus implements BaseEnum {

    /**
     * 未签收
     */
    NOT_SIGNED(0, "未签收"),

    /**
     * 已签收
     */
    RECEIVED(1, "已签收"),
    /**
     * 拒收
     */
    REJECTION(2, "拒收");

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

    PickupDispatchTaskSignStatus(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public static PickupDispatchTaskSignStatus codeOf(Integer code) {
        return EnumUtil.getBy(PickupDispatchTaskSignStatus::getCode, code);
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

}
