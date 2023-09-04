package com.sl.ms.work.domain.enums.pickupDispatchtask;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 取派件任务取消原因
 */
public enum PickupDispatchTaskCancelReason implements BaseEnum {

    MALICIOUS_ORDER(1, "用户恶意下单"),
    CANCEL_BY_USER(2, "用户取消投递"),
    FORBIDDEN_GOODS(3, "禁用品"),
    REPEAT_ORDER(4, "重复下单"),
    UNABLE_TO_CONTACT(5, "无法联系上客户（空号、停机等）"),
    FALSE_ADDRESS(6, "虚假地址"),
    ADDRESS_MISMATCH(7, "实际发货地址与下单地址不符"),
    RETURN_TO_AGENCY(8, "因个人无法取件，退回到网点");

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

    PickupDispatchTaskCancelReason(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public static PickupDispatchTaskCancelReason codeOf(Integer code) {
        return EnumUtil.getBy(PickupDispatchTaskCancelReason::getCode, code);
    }

    @Override
    public Integer getCode() {
        return code;
    }

    @Override
    public String getValue() {
        return value;
    }

}
