package com.sl.pay.handler.alipay;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.kernel.util.ResponseChecker;
import com.alipay.easysdk.payment.common.models.AlipayTradeCloseResponse;
import com.alipay.easysdk.payment.common.models.AlipayTradeFastpayRefundQueryResponse;
import com.alipay.easysdk.payment.common.models.AlipayTradeQueryResponse;
import com.alipay.easysdk.payment.common.models.AlipayTradeRefundResponse;
import com.sl.pay.constant.TradingConstant;
import com.sl.pay.entity.RefundRecordEntity;
import com.sl.pay.entity.TradingEntity;
import com.sl.pay.enums.RefundStatusEnum;
import com.sl.pay.enums.TradingEnum;
import com.sl.pay.enums.TradingStateEnum;
import com.sl.pay.handler.BasicPayHandler;
import com.sl.transport.common.exception.SLException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * 支付宝基础支付功能的实现
 */
@Slf4j
@Component("aliBasicPayHandler")
public class AliBasicPayHandler implements BasicPayHandler {

    @Override
    public Boolean queryTrading(TradingEntity trading) throws SLException {
        //Factory使用配置
        Factory.setOptions(AlipayConfig.getConfig());
        AlipayTradeQueryResponse queryResponse;
        try {
            //调用支付宝API：通用查询支付情况
            queryResponse = Factory
                    .Payment
                    .Common()
                    .query(String.valueOf(trading.getTradingOrderNo()));
        } catch (Exception e) {
            String msg = StrUtil.format("查询支付宝统一下单失败：trading = {}", trading);
            log.error(msg, e);
            throw new SLException(msg);
        }

        //修改交易单状态
        trading.setResultCode(queryResponse.getCode());
        trading.setResultMsg(queryResponse.getSubMsg());
        trading.setResultJson(JSONUtil.toJsonStr(queryResponse));

        boolean success = ResponseChecker.success(queryResponse);
        //响应成功，分析交易状态
        if (success) {
            String tradeStatus = queryResponse.getTradeStatus();
            if (StrUtil.equals(TradingConstant.ALI_TRADE_CLOSED, tradeStatus)) {
                //支付取消：TRADE_CLOSED（未付款交易超时关闭，或支付完成后全额退款）
                trading.setTradingState(TradingStateEnum.QXDD);
            } else if (StrUtil.equalsAny(tradeStatus, TradingConstant.ALI_TRADE_SUCCESS, TradingConstant.ALI_TRADE_FINISHED)) {
                // TRADE_SUCCESS（交易支付成功）
                // TRADE_FINISHED（交易结束，不可退款）
                trading.setTradingState(TradingStateEnum.YJS);
            } else {
                //非最终状态不处理，当前交易状态：WAIT_BUYER_PAY（交易创建，等待买家付款）不处理
                return false;
            }
            return true;
        }
        throw new SLException(trading.getResultJson(), TradingEnum.NATIVE_QUERY_FAIL.getCode(), TradingEnum.NATIVE_QUERY_FAIL.getStatus());
    }

    @Override
    public Boolean closeTrading(TradingEntity trading) throws SLException {
        //Factory使用配置
        Factory.setOptions(AlipayConfig.getConfig());
        try {
            //调用支付宝API：通用查询支付情况
            AlipayTradeCloseResponse closeResponse = Factory
                    .Payment
                    .Common()
                    .close(String.valueOf(trading.getTradingOrderNo()));
            boolean success = ResponseChecker.success(closeResponse);
            if (success) {
                trading.setTradingState(TradingStateEnum.QXDD);
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new SLException(TradingEnum.CLOSE_FAIL, e);
        }
    }

    @Override
    public Boolean refundTrading(RefundRecordEntity refundRecord) throws SLException {
        //Factory使用配置
        Factory.setOptions(AlipayConfig.getConfig());
        //调用支付宝API：通用查询支付情况
        AlipayTradeRefundResponse refundResponse;
        try {
            // 支付宝easy sdk
            refundResponse = Factory
                    .Payment
                    .Common()
                    //扩展参数：退款单号
                    .optional("out_request_no", refundRecord.getRefundNo())
                    .refund(Convert.toStr(refundRecord.getTradingOrderNo()),
                            Convert.toStr(refundRecord.getRefundAmount()));
        } catch (Exception e) {
            String msg = StrUtil.format("调用支付宝退款接口出错！refundRecord = {}", refundRecord);
            log.error(msg, e);
            throw new SLException(msg, TradingEnum.NATIVE_REFUND_FAIL.getCode(), TradingEnum.NATIVE_REFUND_FAIL.getStatus());
        }
        refundRecord.setRefundCode(refundResponse.getCode());
        refundRecord.setRefundMsg(JSONUtil.toJsonStr(refundResponse));
        boolean success = ResponseChecker.success(refundResponse);
        if (success) {
            refundRecord.setRefundStatus(RefundStatusEnum.SUCCESS);
            return true;
        }
        throw new SLException(refundRecord.getRefundMsg(), TradingEnum.NATIVE_REFUND_FAIL.getCode(), TradingEnum.NATIVE_REFUND_FAIL.getStatus());
    }

    @Override
    public Boolean queryRefundTrading(RefundRecordEntity refundRecord) throws SLException {
        //Factory使用配置
        Factory.setOptions(AlipayConfig.getConfig());
        AlipayTradeFastpayRefundQueryResponse response;
        try {
            response = Factory.Payment.Common().queryRefund(
                    Convert.toStr(refundRecord.getTradingOrderNo()),
                    Convert.toStr(refundRecord.getRefundNo()));
        } catch (Exception e) {
            log.error("调用支付宝查询退款接口出错！refundRecord = {}", refundRecord, e);
            throw new SLException(TradingEnum.NATIVE_REFUND_FAIL, e);
        }

        refundRecord.setRefundCode(response.getCode());
        refundRecord.setRefundMsg(JSONUtil.toJsonStr(response));
        boolean success = ResponseChecker.success(response);
        if (success) {
            refundRecord.setRefundStatus(RefundStatusEnum.SUCCESS);
            return true;
        }
        throw new SLException(refundRecord.getRefundMsg(), TradingEnum.NATIVE_REFUND_FAIL.getCode(), TradingEnum.NATIVE_REFUND_FAIL.getStatus());
    }
}
