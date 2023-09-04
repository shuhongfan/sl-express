package com.sl.ms.web.manager.vo.work;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@ApiModel("手动调整运输任务")
@Data
public class TaskTransportUpdateVO {
    @ApiModelProperty(value = "运输任务Id")
    private Long id;

    @ApiModelProperty(value = "车次Id")
    private Long transportTripsId;

    @ApiModelProperty(value = "车辆Id")
    private Long truckId;

    @ApiModelProperty(value = "司机Id")
    private List<Long> driverId;

}
