package com.sl.ms.work.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.ms.work.domain.dto.response.TransportTaskMonthlyDistanceDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskStatusCountDTO;
import com.sl.ms.work.entity.TransportTaskEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 运输任务表 Mapper 接口
 */
@Mapper
public interface TransportTaskMapper extends BaseMapper<TransportTaskEntity> {

    List<TransportTaskStatusCountDTO> findStatusCount();

    /**
     * 任务里程统计
     *
     * @param transportTaskIds 运输任务id列表
     * @param startTime        开始时间
     * @param endTime          结束时间
     * @return 每日里程数据
     */
    List<TransportTaskMonthlyDistanceDTO> monthlyDistanceStatistics(@Param("transportTaskIds") List<String> transportTaskIds,
                                                                    @Param("startTime") LocalDateTime startTime,
                                                                    @Param("endTime") LocalDateTime endTime);
}
