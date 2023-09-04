package com.sl.ms.base.service.truck.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.domain.enums.TruckPlanScheduleStatusEnum;
import com.sl.ms.base.domain.enums.TruckPlanStatusEnum;
import com.sl.ms.base.entity.truck.TransportTripsTruckDriverEntity;
import com.sl.ms.base.entity.truck.TruckPlanEntity;
import com.sl.ms.base.entity.user.TruckDriverEntity;
import com.sl.ms.base.mapper.truck.TransportTripsTruckDriverMapper;
import com.sl.ms.base.service.truck.TransportTripsTruckDriverService;
import com.sl.ms.base.service.truck.TruckPlanCreateService;
import com.sl.ms.base.service.user.TruckDriverService;
import com.sl.transport.common.exception.SLException;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 车次与车辆关联信息表 服务实现类
 */
@Service
public class TransportTripsTruckDriverServiceImpl extends ServiceImpl<TransportTripsTruckDriverMapper, TransportTripsTruckDriverEntity>
        implements TransportTripsTruckDriverService {

    @Autowired
    TruckDriverService truckDriverService;

    @Autowired
    TruckPlanCreateService truckPlanCreateService;

    /**
     * 批量保存车次与车辆关联信息
     * @param truckTransportTripsId 车次ID
     * @param truckTransportTripsTruckDriverEntityList 车次与车辆关联信息
     */
    @Transactional
    @Override
    public void batchSave(Long truckTransportTripsId, List<TransportTripsTruckDriverEntity> truckTransportTripsTruckDriverEntityList) {
        // 保存车辆和车次关联关系
        // 1,清除关系
        delete(truckTransportTripsId, null);
        List<TransportTripsTruckDriverEntity> saveList = new ArrayList<>();
        //遍历传入数据
        truckTransportTripsTruckDriverEntityList.forEach(transportTripsTruckDriver -> {
            List<TruckDriverEntity> driverEntities = truckDriverService.findByTruckId(transportTripsTruckDriver.getTruckId());
            if (CollUtil.isEmpty(driverEntities)) {
                throw new SLException(StrUtil.format("请先为该车辆绑定司机"));
            }
            driverEntities.forEach(truckDriverEntity -> {
                TransportTripsTruckDriverEntity saveData = BeanUtil.toBean(transportTripsTruckDriver, TransportTripsTruckDriverEntity.class);
                saveData.setDriverId(truckDriverEntity.getUserId());
                saveData.setTransportTripsId(truckTransportTripsId);
                saveList.add(saveData);
            });

            // 触发创建首次车辆计划
            List<Long> driverIds = driverEntities.stream().map(TruckDriverEntity::getUserId).collect(Collectors.toList());
            TruckPlanEntity build = TruckPlanEntity.builder()
                    .truckId(transportTripsTruckDriver.getTruckId())
                    .transportTripsId(truckTransportTripsId)
                    .driverIds(StrUtil.join(",", driverIds))
                    .status(TruckPlanStatusEnum.NORMAL.getCode())
                    .build();
            truckPlanCreateService.createPlan(build);
        });
        saveBatch(saveList);
    }

    /**
     * 获取车次与车辆关联列表
     *
     * @param transportTripsId 车次id
     * @param truckId          车辆Id
     * @param userId           司机id
     * @return 车次与车辆关联列表
     */
    @Override
    public List<TransportTripsTruckDriverEntity> findAll(Long transportTripsId, Long truckId, Long userId) {
        LambdaQueryWrapper<TransportTripsTruckDriverEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (ObjectUtils.isNotEmpty(transportTripsId)) {
            lambdaQueryWrapper.eq(TransportTripsTruckDriverEntity::getTransportTripsId, transportTripsId);
        }
        if (ObjectUtils.isNotEmpty(truckId)) {
            lambdaQueryWrapper.eq(TransportTripsTruckDriverEntity::getTruckId, truckId);
        }
        if (ObjectUtils.isNotEmpty(userId)) {
            lambdaQueryWrapper.eq(TransportTripsTruckDriverEntity::getDriverId, userId);
        }
        return baseMapper.selectList(lambdaQueryWrapper);
    }

    /**
     * 检查是否可以删除
     *
     * @param transportTripsId 车次id
     * @param truckId          车辆Id
     * @param userId           司机id
     * @return 是否可以删除
     */
    @Override
    public Boolean canRemove(Long transportTripsId, Long truckId, Long userId) {
        LambdaQueryWrapper<TransportTripsTruckDriverEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (ObjectUtils.isNotEmpty(transportTripsId)) {
            lambdaQueryWrapper.eq(TransportTripsTruckDriverEntity::getTransportTripsId, transportTripsId);
        }
        if (ObjectUtils.isNotEmpty(truckId)) {
            lambdaQueryWrapper.eq(TransportTripsTruckDriverEntity::getTruckId, truckId);
        }
        if (ObjectUtils.isNotEmpty(userId)) {
            lambdaQueryWrapper.eq(TransportTripsTruckDriverEntity::getDriverId, userId);
        }
        return baseMapper.selectCount(lambdaQueryWrapper) == 0;
    }

    /**
     * 消除绑定关系
     * @param transportTripsId 车次ID
     * @param truckId 车辆ID
     */
    @Transactional
    @Override
    public void delete(Long transportTripsId, Long truckId) {
        // 删除车辆和车次关联关系
        LambdaQueryWrapper<TransportTripsTruckDriverEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(ObjectUtils.isNotEmpty(transportTripsId), TransportTripsTruckDriverEntity::getTransportTripsId, transportTripsId)
        .eq(ObjectUtils.isNotEmpty(truckId), TransportTripsTruckDriverEntity::getTruckId, truckId);
        //清除关系
        baseMapper.delete(lambdaQueryWrapper);

        // 删除没有被调度的计划
        truckPlanCreateService.remove(Wrappers.<TruckPlanEntity>lambdaUpdate()
                .eq(ObjectUtils.isNotEmpty(transportTripsId), TruckPlanEntity::getTransportTripsId, transportTripsId)
                .eq(ObjectUtils.isNotEmpty(truckId), TruckPlanEntity::getTruckId, truckId)
                .eq(TruckPlanEntity::getScheduleStatus, TruckPlanScheduleStatusEnum.UNASSIGNED.getCode()));
    }
}
