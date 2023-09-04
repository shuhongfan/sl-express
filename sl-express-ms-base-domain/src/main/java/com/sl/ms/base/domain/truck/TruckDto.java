package com.sl.ms.base.domain.truck;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

/**
 * TruckDto
 */
@Data
public class TruckDto {

    /**
     * id
     */
    private Long id;
    /**
     * 车辆类型id
     */
    private Long truckTypeId;
    /**
     * 品牌
     */
    private String brand;
    /**
     * 车牌号码
     */
    private String licensePlate;
    /**
     * GPS设备id
     */
    private String deviceGpsId;
    /**
     * 准载重量
     */
    private BigDecimal allowableLoad;
    /**
     * 准载体积
     */
    private BigDecimal allowableVolume;
    /**
     * 车辆行驶证信息id
     */
    private Long truckLicenseId;
    /**
     * 状态 0：禁用 1：正常
     */
    private Integer status;

    /**
     * 运输状态 0：已到达 1：运输中
     */
    private Integer runStatus;

    private Integer workStatus;

    //所在机构id
    private Long currentOrganId;

    /**
     * 图片信息
     */
    private String picture;

    /**
     * 满载系数
     */
    private Double loadingRatio;

    @ApiModelProperty(value = "司机数量")
    private Integer driverNum;

    @ApiModelProperty(value = "车辆类型名称")
    private String truckTypeName;
}