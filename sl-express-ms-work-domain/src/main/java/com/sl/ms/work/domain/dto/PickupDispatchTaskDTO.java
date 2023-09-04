package com.sl.ms.work.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.work.domain.enums.pickupDispatchtask.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 取派件任务
 *
 * @author jpfss
 */
@Data
public class PickupDispatchTaskDTO {

    /**
     * id
     */
    private Long id;

    /**
     * 关联订单id
     */
    private Long orderId;

    /**
     * 任务类型，1为取件任务，2为派件任务
     */
    private PickupDispatchTaskType taskType;

    /**
     * 任务状态，1为待执行（对应 待上门和须交接）、2为进行中（该状态暂不使用，属于保留状态）、3为待确认（对应 待妥投和须交件）、4为已完成、5为已取消
     */
    private PickupDispatchTaskStatus status;

    /**
     * 签收状态(1为已签收，2为拒收)
     */
    private PickupDispatchTaskSignStatus signStatus;


    /**
     * 签收人
     */
    private SignRecipientEnum signRecipient;

    /**
     * 网点ID
     */
    private Long agencyId;

    /**
     * 快递员ID
     */
    private Long courierId;

    /**
     * 预计开始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime estimatedStartTime;

    /**
     * 实际开始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime actualStartTime;

    /**
     * 预计完成时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime estimatedEndTime;

    /**
     * 实际完成时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime actualEndTime;

    /**
     * 取消时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime cancelTime;

    /**
     * 任务分配状态(2已分配3待人工分配)
     */
    private PickupDispatchTaskAssignedStatus assignedStatus;

    /**
     * 备注
     */
    private String mark;

    /**
     * 任务创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created;

    /**
     * 任务更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updated;

    /**
     * 删除：0-否，1-是
     */
    private PickupDispatchTaskIsDeleted isDeleted;


    /**
     * 取消原因
     */
    private PickupDispatchTaskCancelReason cancelReason;

    /**
     * 取消原因具体描述
     */
    private String cancelReasonDescription;

    /**
     * id列表
     */
    private List<Long> ids;
    /**
     * orderId 列表
     */
    private List<Long> orderIds;
}
