package com.sl.ms.web.driver.vo.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("车辆信息")
public class TruckDetailVO {
    @ApiModelProperty("车辆编号")
    private String id;

    @ApiModelProperty("车牌号码")
    private String licensePlate;

    @ApiModelProperty("车辆类型名称")
    private String truckType;

    @ApiModelProperty("载重")
    private String allowableLoad;

    @ApiModelProperty("图片")
    private String picture;
}
