package com.sl.ms.base.entity.truck;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.Data;

/**
 * <p>
 * 车次与车辆关联表
 * </p>
 *
 * @author itcast
 * @since 2019-12-20
 */
@Data
@TableName("sl_truck_trips_truck_driver")
public class TransportTripsTruckDriverEntity extends BaseEntity {
    private static final long serialVersionUID = 2060686653575483040L;
    /**
     * 车辆id
     */
    private Long truckId;
    /**
     * 车次id
     */
    private Long transportTripsId;
    /**
     * 司机id
     */
    private Long driverId;
}
