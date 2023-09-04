package com.sl.pay.handler.alipay;

import com.sl.pay.entity.RefundRecordEntity;
import com.sl.pay.entity.TradingEntity;
import com.sl.pay.handler.BasicPayHandler;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.math.BigDecimal;

@SpringBootTest
class AliBasicPayHandlerTest {

    @Resource(name = "aliBasicPayHandler")
    BasicPayHandler basicPayHandler;

    @Test
    void queryTrading() {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setTradingOrderNo(11223388L); //交易单号
        Boolean result = this.basicPayHandler.queryTrading(tradingEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(tradingEntity);
    }

    @Test
    void closeTrading() {
        TradingEntity tradingEntity = new TradingEntity();
        tradingEntity.setTradingOrderNo(11223377L); //交易单号
        Boolean result = this.basicPayHandler.closeTrading(tradingEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(tradingEntity);
    }

    @Test
    void refundTrading() {
        RefundRecordEntity refundRecordEntity = new RefundRecordEntity();
        refundRecordEntity.setTradingOrderNo(11223388L); //交易单号
        refundRecordEntity.setRefundNo(11223380L); //退款单号
        refundRecordEntity.setRefundAmount(BigDecimal.valueOf(0.1)); //退款金额
        Boolean result = this.basicPayHandler.refundTrading(refundRecordEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(refundRecordEntity);
    }

    @Test
    void queryRefundTrading() {
        RefundRecordEntity refundRecordEntity = new RefundRecordEntity();
        refundRecordEntity.setTradingOrderNo(11223388L); //交易单号
        refundRecordEntity.setRefundNo(11223388L); //退款单号
        Boolean result = this.basicPayHandler.queryRefundTrading(refundRecordEntity);
        System.out.println("执行是否成功：" + result);
        System.out.println(refundRecordEntity);
    }
}