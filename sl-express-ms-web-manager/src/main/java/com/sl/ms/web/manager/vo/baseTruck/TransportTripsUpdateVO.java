package com.sl.ms.web.manager.vo.baseTruck;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class TransportTripsUpdateVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "车次名称")
    private String name;

    @ApiModelProperty(value = "发车时间")
    private Integer departureTime;

    @ApiModelProperty(value = "持续时间")
    private Integer estimatedTime;

    @ApiModelProperty(value = "所属线路")
    private Long transportLineId;

    @ApiModelProperty(value = "周期，1为天，2为周，3为月")
    private Integer period;

    @ApiModelProperty(value = "周期名称")
    private String periodName;
}
