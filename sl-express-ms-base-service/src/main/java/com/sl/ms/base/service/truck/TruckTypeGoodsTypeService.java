package com.sl.ms.base.service.truck;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.entity.truck.TruckTypeGoodsTypeEntity;

import java.util.List;

/**
 * 车辆类型与货物类型关联表 服务类
 */
public interface TruckTypeGoodsTypeService extends IService<TruckTypeGoodsTypeEntity> {

    /**
     * 删除关联关系
     *
     * @param truckTypeId 车辆类型id
     * @param goodsTypeId 货物类型id
     */
    void delete(Long truckTypeId, Long goodsTypeId);

    /**
     * 获取车辆类型与货物类型关联
     *
     * @param truckTypeId 车辆类型id
     * @param goodsTypeId 货物类型id
     * @return 车辆类型与货物类型关联
     */
    List<TruckTypeGoodsTypeEntity> findAll(Long truckTypeId, Long goodsTypeId);
}
