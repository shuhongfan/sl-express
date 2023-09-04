package com.sl.ms.carriage.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * 运费模板表
 */
@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@TableName("sl_carriage")
public class CarriageEntity extends BaseEntity {

    private static final long serialVersionUID = -5358753714676282742L;

    /**
     * 模板类型：1-同城寄，2-省内寄，3-经济区互寄，4-跨省
     */
    private Integer templateType;

    /**
     * 运送类型：1-普快，2-特快
     */
    private Integer transportType;

    /**
     * 关联城市：1-全国，2-京津冀，3-江浙沪，4-川渝，5-黑吉辽
     */
    private String associatedCity;

    /**
     * 首重价格
     */
    private Double firstWeight;

    /**
     * 续重价格
     */
    private Double continuousWeight;

    /**
     * 轻抛系数
     */
    private Integer lightThrowingCoefficient;

}
