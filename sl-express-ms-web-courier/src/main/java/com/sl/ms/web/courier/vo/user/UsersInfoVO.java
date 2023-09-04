package com.sl.ms.web.courier.vo.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@ApiModel("用户相关信息")
public class UsersInfoVO {
    @ApiModelProperty("用户id")
    private String id;

    @ApiModelProperty("姓名")
    private String name;

    @ApiModelProperty("账号")
    private String account;

    @ApiModelProperty("头像")
    private String avatar;

    @ApiModelProperty("手机号码")
    private String phone;

    @ApiModelProperty("显示星级")
    private Integer starLevel;

    @ApiModelProperty("所在网点")
    private String agencyName;

    @ApiModelProperty("上班时间")
    private LocalDateTime startTime;

    @ApiModelProperty("下班时间")
    private LocalDateTime endTime;

    @ApiModelProperty("专属二维码")
    private String exclusiveQrCodeUrl;


}
