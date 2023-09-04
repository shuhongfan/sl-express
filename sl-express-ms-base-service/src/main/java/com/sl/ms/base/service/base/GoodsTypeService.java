package com.sl.ms.base.service.base;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.entity.base.GoodsTypeEntity;

import java.util.List;

/**
 * 货物类型表  服务类
 */
public interface GoodsTypeService extends IService<GoodsTypeEntity> {

    /**
     * 获取分页货物类型数据，如果传入 货物类型名称 或 车辆id 时进行条件搜索
     *
     * @param page          页码
     * @param pageSize      页尺寸
     * @param goodsTypeName 货物类型名称（非必须）
     * @param truckTypeId   车辆id（非必须）
     * @return 分页货物数据
     */
    IPage<GoodsTypeEntity> findByPage(Integer page, Integer pageSize, String goodsTypeName, Long truckTypeId);

    /**
     * 根据id列表，获取货物类型列表
     *
     * @param ids 货物类型id
     * @return 货物类型列表
     */
    List<GoodsTypeEntity> findAll(List<Long> ids);

    /**
     * 查询所有状态可用的货物类型列表
     *
     * @return 货物类型列表
     */
    List<GoodsTypeEntity> findAll();
}
