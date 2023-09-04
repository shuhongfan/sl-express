package com.sl.ms.web.manager.vo.baseTruck;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class DriverUpdateVO {
    @ApiModelProperty(value = "司机id")
    private Long userId;

    @ApiModelProperty(value = "司机姓名")
    private String name;

    @ApiModelProperty(value = "工号")
    private String workNumber;

    @ApiModelProperty(value = "手机号")
    private String mobile;

    @ApiModelProperty(value = "头像")
    private String avatar;

    @ApiModelProperty(value = "工作状态")
    private Integer workStatus;

    @ApiModelProperty(value = "年龄")
    private Integer age;
}
