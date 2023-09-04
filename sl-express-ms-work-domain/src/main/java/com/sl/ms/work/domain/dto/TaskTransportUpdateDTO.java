package com.sl.ms.work.domain.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

/**
 * 手动调整DTO
 */
@Data
public class TaskTransportUpdateDTO {

    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "车次Id")
    private Long transportTripsId;

    @ApiModelProperty(value = "车辆Id")
    private Long truckId;

    @ApiModelProperty(value = "司机Id")
    private List<Long> driverIds;

}
