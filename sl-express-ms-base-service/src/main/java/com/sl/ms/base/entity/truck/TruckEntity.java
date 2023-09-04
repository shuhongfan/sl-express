package com.sl.ms.base.entity.truck;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.ms.base.domain.enums.TruckRunStatusEnum;
import com.sl.transport.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * 车辆信息表
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sl_truck")
public class TruckEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

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
     * 运输状态 1：启用 2：停用
     * @see TruckWorkStatusEnum
     */
    private Integer workStatus;

    /**
     * 运输状态 0：已到达 1：运输中
     * @see TruckRunStatusEnum
     */
    private Integer runStatus;

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
}
