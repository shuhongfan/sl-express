package com.sl.ms.web.courier.vo.area;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@Data
@ApiModel(value = "行政区域简要信息")
public class AreaSimpleVO {
    @ApiModelProperty(value = "id")
    private Long id;
    @ApiModelProperty(value = "行政名称")
    private String name;
    @ApiModelProperty(value = "经度")
    private String lng;
    @ApiModelProperty(value = "纬度")
    private String lat;
}
