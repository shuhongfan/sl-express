package com.sl.ms.oms.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.math.BigDecimal;

/**
 * <p>
 * 货品总重量
 * </p>
 *
 * @author jpf
 * @since 2019-12-26
 */
@ApiModel("货物")
@Data
public class OrderCargoDTO {
    /**
     * id
     */
    private Long id;

    /**
     * 订单id
     */
    private Long orderId;

    /**
     * 运单id
     */
    private Long tranOrderId;
    /**
     * 货物类型id
     */
    private Long goodsTypeId;
    /**
     * 货物名称
     */
    private String name;

    /**
     * 货物单位
     */
    private String unit;

    /**
     * 货品货值
     */
    private BigDecimal cargoValue;

    /**
     * 货品条码
     */
    private String cargoBarcode;

    /**
     * 货品数量
     */
    private Integer quantity;

    /**
     * 货品体积
     */
    private BigDecimal volume;

    /**
     * 货品重量
     */
    private BigDecimal weight;

    /**
     * 货品备注
     */
    private String remark;

    /**
     * 货品总体积
     */
    private BigDecimal totalVolume;

    /**
     * 货品总重量
     */
    private BigDecimal totalWeight;
}
