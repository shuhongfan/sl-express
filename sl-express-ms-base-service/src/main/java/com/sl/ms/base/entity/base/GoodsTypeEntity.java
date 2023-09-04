package com.sl.ms.base.entity.base;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * 货物类型表
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sl_goods_type")
public class GoodsTypeEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 货物类型名称
     */
    private String name;
    /**
     * 默认重量，单位：千克
     */
    private BigDecimal defaultWeight;
    /**
     * 默认体积，单位：方
     */
    private BigDecimal defaultVolume;
    /**
     * 说明
     */
    private String remark;
    /**
     * 状态 0：禁用 1：正常
     */
    private Integer status;
}
