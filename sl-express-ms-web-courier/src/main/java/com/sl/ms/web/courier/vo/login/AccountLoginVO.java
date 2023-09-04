package com.sl.ms.web.courier.vo.login;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@ApiModel("账号登录")
@Data
public class AccountLoginVO {
    @ApiModelProperty(value = "登录账号", required = true)
    @NotNull(message = "登录账号不能为空")
    private String account;
    @ApiModelProperty(value = "登录密码", required = true)
    @NotNull(message = "登录密码不能为空")
    private String password;

}
