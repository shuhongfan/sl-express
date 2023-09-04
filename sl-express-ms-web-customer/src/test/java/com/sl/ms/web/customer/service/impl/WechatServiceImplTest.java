package com.sl.ms.web.customer.service.impl;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class WechatServiceImplTest {

    @Resource
    WechatServiceImpl wechatService;

    @Test
    void getOpenid() {
        wechatService.getOpenid("091LmxGa1w2kAD0KCAFa1VzCvm2LmxGB");
    }

    @Test
    void getToken() {
        wechatService.getToken();
    }

    @Test
    void getPhone() {
        wechatService.getPhone("98b024c7236c108003a5ebc2c7ea59be30636059395899389f82960d07e85fcc");
    }
}