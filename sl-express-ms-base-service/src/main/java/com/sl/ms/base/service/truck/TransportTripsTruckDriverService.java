package com.sl.ms.base.service.truck;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.entity.truck.TransportTripsTruckDriverEntity;

import java.util.List;

/**
 * <p>
 * 车次与车辆关联信息表 服务类
 * </p>
 *
 * @author itcast
 * @since 2019-12-20
 */
public interface TransportTripsTruckDriverService extends IService<TransportTripsTruckDriverEntity> {
    /**
     * 批量保存车次与车辆关联信息
     * @param truckTransportTripsId 车次ID
     * @param truckTransportTrips 车次与车辆关联信息
     */
    void batchSave(Long truckTransportTripsId, List<TransportTripsTruckDriverEntity> truckTransportTrips);

    /**
     * 获取车次与车辆关联列表
     *
     * @param transportTripsId 车次id
     * @param truckId          车辆Id
     * @param userId           司机id
     * @return 车次与车辆关联列表
     */
    List<TransportTripsTruckDriverEntity> findAll(Long transportTripsId, Long truckId, Long userId);

    /**
     * 消除绑定关系
     * @param transportTripsId 车次ID
     * @param truckId 车辆ID
     */
    void delete(Long transportTripsId, Long truckId);

    /**
     * 检查是否可以删除
     *
     * @param transportTripsId 车次id
     * @param truckId          车辆Id
     * @param userId           司机id
     * @return 是否可以删除
     */
    Boolean canRemove(Long transportTripsId, Long truckId, Long userId);
}
