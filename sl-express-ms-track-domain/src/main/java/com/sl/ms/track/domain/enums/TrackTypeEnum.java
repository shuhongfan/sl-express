package com.sl.ms.track.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 轨迹类型枚举
 *
 * @author zzj
 * @version 1.0
 */
public enum TrackTypeEnum implements BaseEnum {
    DRIVER(2, "司机轨迹"),
    COURIER(3, "快递员轨迹");

    @JsonValue
    private Integer code;
    private String value;

    TrackTypeEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    @Override
    public Integer getCode() {
        return this.code;
    }

    @Override
    public String getValue() {
        return this.value;
    }
}
