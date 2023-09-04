package com.sl.ms.web.manager.vo.auth;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("快递员信息")
public class CourierVO {
    @ApiModelProperty(value = "快递员id")
    private Long id;

    @ApiModelProperty(value = "快递员姓名")
    private String name;
}
