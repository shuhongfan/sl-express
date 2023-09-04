package com.sl.ms.base.domain.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 事故类型，1-直行事故，2-追尾事故，3-超车事故，4-左转弯事故，5-右转弯事故，6-弯道事故，7-坡道事故，8-会车事故，9-其他
 */
public enum TruckAccidentTypeEnum implements BaseEnum {

    /**
     * 直行事故
     */
    STRAIGHT_ACCIDENT(1, "直行事故"),
    /**
     * 追尾事故
     */
    REAR_END_COLLISION(2, "追尾事故"),
    /**
     * 超车事故
     */
    OVERTAKING_ACCIDENT(3, "超车事故"),
    /**
     * 左转弯事故
     */
    LEFT_TURN_ACCIDENT(4, "左转弯事故"),
    /**
     * 右转弯事故
     */
    RIGHT_TURN_ACCIDENT(5, "右转弯事故"),
    /**
     * 弯道事故
     */
    CURVE_ACCIDENT(6, "弯道事故"),
    /**
     * 坡道事故
     */
    RAMP_ACCIDENT(7, "坡道事故"),
    /**
     * 会车事故
     */
    TRAFFIC_ACCIDENT(8, "会车事故"),
    /**
     * 其他
     */
    OTHER_ACCIDENT(9, "其他");


    TruckAccidentTypeEnum(Integer code, String value) {
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

    public static TruckAccidentTypeEnum codeOf(Integer code) {
        return EnumUtil.getBy(TruckAccidentTypeEnum::getCode, code);
    }

}
