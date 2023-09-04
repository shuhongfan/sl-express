package com.sl.ms.web.manager.vo.workspace;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel(value = "近期订单总量(折线图)")
public class OrderLineChartVO {
    @ApiModelProperty(value = "订单最高值", required = true)
    private Integer orderMaxNumber;

    @ApiModelProperty(value = "订单平均值", required = true)
    private Integer orderAverageNumber;

    @ApiModelProperty(value = "订单最低值", required = true)
    private Integer orderMinNumber;

    @ApiModelProperty(value = "月度数据", required = true)
    private List<MonthlyOrderVO> monthlyOrderList;
}
