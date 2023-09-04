package com.sl.ms.base.service.base.impl;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.entity.base.GoodsTypeEntity;
import com.sl.ms.base.mapper.base.GoodsTypeMapper;
import com.sl.ms.base.service.base.GoodsTypeService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 货物类型相关业务
 */
@Service
public class GoodsTypeServiceImpl extends ServiceImpl<GoodsTypeMapper, GoodsTypeEntity> implements GoodsTypeService {

    /**
     * 获取分页货物类型数据，如果传入 货物类型名称 或 车辆id 时进行条件搜索
     *
     * @param page          页码
     * @param pageSize      页尺寸
     * @param goodsTypeName 货物类型名称（非必须）
     * @param truckTypeId   车辆id（非必须）
     * @return 分页货物数据
     */
    @Override
    public IPage<GoodsTypeEntity> findByPage(Integer page, Integer pageSize, String goodsTypeName, Long truckTypeId) {
        Page<GoodsTypeEntity> iPage = new Page<>(page, pageSize);
        iPage.setRecords(baseMapper.findByPage(iPage, goodsTypeName, truckTypeId));
        return iPage;
    }

    /**
     * 根据id列表，获取货物类型列表
     *
     * @param ids 货物类型id
     * @return 货物类型列表
     */
    @Override
    public List<GoodsTypeEntity> findAll(List<Long> ids) {
        LambdaQueryWrapper<GoodsTypeEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (CollUtil.isNotEmpty(ids)) {
            lambdaQueryWrapper.in(GoodsTypeEntity::getId, ids);
        }
        lambdaQueryWrapper.eq(GoodsTypeEntity::getStatus, 1);
        return super.list(lambdaQueryWrapper);
    }

    /**
     * 查询所有状态可用的货物类型列表
     *
     * @return 货物类型列表
     */
    @Override
    public List<GoodsTypeEntity> findAll() {
        LambdaQueryWrapper<GoodsTypeEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(GoodsTypeEntity::getStatus, 1);
        return super.list(lambdaQueryWrapper);
    }
}
