package com.sl.ms.oms.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.Data;

import java.math.BigDecimal;

/**
 * 货品总重量
 */
@Data
@TableName("sl_order_cargo")
public class OrderCargoEntity extends BaseEntity {

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
    private String goodsTypeId;
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
     * 货品总体积 m^3
     */
    private BigDecimal totalVolume;

    /**
     * 货品总重量 kg
     */
    private BigDecimal totalWeight;
}
