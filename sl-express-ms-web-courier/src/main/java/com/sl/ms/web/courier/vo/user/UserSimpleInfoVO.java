package com.sl.ms.web.courier.vo.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("用户简单信息")
public class UserSimpleInfoVO {
    @ApiModelProperty("雇员编号")
    private String employeeNumber;

    @ApiModelProperty("用户id")
    private String userId;

    @ApiModelProperty("姓名")
    private String name;
}
