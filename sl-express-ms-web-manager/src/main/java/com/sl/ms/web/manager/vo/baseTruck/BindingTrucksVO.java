package com.sl.ms.web.manager.vo.baseTruck;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

/**
 * 车次绑定车辆
 */
@Data
public class BindingTrucksVO {

    @ApiModelProperty(value = "车次id")
    private Long transportTripsId;

    @ApiModelProperty(value = "车辆id列表")
    private List<Long> truckIds;
}