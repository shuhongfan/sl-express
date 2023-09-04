package com.sl.ms.search.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@ApiModel("快递员任务分页查询")
public class CourierTaskPageQueryDTO {
    @ApiModelProperty(value = "页码", example = "1", required = true)
    private Integer page = 1;

    @ApiModelProperty(value = "页面大小", example = "10", required = true)
    private Integer pgeSize = 10;

    @ApiModelProperty(value = "关键词;可以是运单号、手机号、姓名、地址等字段", required = true)
    @NotBlank
    private String keyword;

    @ApiModelProperty(value = "任务类型，1-取件，2-派件")
    private Integer taskType;

    @ApiModelProperty(value = "任务状态，1-新任务，2-已完成，3-已取消")
    private Integer status;

    @ApiModelProperty(value = "快递员id", required = true)
    private Long courierId;
}
