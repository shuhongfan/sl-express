package com.sl.ms.web.driver.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.sl.ms.driver.api.DriverJobFeign;
import com.sl.ms.driver.domain.dto.request.DriverJobPageQueryDTO;
import com.sl.ms.driver.domain.dto.response.DriverJobDTO;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import com.sl.ms.track.api.TrackFeign;
import com.sl.ms.web.driver.service.TrackService;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.util.UserThreadLocal;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TrackServiceImpl implements TrackService {
    @Resource
    private DriverJobFeign driverJobFeign;
    @Resource
    private TrackFeign trackFeign;

    /**
     * 车辆上报位置
     *
     * @param lng 经度
     * @param lat 纬度
     * @return 是否成功
     */
    @Override
    public Boolean uploadLocation(String lng, String lat) {
        //1. 获取当前用户id
        Long userId = UserThreadLocal.getUserId();

        //2. 查询司机id关联的在途状态司机作业单
        DriverJobPageQueryDTO pageQueryDTO = DriverJobPageQueryDTO.builder()
                .page(1)
                .pageSize(1)
                .driverId(userId)
                .statusList(List.of(DriverJobStatus.PROCESSING))
                .build();
        PageResponse<DriverJobDTO> pageResponse = driverJobFeign.pageQuery(pageQueryDTO);
        if (CollUtil.isEmpty(pageResponse.getItems())) {
            return true;
        }

        //3. 对关联的运输任务上报位置
        return trackFeign.uploadFromTruck(pageResponse.getItems().get(0).getTransportTaskId(), Double.parseDouble(lng), Double.parseDouble(lat));
    }
}
