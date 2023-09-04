package com.sl.ms.base.service.truck.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.extension.toolkit.SimpleQuery;
import com.sl.ms.base.domain.enums.StatusEnum;
import com.sl.ms.base.domain.enums.TruckRunStatusEnum;
import com.sl.ms.base.domain.enums.TruckWorkStatusEnum;
import com.sl.ms.base.domain.enums.WorkUserTypeEnum;
import com.sl.ms.base.entity.base.WorkSchedulingEntity;
import com.sl.ms.base.entity.truck.TransportTripsTruckDriverEntity;
import com.sl.ms.base.entity.truck.TruckEntity;
import com.sl.ms.base.entity.truck.TruckLicenseEntity;
import com.sl.ms.base.entity.user.TruckDriverEntity;
import com.sl.ms.base.mapper.truck.TruckMapper;
import com.sl.ms.base.service.base.WorkSchedulingService;
import com.sl.ms.base.service.truck.TransportTripsTruckDriverService;
import com.sl.ms.base.service.truck.TruckLicenseService;
import com.sl.ms.base.service.truck.TruckService;
import com.sl.ms.base.service.user.TruckDriverService;
import com.sl.transport.common.exception.SLException;
import com.sl.ms.base.domain.constants.TruckConstant;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 车辆信息表 服务类
 */
@Service
public class TruckServiceImpl extends ServiceImpl<TruckMapper, TruckEntity> implements TruckService {

    @Resource
    private TruckDriverService truckDriverService;

    @Resource
    private WorkSchedulingService workSchedulingService;

    @Resource
    private TruckLicenseService truckLicenseService;

    @Resource
    private TransportTripsTruckDriverService transportTripsTruckDriverService;

    /**
     * 获取车辆分页数据
     *
     * @param page         页码
     * @param pageSize     页尺寸
     * @param truckTypeId  车辆类型id
     * @param status       状态
     * @param licensePlate 车辆号牌
     * @return 线路类型分页数据
     */
    @Override
    public IPage<TruckEntity> findByPage(Integer page, Integer pageSize, Long truckTypeId, Integer status, String licensePlate) {
        Page<TruckEntity> iPage = new Page<>(page, pageSize);
        LambdaQueryWrapper<TruckEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (StrUtil.isNotEmpty(licensePlate)) {
            lambdaQueryWrapper.like(TruckEntity::getLicensePlate, licensePlate);
        }
        if (ObjectUtil.isNotEmpty(truckTypeId)) {
            lambdaQueryWrapper.eq(TruckEntity::getTruckTypeId, truckTypeId);

        }
        if (ObjectUtil.isNotEmpty(status)) {
            lambdaQueryWrapper.eq(TruckEntity::getWorkStatus, status);
        }

        lambdaQueryWrapper.orderByDesc(TruckEntity::getCreated);
        return super.page(iPage, lambdaQueryWrapper);
    }

    /**
     * 获取车辆列表
     *
     * @param ids 车辆id列表
     * @return 车辆列表
     */
    @Override
    public List<TruckEntity> findAll(List<Long> ids) {
        LambdaQueryWrapper<TruckEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (CollUtil.isNotEmpty(ids)) {
            lambdaQueryWrapper.in(TruckEntity::getId, ids);
        }
        lambdaQueryWrapper.eq(TruckEntity::getStatus, StatusEnum.NORMAL.getCode());
        lambdaQueryWrapper.orderByDesc(TruckEntity::getCreated);
        return super.list(lambdaQueryWrapper);
    }

    /**
     * 禁用车辆
     *
     * @param id 车辆ID
     */
    @Override
    public void stopById(Long id) {
        // 车次绑定 运输任务检查
        List<TransportTripsTruckDriverEntity> all = transportTripsTruckDriverService.findAll(null, id, null);
        if (all.size() > 0) {
            throw new SLException("请先解除车次绑定关系");
        }
        TruckEntity truckEntity = new TruckEntity();
        truckEntity.setId(id);
        truckEntity.setWorkStatus(TruckWorkStatusEnum.STOP.getCode());
        // 解除司机绑定
        truckDriverService.disableTruckId(id);
        super.updateById(truckEntity);
    }

