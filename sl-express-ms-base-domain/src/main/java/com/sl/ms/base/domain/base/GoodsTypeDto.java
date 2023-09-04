package com.sl.ms.base.domain.base;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * GoodsTypeDto
 */
@Data
public class GoodsTypeDto {

    /**
     * id
     */
    @ApiModelProperty("主键")
    private Long id;
    /**
     * 货物类型名称
     */
    @ApiModelProperty("物品类型名称")
    private String name;
    /**
     * 默认重量，单位：千克
     */
    @ApiModelProperty("默认重量")
    private BigDecimal defaultWeight;
    /**
     * 默认体积，单位：方
     */
    @ApiModelProperty("默认体积")
    private BigDecimal defaultVolume;
    /**
     * 说明
     */
    @ApiModelProperty("备注")
    private String remark;
    /**
     * 车辆类型id列表
     */
    private List<Long> truckTypeIds;
    /**
     * 状态 0：禁用 1：正常
     */
    @ApiModelProperty("状态 0：禁用 1：正常")
    private Integer status;
}