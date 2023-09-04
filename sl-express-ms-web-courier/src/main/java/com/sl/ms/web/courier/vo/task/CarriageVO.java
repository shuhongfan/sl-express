package com.sl.ms.web.courier.vo.task;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@ApiModel("运单费用查询结果")
public class CarriageVO {
    @ApiModelProperty("重量")
    private BigDecimal weight;

    @ApiModelProperty("运费合计")
    private String freight;

    @ApiModelProperty(value = "首重价格", required = true)
    private Double firstWeight;

    @ApiModelProperty(value = "续重价格", required = true)
    private Double continuousWeight;

}
