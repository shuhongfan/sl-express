package com.sl.ms.web.driver.vo.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@ApiModel("运单")
public class TransportOrderVO {

    @ApiModelProperty(value = "运单id")
    private String id;

    @ApiModelProperty(value = "货品总重量")
    private BigDecimal totalWeight;

    @ApiModelProperty(value = "数量")
    private Integer count = 1;

    @ApiModelProperty(value = "创建时间")
    private LocalDateTime createTime;
}
