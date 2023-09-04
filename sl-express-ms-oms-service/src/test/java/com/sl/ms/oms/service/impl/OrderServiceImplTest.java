package com.sl.ms.oms.service.impl;

import cn.hutool.core.map.MapUtil;
import cn.hutool.json.JSONUtil;
import com.itheima.em.sdk.EagleMapTemplate;
import com.itheima.em.sdk.enums.ProviderEnum;
import com.itheima.em.sdk.vo.Coordinate;
import com.sl.ms.oms.dto.MailingSaveDTO;
import com.sl.ms.oms.dto.OrderDTO;
import com.sl.ms.oms.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.Map;

@Slf4j
@SpringBootTest
class OrderServiceImplTest {

    @Resource
    private OrderService orderService;

    @Resource
    private EagleMapTemplate eagleMapTemplate;

    @Test
    void mailingSave() throws Exception {
        String json = "{\n" +
                "  \"goodsName\": \"食品\",\n" +
                "  \"goodsType\": \"1\",\n" +
                "  \"totalWeight\": \"1\",\n" +
                "   \"totalVolume\": \"1\",\n" +
                "  \"memberId\": 12323432453466712,\n" +
                "  \"payMethod\": 1,\n" +
                "  \"pickUpTime\": \"2022-07-25 13:59:25\",\n" +
                "  \"pickupType\": 2,\n" +
                "  \"receiptAddress\": 1,\n" +
                "  \"sendAddress\": 2\n" +
                "}";
        OrderDTO orderDTO = orderService.mailingSave(JSONUtil.toBean(json, MailingSaveDTO.class));
    }

    @Test
    void eagleMap() {
        double sendLnt = Double.parseDouble("121.95");
        double sendLat = Double.parseDouble("30.88");


        double receiveLnt = Double.parseDouble("121.71");
        double receiveLat = Double.parseDouble("31.03");
        Coordinate origin = new Coordinate(sendLnt, sendLat);
        Coordinate destination = new Coordinate(receiveLnt, receiveLat);
        //设置高德地图参数，默认是不返回预计耗时的，需要额外设置参数
        Map<String, Object> param = MapUtil.<String, Object>builder().put("show_fields", "cost").build();
        String driving = this.eagleMapTemplate.opsForDirection().driving(ProviderEnum.AMAP, origin, destination, param);
        log.info(driving);
    }
}