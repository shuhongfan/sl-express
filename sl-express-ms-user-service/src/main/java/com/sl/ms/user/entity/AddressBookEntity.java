package com.sl.ms.user.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;

/**
 * 地址簿
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("sl_address_book")
public class AddressBookEntity extends BaseEntity {

    /**
     * 用户id
     */
    private Long userId;
    /**
     * 名字
     */
    @NotNull(message = "名字不能为空")
    private String name;
    /**
     * 手机号
     */
    @NotNull(message = "手机号不能为空")
    private String phoneNumber;
    /**
     * 分机号
     */
    private String extensionNumber;
    /**
     * 省id
     */
    private Long provinceId;
    /**
     * 市id
     */
    private Long cityId;
    /**
     * 区域id
     */
    private Long countyId;
    /**
     * 详细地址
     */
    private String address;
    /**
     * 公司名称
     */
    private String companyName;
    /**
     * 是否默认地址  1是 0否
     */
    private Integer isDefault;

    /**
     * 是否展示  1展示 0 不展示
     */
    private Integer isShow;

    /**
     * 地址簿类型  1寄件 2收件
     */
    private Integer type;

}
