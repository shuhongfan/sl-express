package com.sl.ms.base.service.truck.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.domain.truck.TruckReturnRegisterDTO;
import com.sl.ms.base.domain.truck.TruckReturnRegisterListDTO;
import com.sl.ms.base.domain.truck.TruckReturnRegisterPageQueryDTO;
import com.sl.ms.base.entity.truck.TruckEntity;
import com.sl.ms.base.entity.truck.TruckReturnRegisterEntity;
import com.sl.ms.base.mapper.truck.TruckReturnRegisterMapper;
import com.sl.ms.base.service.truck.TruckReturnRegisterService;
import com.sl.ms.base.service.truck.TruckService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.PageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


/**
 * 回车登记 服务类
 */
@Slf4j
@Service
public class TruckReturnRegisterServiceImpl extends ServiceImpl<TruckReturnRegisterMapper, TruckReturnRegisterEntity> implements TruckReturnRegisterService {
    @Resource
    private TruckService truckService;

    /**
     * 分页查询回车登记列表
     *
     * @param dto 分页查询条件
     * @return 回车登记分页结果
     */
    @Override
    public PageResponse<TruckReturnRegisterListDTO> pageQuery(TruckReturnRegisterPageQueryDTO dto) {
        //1. 构造分页查询条件
        Page<TruckReturnRegisterEntity> iPage = new Page<>(dto.getPage(), dto.getPageSize());
        LambdaQueryWrapper<TruckReturnRegisterEntity> queryWrapper = Wrappers.<TruckReturnRegisterEntity>lambdaQuery()
                .like(ObjectUtil.isNotEmpty(dto.getTransportTaskId()), TruckReturnRegisterEntity::getTransportTaskId, dto.getTransportTaskId())
                .in(ObjectUtil.isNotEmpty(dto.getTransportTaskIds()), TruckReturnRegisterEntity::getTransportTaskId, dto.getTransportTaskIds())
                .between(ObjectUtil.isNotEmpty(dto.getIntoStorageStartTime()), TruckReturnRegisterEntity::getIntoStorageTime, dto.getIntoStorageStartTime(), dto.getIntoStorageEndTime())
                .eq(ObjectUtil.isNotEmpty(dto.getIsAvailable()), TruckReturnRegisterEntity::getIsAvailable, dto.getIsAvailable())
                .orderByDesc(TruckReturnRegisterEntity::getIntoStorageTime);

        //2. 分页查询
        Page<TruckReturnRegisterEntity> returnRegisterEntityPage = this.page(iPage, queryWrapper);

        // 3.1 分页查询结果为空，直接返回
        if (ObjectUtil.isEmpty(returnRegisterEntityPage.getRecords())) {
            return new PageResponse<>();
        }

        // 3.2 分页查询结果不为空，封装返回数据
        List<TruckReturnRegisterListDTO> list = this.convertEntity2ListDTO(returnRegisterEntityPage.getRecords());

        // 4. 封装分页对象
        return PageResponse.<TruckReturnRegisterListDTO>builder()
                .page(dto.getPage())
                .pageSize(dto.getPageSize())
                .pages(returnRegisterEntityPage.getPages())
                .counts(returnRegisterEntityPage.getTotal())
                .items(list)
                .build();
    }

    /**
     * 回车登记实体类转换为TruckReturnRegisterListDTO
     *
     * @param returnRegisterEntities 实体类
     * @return 分页结果列表
     */
    private List<TruckReturnRegisterListDTO> convertEntity2ListDTO(List<TruckReturnRegisterEntity> returnRegisterEntities) {
        //先根据id批量查询车辆信息
        List<Long> truckIds = returnRegisterEntities.stream().map(TruckReturnRegisterEntity::getTruckId).collect(Collectors.toList());
        List<TruckEntity> truckEntities = truckService.listByIds(truckIds);
        return returnRegisterEntities.stream().map(entity -> {
            //根据id查询车辆
            Optional<TruckEntity> optional = truckEntities.stream().filter(item -> item.getId().equals(entity.getTruckId())).findFirst();
            if (optional.isEmpty()) {
                throw new SLException("id为：" + entity.getTruckId() + "车辆不存在！");
            }

            //封装回车登记列表数据
            TruckReturnRegisterListDTO truckReturnRegisterListDTO = BeanUtil.toBean(entity, TruckReturnRegisterListDTO.class);
            truckReturnRegisterListDTO.setLicensePlate(optional.get().getLicensePlate());
            return truckReturnRegisterListDTO;
        }).collect(Collectors.toList());
    }


    /**
     * 根据id查询回车登记详情
     *
     * @param id 回车登记id
     * @return 回车登记详情
     */
    @Override
    public TruckReturnRegisterDTO findById(Long id) {
        TruckReturnRegisterEntity entity = this.getById(id);
        return BeanUtil.toBean(entity, TruckReturnRegisterDTO.class);
    }
}
