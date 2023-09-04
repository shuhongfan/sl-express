package com.sl.ms.web.courier.vo.login;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@ApiModel("登录返回信息")
@NoArgsConstructor
@AllArgsConstructor
public class LoginVO {
    @ApiModelProperty("用户登录token")
    private String token;
}
