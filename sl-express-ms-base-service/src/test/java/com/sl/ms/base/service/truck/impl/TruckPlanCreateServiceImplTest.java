package com.sl.ms.base.service.truck.impl;

import cn.hutool.core.date.LocalDateTimeUtil;
import com.sl.ms.base.entity.truck.TruckPlanEntity;
import com.sl.ms.base.mapper.truck.TruckPlanMapper;
import com.sl.transport.common.util.DateUtils;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@Slf4j
@SpringBootTest
class TruckPlanCreateServiceImplTest {

    @Resource
    TruckPlanCreateServiceImpl truckPlanCreateService;

    @Resource
    TruckPlanMapper truckPlanMapper;


    @Test
    void getWorkingDrivers() {
        TruckPlanEntity truckPlanEntity = truckPlanMapper.selectById(1547495504196341762L);
//        String workingDrivers = truckPlanCreateService.getWorkingDrivers(truckPlanEntity.getDriverIds(), truckPlanEntity.getPlanDepartureTime(), truckPlanEntity.getPlanArrivalTime());
//        log.info(workingDrivers);

        String queryMonth = LocalDateTimeUtil.format(LocalDateTimeUtil.now(), DateUtils.DEFAULT_MONTH_FORMAT);
        int dayNumOfQueryMonth = DateUtils.getMonthEndTime(queryMonth).getDayOfMonth();
        log.info(dayNumOfQueryMonth +"");

        String queryDay = String.format("%s-%s", "2022-07", dayNumOfQueryMonth >= 10 ? "" + dayNumOfQueryMonth : "0" + dayNumOfQueryMonth);
        int dayOfWeek = LocalDateTimeUtil.parse(queryDay,DateUtils.DEFAULT_DATE_FORMAT).getDayOfWeek().getValue();
        log.info(dayOfWeek + "");

        String nowDay = LocalDateTimeUtil.format(LocalDateTime.now(), DateUtils.DEFAULT_DATE_FORMAT);

        if(nowDay.compareTo(queryDay) > 0) {
            log.info("xxx");
        }
    }
}