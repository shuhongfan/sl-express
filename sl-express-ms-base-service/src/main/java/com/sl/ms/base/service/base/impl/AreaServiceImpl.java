package com.sl.ms.base.service.base.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.domain.base.AreaDto;
import com.sl.ms.base.entity.base.AreaEntity;
import com.sl.ms.base.mapper.base.AreaMapper;
import com.sl.ms.base.service.base.AreaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * 业务实现类
 * 行政区域
 */
@Slf4j
@Service
public class AreaServiceImpl extends ServiceImpl<AreaMapper, AreaEntity> implements AreaService {

    /**
     * 根据编码查询行政区域
     *
     * @param code 行政编码
     * @return 行政区域
     */
    @Override
    public AreaEntity getByCode(String code) {
        return baseMapper.selectOne(new LambdaQueryWrapper<AreaEntity>().eq(AreaEntity::getAreaCode, code).last(" limit 1"));
    }

    /**
     * 根据父级id查询子级行政区域
     *
     * @param parentId 父级id
     * @return 子级行政区域列表
     */
    @Override
    public List<AreaDto> findChildren(Long parentId) {
        //1.构造查询条件
        LambdaQueryWrapper<AreaEntity> queryWrapper = Wrappers.<AreaEntity>lambdaQuery().eq(AreaEntity::getParentId, parentId);

        //2.查询子级区域
        List<AreaEntity> entities = baseMapper.selectList(queryWrapper);

        //3.过滤掉不符合条件的数据（业务要求不要 市辖区 的行政区域信息）
        return entities.stream().map(area -> {
            if (area.getLevel().equals(2) && "市辖区".equals(area.getName())) {
                return null;
            }
            AreaDto areaDto = BeanUtil.toBean(area, AreaDto.class);
            areaDto.setName(areaDto.getShortName());
            return areaDto;
        }).filter(Objects::nonNull).collect(Collectors.toList());
    }

    /**
     * 根据id批量查询
     *
     * @param ids id列表
     * @return 行政区域列表
     */
    @Override
    public List<AreaDto> findBatch(List<Long> ids) {
        if (CollUtil.isEmpty(ids)) {
            return new ArrayList<>();
        }
        //1.构造查询条件
        LambdaQueryWrapper<AreaEntity> queryWrapper = Wrappers.<AreaEntity>lambdaQuery().in(AreaEntity::getId, ids);

        //2.查询行政区域列表
        List<AreaEntity> entities = baseMapper.selectList(queryWrapper);

        //3.封装数据
        return entities.stream().map(area -> {
            AreaDto areaDto = BeanUtil.toBean(area, AreaDto.class);
            areaDto.setName(areaDto.getShortName());
            return areaDto;
        }).collect(Collectors.toList());
    }
}
