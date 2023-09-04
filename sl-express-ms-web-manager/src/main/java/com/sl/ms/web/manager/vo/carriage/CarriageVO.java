package com.sl.ms.web.manager.vo.carriage;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CarriageVO {

    /**
     * 运费模板id
     */
    @ApiModelProperty(value = "主键")
    private Long id;

    /**
     * 模板类型：1-同城寄，2-省内寄，3-经济区互寄，4-跨省
     */
    @ApiModelProperty(value = "模板类型：1-同城寄，2-省内寄，3-经济区互寄，4-跨省", required = true)
    private Integer templateType;

    /**
     * 运送类型：1-普快，2-特快
     */
    @ApiModelProperty(value = "运送类型：1-普快，2-特快", required = true)
    private Integer transportType;

    /**
     * 关联城市：1-全国，2-京津冀，3-江浙沪，4-川渝，5-黑吉辽
     */

    @ApiModelProperty(value = "关联城市：1-全国，2-京津冀，3-江浙沪，4-川渝，5-黑吉辽", required = true)
    private List<String> associatedCityList;

    /**
     * 首重价格
     */
    @ApiModelProperty(value = "首重价格", required = true)
    private Double firstWeight;

    /**
     * 续重价格
     */
    @ApiModelProperty(value = "续重价格", required = true)
    private Double continuousWeight;

    /**
     * 轻抛系数
     */
    @ApiModelProperty(value = "轻抛系数", required = true)
    private Integer lightThrowingCoefficient;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    private LocalDateTime created;

    /**
     * 更新时间
     */
    @ApiModelProperty(value = "更新时间")
    private LocalDateTime updated;

    @ApiModelProperty(value = "运费")
    private Double expense;

    @ApiModelProperty(value = "计算重量")
    private Double computeWeight;
}
