package com.sl.ms.web.manager.vo.workspace;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "待办事项")
public class BacklogVO {
    @ApiModelProperty(value = "待取件数量", required = true)
    private Integer waitingPickupNumber;

    @ApiModelProperty(value = "待取件任务比率", required = true)
    private Double waitingPickupRate;

    @ApiModelProperty(value = "待派送数量", required = true)
    private Integer waitingDispatchNumber;

    @ApiModelProperty(value = "待派送任务比率", required = true)
    private Double waitingDispatchRate;

    @ApiModelProperty(value = "未分配运输任务数量", required = true)
    private Integer unassignedTransportTaskNumber;

    @ApiModelProperty(value = "未分配运输任务比率", required = true)
    private Double unassignedTransportTaskRate;

    @ApiModelProperty(value = "超时运输任务数量", required = true)
    private Integer timeoutTransportTaskNumber;

    @ApiModelProperty(value = "超时运输任务比率", required = true)
    private Double timeoutTransportTaskRate;
}
