package com.sl.ms.web.courier.vo.task;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@ApiModel("身份验证")
public class TaskIdCardCheckVO {
    @ApiModelProperty(value = "姓名", required = true)
    @NotBlank(message = "请输入您的姓名！")
    private String name;

    @ApiModelProperty(value = "身份证号", required = true)
    @NotBlank(message = "请输入您的身份证号！")
    private String idCard;
}
