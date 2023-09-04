package com.sl.ms.base.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

/**
 * TruckDriverLicenseDto
 */
@Data
public class TruckDriverLicenseDto {

    /**
     * id
     */
    private Long id;
    /**
     * 用户id
     */
    private Long userId;

    /**
     * 准驾车型
     */
    private String allowableType;

    /**
     * 初次领证日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate initialCertificateDate;

    /**
     * 有效期限
     */
    private String validPeriod;

    /**
     * 驾驶证号
     */
    private String licenseNumber;

    /**
     * 驾龄
     */
    private Integer driverAge;

    /**
     * 驾驶证类型
     */
    private String licenseType;

    /**
     * 从业资格证信息
     */
    private String qualificationCertificate;

    /**
     * 入场证信息
     */
    private String passCertificate;

    /**
     * 图片
     */
    private String picture;
}