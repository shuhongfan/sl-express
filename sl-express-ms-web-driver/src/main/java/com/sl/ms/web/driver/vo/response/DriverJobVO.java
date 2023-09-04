package com.sl.ms.web.driver.vo.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 司机作业单
 */
@Data
@ApiModel("司机作业单")
public class DriverJobVO {

    @ApiModelProperty(value = "司机作业单id")
    private String id;

    @ApiModelProperty(value = "起始机构id")
    private Long startAgencyId;

    @ApiModelProperty(value = "起始机构地址")
    private String startAddress;

    @ApiModelProperty(value = "目的机构id")
    private Long endAgencyId;

    @ApiModelProperty(value = "目的机构地址")
    private String endAddress;

    @ApiModelProperty(value = "作业状态，1为待提货）、2为在途）、3为改派）、4为已交付）、5为已作废")
    private DriverJobStatus status;

    @ApiModelProperty(value = "司机id")
    private String driverId;

    @ApiModelProperty(value = "运输任务id")
    private String transportTaskId;

    @ApiModelProperty(value = "提货对接人")
    private String startHandover;

    @ApiModelProperty(value = "交付对接人")
    private String finishHandover;

    @ApiModelProperty(value = "计划发车时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime planDepartureTime;

    @ApiModelProperty(value = "实际发车时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime actualDepartureTime;

    @ApiModelProperty(value = "计划到达时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime planArrivalTime;

    @ApiModelProperty(value = "实际到达时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime actualArrivalTime;

    @ApiModelProperty(value = "创建时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime created;

    @ApiModelProperty(value = "是否可提货")
    private Boolean enablePickUp = false;
}
