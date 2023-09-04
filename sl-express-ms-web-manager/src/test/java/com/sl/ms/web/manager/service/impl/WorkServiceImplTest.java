package com.sl.ms.web.manager.service.impl;

import cn.hutool.json.JSONUtil;
import com.sl.ms.web.manager.service.WorkService;
import com.sl.ms.web.manager.vo.work.TrackVO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Slf4j
@SpringBootTest
class WorkServiceImplTest {

    @Autowired
    WorkService workService;

    @Test
    void findTrackById() {
        TrackVO sl1000000001152 = workService.findTrackById("SL1000000001152");
        log.info(JSONUtil.toJsonPrettyStr(sl1000000001152));
    }
}