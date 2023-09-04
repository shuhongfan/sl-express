package com.sl.ms.web.manager.vo.baseTruck;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

/**
 * 司机绑定车辆
 */
@Data
public class BindingDriversVO {

    @ApiModelProperty(value = "车辆id")
    private Long truckId;

    @ApiModelProperty(value = "司机id列表")
    private List<Long> driverIds;
}