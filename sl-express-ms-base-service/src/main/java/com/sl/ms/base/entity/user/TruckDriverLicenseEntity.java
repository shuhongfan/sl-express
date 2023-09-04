package com.sl.ms.base.entity.user;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * 司机驾驶证表
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sl_truck_driver_license")
public class TruckDriverLicenseEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

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
