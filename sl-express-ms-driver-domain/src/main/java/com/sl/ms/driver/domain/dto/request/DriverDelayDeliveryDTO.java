package com.sl.ms.driver.domain.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@ApiModel("延迟提货对象")
public class DriverDelayDeliveryDTO {
    @ApiModelProperty(value = "司机作业单id", required = true)
    @NotNull(message = "司机作业单id不能为空")
    private String id;

    @ApiModelProperty(value = "延迟时间", required = true, example = "2022-07-18 15:20:00")
    @NotNull(message = "延迟时间不能为空")
    private String delayTime;

    @ApiModelProperty(value = "延迟原因", required = true)
    @NotNull(message = "延迟原因不能为空")
    private String delayReason;
}
