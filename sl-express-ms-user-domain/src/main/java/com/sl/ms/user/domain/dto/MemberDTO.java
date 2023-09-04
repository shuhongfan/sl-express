package com.sl.ms.user.domain.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * 用户信息DTO
 */
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(callSuper = false)
public class MemberDTO {

    private Long id;
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

    private String avatar;

    private String openId;

    /**
     * 性别
     */
    private Integer sex;

    /**
     * 生日
     */
    private String birthday;

    private LocalDateTime created;

    private LocalDateTime updated;
}
