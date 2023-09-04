package com.sl.ms.base.domain.truck;

import lombok.Data;

/**
 * TransportTripsDto
 */
@Data
public class TransportTripsTruckDriverDto {

    /**
     * id
     */
    private Long id;
    /**
     * 车辆id
     */
    private Long truckId;
    /**
     * 车次id
     */
    private Long transportTripsId;

    /**
     * 司机Id
     */
    private Long driverId;
}