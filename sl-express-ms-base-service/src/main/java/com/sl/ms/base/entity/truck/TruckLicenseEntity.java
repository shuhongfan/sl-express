package com.sl.ms.base.entity.truck;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 车辆行驶证表
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sl_truck_license")
public class TruckLicenseEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 车辆id
     */
    private Long truckId;
    /**
     * 发动机编号
     */
    private String engineNumber;

    /**
     * 注册时间
     */
    private LocalDate registrationDate;

    /**
     * 国家强制报废日期
     */
    private LocalDate mandatoryScrap;

    /**
     * 检验有效期
     */
    private LocalDate expirationDate;

    /**
     * 整备质量
     */
    private BigDecimal overallQuality;

    /**
     * 核定载质量
     */
    private BigDecimal allowableWeight;

    /**
     * 外廓尺寸
     */
    private String outsideDimensions;

    /**
     * 行驶证有效期
     */
    private LocalDate validityPeriod;

    /**
     * 行驶证号
     */
    private String transportCertificateNumber;

    /**
     * 图片信息
     */
    private String picture;
}
