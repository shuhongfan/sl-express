package com.sl.ms.web.manager.vo.work;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.work.domain.enums.pickupDispatchtask.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@ApiModel(value = "取派件任务列表数据")
public class PickupDispatchTaskListVO {

    @ApiModelProperty(value = "取派件任务id")
    private String id;

    @ApiModelProperty(value = "所在营业部id")
    private Long agencyId;

    @ApiModelProperty(value = "所在营业部名称")
    private String agencyName;

    @ApiModelProperty(value = "任务类型，1为取件任务，2为派件任务")
    private PickupDispatchTaskType taskType;

    @ApiModelProperty(value = "任务状态，1为新任务、2为已完成、3为已取消")
    private PickupDispatchTaskStatus status;

    @ApiModelProperty(value = "任务分配状态(2已分配3待人工分配)")
    private PickupDispatchTaskAssignedStatus assignedStatus;

    @ApiModelProperty(value = "签收状态(1为已签收，2为拒收)")
    private PickupDispatchTaskSignStatus signStatus;

    @ApiModelProperty(value = "签收人,1本人，2代收")
    private SignRecipientEnum signRecipient;

    @ApiModelProperty(value = "快递员id")
    private Long courierId;

    @ApiModelProperty(value = "快递员姓名")
    private String courierName;

    @ApiModelProperty(value = "订单id")
    private Long orderId;

    @ApiModelProperty(value = "预计开始时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime estimatedStartTime;

    @ApiModelProperty(value = "实际开始时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime actualStartTime;

    @ApiModelProperty(value = "预计完成时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime estimatedEndTime;

    @ApiModelProperty(value = "实际完成时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime actualEndTime;

    @ApiModelProperty(value = "取消时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime cancelTime;

    @ApiModelProperty(value = "取消原因")
    private String cancelReason;
}
