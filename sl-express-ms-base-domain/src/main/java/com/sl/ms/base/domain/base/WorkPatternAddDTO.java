package com.sl.ms.base.domain.base;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("工作模式新增接口")
public class WorkPatternAddDTO {
    @ApiModelProperty("用户类型,1:员工，2:快递员，3:司机")
    private Byte userType;
    @ApiModelProperty("名称")
    private String name;
    @ApiModelProperty("工作模式：1：礼拜制，2：连续制")
    private Byte workPatternType;
    @ApiModelProperty("星期一，0:不填充，1:工作，2:休息")
    private Byte monday;
    @ApiModelProperty("星期二，0:不填充，1:工作，2:休息")
    private Byte tuesday;
    @ApiModelProperty("星期三，0:不填充，1:工作，2:休息")
    private Byte wednesday;
    @ApiModelProperty("星期四，0:不填充，1:工作，2:休息")
    private Byte thursday;
    @ApiModelProperty("星期五，0:不填充，1:工作，2:休息")
    private Byte friday;
    @ApiModelProperty("星期六，0:不填充，1:工作，2:休息")
    private Byte saturday;
    @ApiModelProperty("星日，0:不填充，1:工作，2:休息")
    private Byte sunday;

    @ApiModelProperty("连续工作天数")
    private Integer workDayNum;
    @ApiModelProperty("休息天数")
    private Integer restDayNum;

    @ApiModelProperty("工作开始时间1，分钟数")
    private Integer workStartMinute1;
    @ApiModelProperty("工作结束时间1，分钟数")
    private Integer workEndMinute1;
    @ApiModelProperty("操作人")
    private Long operator;
}
