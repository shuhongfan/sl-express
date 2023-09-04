package com.sl.ms.web.manager.vo.baseCommon;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class AreaVO {
    @ApiModelProperty(value = "所属省份")
    private AreaSimpleVO province;

    @ApiModelProperty(value = "所属城市")
    private AreaSimpleVO city;

    @ApiModelProperty(value = "所属区县")
    private AreaSimpleVO county;

    @ApiModelProperty(value = "地址", required = true)
    private String address;
}
