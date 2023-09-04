package com.sl.base.service.api;

import com.sl.ms.base.api.common.WorkPatternFeign;
import com.sl.ms.base.domain.base.WorkPatternDTO;
import com.sl.ms.base.domain.base.WorkPatternQueryDTO;
import com.sl.transport.common.util.PageResponse;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@SpringBootTest
@Slf4j
@WebAppConfiguration
public class WorkPatternFeignTest {
    @Autowired
    private WorkPatternFeign workPatternFeign;

    @Test
    public void test(){
//        WorkPatternDTO workPatternDTO = workPatternFeign.getById(2L);
        PageResponse<WorkPatternDTO> list = workPatternFeign.list(new WorkPatternQueryDTO());
        log.info("workPatternDTO : {}", list);
    }
}
