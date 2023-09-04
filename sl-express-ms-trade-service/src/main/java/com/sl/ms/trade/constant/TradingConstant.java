package com.sl.ms.trade.constant;

import com.sl.ms.trade.enums.PayChannelEnum;

/**
 * @ClassName TardingConstant.java
 * @Description 交易常量类
 */
public class TradingConstant {

    //【阿里云退款返回状态】
    //REFUND_SUCCESS:成功
    public static final String REFUND_SUCCESS = "REFUND_SUCCESS";

    //【阿里云返回付款状态】
    //TRADE_CLOSED:未付款交易超时关闭，或支付完成后全额退款
    public static final String ALI_TRADE_CLOSED = "TRADE_CLOSED";
    //TRADE_SUCCESS:交易支付成功
    public static final String ALI_TRADE_SUCCESS = "TRADE_SUCCESS";
    //TRADE_FINISHED:交易结束不可退款
    public static final String ALI_TRADE_FINISHED = "TRADE_FINISHED";


    //【微信退款返回状态】
    //SUCCESS：退款成功
    public static final String WECHAT_REFUND_SUCCESS = "SUCCESS";
    //CLOSED：退款关闭
    public static final String WECHAT_REFUND_CLOSED = "CLOSED";
    //PROCESSING：退款处理中
    public static final String WECHAT_REFUND_PROCESSING = "PROCESSING";
    //ABNORMAL：退款异常
    public static final String WECHAT_REFUND_ABNORMAL = "TRADE_CLOSED";

    //【微信返回付款状态】
    //SUCCESS：支付成功
    public static final String WECHAT_TRADE_SUCCESS = "SUCCESS";
    //REFUND：转入退款
    public static final String WECHAT_TRADE_REFUND = "REFUND";
    //NOTPAY：未支付
    public static final String WECHAT_TRADE_NOTPAY = "NOTPAY";
    //CLOSED：已关闭
    public static final String WECHAT_TRADE_CLOSED = "CLOSED";
    //REVOKED：已撤销（仅付款码支付会返回）
    public static final String WECHAT_TRADE_REVOKED = "REVOKED";
    //USERPAYING：用户支付中（仅付款码支付会返回）
    public static final String WECHAT_TRADE_USERPAYING = "USERPAYING";
    //PAYERROR：支付失败（仅付款码支付会返回）
    public static final String WECHAT_TRADE_PAYERROR = "PAYERROR";

    //【平台:交易渠道】
    //阿里支付
    public static final String TRADING_CHANNEL_ALI_PAY = PayChannelEnum.ALI_PAY.name();
    //微信支付
    public static final String TRADING_CHANNEL_WECHAT_PAY = PayChannelEnum.WECHAT_PAY.name();
    //现金
    public static final String TRADING_CHANNEL_CASH_PAY = "CASH_PAY";
    //免单挂账【信用渠道】
    public static final String TRADING_CHANNEL_CREDIT_PAY = "CREDIT_PAY";

    //【平台:交易动作】
    //付款
    public static final String TRADING_TYPE_FK = "FK";
    //退款
    public static final String TRADING_TYPE_TK = "TK";
    //免单
    public static final String TRADING_TYPE_MD = "MD";
    //挂账
    public static final String TRADING_TYPE_GZ = "GZ";


}
