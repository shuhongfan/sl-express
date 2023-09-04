package com.sl.ms.trade.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 退款状态枚举
 *
 * @author zzj
 * @version 1.0
 */
public enum RefundStatusEnum implements BaseEnum {

    SENDING(1, "退款中"),
    SUCCESS(2, "成功"),
    FAIL(3, "失败");

    @EnumValue
    @JsonValue
    private Integer code;
    private String value;

    RefundStatusEnum(Integer code, String value) {
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
