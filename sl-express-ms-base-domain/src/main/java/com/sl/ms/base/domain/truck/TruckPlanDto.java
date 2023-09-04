package com.sl.ms.base.domain.truck;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * TransportTripsDto
 */
@Data
public class TruckPlanDto {
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
    private List<Long> driverIds;

    /**
     * 计划发车时间
     */
    private LocalDateTime planDepartureTime;

    /**
     * 计划到达时间
     */
    private LocalDateTime planArrivalTime;

    /**
     * 计划到达时间
     */
    private LocalDateTime nextDepartureTime;

    /**
     * 状态
     *
     * @see com.sl.ms.base.domain.enums.StatusEnum
     */
    private Integer status;

    /**
     * 创建时间
     */
    private LocalDateTime created;

    /**
     * 更新时间
     */
    private LocalDateTime updated;

    /**
     * 车辆结构
     */
    private TruckDto truckDto;

    //起始机构id
    private Long startOrganId;

    //结束机构id
    private Long endOrganId;

    /**
     * 所属线路id
     */
    private Long transportLineId;
}