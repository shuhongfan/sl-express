package com.sl.ms.web.courier.vo.task;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@ApiModel("签收模型")
public class TaskSignVO {
    @ApiModelProperty(value = "派件任务id", required = true)
    @NotNull(message = "派件任务id不能为空！")
    private String id;

    @ApiModelProperty(value = "签收人，1本人，2代收", required = true)
    @NotNull(message = "签收人不能为空！")
    private Integer signRecipient;

}
