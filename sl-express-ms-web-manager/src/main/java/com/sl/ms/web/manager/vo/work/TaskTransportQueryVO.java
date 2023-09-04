package com.sl.ms.web.manager.vo.work;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskTransportQueryVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "任务状态，1为待执行（对应 待提货）、2为进行中（对应在途）、3为待确认（保留状态）、4为已完成（对应 已交付）、5为已取消")
    private Integer status;

    @ApiModelProperty(value = "计划到达时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime planArrivalTime;

    @ApiModelProperty(value = "页码")
    private Integer page;

    @ApiModelProperty(value = "页尺寸")
    private Integer pageSize;

    @ApiModelProperty("起始机构id")
    private Long startAgencyId;

    @ApiModelProperty("目的机构id")
    private Long endAgencyId;

    @ApiModelProperty("任务分配状态(1未分配2已分配3待人工分配)")
    private Integer assignedStatus;

    @ApiModelProperty("满载状态(1.半载2.满载3.空载)")
    private Integer loadingStatus;

    @ApiModelProperty("车辆id")
    private Long truckId;

    @ApiModelProperty("车牌号码")
    private String licensePlate;
}
