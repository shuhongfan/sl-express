package com.sl.ms.base.domain.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，200：司机端公告，201：司机端系统通知
 */

public enum MessageContentTypeEnum implements BaseEnum {
    /**
     * 300：快递员端公告
     */
    COURIER_BULLETIN(300, "快递员端公告"),
    /**
     * 301：寄件相关消息
     */
    COURIER_PICKUP(301, "寄件相关消息"),
    /**
     * 302：签收相关消息
     */
    COURIER_SIGN(302, "签收相关消息"),
    /**
     * 303：快件取消消息
     */
    COURIER_CANCEL(303, "快件取消消息"),
    /**
     * 304：派件相关消息
     */
    COURIER_DISPATCH(304, "派件相关消息"),
    /**
     * 200：司机端公告
     */
    DRIVER_BULLETIN(200, "司机端公告"),
    /**
     * 201：司机端系统通知
     */
    DRIVER_SYSTEM_NOTICE(201, "司机端系统通知");


    MessageContentTypeEnum(Integer code, String value) {

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

    public static MessageContentTypeEnum codeOf(Integer code) {
        return EnumUtil.getBy(MessageContentTypeEnum::getCode, code);
    }

}
