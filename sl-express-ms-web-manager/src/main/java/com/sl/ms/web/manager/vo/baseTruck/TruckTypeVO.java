package com.sl.ms.web.manager.vo.baseTruck;

import com.sl.ms.web.manager.vo.baseCommon.GoodsTypeVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@ApiModel(value = "车辆类型")
public class TruckTypeVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "车辆类型名称")
    private String name;

    @ApiModelProperty(value = "准载重量")
    private BigDecimal allowableLoad = new BigDecimal("0.0");

    @ApiModelProperty(value = "准载体积")
    private BigDecimal allowableVolume = new BigDecimal("0.0");

    @ApiModelProperty(value = "长")
    private BigDecimal measureLong = new BigDecimal("0.0");

    @ApiModelProperty(value = "宽")
    private BigDecimal measureWidth = new BigDecimal("0.0");

    @ApiModelProperty(value = "高")
    private BigDecimal measureHigh = new BigDecimal("0.0");

    @ApiModelProperty(value = "货物类型列表")
    private List<GoodsTypeVO> goodsTypes;

    @ApiModelProperty(value = "车型数量")
    private Integer num;
}
