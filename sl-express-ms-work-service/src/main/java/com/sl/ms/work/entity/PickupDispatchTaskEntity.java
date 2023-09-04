package com.sl.ms.work.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.ms.work.domain.enums.pickupDispatchtask.*;
import com.sl.transport.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

/**
 * 取件、派件任务信息表
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("sl_pickup_dispatch_task")
public class PickupDispatchTaskEntity extends BaseEntity {

    /**
     * 关联订单id
     */
    private Long orderId;

    /**
     * 任务类型，1为取件任务，2为派件任务
     */
    private PickupDispatchTaskType taskType;

    /**
     * 任务状态
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
    private LocalDateTime estimatedStartTime;

    /**
     * 实际开始时间
     */
    private LocalDateTime actualStartTime;

    /**
     * 预计完成时间
     */
    private LocalDateTime estimatedEndTime;

    /**
     * 实际完成时间
     */
    private LocalDateTime actualEndTime;

    /**
     * 取消时间
     */
    private LocalDateTime cancelTime;

    /**
     * 任务分配状态(1未分配2已分配3待人工分配)
     */
    private PickupDispatchTaskAssignedStatus assignedStatus;

    /**
     * 备注
     */
    private String mark;

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

}
