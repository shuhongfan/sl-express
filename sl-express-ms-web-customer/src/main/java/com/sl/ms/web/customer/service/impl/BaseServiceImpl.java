package com.sl.ms.web.customer.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import com.google.common.collect.Lists;
import com.sl.ms.base.api.common.AreaFeign;
import com.sl.ms.base.api.common.GoodsTypeFeign;
import com.sl.ms.base.domain.base.AreaDto;
import com.sl.ms.base.domain.base.GoodsTypeDto;
import com.sl.ms.web.customer.service.BaseService;
import com.sl.ms.web.customer.vo.base.AreaSimpleVO;
import com.sl.ms.web.customer.vo.base.GoodsTypeVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 基础服务
 * 文件上传 排班 工作模式 行政机构 车型 货物类型
 */
@Slf4j
@Service
public class BaseServiceImpl implements BaseService {

    @Resource
    private AreaFeign areaFeign;

    @Resource
    private GoodsTypeFeign goodsTypeFeign;


    /**
     * 行政机构
     * 用于地址选择 省市县三级行政机构
     * 根据父行政机构节点查询子行政机构节点
     *
     * @param parentId 父节点ID
     * @return 子节点
     */
    @Override
    public List<AreaSimpleVO> findChildrenAreaByParentId(Long parentId) {

        List<AreaDto> areas = areaFeign.findChildren(parentId);
        if (CollUtil.isEmpty(areas)) {
            return Lists.newArrayList();
        }
        List<AreaSimpleVO> areaSimpleVOS = new ArrayList<>();
        areas.forEach(area -> {
            AreaSimpleVO areaSimpleVO = BeanUtil.toBean(area, AreaSimpleVO.class);
            areaSimpleVOS.add(areaSimpleVO);
        });
        return areaSimpleVOS;
    }

    /**
     * 简要行政机构信息转换
     *
     * @param area 行政机构DTO
     * @return 简要行政机构VO
     */
    @Override
    public AreaSimpleVO parseArea2Vo(AreaDto area) {
        return BeanUtil.toBean(area, AreaSimpleVO.class);
    }

    /**
     * 根据id获取货物类型详情
     *
     * @param id 货物类型id
     * @return 货物类型信息
     */
    @Override
    public GoodsTypeVO fineGoodsTypeById(Long id) {
        GoodsTypeDto dto = goodsTypeFeign.fineById(id);
        return parseGoodsTypeDto2Vo(dto);
    }

    /**
     * 货物类型转换
     *
     * @param dto 货物类型DTO
     * @return 货物类型VO
     */
    public GoodsTypeVO parseGoodsTypeDto2Vo(GoodsTypeDto dto) {
        return BeanUtil.toBean(dto, GoodsTypeVO.class);
    }
}
