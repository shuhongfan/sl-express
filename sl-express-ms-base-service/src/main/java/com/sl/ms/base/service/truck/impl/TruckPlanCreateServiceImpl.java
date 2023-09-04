package com.sl.ms.base.service.truck.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.extension.toolkit.SimpleQuery;
import com.sl.ms.base.domain.enums.TruckPlanScheduleStatusEnum;
import com.sl.ms.base.domain.enums.TruckPlanStatusEnum;
import com.sl.ms.base.domain.enums.TruckTripsPeriodEnum;
import com.sl.ms.base.entity.truck.TransportTripsTruckDriverEntity;
import com.sl.ms.base.entity.truck.TruckPlanEntity;
import com.sl.ms.base.entity.truck.TruckTripsEntity;
import com.sl.ms.base.entity.user.TruckDriverEntity;
import com.sl.ms.base.mapper.truck.TruckPlanMapper;
import com.sl.ms.base.service.base.WorkSchedulingService;
import com.sl.ms.base.service.truck.TruckPlanCreateService;
import com.sl.ms.base.service.truck.TruckTripsService;
import com.sl.ms.base.service.user.TruckDriverService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.DateUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TruckPlanCreateServiceImpl extends ServiceImpl<TruckPlanMapper, TruckPlanEntity>
        implements TruckPlanCreateService {

    @Resource
    private TruckTripsService truckTripsService;

    @Resource
    private WorkSchedulingService workSchedulingService;

    @Resource
    private TruckDriverService truckDriverService;

    /**
     * 创建首次计划 首次关系后台新增 安排司机和车辆给车次时候触发
     *
     * @param truckPlanEntity 车辆计划
     */
    @Override
    public void createPlan(TruckPlanEntity truckPlanEntity) {
        truckPlanEntity.setScheduleStatus(TruckPlanScheduleStatusEnum.UNASSIGNED.getCode());

        // 根据车次周期计算间隔天数
        TruckTripsEntity truckTripsEntity = truckTripsService.getById(truckPlanEntity.getTransportTripsId());
        // 计划发车时间 车次的发车时间 今日的分钟数
        LocalDateTime planDepartureTime = DateUtils.getStartTime(LocalDateTime.now()).plusMinutes(truckTripsEntity.getDepartureTime());
        truckPlanEntity.setPlanDepartureTime(planDepartureTime);
        // 计划到达时间
        LocalDateTime planArrivalTime = truckPlanEntity.getPlanDepartureTime().plusMinutes(truckTripsEntity.getEstimatedTime());
        truckPlanEntity.setPlanArrivalTime(planArrivalTime);

        // 排班
        List<TruckDriverEntity> truckDriverEntities = truckDriverService.findByTruckId(truckPlanEntity.getTruckId());
        List<Long> driverIds = truckDriverEntities.stream().map(TruckDriverEntity::getUserId).collect(Collectors.toList());
        List<Long> workingDrivers = workSchedulingService.getWorkingDrivers(driverIds, planDepartureTime, planArrivalTime);
        if (workingDrivers.size() < 2) {
            throw new SLException("车辆至少配置俩名上班的司机才能执行运输任务");
        }
        // 设置司机
        truckPlanEntity.setDriverIds(StrUtil.join(",", workingDrivers));
        // 插入一条新数据
        super.save(truckPlanEntity);
    }

    /**
     * 异步创建下一次计划
     * 前一次计划完成触发
     *
     * @param truckId        车辆ID
     * @param driverIds      司机ID列表
     * @param currentOrganId 当前位置
     * @return 异步任务
     */
    @Override
    @Async
    public CompletableFuture<String> createNextPlans(Long truckId, List<Long> driverIds, Long currentOrganId) {
        // 根据车辆ID获取车次IDs  如果解除了绑定 计划也会被弃用
        List<Long> transportTripsIds = SimpleQuery.list(
                Wrappers.<TransportTripsTruckDriverEntity>lambdaQuery().eq(TransportTripsTruckDriverEntity::getTruckId, truckId),
                TransportTripsTruckDriverEntity::getTransportTripsId);
        if (CollectionUtils.isEmpty(transportTripsIds)) {
            log.error("选举车次 车次不存在 truckId {} currentOrganId {}", truckId, currentOrganId);
            return CompletableFuture.completedFuture("ok");
        }
        // 创建所有车次的计划
        transportTripsIds.stream().distinct().forEach(v -> createNextPlan(truckId, driverIds, v));
        // 异步任务返回
        return CompletableFuture.completedFuture("ok");
    }

    /**
     * 创建某个节点后续每条线路的计划
     *
     * @param truckId          车辆ID
     * @param driverIds        司机ID列表
     * @param transportTripsId 车次ID
     */
    private void createNextPlan(Long truckId, List<Long> driverIds, Long transportTripsId) {
        // 查询最新一条车次计划
        TruckPlanEntity last = getOne(Wrappers.<TruckPlanEntity>lambdaQuery()
                .eq(TruckPlanEntity::getTruckId, truckId)
                .eq(TruckPlanEntity::getTransportTripsId, transportTripsId)
                .orderByDesc(TruckPlanEntity::getPlanDepartureTime)
                // 1条
                .last("limit 1")
        );

        TruckPlanEntity truckPlanEntityNew = TruckPlanEntity.builder()
                // 车辆id
                .truckId(truckId)
                // 设置计划状态
                .status(TruckPlanStatusEnum.NORMAL.getCode())
                // 调度状态
                .scheduleStatus(TruckPlanScheduleStatusEnum.UNASSIGNED.getCode())
                // 车次id
                .transportTripsId(transportTripsId).build();

        // 根据车次周期计算间隔天数
        TruckTripsEntity truckTripsEntity = truckTripsService.getById(transportTripsId);

        // 最后的发车时间
        LocalDateTime prePlanDepartureTime = last.getPlanDepartureTime();

        // 计划发车时间
        LocalDateTime planDepartureTime;
        if (truckTripsEntity.getPeriod().equals(TruckTripsPeriodEnum.MONTH.getCode())) {
            // 周期为月的情况 循环直到是未来的时间
            planDepartureTime = prePlanDepartureTime.plusMonths(1);
            while (planDepartureTime.isBefore(LocalDateTime.now())) {
                planDepartureTime = prePlanDepartureTime.plusMonths(1);
            }
        } else {
            int day = truckTripsEntity.getPeriod().equals(TruckTripsPeriodEnum.WEEK.getCode()) ? 7 : 1;
            // 周期为周 / 日 的情况 循环直到是未来的时间
            planDepartureTime = prePlanDepartureTime.plusDays(day);
            while (planDepartureTime.isBefore(LocalDateTime.now())) {
                planDepartureTime = prePlanDepartureTime.plusDays(day);
            }
        }
        // 按照最新的车次时间设置计划发车时间
        LocalDateTime planDepartureTimeNew = DateUtils.getStartTime(planDepartureTime).plusMinutes(truckTripsEntity.getDepartureTime());
        truckPlanEntityNew.setPlanDepartureTime(planDepartureTimeNew);

        // 计划到达时间
        LocalDateTime planArrivalTime = planDepartureTime.plusMinutes(truckTripsEntity.getEstimatedTime());
        truckPlanEntityNew.setPlanArrivalTime(planArrivalTime);

        // 整合排班
        List<Long> workingDrivers = workSchedulingService.getWorkingDrivers(driverIds, planDepartureTime, planArrivalTime);
        // 设置司机
        truckPlanEntityNew.setDriverIds(StrUtil.join(",", workingDrivers));

        // 去重复
        long count = count(Wrappers.<TruckPlanEntity>lambdaQuery()
                        .eq(TruckPlanEntity::getTruckId, truckId)
//                .eq(TruckPlanEntity::getDriverId, driverId)
                        .eq(TruckPlanEntity::getTransportTripsId, transportTripsId)
                        .between(TruckPlanEntity::getPlanDepartureTime, truckPlanEntityNew.getPlanDepartureTime().minusMinutes(1), truckPlanEntityNew.getPlanDepartureTime().plusMinutes(1))
        );
        if (count == 0) {
            // 插入一条新数据
            super.save(truckPlanEntityNew);
        }
    }
}
