package com.sl.ms.trade.handler;

import com.sl.ms.trade.entity.RefundRecordEntity;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.transport.common.exception.SLException;

import java.math.BigDecimal;

/**
 * 交易前置处理接口
 */
public interface BeforePayHandler {


    /***
     * 支付的交易幂等性处理，如果有问题抛出异常
     *
     * @param tradingEntity 交易订单
     */
    void idempotentCreateTrading(TradingEntity tradingEntity) throws SLException;

    /***
     * 交易单参数校验
     * @param tradingEntity 交易订单
     * @return 是否符合要求
     */
    Boolean checkCreateTrading(TradingEntity tradingEntity);

    /***
     * QueryTrading交易单参数校验
     * @param trading 交易订单
     */
    void checkQueryTrading(TradingEntity trading);

    /***
     * RefundTrading退款交易幂等性
     */
    RefundRecordEntity idempotentRefundTrading(TradingEntity trading, BigDecimal refundAmount);

    /***
     * RefundTrading退款交易单参数校验
     * @param trading 交易订单
     */
    void checkRefundTrading(TradingEntity trading);


    /***
     * QueryRefundTrading交易单参数校验
     * @param refundRecord 退款记录
     */
    void checkQueryRefundTrading(RefundRecordEntity refundRecord);
}
