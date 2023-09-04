package com.sl.pay.handler.wechat;

import com.sl.pay.entity.TradingEntity;
import com.sl.pay.handler.NativePayHandler;
import com.sl.transport.common.exception.SLException;
import org.springframework.stereotype.Component;

/**
 * 微信二维码支付
 */
@Component("wechatNativePayHandler")
public class WechatNativePayHandler implements NativePayHandler {

    @Override
    public void createDownLineTrading(TradingEntity tradingEntity) throws SLException {

    }

}
