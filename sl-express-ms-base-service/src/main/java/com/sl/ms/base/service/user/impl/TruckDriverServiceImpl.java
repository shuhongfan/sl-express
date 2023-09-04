package com.sl.ms.base.service.user.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.domain.user.TruckDriverDto;
import com.sl.ms.base.entity.truck.TransportTripsTruckDriverEntity;
import com.sl.ms.base.entity.truck.TruckTripsEntity;
import com.sl.ms.base.entity.user.TruckDriverEntity;
import com.sl.ms.base.mapper.user.TruckDriverMapper;
import com.sl.ms.base.service.truck.TransportTripsTruckDriverService;
import com.sl.ms.base.service.truck.TruckTripsService;
import com.sl.ms.base.service.user.TruckDriverService;
import com.sl.ms.transport.api.TransportLineFeign;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.domain.TransportLineDTO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 司机相关业务
 */
@Service
public class TruckDriverServiceImpl extends ServiceImpl<TruckDriverMapper, TruckDriverEntity>
        implements TruckDriverService {

    @Resource
    private TransportTripsTruckDriverService transportTripsTruckDriverService;

    @Resource
    private TransportLineFeign transportLineFeign;

    @Resource
    private TruckTripsService truckTripsService;

    /**
     * 获取司机基本信息列表
     *
     * @param userIds 司机id列表
     * @return 司机基本信息列表
     */
    @Override
    public List<TruckDriverEntity> findAll(List<Long> userIds) {
        if (ObjectUtil.isAllEmpty(userIds)) {
            return Collections.emptyList();
        }
        LambdaQueryWrapper<TruckDriverEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (CollUtil.isNotEmpty(userIds)) {
            lambdaQueryWrapper.in(TruckDriverEntity::getUserId, userIds);
        }
        lambdaQueryWrapper.orderByDesc(TruckDriverEntity::getCreated);
        return super.list(lambdaQueryWrapper);
    }

    /**
     * 获取司机基本信息
     *
     * @param userId 司机id
     * @return 司机基本信息
     */
    @Override
    public TruckDriverEntity findOne(Long userId) {
        LambdaQueryWrapper<TruckDriverEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(TruckDriverEntity::getUserId, userId);
        return super.getOne(lambdaQueryWrapper);
    }

    /**
     * 绑定司机列表
     *

     * @return 司机数量
     */
    @Override
    public List<TruckDriverEntity> findByTruckId(Long truckId) {
        LambdaQueryWrapper<TruckDriverEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(TruckDriverEntity::getTruckId,truckId);
        return list(lambdaQueryWrapper);
    }

    /**
     * 解除车辆和司机的绑定关系
     * @param truckId 车辆ID
     */
    @Override
    public void disableTruckId(Long truckId) {
        LambdaUpdateWrapper<TruckDriverEntity> lambdaQueryWrapper = new LambdaUpdateWrapper<>();
        lambdaQueryWrapper.eq(TruckDriverEntity::getTruckId,truckId)
                .set(TruckDriverEntity::getTruckId, null);
        update(lambdaQueryWrapper);

    }

    /**
     * 保存
     * @param dto 司机
     * @return 保存结果
     */
    @Override
    public TruckDriverDto saveDriver(TruckDriverDto dto) {

        TruckDriverEntity driver = BeanUtil.toBean(dto, TruckDriverEntity.class);
        TruckDriverEntity one = findOne(dto.getUserId());
        if (ObjectUtil.isNotEmpty(one)) {
            // 检查是否能够解除原有绑定车辆
            checkCanBingingTruck(one);
            driver.setId(one.getId());
            updateById(driver);
        } else {
            save(driver);
        }
        BeanUtil.copyProperties(driver, dto);
        return dto;
    }

    /**
     * check 是否有车次绑定关系
     * @param oldDriver 旧数据
     */
    private void checkCanBingingTruck(TruckDriverEntity oldDriver) {
        // 如果原有绑定车辆不为空 则需要判断是否能够解除原有车辆绑定关系
        if (ObjectUtil.isNotEmpty(oldDriver.getTruckId())) {
            // 检查车次绑定关系
            List<TransportTripsTruckDriverEntity> all = transportTripsTruckDriverService.findAll(null, oldDriver.getTruckId(), oldDriver.getUserId());
            if (all.size() > 0) {
                // 不能解除
                List<Long> tripsIds = all.parallelStream().map(TransportTripsTruckDriverEntity::getTransportTripsId).distinct().collect(Collectors.toList());
                List<TruckTripsEntity> truckTripsEntities = truckTripsService.findAll(null, tripsIds);
                List<String> tripsNames = truckTripsEntities.parallelStream().map(TruckTripsEntity::getName).distinct().collect(Collectors.toList());
                List<Long> lineIds = truckTripsEntities.parallelStream().map(TruckTripsEntity::getTransportLineId).distinct().collect(Collectors.toList());
                List<TransportLineDTO> lineDTOS = transportLineFeign.queryByIds(lineIds.toArray(Long[]::new));
                List<String> names = lineDTOS.parallelStream().map(TransportLineDTO::getName).collect(Collectors.toList());
                throw new SLException(StrUtil.format("请先解除原有车辆对应的车次绑定关系 详细: 线路名称 {} 车次名称{}", names, tripsNames));
            }
        }
    }

    /**
     * 获取司机分页数据
     *
     * @param page     页码
     * @param pageSize 页尺寸
     * @return 司机分页数据
     */
    @Override
    public IPage<TruckDriverEntity> findByPage(Integer page, Integer pageSize) {
        Page<TruckDriverEntity> iPage = new Page<>(page, pageSize);
        LambdaQueryWrapper<TruckDriverEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.orderByDesc(TruckDriverEntity::getCreated);
        return super.page(iPage, lambdaQueryWrapper);
    }
}
