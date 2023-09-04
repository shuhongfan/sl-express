package com.sl.ms.base.domain.base;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("工作模式")
@Data
public class WorkPatternDTO {
    @ApiModelProperty("工作模式id")
    private Long id;
    @ApiModelProperty("工作模式名称")
    private String name;
    @ApiModelProperty("工作模式类型描述")
    private String workPatternTypeDesc;
    @ApiModelProperty("工作模式类型描述")
    private Byte workPatternType;
    @ApiModelProperty("工作日期")
    private String workDate;

    private Byte userType;


    private Byte monday;

    private Byte tuesday;

    private Byte wednesday;

    private Byte thursday;

    private Byte friday;

    private Byte saturday;

    private Byte sunday;

    private Integer workDayNum;

    private Integer restDayNum;

    private Byte status;

    private Integer workStartMinute1;

    private Integer workEndMinute1;

    private Long creater;

    private Long updater;

    private Boolean isDelete;
}
