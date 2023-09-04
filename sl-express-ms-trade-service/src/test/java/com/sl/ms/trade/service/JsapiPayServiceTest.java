package com.sl.ms.trade.service;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.json.JSONUtil;
import com.alipay.easysdk.kernel.util.JsonUtil;
import com.sl.ms.trade.domain.request.JsapiPayDTO;
import com.sl.ms.trade.entity.TradingEntity;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;


@SpringBootTest
class JsapiPayServiceTest {

    @Resource
    private JsapiPayService jsapiPayService;

    @Test
    public void TestCreateJsapiTrading() {
        // JsapiPayDTO(openId=otdlR4yqCSxTWQkKfUCa-9n5FCGg, enterpriseId=1561414331, productOrderNo=1551888004743520257, tradingChannel=WECHAT_PAY, tradingAmount=0.1, memo=null)
        String json = "{\"openId\":\"otdlR4yqCSxTWQkKfUCa-9n5FCGg\",\"enterpriseId\":1561414331,\"productOrderNo\":1551888004743520257,\"tradingChannel\":\"WECHAT_PAY\",\"tradingAmount\":0.1}";
        JsapiPayDTO jsapiPayDTO = JSONUtil.toBean(json, JsapiPayDTO.class);
        TradingEntity tradingEntity = BeanUtil.toBean(jsapiPayDTO, TradingEntity.class);
        tradingEntity.setMemo("xxxx");
        tradingEntity.setProductOrderNo(1551881034745602050L);
        jsapiPayService.createJsapiTrading(tradingEntity);
    }
}