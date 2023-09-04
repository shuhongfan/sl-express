package com.sl.ms.base.service.truck.impl;

import com.sl.ms.base.domain.truck.OrganIdsDto;
import com.sl.ms.base.service.truck.TruckTripsService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;
import java.util.Map;

@SpringBootTest
@Slf4j
class TruckTripsServiceImplTest {

    @Autowired
    private TruckTripsService truckTripsService;

    @Test
    void getOrganIdsByTripsLineId() {
        HashSet<Long> objects = new HashSet<>();
        objects.add(32L);
        Map<Long, OrganIdsDto> organIdsByTripsLineId = truckTripsService.getOrganIdsByTripsLineId(objects);
        log.info("organIdsByTripsLineId {}", organIdsByTripsLineId);
    }
}