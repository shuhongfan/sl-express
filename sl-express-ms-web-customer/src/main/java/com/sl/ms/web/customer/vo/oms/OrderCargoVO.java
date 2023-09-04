package com.sl.ms.web.customer.vo.oms;

import com.sl.ms.web.customer.vo.base.GoodsTypeVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

/**
 * 货品总重量
 */
@Data
@ApiModel(value = "货物信息")
public class OrderCargoVO {

    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "货物类型信息")
    private GoodsTypeVO goodsType;

    @ApiModelProperty(value = "货物名称")
    private String name;

    @ApiModelProperty(value = "货物单位")
    private String unit;

    @ApiModelProperty(value = "货品货值")
    private BigDecimal cargoValue;

    @ApiModelProperty(value = "货品条码")
    private String cargoBarcode;

    @ApiModelProperty(value = "货品数量")
    private Integer quantity;

    @ApiModelProperty(value = "货品体积")
    private BigDecimal volume;

    @ApiModelProperty(value = "货品重量")
    private BigDecimal weight;

    @ApiModelProperty(value = "货品备注")
    private String remark;

    @ApiModelProperty(value = "货品总体积")
    private BigDecimal totalVolume;

    @ApiModelProperty(value = "货品总重量")
    private BigDecimal totalWeight;
}
