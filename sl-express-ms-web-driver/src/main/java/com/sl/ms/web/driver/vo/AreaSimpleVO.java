package com.sl.ms.web.driver.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

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

    @ApiModelProperty(value = "多边形经纬度坐标集合")
    private List<List<Map<String, String>>> mutiPoints;
}
