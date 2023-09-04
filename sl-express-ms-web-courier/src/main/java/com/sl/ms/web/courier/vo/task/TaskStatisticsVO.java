package com.sl.ms.web.courier.vo.task;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("各类任务数量统计")
@Data
public class TaskStatisticsVO {
    @ApiModelProperty("取件任务数量")
    private Integer pickupNum = 0;

    @ApiModelProperty("取件--待取件数量")
    private Integer newPickUpNum = 0;

    @ApiModelProperty("取件--已取件数量")
    private Integer completePickUpNum = 0;

    @ApiModelProperty("取件--取消数量")
    private Integer cancelPickUpNum = 0;

    @ApiModelProperty("派件任务数量")
    private Integer dispatchNum = 0;

    @ApiModelProperty("派件--待派件数量")
    private Integer newDispatchNum = 0;

    @ApiModelProperty("派件--已签收数量")
    private Integer signedNum = 0;

    @ApiModelProperty("派件--取消数量")
    private Integer cancelDispatchNum = 0;

    @ApiModelProperty("超时任务数量")
    private Integer overTimeNum = 0;
}
