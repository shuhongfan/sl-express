package com.sl.ms.base.service.truck.impl;

import com.sl.ms.base.domain.truck.TruckPlanDto;
import com.sl.ms.base.service.truck.TruckPlanService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
@Slf4j
class TruckPlanServiceImplTest {

    @Resource
    TruckPlanService truckplanservice;

    @Test
    void batchSave() {
    }

    @Test
    void findAll() {
    }

    @Test
    void findUnassigned() {
        List<TruckPlanDto> unassigned = truckplanservice.pullUnassignedPlan(5, 1);
        log.info("unassigned {}", unassigned);
    }
}