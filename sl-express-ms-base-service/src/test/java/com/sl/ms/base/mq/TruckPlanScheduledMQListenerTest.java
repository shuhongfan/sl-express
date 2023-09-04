package com.sl.ms.base.mq;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TruckPlanScheduledMQListenerTest {

    @Resource
    private TruckPlanScheduledMQListener listener;

    @Test
    void listenTruckPlanScheduledMsg() {
        String s = "{\"created\":1661845200166,\"ids\":[1564513432979623938]}";
        listener.listenTruckPlanScheduledMsg(s);
    }
}