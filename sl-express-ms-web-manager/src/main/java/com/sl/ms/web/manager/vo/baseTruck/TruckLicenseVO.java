package com.sl.ms.web.manager.vo.baseTruck;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
@ApiModel(value = "车辆行驶证信息")
public class TruckLicenseVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "发动机编号")
    private String engineNumber;

    @ApiModelProperty(value = "注册时间,格式:yyyy-MM-dd HH:mm:ss")
    private String registrationDate;

    @ApiModelProperty(value = "国家强制报废日期,格式:yyyy-MM-dd HH:mm:ss")
    private String mandatoryScrap;

    @ApiModelProperty(value = "检验有效期,格式:yyyy-MM-dd HH:mm:ss")
    private String expirationDate;

    @ApiModelProperty(value = "整备质量")
    private BigDecimal overallQuality = new BigDecimal("0.0");

    @ApiModelProperty(value = "核定载质量")
    private BigDecimal allowableWeight = new BigDecimal("0.0");

    @ApiModelProperty(value = "外廓尺寸")
    private String outsideDimensions;

    @ApiModelProperty(value = "行驶证有效期,格式:yyyy-MM-dd HH:mm:ss")
    private String validityPeriod;

    @ApiModelProperty(value = "行驶证号")
    private String transportCertificateNumber;

    @ApiModelProperty(value = "图片信息")
    private String picture;
}
