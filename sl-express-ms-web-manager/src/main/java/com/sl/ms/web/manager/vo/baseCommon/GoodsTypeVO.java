package com.sl.ms.web.manager.vo.baseCommon;

import com.sl.ms.web.manager.vo.baseTruck.TruckTypeVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * GoodsTypeVo
 */
@Data
@ApiModel(value = "货物类型信息")
public class GoodsTypeVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "货物类型名称")
    private String name;

    @ApiModelProperty(value = "默认重量，单位：千克")
    private BigDecimal defaultWeight = new BigDecimal("0.0");

    @ApiModelProperty(value = "默认体积，单位：方")
    private BigDecimal defaultVolume = new BigDecimal("0.0");

    @ApiModelProperty(value = "说明")
    private String remark;

    @ApiModelProperty(value = "车辆类型")
    private List<TruckTypeVO> truckTypes;

    @ApiModelProperty("状态 0：禁用 1：正常")
    private Integer status;
}
