package com.sl.ms.trade.handler;

import com.sl.ms.trade.entity.RefundRecordEntity;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.transport.common.exception.SLException;

/**
 * 基础支付功能的定义，具体业务由不同的支付渠道实现
 *
 * @author zzj
 * @version 1.0
 */
public interface BasicPayHandler {

    /***
     * 统一收单线下交易查询
     * 该接口提供所有支付订单的查询，商户可以通过该接口主动查询订单状态，完成下一步的业务逻辑。
     * @return 是否有变化
     */
    Boolean queryTrading(TradingEntity trading) throws SLException;

    /***
     * 关闭交易
     * @return 是否成功
     */
    Boolean closeTrading(TradingEntity trading) throws SLException;

    /***
     * 统一收单交易退款接口
     * 当交易发生之后一段时间内，由于买家或者卖家的原因需要退款时，卖家可以通过退款接口将支付款退还给买家，
     * 将在收到退款请求并且验证成功之后，按照退款规则将支付款按原路退到买家帐号上。
     * @param refundRecord 退款记录对象
     * @return 是否有变化
     */
    Boolean refundTrading(RefundRecordEntity refundRecord) throws SLException;

    /***
     * 统一收单交易退款查询接口
     *
     * @param refundRecord 退款交易单号
     * @return 是否有变化
     */
    Boolean queryRefundTrading(RefundRecordEntity refundRecord) throws SLException;

}
