package com.sl.ms.work.domain.enums.transportorder;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 运单-状态
 */
public enum TransportOrderStatus implements BaseEnum {

    CREATED(1, "新建"),
    LOADED(2, "已装车"),
    PROCESSING(3, "运输中"),
    ARRIVED_END(4, "到达终端网点"),
    REJECTED(6, "拒收");

    @EnumValue
    @JsonValue
    private final Integer code;
    private final String value;

    TransportOrderStatus(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

}
