package com.sl.ms.web.courier.vo.task;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskStatus;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@ApiModel("任务列表模型")
public class TaskVO {
    @ApiModelProperty("取件派件任务id")
    private Long id;

    @ApiModelProperty("订单id")
    private Long orderId;

    @ApiModelProperty("运单id")
    private String transportOrderId;

    @ApiModelProperty(value = "任务类型，1为取件任务，2为派件任务")
    private PickupDispatchTaskType taskType;

    @ApiModelProperty(value = "任务状态，1为待执行、2为已完成、3为已取消")
    private PickupDispatchTaskStatus status;

    @ApiModelProperty(value = "签收状态(1为已签收，2为拒收)")
    private Integer signStatus;

    @ApiModelProperty(value = "付款方式,1寄付，2到付")
    private Integer paymentMethod;

    @ApiModelProperty(value = "付款状态,1未付，2已付")
    private Integer paymentStatus;

    @ApiModelProperty("寄/收件人姓名")
    private String name;

    @ApiModelProperty("寄/收件人电话")
    private String phone;

    @ApiModelProperty("寄/收件人地址")
    private String address;

    @ApiModelProperty("距离，单位公里，待取件或者待派送才会计算距离")
    private Double distance;

    @ApiModelProperty("运费")
    private Double amount;

    @ApiModelProperty("预计取/派件开始时间")
    private LocalDateTime estimatedStartTime;

    @ApiModelProperty("实际开始时间")
    private LocalDateTime actualStartTime;

    @ApiModelProperty("预计完成时间")
    private LocalDateTime estimatedEndTime;

    @ApiModelProperty("实际完成时间")
    private LocalDateTime actualEndTime;

    @ApiModelProperty("取消时间")
    private LocalDateTime cancelTime;

    @ApiModelProperty(value = "任务时间")
    private LocalDateTime taskTime;

    @ApiModelProperty("备注")
    private String mark;

    @ApiModelProperty("取消原因")
    private String cancelReason;

    @ApiModelProperty("取消原因描述")
    private String cancelReasonDescription;

    @ApiModelProperty("经纬度")
    private String location;

    @ApiModelProperty("是否超时")
    private Boolean isDelay;

    @ApiModelProperty("任务创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created;

    @ApiModelProperty("任务更新时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updated;
}
