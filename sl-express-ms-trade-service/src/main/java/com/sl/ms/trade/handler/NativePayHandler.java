package com.sl.ms.trade.handler;

import com.sl.ms.trade.entity.TradingEntity;
import com.sl.transport.common.exception.SLException;

/**
 * @ClassName NativePayHandler.java
 * @Description Native支付方式Handler：商户生成二维码，用户扫描支付
 */
public interface NativePayHandler {


    /***
     * @description 统一收单线下交易预创建
     * 收银员通过收银台或商户后台调用此接口，生成二维码后，展示给用户，由用户扫描二维码完成订单支付。
     * @param tradingEntity 交易单
     */
    void createDownLineTrading(TradingEntity tradingEntity) throws SLException;

}
