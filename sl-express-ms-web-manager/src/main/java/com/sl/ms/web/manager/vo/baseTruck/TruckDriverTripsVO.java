package com.sl.ms.web.manager.vo.baseTruck;

import com.sl.ms.web.manager.vo.transportLine.TransportLineVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "车辆司机车次线路关联信息")
public class TruckDriverTripsVO {
    @ApiModelProperty(value = "司机")
    private DriverVO driver;

    @ApiModelProperty(value = "车辆")
    private TruckVO truck;

    @ApiModelProperty(value = "线路信息")
    private TransportLineVO transportLine;

    @ApiModelProperty(value = "车次信息")
    private TransportTripsVO transportTrips;
}