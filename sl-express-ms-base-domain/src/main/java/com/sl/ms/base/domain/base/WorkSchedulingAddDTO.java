package com.sl.ms.base.domain.base;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("排班新增模型")
public class WorkSchedulingAddDTO {

    @ApiModelProperty("用户id")
    private Long userId;
    @ApiModelProperty("用户类型：1：员工，2：快递员，3:司机")
    private Byte userType;
    @ApiModelProperty("网点")
    private Long agencyId;
    @ApiModelProperty("员工名称")
    private String name;
    @ApiModelProperty("员工编号")
    private String employeeNumber;
    @ApiModelProperty("电话")
    private String phone;
    @ApiModelProperty("工作模式id")
    private Long workPatternId;
    @ApiModelProperty("工作模式类型，1:礼拜制，2：连续制")
    private Byte workPatternType;

    @ApiModelProperty("操作人")
    private Long operator;
}
