package com.sl.ms.web.manager.vo.work;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.work.domain.enums.pickupDispatchtask.*;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class TaskPickupDispatchQueryVO {
    @ApiModelProperty(value = "当前页数", example = "1", required = true)
    private Integer page;

    @ApiModelProperty(value = "每页条数", example = "10", required = true)
    private Integer pageSize;

    @ApiModelProperty("取派件任务id，可模糊查询")
    private Long id;

    @ApiModelProperty("订单id，可模糊查询")
    private Long orderId;

    @ApiModelProperty("营业部id")
    private Long agencyId;

    @ApiModelProperty(value = "任务类型，1为取件任务，2为派件任务", required = true)
    @NotNull(message = "任务类型不能为空！")
    @Range(min = 1, max = 2, message = "任务类型错误！")
    private PickupDispatchTaskType taskType;

    @ApiModelProperty(value = "任务状态，1为新任务、2为已完成、3为已取消")
    private PickupDispatchTaskStatus status;

    @ApiModelProperty("任务分配状态(2已分配，3待人工分配)")
    private PickupDispatchTaskAssignedStatus assignedStatus;

    @ApiModelProperty(value = "签收状态(1为已签收，2为拒收)")
    private PickupDispatchTaskSignStatus signStatus;

    @ApiModelProperty(value = "最小预计完成时间", example = "2022-08-15 00:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime minEstimatedEndTime;

    @ApiModelProperty(value = "最大预计完成时间", example = "2022-09-15 00:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime maxEstimatedEndTime;

    @ApiModelProperty(value = "最小实际完成时间", example = "2022-08-15 00:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime minActualEndTime;

    @ApiModelProperty(value = "最大实际完成时间", example = "2022-09-15 00:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime maxActualEndTime;

    @ApiModelProperty(value = "删除：0-否，1-是;不传则查全部")
    private PickupDispatchTaskIsDeleted isDeleted;
}
