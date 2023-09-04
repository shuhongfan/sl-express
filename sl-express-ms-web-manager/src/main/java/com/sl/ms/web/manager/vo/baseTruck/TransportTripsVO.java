package com.sl.ms.web.manager.vo.baseTruck;

import com.sl.ms.web.manager.vo.transportLine.TransportLineVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel(value = "车次信息")
public class TransportTripsVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "车次名称")
    private String name;

    @ApiModelProperty(value = "发车时间")
    private Integer departureTime;

    @ApiModelProperty(value = "持续时间")
    private Integer estimatedTime;

    @ApiModelProperty(value = "到达时间")
    private Integer arriveTime;

    @ApiModelProperty(value = "所属线路")
    private TransportLineVO transportLine;

    @ApiModelProperty(value = "周期，1为天，2为周，3为月")
    private Integer period;

    @ApiModelProperty(value = "周期名称")
    private String periodName;

    @ApiModelProperty(value = "所选车辆和司机")
    private List<TruckDriverVO> truckDrivers;
}
