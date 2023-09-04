package com.sl.ms.base.domain.truck;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * TruckTypeDto
 */
@Data
public class TruckTypeDto {
    /**
     * id
     */
    private Long id;
    /**
     * 车辆类型名称
     */
    private String name;
    /**
     * 准载重量
     */
    private BigDecimal allowableLoad;
    /**
     * 准载体积
     */
    private BigDecimal allowableVolume;
    /**
     * 长
     */
    private BigDecimal measureLong;
    /**
     * 宽
     */
    private BigDecimal measureWidth;
    /**
     * 高
     */
    private BigDecimal measureHigh;
    /**
     * 货物类型id列表
     */
    private List<Long> goodsTypeIds;

    /**
     * 车型数量
     */
    private Integer num;
}