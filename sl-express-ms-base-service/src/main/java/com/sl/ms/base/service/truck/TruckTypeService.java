package com.sl.ms.base.service.truck;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.entity.truck.TruckTypeEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 车辆类型表 服务类
 */
public interface TruckTypeService extends IService<TruckTypeEntity> {

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
    IPage<TruckTypeEntity> findByPage(Integer page, Integer pageSize, String name, BigDecimal minAllowableLoad, BigDecimal maxAllowableLoad, BigDecimal minAllowableVolume, BigDecimal maxAllowableVolume, Long id);

    /**
     * 获取车辆类型列表
     * @param ids 车辆类型ids
     * @return 车辆类型列表
     */
    List<TruckTypeEntity> findAll(List<Long> ids);

    /**
     * 删除车辆类型
     *
     * @param id 车型ID
     */
    void disable(Long id);

    /**
     * 获取map类型车辆类型数据集合
     *
     * @param truckTypeSet 车辆类型id列表
     * @return 执行结果
     */
    Map<Long, TruckTypeEntity> truckTypeMap(Set<Long> truckTypeSet);
}
