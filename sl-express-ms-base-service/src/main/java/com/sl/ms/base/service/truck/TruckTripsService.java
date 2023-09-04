package com.sl.ms.base.service.truck;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.domain.truck.OrganIdsDto;
import com.sl.ms.base.entity.truck.TruckTripsEntity;

import java.util.HashSet;
import java.util.List;
import java.util.Map;

/**
 * 车次信息表 服务类
 */
public interface TruckTripsService extends IService<TruckTripsEntity> {

    /**
     * 获取车次列表
     *
     * @param transportLineId 线路id
     * @param ids             车次id列表
     * @return 车次列表
     */
    List<TruckTripsEntity> findAll(Long transportLineId, List<Long> ids);

    /**
     * 删除车次
     *
     * @param id 车次ID
     */
    void disable(Long id);

    /**
     * 根据线路ID查询机构
     * @param values 线路ID
     * @return 机构信息
     */
    Map<Long, OrganIdsDto> getOrganIdsByTripsLineId(HashSet<Long> values);
}
