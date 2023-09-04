package com.sl.ms.track.domain.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 轨迹状态
 *
 * @author zzj
 * @version 1.0
 */
public enum TrackStatusEnum implements BaseEnum {

    NEW(1, "新建"),
    COMPLETE(4, "完成");

    @JsonValue
    private Integer code;
    private String value;

    TrackStatusEnum(Integer code, String value) {
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
