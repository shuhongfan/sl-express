package com.sl.ms.web.courier.vo.task;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@ApiModel("快递员搜索")
public class TaskSearchVO {
    @ApiModelProperty(value = "页码", example = "1", required = true)
    private Integer page = 1;

    @ApiModelProperty(value = "页面大小", example = "10", required = true)
    private Integer pgeSize = 10;

    @ApiModelProperty(value = "关键词;可以是运单号、手机号、姓名、地址等字段", required = true)
    @NotBlank(message = "关键词不能为空！")
    private String keyword;

    @ApiModelProperty(value = "任务类型，1-取件，2-派件")
    private Integer taskType;

    @ApiModelProperty(value = "任务状态，1-新任务，2-已完成，3-已取消")
    private Integer status;

    @ApiModelProperty(value = "经度", required = true, example = "116.372809")
    private Double longitude;

    @ApiModelProperty(value = "纬度", required = true, example = "40.062595")
    private Double latitude;
}
