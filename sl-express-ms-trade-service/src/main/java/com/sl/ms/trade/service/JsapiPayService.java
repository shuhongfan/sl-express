package com.sl.ms.trade.service;

import com.sl.ms.trade.domain.TradingDTO;
import com.sl.ms.trade.entity.TradingEntity;

/**
 * jsapi支付、微信小程序支付
 *
 * @author zzj
 * @version 1.0
 */
public interface JsapiPayService {

    /***
     * 统一jsapi交易预创建
     * 商户系统先调用该接口在微信支付服务后台生成预支付交易单，返回正确的预支付交易会话标识后再按Native、
     * JSAPI、APP等不同场景生成交易串调起支付。
     * @param tradingEntity 交易单
     *
     * @return 交易单，支付串码
     */
    TradingEntity createJsapiTrading(TradingEntity tradingEntity);

}
