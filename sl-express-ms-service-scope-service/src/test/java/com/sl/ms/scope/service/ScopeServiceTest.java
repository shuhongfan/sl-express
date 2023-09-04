package com.sl.ms.scope.service;

import com.sl.ms.scope.entity.ServiceScopeEntity;
import com.sl.ms.scope.enums.ServiceTypeEnum;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class ScopeServiceTest {

    @Resource
    private ScopeService scopeService;

    @Test
    void saveOrUpdate() {
        List<Point> pointList = Arrays.asList(new Point(116.340064,40.061245),
                new Point(116.347081,40.061836),
                new Point(116.34751,40.05842),
                new Point(116.342446,40.058092),
                new Point(116.340064,40.061245));
        Boolean result = this.scopeService.saveOrUpdate(2L, ServiceTypeEnum.ORGAN, new GeoJsonPolygon(pointList));
        System.out.println(result);
    }

    @Test
    void delete() {
    }

    @Test
    void testDelete() {
    }

    @Test
    void queryById() {
    }

    @Test
    void queryByBidAndType() {
    }

    @Test
    void queryListByPoint() {
    }

    @Test
    void testQueryListByPoint() {
        GeoJsonPoint point = new GeoJsonPoint(116.344828,40.05911);
        List<ServiceScopeEntity> serviceScopeEntities = this.scopeService.queryListByPoint(ServiceTypeEnum.ORGAN, point);
        serviceScopeEntities.forEach(serviceScopeEntity -> System.out.println(serviceScopeEntity));
    }

    @Test
    void testQueryListByPoint2() {
        String address = "北京市昌平区金燕龙办公楼";
        List<ServiceScopeEntity> serviceScopeEntities = this.scopeService.queryListByPoint(ServiceTypeEnum.ORGAN, address);
        serviceScopeEntities.forEach(serviceScopeEntity -> System.out.println(serviceScopeEntity));
    }
}