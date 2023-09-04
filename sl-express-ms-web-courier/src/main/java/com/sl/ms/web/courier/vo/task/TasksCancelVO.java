package com.sl.ms.web.courier.vo.task;

import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskCancelReason;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@ApiModel("订单取消")
public class TasksCancelVO {
    @ApiModelProperty(value = "任务id", required = true)
    @NotNull(message = "任务id不能为空！")
    private String id;

    @ApiModelProperty(value = "取消原因", required = true)
    @NotNull(message = "取消原因不能为空！")
    private PickupDispatchTaskCancelReason reason;

    @ApiModelProperty("原因描述")
    private String reasonDesc;
}
