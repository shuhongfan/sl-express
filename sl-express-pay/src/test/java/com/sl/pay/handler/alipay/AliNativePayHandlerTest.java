package com.sl.pay.handler.alipay;

import com.sl.pay.entity.TradingEntity;
import com.sl.pay.handler.NativePayHandler;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AliNativePayHandlerTest {

    @Resource(name = "aliNativePayHandler")
    NativePayHandler nativePayHandler;

    @Test
    void createDownLineTrading() {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setProductOrderNo(12345L); //订单号
        tradingEntity.setTradingOrderNo(11223388L); //交易单号
        tradingEntity.setMemo("运费");
        tradingEntity.setTradingAmount(BigDecimal.valueOf(1));
        this.nativePayHandler.createDownLineTrading(tradingEntity);

        System.out.println("二维码信息：" + tradingEntity.getPlaceOrderMsg());
        System.out.println(tradingEntity);
    }
}