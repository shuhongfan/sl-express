package com.sl.ms.base.domain.truck;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * TruckLicenseDto
 */
@Data
public class TruckLicenseDto {

    /**
     * id
     */
    private Long id;
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
    @JsonFormat(
            pattern = "yyyy-MM-dd"
    )
    private LocalDate registrationDate;
    /**
     * 国家强制报废日期
     */
    @JsonFormat(
            pattern = "yyyy-MM-dd"
    )
    private LocalDate mandatoryScrap;
    /**
     * 检验有效期
     */
    @JsonFormat(
            pattern = "yyyy-MM-dd"
    )
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
    @JsonFormat(
            pattern = "yyyy-MM-dd"
    )
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