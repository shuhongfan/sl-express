package com.sl.ms.base.mapper.base;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sl.ms.base.entity.base.GoodsTypeEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GoodsTypeMapper extends BaseMapper<GoodsTypeEntity> {

    /**
     * 获取分页货物类型数据，如果传入 货物类型名称 或 车辆id 时进行条件搜索
     *
     * @param page          分页参数
     * @param goodsTypeName 货物类型名称（非必须）
     * @param truckTypeId   车辆id（非必须）
     * @return 分页货物数据
     */
    List<GoodsTypeEntity> findByPage(Page<GoodsTypeEntity> page,
                                     @Param("goodsTypeName") String goodsTypeName,
                                     @Param("truckTypeId") Long truckTypeId);

}
