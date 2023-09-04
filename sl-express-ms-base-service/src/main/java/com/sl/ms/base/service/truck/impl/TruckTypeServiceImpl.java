package com.sl.ms.base.service.truck.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.entity.truck.TruckEntity;
import com.sl.ms.base.entity.truck.TruckTypeEntity;
import com.sl.ms.base.mapper.truck.TruckTypeMapper;
import com.sl.ms.base.service.truck.TruckService;
import com.sl.ms.base.service.truck.TruckTypeService;
import com.sl.transport.common.exception.SLException;
import com.sl.ms.base.domain.constants.TruckConstant;
import com.sl.transport.common.util.ObjectUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 车辆类型表 服务实现类
 */
@Service
public class TruckTypeServiceImpl extends ServiceImpl<TruckTypeMapper, TruckTypeEntity>
        implements TruckTypeService {

    @Autowired
    private TruckService truckService;

    /**
     * 获取车辆类型分页数据
     *
     * @param page               页码
     * @param pageSize           页尺寸
     * @param name               车辆类型名称
     * @param minAllowableLoad   车辆载重最小值（闭区间）
     * @param maxAllowableLoad   车辆载重最大值（开区间）
     * @param minAllowableVolume 车辆体积最小值（闭区间）
     * @param maxAllowableVolume 车辆体积最小值（开区间）
     * @param id                 车型id
     * @return 车辆类型分页数据
     */
    @Override
    public IPage<TruckTypeEntity> findByPage(Integer page, Integer pageSize, String name, BigDecimal minAllowableLoad, BigDecimal maxAllowableLoad, BigDecimal minAllowableVolume, BigDecimal maxAllowableVolume, Long id) {
        Page<TruckTypeEntity> iPage = new Page<>(page, pageSize);
        LambdaQueryWrapper<TruckTypeEntity> lambdaQueryWrapper = Wrappers.<TruckTypeEntity>lambdaQuery()
                .like(CharSequenceUtil.isNotBlank(name), TruckTypeEntity::getName, name)
                .like(ObjectUtil.isNotEmpty(id), TruckTypeEntity::getId, id)
                .ge(ObjectUtil.isNotEmpty(minAllowableLoad),TruckTypeEntity::getAllowableLoad, minAllowableLoad)
                .lt(ObjectUtil.isNotEmpty(maxAllowableLoad),TruckTypeEntity::getAllowableLoad, maxAllowableLoad)
                .ge(ObjectUtil.isNotEmpty(minAllowableVolume),TruckTypeEntity::getAllowableVolume, minAllowableVolume)
                .lt(ObjectUtil.isNotEmpty(maxAllowableVolume),TruckTypeEntity::getAllowableVolume, maxAllowableVolume)
                .eq(TruckTypeEntity::getStatus, TruckConstant.DATA_DEFAULT_STATUS)
                .orderByDesc(TruckTypeEntity::getCreated);
        return super.page(iPage, lambdaQueryWrapper);
    }

    /**
     * 获取车辆类型列表
     *
     * @return 车辆类型列表
     */
    @Override
    public List<TruckTypeEntity> findAll(List<Long> ids) {
        LambdaQueryWrapper<TruckTypeEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (CollUtil.isNotEmpty(ids)) {
            lambdaQueryWrapper.in(TruckTypeEntity::getId, ids);
        }
        lambdaQueryWrapper.eq(TruckTypeEntity::getStatus, TruckConstant.DATA_DEFAULT_STATUS);
        return super.list(lambdaQueryWrapper);
    }

    /**
     * 删除车辆类型
     *
     * @param id 车型ID
     */
    @Override
    public void disable(Long id) {
        Long count = truckService.getBaseMapper().selectCount(Wrappers.<TruckEntity>lambdaQuery().eq(TruckEntity::getTruckTypeId, id));
        if (count > 0) {
            throw new SLException(StrUtil.format("车型中有使用的车辆，不可以删除 >>> msg = {}", id));
        }
        TruckTypeEntity truckType = new TruckTypeEntity();
        truckType.setId(id);
        truckType.setStatus(TruckConstant.DATA_DISABLE_STATUS);
        updateById(truckType);
    }

    /**
     * 获取map类型车辆类型数据集合
     *
     * @param truckTypeSet 车辆类型id列表
     * @return 执行结果
     */
    @Override
    public Map<Long, TruckTypeEntity> truckTypeMap(Set<Long> truckTypeSet) {
        List<TruckTypeEntity> truckTypeDtoList = findAll(new ArrayList<>(truckTypeSet));
        return truckTypeDtoList.stream().collect(Collectors.toMap(TruckTypeEntity::getId, vo -> vo));

    }
}
