package com.sl.ms.driver.domain.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@ApiModel("司机交付对象")
public class DriverDeliverDTO {
    @ApiModelProperty(value = "司机作业id", required = true)
    @NotNull
    private String id;

    @ApiModelProperty(value = "交付凭证,多个图片url以逗号分隔", required = true)
    @NotNull
    private String transportCertificate;

    @ApiModelProperty(value = "交付图片,多个图片url以逗号分隔", required = true)
    @NotNull
    private String deliverPicture;
}
