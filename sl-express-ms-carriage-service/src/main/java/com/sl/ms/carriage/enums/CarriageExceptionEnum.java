package com.sl.ms.carriage.enums;

import cn.hutool.core.util.EnumUtil;
import com.sl.transport.common.enums.BaseExceptionEnum;

/**
 * 异常枚举
 */
public enum CarriageExceptionEnum implements BaseExceptionEnum {

    NOT_ECONOMIC_ZONE_REPEAT(1001, "非经济区的模板重复，只能有一个模板"),
    ECONOMIC_ZONE_CITY_REPEAT(1002, "经济区互寄关联城市重复"),
    NOT_FOUND(1003, "没有找到运费模板，无法计算运费");

    private Integer code;
    private Integer status;
    private String value;

    CarriageExceptionEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
        this.status = 500;
    }

    CarriageExceptionEnum(Integer code, Integer status, String value) {
        this.code = code;
        this.value = value;
        this.status = status;
    }

    @Override
    public Integer getCode() {
        return this.code;
    }

    @Override
    public String getValue() {
        return this.value;
    }

    @Override
    public Integer getStatus() {
        return this.status;
    }

    public static CarriageExceptionEnum codeOf(Integer code) {
        return EnumUtil.getBy(CarriageExceptionEnum::getCode, code);
    }
}
