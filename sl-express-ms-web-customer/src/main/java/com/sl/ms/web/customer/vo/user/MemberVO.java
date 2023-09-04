package com.sl.ms.web.customer.vo.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 用户信息DTO
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class MemberVO {

    /**
     * 性别
     */
    @ApiModelProperty("性别,1-男，0-女")
    private Integer sex;

    /**
     * 生日
     */
    @ApiModelProperty("生日,1995-09-01")
    private String birthday;

    /**
     * 身份证号是否认证 1认证
     */
    private Integer idCardNoVerify;
    /**
     * 手机号
     */
    private String phone;
    /**
     * 姓名
     */
    private String name;

    /**
     * 身份证号
     */
    private String idCardNo;
}
