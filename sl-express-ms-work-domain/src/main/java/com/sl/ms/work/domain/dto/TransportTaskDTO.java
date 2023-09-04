package com.sl.ms.work.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskAssignedStatus;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskLoadingStatus;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskStatus;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 运输任务
 */
@Data
public class TransportTaskDTO {

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
    private TransportTaskStatus status;

    @ApiModelProperty("任务分配状态(1未分配2已分配3待人工分配)")
    private TransportTaskAssignedStatus assignedStatus;

    @ApiModelProperty("满载状态(1.半载2.满载3.空载)")
    private TransportTaskLoadingStatus loadingStatus;

    @ApiModelProperty("车辆id")
    private Long truckId;

    @ApiModelProperty("提货凭证")
    private String cargoPickUpPicture;

    @ApiModelProperty("货物照片")
    private String cargoPicture;

    @ApiModelProperty("运回单凭证")
    private String transportCertificate;

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

    @ApiModelProperty("交付货物照片")
    private String deliverPicture;
    @ApiModelProperty("提货纬度")
    private String deliveryLatitude;
    @ApiModelProperty("提货经度")
    private String deliveryLongitude;
    @ApiModelProperty("交付纬度")
    private String deliverLatitude;
    @ApiModelProperty("交付经度")
    private String deliverLongitude;

    @ApiModelProperty("任务创建时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime createTime;

    @ApiModelProperty("运单id列表")
    private List<String> transportOrderIds;

    @ApiModelProperty("运单数量")
    private Integer transportOrderCount;

    @ApiModelProperty("页码")
    private Integer page;

    @ApiModelProperty("页尺寸")
    private Integer pageSize;

    @ApiModelProperty("id列表")
    private List<Long> ids;

    @ApiModelProperty("距离，单位：米")
    private Double distance;

    @ApiModelProperty("更新时间")
    private LocalDateTime updated;

}
