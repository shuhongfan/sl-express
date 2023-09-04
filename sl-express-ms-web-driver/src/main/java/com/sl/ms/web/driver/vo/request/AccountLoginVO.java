package com.sl.ms.web.driver.vo.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@ApiModel("账号登录请求")
public class AccountLoginVO {
    @ApiModelProperty(value = "登录账号", required = true)
    @NotNull(message = "登录账号不能为空")
    private String account;

    @ApiModelProperty(value = "登录密码", required = true)
    @NotNull(message = "登录密码不能为空")
    private String password;

}
