package com.sl.ms.web.manager.vo.baseTruck;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "车辆和司机关联信息")
public class TruckDriverVO {
    @ApiModelProperty(value = "司机")
    private DriverVO driver;

    @ApiModelProperty(value = "车辆")
    private TruckVO truck;
}