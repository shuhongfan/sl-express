package com.sl.ms.trade.job;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.json.JSONUtil;
import com.sl.ms.base.api.common.MQFeign;
import com.sl.ms.trade.domain.RefundRecordDTO;
import com.sl.ms.trade.domain.TradingDTO;
import com.sl.ms.trade.entity.RefundRecordEntity;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.ms.trade.enums.RefundStatusEnum;
import com.sl.ms.trade.enums.TradingStateEnum;
import com.sl.ms.trade.service.BasicPayService;
import com.sl.ms.trade.service.RefundRecordService;
import com.sl.ms.trade.service.TradingService;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.vo.TradeStatusMsg;
import com.xxl.job.core.context.XxlJobHelper;
import com.xxl.job.core.handler.annotation.XxlJob;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 交易任务，主要是查询订单的支付状态 和 退款的成功状态
 *
 * @author zzj
 * @version 1.0
 */
@Slf4j
@Component
public class TradeJob {

    @Value("${sl.job.trading.count:100}")
    private Integer tradingCount;
    @Value("${sl.job.refund.count:100}")
    private Integer refundCount;
    @Resource
    private TradingService tradingService;
    @Resource
    private RefundRecordService refundRecordService;
    @Resource
    private BasicPayService basicPayService;
    @Resource
    private MQFeign mqFeign;

    /**
     * 分片广播方式查询支付状态
     * 逻辑：每次最多查询{tradingCount}个未完成的交易单，交易单id与shardTotal取模，值等于shardIndex进行处理
     */
    @XxlJob("tradingJob")
    public void tradingJob() {
        // 分片参数
        int shardIndex = NumberUtil.max(XxlJobHelper.getShardIndex(), 0);
        int shardTotal = NumberUtil.max(XxlJobHelper.getShardTotal(), 1);

        List<TradingEntity> list = this.tradingService.findListByTradingState(TradingStateEnum.FKZ, tradingCount);
        if (CollUtil.isEmpty(list)) {
            XxlJobHelper.log("查询到交易单列表为空！shardIndex = {}, shardTotal = {}", shardIndex, shardTotal);
            return;
        }

        //定义消息通知列表，只要是状态不为【付款中】就需要通知其他系统
        List<TradeStatusMsg> tradeMsgList = new ArrayList<>();
        for (TradingEntity trading : list) {
            if (trading.getTradingOrderNo() % shardTotal != shardIndex) {
                continue;
            }
            try {
                //查询交易单
                TradingDTO tradingDTO = this.basicPayService.queryTrading(trading.getTradingOrderNo());
                if (TradingStateEnum.FKZ != tradingDTO.getTradingState()) {
                    TradeStatusMsg tradeStatusMsg = TradeStatusMsg.builder()
                            .tradingOrderNo(trading.getTradingOrderNo())
                            .productOrderNo(trading.getProductOrderNo())
                            .statusCode(tradingDTO.getTradingState().getCode())
                            .statusName(tradingDTO.getTradingState().name())
                            .build();
                    tradeMsgList.add(tradeStatusMsg);
                }
            } catch (Exception e) {
                XxlJobHelper.log("查询交易单出错！shardIndex = {}, shardTotal = {}, trading = {}", shardIndex, shardTotal, trading, e);
            }
        }

        if (CollUtil.isEmpty(tradeMsgList)) {
            return;
        }

        //发送消息通知其他系统
        String msg = JSONUtil.toJsonStr(tradeMsgList);
        this.mqFeign.sendMsg(Constants.MQ.Exchanges.TRADE, Constants.MQ.RoutingKeys.TRADE_UPDATE_STATUS, msg);
    }

    /**
     * 分片广播方式查询退款状态
     */
    @XxlJob("refundJob")
    public void refundJob() {
        // 分片参数
        int shardIndex = NumberUtil.max(XxlJobHelper.getShardIndex(), 0);
        int shardTotal = NumberUtil.max(XxlJobHelper.getShardTotal(), 1);

        List<RefundRecordEntity> list = this.refundRecordService.findListByRefundStatus(RefundStatusEnum.SENDING, refundCount);
        if (CollUtil.isEmpty(list)) {
            XxlJobHelper.log("查询到退款单列表为空！shardIndex = {}, shardTotal = {}", shardIndex, shardTotal);
            return;
        }

        //定义消息通知列表，只要是状态不为【退款中】就需要通知其他系统
        List<TradeStatusMsg> tradeMsgList = new ArrayList<>();

        for (RefundRecordEntity refundRecord : list) {
            if (refundRecord.getRefundNo() % shardTotal != shardIndex) {
                continue;
            }
            try {
                //查询退款单
                RefundRecordDTO refundRecordDTO = this.basicPayService.queryRefundTrading(refundRecord.getRefundNo());
                if (RefundStatusEnum.SENDING != refundRecordDTO.getRefundStatus()) {
                    TradeStatusMsg tradeStatusMsg = TradeStatusMsg.builder()
                            .tradingOrderNo(refundRecord.getTradingOrderNo())
                            .productOrderNo(refundRecord.getProductOrderNo())
                            .refundNo(refundRecord.getRefundNo())
                            .statusCode(refundRecord.getRefundStatus().getCode())
                            .statusName(refundRecord.getRefundStatus().name())
                            .build();
                    tradeMsgList.add(tradeStatusMsg);
                }
            } catch (Exception e) {
                XxlJobHelper.log("查询退款单出错！shardIndex = {}, shardTotal = {}, refundRecord = {}", shardIndex, shardTotal, refundRecord, e);
            }
        }

        if (CollUtil.isEmpty(tradeMsgList)) {
            return;
        }

        //发送消息通知其他系统
        String msg = JSONUtil.toJsonStr(tradeMsgList);
        this.mqFeign.sendMsg(Constants.MQ.Exchanges.TRADE, Constants.MQ.RoutingKeys.REFUND_UPDATE_STATUS, msg);
    }
}
