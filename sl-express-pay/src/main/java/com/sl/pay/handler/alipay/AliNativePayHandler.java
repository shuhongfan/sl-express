package com.sl.pay.handler.alipay;

import com.sl.pay.entity.TradingEntity;
import com.sl.pay.handler.NativePayHandler;
import com.sl.transport.common.exception.SLException;
import org.springframework.stereotype.Component;

/**
 * 支付宝实现类
 */
@Component("aliNativePayHandler")
public class AliNativePayHandler implements NativePayHandler {

    @Override
    public void createDownLineTrading(TradingEntity tradingEntity) throws SLException {

    }


}
