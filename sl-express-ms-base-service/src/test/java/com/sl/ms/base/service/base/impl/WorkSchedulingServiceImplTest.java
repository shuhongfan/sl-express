package com.sl.ms.base.service.base.impl;

import cn.hutool.core.date.LocalDateTimeUtil;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.sl.transport.common.util.DateUtils;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@Slf4j
@SpringBootTest
class WorkSchedulingServiceImplTest {

    @Resource
    private WorkSchedulingServiceImpl workSchedulingService;

    @Test
    void batchAdd() {
//        String json = "{\"userType\":3,\"agencyId\":996725807940490305,\"name\":\"敏敏特木尔\",\"employeeNumber\":\"1002246566071920929\",\"phone\":\"13587654321\",\"workPatternId\":1547111899083116545,\"workPatternType\":2}{\"userType\":3,\"agencyId\":996725807940490305,\"name\":\"敏敏特木尔\",\"employeeNumber\":\"1002246566071920929\",\"phone\":\"13587654321\",\"workPatternId\":1547111899083116545,\"workPatternType\":2}";
//        WorkSchedulingAddDTO workSchedulingEntity = JSONUtil.toBean(json, WorkSchedulingAddDTO.class);
//        workSchedulingService.batchAdd(Lists.newArrayList(workSchedulingEntity));
    }

    @Test
    void TestHistory() {
        String queryMonth = LocalDateTimeUtil.format(LocalDateTimeUtil.now(), DateUtils.DEFAULT_MONTH_FORMAT);
        log.info(queryMonth);
        int dayNumOfQueryMonth = DateUtils.getMonthEndTime(queryMonth).getDayOfMonth();
        log.info(dayNumOfQueryMonth + "");
    }
}