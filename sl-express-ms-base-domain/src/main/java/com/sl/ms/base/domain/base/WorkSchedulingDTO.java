package com.sl.ms.base.domain.base;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@ApiModel("排班分页查询")
@Data
public class WorkSchedulingDTO {
    @ApiModelProperty("工作排班信息id")
    private Long id;
    @ApiModelProperty("用户id")
    private Long userId;
    @ApiModelProperty("姓名")
    private String name;
    @ApiModelProperty("员工账号")
    private String employeeNumber;
    @ApiModelProperty("手机号")
    private String phone;
    @ApiModelProperty("工作计划")
    private List<Boolean> workSchedules;

    @ApiModelProperty("开始上班时间1")
    private Integer workStartMinute1;

    @ApiModelProperty("结束下班时间1")
    private Integer workEndMinute1;

    @ApiModelProperty("工作模式名称")
    private String workPatternName;

    @ApiModelProperty("用户类型：1：员工，2：快递员，3:司机")
    private Byte userType;

    private Long workPatternId;

    @ApiModelProperty("网点名称")
    private String agencyName;

    @ApiModelProperty("网点")
    private Long agencyId;
}
