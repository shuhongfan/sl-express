package com.sl.ms.courier;

import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.json.JSONUtil;
import com.sl.ms.courier.service.CourierUserService;
import com.sl.ms.scope.api.ServiceScopeFeign;
import com.sl.ms.scope.dto.ServiceScopeDTO;
import com.sl.transport.common.vo.OrderMsg;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
@Slf4j
public class CourierTest {
    @Resource
    private CourierUserService courierUserService;
    @Resource
    private ServiceScopeFeign serviceScopeFeign;

    @Test
    void conditionSearch() {
        String msg = "{\"orderId\":1561894910655795201,\"taskType\":1,\"agencyId\":996725895563695297,\"estimatedEndTime\":1661223600000,\"longitude\":116.365914,\"latitude\":39.985547,\"created\":1661219739961}";
        log.info("接收到订单的消息 >>> msg = {}", msg);
        OrderMsg orderMsg = JSONUtil.toBean(msg, OrderMsg.class);
        Long agencyId = orderMsg.getAgencyId(); //网点id
        // 通过快递员微服务查询 可以为发件人服务的快递员（正常上班、服务范围内）
        Double longitude = orderMsg.getLongitude();
        Double latitude = orderMsg.getLatitude();

        List<Long> courierIds = courierUserService.queryCourierIdListByCondition(agencyId, longitude, latitude, LocalDateTimeUtil.toEpochMilli(orderMsg.getEstimatedEndTime()));
        System.out.println(courierIds);
    }

    @Test
    void serviceScopeTest() {
        List<ServiceScopeDTO> serviceScopeDTOS = serviceScopeFeign.queryListByLocation(2, 116.365914, 39.985547);
        System.out.println(serviceScopeDTOS);
    }
}
