package com.sl.ms.web.manager.vo.work;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("取派件任务统计")
public class PickupDispatchTaskQuantityStatisticsVO {
    @ApiModelProperty(value = "任务总数")
    private Integer total;

    @ApiModelProperty(value = "新任务数量")
    private Integer newTaskCount;

    @ApiModelProperty(value = "已完成任务数量")
    private Integer completedTaskCount;

    @ApiModelProperty(value = "已取消任务数量")
    private Integer canceledTaskCount;
}
