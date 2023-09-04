package com.sl.ms.web.manager.vo.workspace;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "月度订单数量")
public class MonthlyOrderAddVO {
    @ApiModelProperty(value = "月份", example = "6", required = true)
    private Integer month;

    @ApiModelProperty(value = "订单数量", required = true)
    private Integer orderNumber;
}
