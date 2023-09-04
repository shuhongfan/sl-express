package com.sl.ms.web.customer.vo.oms;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NonNull;

import java.math.BigDecimal;

/**
 * 货品总重量
 */
@Data
public class OrderCargoUpdateVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @NonNull
    @ApiModelProperty(value = "订单信息")
    private Long orderId;

    @ApiModelProperty(value = "货物类型信息")
    private Long goodsTypeId;

    @ApiModelProperty(value = "运单id")
    private String tranOrderId;

    @ApiModelProperty(value = "货物名称")
    private String name;

    @ApiModelProperty(value = "货物单位")
    private String unit;

    @ApiModelProperty(value = "货品货值")
    private BigDecimal cargoValue = new BigDecimal("0.0");

    @ApiModelProperty(value = "货品条码")
    private String cargoBarcode;

    @ApiModelProperty(value = "货品数量")
    private Integer quantity;

    @ApiModelProperty(value = "货品体积")
    private BigDecimal volume = new BigDecimal("0.0");

    @ApiModelProperty(value = "货品重量")
    private BigDecimal weight = new BigDecimal("0.0");

    @ApiModelProperty(value = "货品备注")
    private String remark;

    @ApiModelProperty(value = "货品总体积")
    private BigDecimal totalVolume = new BigDecimal("0.0");

    @ApiModelProperty(value = "货品总重量")
    private BigDecimal totalWeight = new BigDecimal("0.0");
}
