package com.sl.ms.web.customer.vo.oms;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderCarriageVO {

    /**
     * 运费模板id
     */
    @ApiModelProperty(value = "主键")
    private Long id;

    /**
     * 模板类型：1-同城寄，2-省内寄，3-经济区互寄，4-跨省
     */
    @ApiModelProperty(value = "模板类型：1-同城寄，2-省内寄，3-经济区互寄，4-跨省", required = true)
    @Max(value = 4, message = "类型值必须是1、2、3、4")
    @Min(value = 1, message = "类型值必须是1、2、3、4")
    @NotNull(message = "模板类型不能为空")
    private Integer templateType;

    /**
     * 运送类型：1-普快，2-特快
     */
    @ApiModelProperty(value = "运送类型：1-普快，2-特快", required = true)
    @Max(value = 2, message = "类型值必须是1、2")
    @Min(value = 1, message = "类型值必须是1、2")
    @NotNull(message = "运送类型不能为空")
    private Integer transportType;

    /**
     * 关联城市：1-全国，2-京津冀，3-江浙沪，4-川渝，5-黑吉辽
     */

    @ApiModelProperty(value = "关联城市：1-全国，2-京津冀，3-江浙沪，4-川渝，5-黑吉辽", required = true)
    @NotNull(message = "关联城市不能为空")
    private List<String> associatedCityList;

    /**
     * 首重价格
     */
    @ApiModelProperty(value = "首重价格", required = true)
    @DecimalMin(value = "0.1", message = "首重价格必须大于0")
    @NotNull(message = "首重价格不能为空")
    private Double firstWeight;

    /**
     * 续重价格
     */
    @ApiModelProperty(value = "续重价格", required = true)
    @DecimalMin(value = "0.1", message = "续重价格必须大于0")
    @NotNull(message = "续重价格不能为空")
    private Double continuousWeight;

    /**
     * 基础运费
     */
    @ApiModelProperty(value = "基础运费")
    private Double baseFreight;

    /**
     * 轻抛系数
     */
    @ApiModelProperty(value = "轻抛系数", required = true)
    @Min(value = 1, message = "轻抛系数必须大于0")
    @NotNull(message = "轻抛系数不能为空")
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
