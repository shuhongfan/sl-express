package com.sl.ms.base.domain.base;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("排班分页查询")
@Data
public class WorkSchedulingQueryDTO {
    @ApiModelProperty("页数")
    private Integer page = 1; //默认第一页
    @ApiModelProperty("每页条数")
    private Integer pageSize = 10;
    @ApiModelProperty("月份,该值为空默认当前月份yy-mm")
    private String month;
    @ApiModelProperty("员工名称")
    private String name;

    @ApiModelProperty("员工账号")
    private String employeeNumber;

    @ApiModelProperty("工作模式ID 默认 0 ：无工作模式")
    private Long workPatternId;

    @ApiModelProperty("用户类型：1：员工，2：快递员，3:司机")
    private Byte userType;

    @ApiModelProperty("网点")
    private Long agencyId;
}
