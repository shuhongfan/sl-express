package com.sl.ms.trade.service;

import com.sl.ms.trade.domain.TradingDTO;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.transport.common.exception.SLException;

/**
 * 二维码支付
 */
public interface NativePayService {


    /***
     * 查看二维码信息
     * 收银员通过收银台或商户后台调用此接口，生成二维码后，展示给用户，商户可以多次展示二维码
     *
     * @param tradingOrderNo 交易单号
     * @return 交易单
     */
    String queryQrCodeUrl(Long tradingOrderNo);

    /***
     * 扫码支付，收银员通过收银台或商户后台调用此接口，生成二维码后，展示给用户，由用户扫描二维码完成订单支付。
     *
     * @param tradingEntity 扫码支付提交参数
     * @return 交易数据
     */
    TradingEntity createDownLineTrading(TradingEntity tradingEntity);

}
