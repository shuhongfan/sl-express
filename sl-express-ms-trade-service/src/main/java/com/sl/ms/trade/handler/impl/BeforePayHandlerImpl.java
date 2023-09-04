package com.sl.ms.trade.handler.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.incrementer.IdentifierGenerator;
import com.sl.ms.trade.entity.RefundRecordEntity;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.ms.trade.enums.RefundStatusEnum;
import com.sl.ms.trade.enums.TradingEnum;
import com.sl.ms.trade.enums.TradingStateEnum;
import com.sl.ms.trade.handler.BeforePayHandler;
import com.sl.ms.trade.service.RefundRecordService;
import com.sl.ms.trade.service.TradingService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.ObjectUtil;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.List;

/**
 * 交易前置处理接口
 *
 * @author zzj
 * @version 1.0
 */
@Component
public class BeforePayHandlerImpl implements BeforePayHandler {

    @Resource
    private TradingService tradingService;
    @Resource
    private IdentifierGenerator identifierGenerator;
    @Resource
    private RefundRecordService refundRecordService;

    @Override
    public void idempotentCreateTrading(TradingEntity tradingEntity) throws SLException {
        TradingEntity trading = tradingService.findTradByProductOrderNo(tradingEntity.getProductOrderNo());
        if (ObjectUtil.isEmpty(trading)) {
            //新交易单，生成交易号
            tradingEntity.setTradingOrderNo((Long) identifierGenerator.nextId(tradingEntity));
            return;
        }

        TradingStateEnum tradingState = trading.getTradingState();
        if (ObjectUtil.equalsAny(tradingState, TradingStateEnum.YJS, TradingStateEnum.MD)) {
            //已结算、免单：直接抛出重复支付异常
            throw new SLException(TradingEnum.TRADING_STATE_SUCCEED);
        } else if (ObjectUtil.equals(TradingStateEnum.FKZ, tradingState)) {
            //付款中，如果支付渠道一致，说明是重复，抛出支付中异常，否则需要更换支付渠道
            //举例：第一次通过支付宝付款，付款中用户取消，改换了微信支付
            if (StrUtil.equals(trading.getTradingChannel(), tradingEntity.getTradingChannel())) {
                throw new SLException(TradingEnum.TRADING_STATE_PAYING);
            } else {
                tradingEntity.setId(trading.getId()); // id设置为原订单的id
                //重新生成交易号，在这里就会出现id 与 TradingOrderNo 数据不同的情况，其他情况下是一样的
                tradingEntity.setTradingOrderNo(Convert.toLong(identifierGenerator.nextId(tradingEntity)));
            }
        } else if (ObjectUtil.equalsAny(tradingState, TradingStateEnum.QXDD, TradingStateEnum.GZ)) {
            //取消订单,挂账：创建交易号，对原交易单发起支付
            tradingEntity.setId(trading.getId()); // id设置为原订单的id
            //重新生成交易号，在这里就会出现id 与 TradingOrderNo 数据不同的情况，其他情况下是一样的
            tradingEntity.setTradingOrderNo(Convert.toLong(identifierGenerator.nextId(tradingEntity)));
        } else {
            //其他情况：直接交易失败
            throw new SLException(TradingEnum.PAYING_TRADING_FAIL);
        }
    }

    @Override
    public Boolean checkCreateTrading(TradingEntity tradingEntity) {
        //校验不为为空，订单备注、订单号、企业号、交易金额、支付渠道
        boolean flag = ObjectUtil.isAllNotEmpty(tradingEntity,
                tradingEntity.getMemo(),
                tradingEntity.getProductOrderNo(),
                tradingEntity.getEnterpriseId(),
                tradingEntity.getTradingAmount(),
                tradingEntity.getTradingChannel());

        if (!flag) {
            return false;
        }

        //金额不能小于等于0
        return !NumberUtil.isLessOrEqual(tradingEntity.getTradingAmount(), BigDecimal.valueOf(0));
    }

    @Override
    public void checkQueryTrading(TradingEntity trading) {
        if (ObjectUtil.isEmpty(trading)) {
            throw new SLException(TradingEnum.NOT_FOUND);
        }

        //校验交易单是否已经完成或已取消
        TradingStateEnum tradingState = trading.getTradingState();
        if (ObjectUtil.equalsAny(tradingState, TradingStateEnum.YJS, TradingStateEnum.QXDD)) {
            throw new SLException(TradingEnum.TRADING_STATE_SUCCEED);
        }
    }

    @Override
    public RefundRecordEntity idempotentRefundTrading(TradingEntity trading, BigDecimal refundAmount) {
        //查询退款次数，不能大于20次
        List<RefundRecordEntity> recordList = this.refundRecordService.findListByTradingOrderNo(trading.getTradingOrderNo());
        int size = CollUtil.size(recordList);
        if (size >= 20) {
            return null;
        }

        RefundRecordEntity refundRecord = new RefundRecordEntity();
        //退款单号
        refundRecord.setRefundNo(Convert.toLong(this.identifierGenerator.nextId(refundRecord)));
        refundRecord.setTradingOrderNo(trading.getTradingOrderNo());
        refundRecord.setProductOrderNo(trading.getProductOrderNo());
        refundRecord.setRefundAmount(refundAmount);
        refundRecord.setEnterpriseId(trading.getEnterpriseId());
        refundRecord.setTradingChannel(trading.getTradingChannel());
        refundRecord.setRefundStatus(RefundStatusEnum.SENDING);
        refundRecord.setTotal(trading.getTradingAmount());
        String memo = StrUtil.format("退款（{}）", size + 1);
        refundRecord.setMemo(memo);

        return refundRecord;
    }

    @Override
    public void checkRefundTrading(TradingEntity trading) {
        if (ObjectUtil.isEmpty(trading)) {
            throw new SLException(TradingEnum.NOT_FOUND);
        }

        if (trading.getTradingState() != TradingStateEnum.YJS) {
            throw new SLException(TradingEnum.NATIVE_REFUND_FAIL);
        }

        //退款总金额不可超实付总金额
        if (NumberUtil.isGreater(trading.getRefund(), trading.getTradingAmount())) {
            throw new SLException(TradingEnum.BASIC_REFUND_OUT_FAIL);
        }
    }

    @Override
    public void checkQueryRefundTrading(RefundRecordEntity refundRecord) {
        if (ObjectUtil.isEmpty(refundRecord)) {
            throw new SLException(TradingEnum.REFUND_NOT_FOUND);
        }

        if (ObjectUtil.equals(refundRecord.getRefundStatus(), RefundStatusEnum.SUCCESS)) {
            throw new SLException(TradingEnum.REFUND_ALREADY_COMPLETED);
        }
    }
}
