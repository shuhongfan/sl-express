package com.sl.ms.trade.service;

import com.sl.ms.trade.domain.RefundRecordDTO;
import com.sl.ms.trade.domain.TradingDTO;
import com.sl.transport.common.exception.SLException;

import java.math.BigDecimal;

/**
 * 支付的基础功能
 *
 * @author zzj
 * @version 1.0
 */
public interface BasicPayService {

    /***
     * 统一收单线下交易查询
     * 该接口提供所有支付订单的查询，商户可以通过该接口主动查询订单状态，完成下一步的业务逻辑。
     * @param tradingOrderNo 交易单号
     * @return 交易数据对象
     */
    TradingDTO queryTrading(Long tradingOrderNo) throws SLException;

    /***
     * 统一收单交易退款接口
     * 当交易发生之后一段时间内，由于买家或者卖家的原因需要退款时，卖家可以通过退款接口将支付款退还给买家，
     * 将在收到退款请求并且验证成功之后，按照退款规则将支付款按原路退到买家帐号上。
     * 支持一个交易单分多次退款，退款金额总额不能大于总支付的总金额，并且最多20次退款
     *
     * @param tradingOrderNo 交易单号
     * @param refundAmount 退款金额，不能大于总支付的总金额
     * @return 是否成功
     */
    Boolean refundTrading(Long tradingOrderNo, BigDecimal refundAmount) throws SLException;

    /***
     * 统一收单交易退款查询接口
     * @param refundNo 退款单号
     * @return 退款记录数据
     */
    RefundRecordDTO queryRefundTrading(Long refundNo) throws SLException;


}
