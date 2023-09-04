package com.sl.ms.web.customer.vo.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("实名认证")
@Data
public class RealNameVerifyVO {

    @ApiModelProperty("姓名")
    private String name;

    @ApiModelProperty("身份证号")
    private String idCard;

    @ApiModelProperty("性别,1-男，0-女")
    private Integer sex;

    @ApiModelProperty("是否通过实名认证")
    private Boolean flag;
}
