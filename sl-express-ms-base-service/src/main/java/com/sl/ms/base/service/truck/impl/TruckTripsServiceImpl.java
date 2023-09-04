package com.sl.ms.base.service.truck.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.domain.truck.OrganIdsDto;
import com.sl.ms.base.entity.truck.TruckTripsEntity;
import com.sl.ms.base.mapper.truck.TruckTripsMapper;
import com.sl.ms.base.service.truck.TransportTripsTruckDriverService;
import com.sl.ms.base.service.truck.TruckTripsService;
import com.sl.ms.transport.api.TransportLineFeign;
import com.sl.transport.common.exception.SLException;
import com.sl.ms.base.domain.constants.TruckConstant;
import com.sl.transport.domain.TransportLineDTO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

/**
 * 车次信息表 服务类
 */
@Service
public class TruckTripsServiceImpl extends ServiceImpl<TruckTripsMapper, TruckTripsEntity> implements TruckTripsService {

    @Resource
    TransportLineFeign transportLineFeign;

    @Resource
    private TransportTripsTruckDriverService transportTripsTruckDriverService;

    /**
     * 获取车次列表
     *
     * @param transportLineId 线路id
     * @param ids             车次id列表
     * @return 车次列表
     */
    @Override
    public List<TruckTripsEntity> findAll(Long transportLineId, List<Long> ids) {
        LambdaQueryWrapper<TruckTripsEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (ObjectUtil.isNotEmpty(transportLineId)) {
            lambdaQueryWrapper.eq(TruckTripsEntity::getTransportLineId, transportLineId);
        }
        if (CollUtil.isNotEmpty(ids)) {
            lambdaQueryWrapper.in(TruckTripsEntity::getId, ids);
        }
        lambdaQueryWrapper.orderByDesc(TruckTripsEntity::getCreated);
        lambdaQueryWrapper.eq(TruckTripsEntity::getStatus, TruckConstant.DATA_DEFAULT_STATUS);
        return super.list(lambdaQueryWrapper);
    }

    /**
     * 删除车次
     *
     * @param id 车次ID
     */
    @Override
    public void disable(Long id) {
        // 检查车次绑定关系
        Boolean remove = transportTripsTruckDriverService.canRemove(id, null, null);
        if (!remove) {
            throw new SLException("该车次下存在绑定车辆，请先解除绑定后删除");
        }

        TruckTripsEntity truckTripsEntity = new TruckTripsEntity();
        truckTripsEntity.setId(id);
        truckTripsEntity.setStatus(TruckConstant.DATA_DISABLE_STATUS);
        baseMapper.updateById(truckTripsEntity);
    }

    /**
     * 根据线路ID查询机构
     * @param values 线路ID
     * @return 机构信息
     */
    @Override
    public Map<Long, OrganIdsDto> getOrganIdsByTripsLineId(HashSet<Long> values) {
        HashMap<Long, OrganIdsDto> hashMap = new HashMap<>();
        List<TransportLineDTO> listR = transportLineFeign.queryByIds(values.toArray(Long[]::new));

        listR.forEach(v -> {
            OrganIdsDto organIdsDto = new OrganIdsDto();
            organIdsDto.setStartOrganId(v.getStartOrganId());
            organIdsDto.setEndOrganId(v.getEndOrganId());
            hashMap.put(v.getId(), organIdsDto);
        });

        return hashMap;
    }
}
