package com.sl.ms.trade.enums;

import com.sl.transport.common.enums.BaseExceptionEnum;

/**
 * 交易枚举
 */
public enum TradingEnum implements BaseExceptionEnum {

    SUCCEED(1001, 200, "操作成功"),
    ERROR(1002, "操作失败"),
    CHECK_TRADING_FAIL(1003, "交易单校验失败"),
    TRY_LOCK_TRADING_FAIL(1004, "交易单加锁失败"),
    PAYING_TRADING_FAIL(1005, "交易单支付失败"),
    TRADING_STATE_SUCCEED(1006, "交易单已完成"),
    TRADING_STATE_PAYING(1007, "交易单交易中"),
    CONFIG_EMPTY(1008, "支付配置为空"),
    CONFIG_ERROR(1009, "支付配置错误"),
    NATIVE_PAY_FAIL(1010, "统一下单交易失败"),
    NATIVE_QRCODE_FAIL(1011, "生成二维码失败"),
    REFUND_FAIL(1012, "查询统一下单交易退款失败"),
    SAVE_OR_UPDATE_FAIL(1013, "交易单保存或修改失败"),
    TRADING_TYPE_FAIL(1014, "未定义的交易类型"),
    NATIVE_QUERY_FAIL(1015, "查询统一下单交易失败"),
    NATIVE_REFUND_FAIL(1016, "统一下单退款交易失败"),
    NATIVE_QUERY_REFUND_FAIL(1017, "统一下单查询退款失败"),
    CASH_PAY_FAIL(1018, "现金交易失败"),
    CASH_REFUND_FAIL(1019, "统一下单退款交易失败"),
    CREDIT_PAY_FAIL(1020, "信用交易失败"),
    LIST_TRADE_STATE_FAIL(1021, "按交易状态查询交易单失败"),
    NOT_FOUND(1022, "交易单不存在"),
    CLOSE_FAIL(1023, "关闭交易单失败"),
    BASIC_REFUND_OUT_FAIL(1024, "退款金额超过订单总金额"),
    REFUND_NOT_FOUND(1025, "退款记录不存在"),
    REFUND_ALREADY_COMPLETED(1026, "退款记录已经完成"),
    BASIC_REFUND_COUNT_OUT_FAIL(1027, "退款次数超出限制，最多20次"),
    TRADING_QUERY_PARAM_ERROR(1028, "查询交易单错误，订单号或交易单号至少传递一个"),
    REFUND_QUERY_PARAM_ERROR(1029, "查询退款单错误，订单号或交易单号至少传递一个");

    private Integer code;
    private Integer status;
    private String value;

    TradingEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
        this.status = 500;
    }

    TradingEnum(Integer code, Integer status, String value) {
        this.code = code;
        this.value = value;
        this.status = status;
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return this.value;
    }

    @Override
    public Integer getStatus() {
        return this.status;
    }
}
