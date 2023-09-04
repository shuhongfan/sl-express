package com.sl.ms.web.manager.vo.baseTruck;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
@ApiModel(value = "车辆信息")
public class TruckVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "车辆类型Id")
    private Long truckTypeId;

    @ApiModelProperty(value = "车辆类型名称")
    private String truckTypeName;

    @ApiModelProperty(value = "品牌")
    private String brand;

    @ApiModelProperty(value = "车牌号码")
    private String licensePlate;

    @ApiModelProperty(value = "GPS设备id")
    private String deviceGpsId;

    @ApiModelProperty(value = "准载重量")
    private BigDecimal allowableLoad = new BigDecimal("0.0");

    @ApiModelProperty(value = "准载体积")
    private BigDecimal allowableVolume = new BigDecimal("0.0");

    @ApiModelProperty(value = "车辆行驶证信息id")
    private Long truckLicenseId;

    @ApiModelProperty(value = "状态 0：禁用 1：正常")
    private Integer status;

    /**
     * 运输状态 0：已到达 1：运输中
     */
    @ApiModelProperty(value = "运输状态 0：已到达 1：运输中")
    private Integer runStatus;

    @ApiModelProperty(value = "工作状态 0：停用 1：启用")
    private Integer workStatus;

    @ApiModelProperty(value = "关联线路")
    private String transportLineName;

    @ApiModelProperty(value = "关联司机")
    private String driverName;

    @ApiModelProperty(value = "司机数量")
    private Integer driverNum;

    /**
     * 满载系数
     */
    @ApiModelProperty(value = "满载系数")
//    @NonNull
    private Double loadingRatio;

    /**
     * 图片信息
     */
    @ApiModelProperty(value = "图片信息")
    private String picture;
}
