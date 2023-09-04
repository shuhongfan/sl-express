package com.sl.ms.base.service.truck.impl;

import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.entity.truck.TruckTypeGoodsTypeEntity;
import com.sl.ms.base.mapper.truck.TruckTypeGoodsTypeMapper;
import com.sl.ms.base.service.truck.TruckTypeGoodsTypeService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 车辆类型与货物类型关联表 服务实现类
 */
@Service
public class TruckTypeGoodsTypeServiceImpl extends ServiceImpl<TruckTypeGoodsTypeMapper, TruckTypeGoodsTypeEntity>
        implements TruckTypeGoodsTypeService {

    /**
     * 删除关联关系
     *
     * @param truckTypeId 车辆类型id
     * @param goodsTypeId 货物类型id
     */
    @Override
    public void delete(Long truckTypeId, Long goodsTypeId) {
        LambdaQueryWrapper<TruckTypeGoodsTypeEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        boolean canExecute = false;
        if (ObjectUtil.isNotEmpty(truckTypeId)) {
            lambdaQueryWrapper.eq(TruckTypeGoodsTypeEntity::getTruckTypeId, truckTypeId);
            canExecute = true;
        }
        if (ObjectUtil.isNotEmpty(goodsTypeId)) {
            lambdaQueryWrapper.eq(TruckTypeGoodsTypeEntity::getGoodsTypeId, goodsTypeId);
            canExecute = true;
        }
        if (canExecute) {
            super.remove(lambdaQueryWrapper);
        }
    }

    /**
     * 获取车辆类型与货物类型关联
     *
     * @param truckTypeId 车辆类型id
     * @param goodsTypeId 货物类型id
     * @return 车辆类型与货物类型关联
     */
    @Override
    public List<TruckTypeGoodsTypeEntity> findAll(Long truckTypeId, Long goodsTypeId) {
        LambdaQueryWrapper<TruckTypeGoodsTypeEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (ObjectUtil.isNotEmpty(truckTypeId)) {
            lambdaQueryWrapper.eq(TruckTypeGoodsTypeEntity::getTruckTypeId, truckTypeId);
        }
        if (ObjectUtil.isNotEmpty(goodsTypeId)) {
            lambdaQueryWrapper.eq(TruckTypeGoodsTypeEntity::getGoodsTypeId, goodsTypeId);
        }
        return super.list(lambdaQueryWrapper);
    }

}
