package com.sl.ms.driver.domain.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@ApiModel("提货对象")
public class DriverPickUpDTO {
    @ApiModelProperty(value = "司机作业id", required = true)
    @NotNull
    private String id;

    @ApiModelProperty(value = "提货凭证,多个图片url以逗号分隔", required = true)
    @NotNull
    private String cargoPickUpPicture;

    @ApiModelProperty(value = "货物照片,多个图片url以逗号分隔", required = true)
    @NotNull
    private String cargoPicture;
}
