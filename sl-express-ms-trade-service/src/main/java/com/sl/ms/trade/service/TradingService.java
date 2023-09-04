package com.sl.ms.trade.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.ms.trade.enums.TradingStateEnum;

import java.util.List;

/**
 * @Description：交易订单表 服务类
 */
public interface TradingService extends IService<TradingEntity> {

    /***
     * 按交易单号查询交易单
     *
     * @param tradingOrderNo 交易单号
     * @return 交易单数据
     */
    TradingEntity findTradByTradingOrderNo(Long tradingOrderNo);

    /***
     * 按订单单号查询交易单
     * @param productOrderNo 交易单号
     * @return 交易单数据
     */
    TradingEntity findTradByProductOrderNo(Long productOrderNo);

    /***
     * 按交易状态查询交易单，按照时间正序排序
     * @param tradingState 状态
     * @param count 查询数量，默认查询10条
     * @return 交易单数据列表
     */
    List<TradingEntity> findListByTradingState(TradingStateEnum tradingState, Integer count);
}
