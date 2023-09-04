package com.sl.ms.work.domain.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@ApiModel("运输任务开始")
public class TransportTaskStartDTO {
    @ApiModelProperty(value = "运输任务id", required = true)
    @NotNull
    private String transportTaskId;

    @ApiModelProperty(value = "提货凭证,多个图片url以逗号分隔", required = true)
    @NotNull
    private String cargoPickUpPicture;

    @ApiModelProperty(value = "货物照片,多个图片url以逗号分隔", required = true)
    @NotNull
    private String cargoPicture;
}
