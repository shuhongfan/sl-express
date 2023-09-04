package com.sl.ms.trade.handler;

import com.sl.ms.trade.entity.TradingEntity;

/**
 * jsapi下单处理
 *
 * @author zzj
 * @version 1.0
 */
public interface JsapiPayHandler {

    /**
     * 创建交易
     *
     * @param tradingEntity 交易单
     */
    void createJsapiTrading(TradingEntity tradingEntity);
}