    /**
     * 更新车辆状态
     *
     * @param id     车辆ID
     * @param status 车辆状态
     */
    @Override
    public void updateRunStatus(Long id, TruckRunStatusEnum status) {
        TruckEntity truckEntity = new TruckEntity();
        truckEntity.setId(id);
        truckEntity.setRunStatus(status.getCode());
        super.updateById(truckEntity);
    }


    /**
     * 更新当前位置
     *
     * @param truckId        车辆ID
     * @param currentOrganId 当前机构ID
     */
    @Override
    public Boolean updateCurrentOrganId(Long truckId, Long currentOrganId, StatusEnum statusEnum) {
        UpdateWrapper<TruckEntity> wrapper = new UpdateWrapper<>();

        wrapper.lambda()
                // 更新位置
                .set(TruckEntity::getCurrentOrganId, currentOrganId)
                // 更新车辆状态
                .set(TruckEntity::getRunStatus, TruckRunStatusEnum.ARRIVED.getCode())
                // 禁用状态
                .set(TruckEntity::getStatus, statusEnum.getCode())
                .eq(TruckEntity::getId, truckId);
        return super.update(wrapper);
    }

    /**
     * 启用
     *
     * @param id 车辆ID
     */
    @Override
    public void workedById(Long id) {
        // 车辆信息完整 行驶证照片必须有
        TruckEntity truckEntity = getById(id);
        if (ObjectUtil.isEmpty(truckEntity) || ObjectUtil.isEmpty(truckEntity.getTruckLicenseId())) {
            throw new SLException("车辆行驶证不存在");
        }
        TruckLicenseEntity truckLicenseEntity = truckLicenseService.getById(truckEntity.getTruckLicenseId());
        if (ObjectUtil.isEmpty(truckLicenseEntity) || ObjectUtil.isEmpty(truckLicenseEntity.getPicture())) {
            throw new SLException("请上传行驶证照片");
        }
        // 检查司机绑定关系 有司机2个
        List<TruckDriverEntity> driverEntities = truckDriverService.findByTruckId(id);
        if (CollUtil.isEmpty(driverEntities) || driverEntities.size() < 2) {
            throw new SLException(StrUtil.format("请先绑定2个司机"));
        }

        List<Long> drivers = driverEntities.parallelStream().map(TruckDriverEntity::getUserId).collect(Collectors.toList());
        // 有排班才可以启用
        long count = workSchedulingService.count(
                Wrappers.<WorkSchedulingEntity>lambdaQuery()
                        .in(WorkSchedulingEntity::getUserId, drivers)
                        .eq(WorkSchedulingEntity::getIsDelete, 0)
                        .eq(WorkSchedulingEntity::getUserType, WorkUserTypeEnum.DRIVER.getCode()));
        if (count < 2) {
            throw new SLException(StrUtil.format("请先为司机安排排班"));
        }

        truckEntity.setWorkStatus(TruckWorkStatusEnum.WORKING.getCode());
        super.updateById(truckEntity);
    }

    /**
     * 状态分组统计
     *
     * @return 统计车辆信息
     */
    @Override
    public Map<Integer, Long> groupByStatus() {
        return SimpleQuery.group(Wrappers.lambdaQuery(), TruckEntity::getWorkStatus, Collectors.counting());
    }

    /**
     * 删除
     *
     * @param id 车辆ID
     */
    @Override
    public void del(Long id) {
        // 检查司机绑定关系
        List<TruckDriverEntity> driverEntities = truckDriverService.findByTruckId(id);
        if (CollUtil.isNotEmpty(driverEntities)) {
            throw new SLException(StrUtil.format("请先解绑该车辆下绑定的司机"));
        }
        TruckEntity truckEntity = new TruckEntity();
        truckEntity.setStatus(TruckConstant.DATA_DISABLE_STATUS);
        updateById(truckEntity);
    }

    /**
     * 车型数量
     *
     * @param typeId 车辆类型ID
     * @return 该车型下的车辆数量
     */
    @Override
    public Integer countByType(Long typeId) {
        return SimpleQuery.list(
                Wrappers.<TruckEntity>lambdaQuery()
                        .eq(TruckEntity::getTruckTypeId, typeId)
                        .eq(TruckEntity::getStatus, StatusEnum.NORMAL.getCode()),
                TruckEntity::getId).size();
    }
}
