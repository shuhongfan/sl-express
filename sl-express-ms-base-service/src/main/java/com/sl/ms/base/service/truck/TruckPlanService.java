package com.sl.ms.base.service.truck;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.domain.enums.StatusEnum;
import com.sl.ms.base.domain.truck.TruckPlanDto;
import com.sl.ms.base.entity.truck.TruckPlanEntity;

import java.util.List;
import java.util.Set;

/**
 * 车次计划任务 服务类
 */
public interface TruckPlanService extends IService<TruckPlanEntity> {

    /**
     * 获取未分配运输任务的车次计划列表
     * @return 未分配运输任务的车次计划列表
     * @param shardTotal 总片数
     * @param shardIndex 分片
     */
    List<TruckPlanDto> pullUnassignedPlan(Integer shardTotal, Integer shardIndex);

    /**
     * 更新计划状态为已调度 消费MQ更新调度状态
     * @param planId          计划ID
     */
    void scheduledPlan(Set<Long> planId);

    /**
     * 计划完成
     * @param currentOrganId 结束机构id
     * @param planId          计划ID
     * @param truckId 车辆ID
     * @param statusEnum 车辆状态枚举
     */
    void finishedPlan(Long currentOrganId, Long planId, Long truckId, StatusEnum statusEnum);
}
