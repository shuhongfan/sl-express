package com.sl.ms.base.service.truck;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.entity.truck.TruckPlanEntity;

import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * 车次计划任务 服务类
 */
public interface TruckPlanCreateService extends IService<TruckPlanEntity> {
    /**
     * 创建首次计划 首次关系后台新增 安排司机和车辆给车次时候触发
     *
     * @param truckPlanEntity 车辆计划
     */
    void createPlan(TruckPlanEntity truckPlanEntity);

    /**
     * 异步创建下一次计划
     * 前一次计划完成触发
     *
     * @param truckId        车辆ID
     * @param driverIds      司机ID列表
     * @param currentOrganId 当前位置
     * @return 异步任务
     */
    CompletableFuture<String> createNextPlans(Long truckId, List<Long> driverIds, Long currentOrganId);
}
