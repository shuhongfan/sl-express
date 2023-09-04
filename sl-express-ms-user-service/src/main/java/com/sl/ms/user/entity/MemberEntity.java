package com.sl.ms.user.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 用户表
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("sl_member")
public class MemberEntity extends BaseEntity {

    /**
     * 认证id
     */
    private String authId;
    /**
     * 身份证号
     */
    private String idCardNo;
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
     * 微信openID
     */
    private String openId;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 性别
     */
    private Integer sex;

    /**
     * 生日
     */
    private String birthday;

}
