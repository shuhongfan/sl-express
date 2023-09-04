package com.sl.ms.driver.domain.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 司机作业单
 */
@Data
@ApiModel("司机作业单")
public class DriverJobDTO {

    /**
     * id
     */
    private Long id;

    /**
     * 起始机构id
     */
    private Long startAgencyId;

    /**
     * 目的机构id
     */
    private Long endAgencyId;

    /**
     * 作业状态，1为待执行（对应 待提货）、2为进行中（对应在途）、3为改派（对应 已交付）、4为已完成（对应 已交付）、5为已作废
     */
    private DriverJobStatus status;

    /**
     * 司机id
     */
    private Long driverId;

    /**
     * 运输任务id
     */
    private Long transportTaskId;

    /**
     * 提货对接人
     */
    private String startHandover;

    /**
     * 交付对接人
     */
    private String finishHandover;

    /**
     * 计划发车时间
     */
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime planDepartureTime;

    /**
     * 实际发车时间
     */
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime actualDepartureTime;

    /**
     * 计划到达时间
     */
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime planArrivalTime;

    /**
     * 实际到达时间
     */
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime actualArrivalTime;

    /**
     * 创建时间
     */
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime created;

    /**
     * 是否可提货
     */
    private Boolean enablePickUp = false;
}
