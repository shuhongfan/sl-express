package com.sl.ms.web.customer.vo.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginVO {

    @ApiModelProperty("微信唯一标识符")
    private String openid;
    @ApiModelProperty("短令牌，有效期较短")
    private String accessToken;
    @ApiModelProperty("长令牌，有效期较长")
    private String refreshToken;
    @ApiModelProperty("是否绑定手机号 0否 1是")
    private Integer binding;

}
