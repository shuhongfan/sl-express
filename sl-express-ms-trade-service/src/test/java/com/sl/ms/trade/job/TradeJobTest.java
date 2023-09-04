package com.sl.ms.trade.job;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author zzj
 * @version 1.0
 */
@SpringBootTest
public class TradeJobTest {

    @Resource
    private TradeJob tradeJob;

    @Test
    public void tradingJob() {
        this.tradeJob.tradingJob();
    }

    @Test
    public void refundJob() {
        this.tradeJob.refundJob();
    }
}