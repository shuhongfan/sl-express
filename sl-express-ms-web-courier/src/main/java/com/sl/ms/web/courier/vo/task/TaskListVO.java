package com.sl.ms.web.courier.vo.task;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.transport.common.util.DateUtils;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@ApiModel("取件派件任务模型")
public class TaskListVO {
    @ApiModelProperty("取件派件任务id")
    private String id;
    @ApiModelProperty("运单id")
    private Long transportOrderId;
    @ApiModelProperty("任务类型:1:代表取件，2：派件")
    private Integer type;
    @ApiModelProperty("任务时间，如果是取件理解为取件开始时间，如果是派件理解为派件时间,主要用来排序")
    @JsonFormat(pattern = DateUtils.DEFAULT_DATE_TIME_FORMAT, timezone = DateUtils.TIME_ZONE_8)
    private LocalDateTime taskTime;
    @ApiModelProperty("地址，这里不带省市区")
    private String addressDetail;
    @ApiModelProperty("寄件人")
    private String senderName;
    @ApiModelProperty("收件人")
    private String receiverName;
    @ApiModelProperty("距离，单位公里，待取件或者待派送才会计算距离")
    private Double distance;
    @ApiModelProperty("取件预约时间,格式05-03 10:00 至 11:00")
    private String appointmentTime;
    @ApiModelProperty("手机号")
    private String phone;
    @ApiModelProperty("取件超时时间或派件超时时间,可用于筛选即将要超时的订单")
    @JsonFormat(pattern = DateUtils.DEFAULT_DATE_TIME_FORMAT, timezone = DateUtils.TIME_ZONE_8)
    private LocalDateTime overTime;
}
