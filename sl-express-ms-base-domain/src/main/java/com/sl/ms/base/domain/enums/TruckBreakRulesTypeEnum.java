package com.sl.ms.base.domain.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 违章类型，1-闯红灯，2-无证驾驶，3-超载，4-酒后驾驶，5-超速行驶,6-其他
 */
public enum TruckBreakRulesTypeEnum implements BaseEnum {

    /**
     * 闯红灯
     */
    RUN_THE_RED_LIGHT(1, "闯红灯"),
    /**
     * 无证驾驶
     */
    DRIVING_WITHOUT_LICENSE(2, "无证驾驶"),
    /**
     * 超载
     */
    OVERLOAD(3, "超载"),
    /**
     * 酒后驾驶
     */
    DRUNK_DRIVING(4, "酒后驾驶"),
    /**
     * 超速行驶
     */
    OVER_SPEED(5, "超速行驶"),
    /**
     * 其他
     */
    OTHER_BREAK(6, "其他");


    TruckBreakRulesTypeEnum(Integer code, String value) {
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

    public static TruckBreakRulesTypeEnum codeOf(Integer code) {
        return EnumUtil.getBy(TruckBreakRulesTypeEnum::getCode, code);
    }

}
