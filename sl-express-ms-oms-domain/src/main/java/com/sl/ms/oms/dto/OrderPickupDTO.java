package com.sl.ms.oms.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
@ApiModel("取件模型")
public class OrderPickupDTO {
    @ApiModelProperty(value = "订单Id", required = true)
    private Long id;

    @ApiModelProperty(value = "物品名称")
    private String goodName;

    @ApiModelProperty(value = "体积，单位m^3", required = true)
    private BigDecimal volume;

    @ApiModelProperty(value = "重量，单位kg", required = true)
    private BigDecimal weight;

    @ApiModelProperty("备注")
    private String remark;

    @ApiModelProperty(value = "付款方式,1.寄付，2到付", required = true)
    private Integer payMethod;

    @ApiModelProperty(value = "金额", required = true)
    private BigDecimal amount;
}
