package com.sl.ms.search.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@ApiModel("快递员任务")
public class CourierTaskDTO {

    @ApiModelProperty(value = "取派件任务id")
    private Long id;

    @ApiModelProperty(value = "订单id")
    private Long orderId;

    @ApiModelProperty(value = "运单id")
    private String transportOrderId;

    @ApiModelProperty(value = "电话")
    private String phone;

    @ApiModelProperty(value = "姓名")
    private String name;

    @ApiModelProperty(value = "任务类型，1-取件，2-派件")
    private Integer taskType;

    @ApiModelProperty(value = "任务状态，1-新任务，2-已完成，3-已取消")
    private Integer status;

    @ApiModelProperty(value = "快递员id")
    private Long courierId;

    @ApiModelProperty(value = "机构id")
    private Long agencyId;

    @ApiModelProperty(value = "地址")
    private String address;

    @ApiModelProperty(value = "预计开始时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime estimatedStartTime;

    @ApiModelProperty(value = "实际开始时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime actualStartTime;

    @ApiModelProperty(value = "预计结束时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime estimatedEndTime;

    @ApiModelProperty(value = "实际结束时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime actualEndTime;

    @ApiModelProperty(value = "是否删除,0-否，1-是")
    private Integer isDeleted;

    @ApiModelProperty(value = "创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime created;

    @ApiModelProperty(value = "更新时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime updated;
}
