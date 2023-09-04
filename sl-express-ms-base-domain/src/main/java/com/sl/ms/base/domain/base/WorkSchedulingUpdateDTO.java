package com.sl.ms.base.domain.base;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("排班修改模型")
public class WorkSchedulingUpdateDTO {
    @ApiModelProperty("排班id")
    private Long id;
    @ApiModelProperty("工作模式id")
    private Long workPatternId;

    @ApiModelProperty("工作模式类型，1:礼拜制，2：连续制")
    private Byte workPatternType;

    @ApiModelProperty("操作人")
    private Long operator;

}
