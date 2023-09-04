package com.sl.ms.work.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 运输任务
 */
@Data
public class TransportTaskPageQueryDTO {

    @ApiModelProperty("id")
    private Long id;

    @ApiModelProperty("车辆计划id")
    private Long truckPlanId;

    @ApiModelProperty("车次id")
    private Long transportTripsId;

    @ApiModelProperty("起始机构id")
    private Long startAgencyId;

    @ApiModelProperty("目的机构id")
    private Long endAgencyId;

    @ApiModelProperty("任务状态，1为待执行（对应 待提货）、2为进行中（对应在途）、3为待确认（保留状态）、4为已完成（对应 已交付）、5为已取消")
    private Integer status;

    @ApiModelProperty("任务分配状态(1未分配2已分配3待人工分配)")
    private Integer assignedStatus;

    @ApiModelProperty("满载状态(1.半载2.满载3.空载)")
    private Integer loadingStatus;

    @ApiModelProperty("车辆id")
    private Long truckId;

    @ApiModelProperty("车辆id")
    private List<Long> truckIds;

    @ApiModelProperty("计划发车时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime planDepartureTime;

    @ApiModelProperty("实际发车时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime actualDepartureTime;

    @ApiModelProperty("计划到达时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime planArrivalTime;

    @ApiModelProperty("实际到达时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime actualArrivalTime;


    @ApiModelProperty("任务创建时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime createTime;

    @ApiModelProperty("页码")
    private Integer page;

    @ApiModelProperty("页尺寸")
    private Integer pageSize;

}
