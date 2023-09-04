package com.sl.ms.base.domain.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 故障类型，1-发动机启动困难，2-不着车，3-漏油，4-漏水，5-照明失灵，6-有异响，7-排烟异常，8-温度异常，9-其他
 */
public enum TruckFaultTypeEnum implements BaseEnum {

    /**
     * 发动机启动困难
     */
    DIFFICULTY_IN_STARTING_THE_ENGINE(1, "发动机启动困难"),
    /**
     * 不着车
     */
    NO_TRUCK(2, "不着车"),
    /**
     * 漏油
     */
    OIL_LEAKAGE(3, "漏油"),
    /**
     * 漏水
     */
    WATER_LEAKAGE(4, "漏水"),
    /**
     * 照明失灵
     */
    LIGHTING_FAILURE(5, "照明失灵"),
    /**
     * 有异响
     */
    ABNORMAL_NOISE(6, "有异响"),
    /**
     * 排烟异常
     */
    ABNORMAL_SMOKE(7, "排烟异常"),
    /**
     * 温度异常
     */
    ABNORMAL_TEMPERATURE(8, "温度异常"),
    /**
     * 其他
     */
    OTHER_FAULT(9, "其他");


    TruckFaultTypeEnum(Integer code, String value) {
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

    public static TruckFaultTypeEnum codeOf(Integer code) {
        return EnumUtil.getBy(TruckFaultTypeEnum::getCode, code);
    }

}
