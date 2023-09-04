package com.sl.ms.user.domain.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 地址簿DTO
 */
@Data
public class AddressBookDTO {

    private Long id;

    /**
     * 用户id
     */
    @ApiModelProperty("用户id")
    private Long userId;
    /**
     * 名字
     */
    @ApiModelProperty("名字")
    private String name;
    /**
     * 手机号
     */
    @ApiModelProperty("手机号")
    private String phoneNumber;
    /**
     * 分机号
     */
    @ApiModelProperty("分机号")
    private String extensionNumber;
    /**
     * 省id
     */
    @ApiModelProperty("省ID")
    private Long provinceId;
    /**
     * 市id
     */
    @ApiModelProperty("市ID")
    private Long cityId;
    /**
     * 区域id
     */
    @ApiModelProperty("区ID")
    private Long countyId;
    /**
     * 详细地址
     */
    @ApiModelProperty("详细地址")
    private String address;
    /**
     * 公司名称
     */
    @ApiModelProperty("公司名称")
    private String companyName;
    /**
     * 是否默认  1默认
     */
    @ApiModelProperty("是否默认  1默认")
    private Integer isDefault;
    /**
     * 创建时间
     */
    @ApiModelProperty("创建时间")
    private LocalDateTime created;

    /**
     * 更新时间
     */
    @ApiModelProperty("更新时间")
    private LocalDateTime updated;

    /**
     * 是否展示  1默认
     */
    private Integer isShow;

    /**
     * 地址簿类型  1寄件 2收件
     */
    private Integer type;
}
