package com.sl.ms.web.courier.vo.task;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.hibernate.validator.constraints.Range;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@ApiModel("任务查询对象")
public class TaskQueryVO {
    @ApiModelProperty(value = "经度", required = true, example = "116.372809")
    @NotNull(message = "经度不能为空！")
    private Double longitude;

    @ApiModelProperty(value = "纬度", required = true, example = "40.062595")
    @NotNull(message = "纬度不能为空！")
    private Double latitude;

    @ApiModelProperty(value = "页码", required = true)
    @NotNull(message = "页码不能为空！")
    private Integer page;

    @ApiModelProperty(value = "页面大小", required = true)
    @NotNull(message = "页面大小不能为空！")
    private Integer pageSize;

    @ApiModelProperty(value = "任务状态，1待取件，2已取件，3已取消，4待派件，5已签收")
    private Integer taskStatus;

    @ApiModelProperty(value = "任务类型，1为取件任务，2为派件任务")
    @Range(min = 1, max = 2, message = "任务类型取值范围1-2")
    private Integer taskType;

    @ApiModelProperty(value = "任务状态，1为新任务、2为已完成、3为已取消")
    @Range(min = 1, max = 3, message = "任务状态取值范围1-3")
    private Integer status;

    @ApiModelProperty(value = "距离排序，1升序，2降序")
    @Range(min = 1, max = 2, message = "距离排序取值范围1-2")
    private Integer orderDistance;

    @ApiModelProperty(value = "时间排序，1升序，2降序")
    @Range(min = 1, max = 2, message = "时间排序取值范围1-2")
    private Integer orderTime;

    @ApiModelProperty(value = "过滤超时")
    private Boolean filterOverTime = false;

    @ApiModelProperty(value = "日期,格式：2022-06-23 00:00:00", required = true)
    @NotNull(message = "日期不能为空！")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateTime;
}
