package com.sl.ms.trade.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.trade.entity.RefundRecordEntity;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.ms.trade.enums.RefundStatusEnum;
import com.sl.ms.trade.enums.TradingStateEnum;

import java.util.List;

/**
 * @Description： 退款记录表服务类
 */
public interface RefundRecordService extends IService<RefundRecordEntity> {

    /**
     * 根据退款单号查询退款记录
     *
     * @param refundNo 退款单号
     * @return 退款记录数据
     */
    RefundRecordEntity findByRefundNo(Long refundNo);

    /**
     * 根据交易单号查询退款列表
     *
     * @param tradingOrderNo 交易单号
     * @return 退款列表
     */
    List<RefundRecordEntity> findListByTradingOrderNo(Long tradingOrderNo);

    /**
     * 根据订单号查询退款列表
     *
     * @param productOrderNo 订单号
     * @return 退款列表
     */
    List<RefundRecordEntity> findListByProductOrderNo(Long productOrderNo);

    /***
     * 按状态查询退款单，按照时间正序排序
     *
     * @param refundStatus 状态
     * @param count 查询数量，默认查询10条
     * @return 退款单数据列表
     */
    List<RefundRecordEntity> findListByRefundStatus(RefundStatusEnum refundStatus, Integer count);
}
