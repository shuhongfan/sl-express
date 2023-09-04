package com.sl.ms.base.entity.truck;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * 车辆类型表
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sl_truck_type")
public class TruckTypeEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

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
     * 状态 0：禁用 1：正常
     */
    private Integer status;
}
