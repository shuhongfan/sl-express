package com.sl.ms.web.manager.vo.workspace;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "今日数据")
public class TodayDataVO {
    @ApiModelProperty(value = "订单金额", required = true)
    private Double orderAmount;

    @ApiModelProperty(value = "订单金额变化数值", required = true)
    private Double orderAmountChanges;

    @ApiModelProperty(value = "订单笔数", required = true)
    private Integer orderNumber;

    @ApiModelProperty(value = "订单笔数变化数值", required = true)
    private Integer orderNumberChanges;

    @ApiModelProperty(value = "运输任务数量", required = true)
    private Integer transportTaskNumber;

    @ApiModelProperty(value = "运输任务变化数值", required = true)
    private Integer transportTaskNumberChanges;

    @ApiModelProperty(value = "运输中任务数量", required = true)
    private Integer taskInTransitNumber;

    @ApiModelProperty(value = "运输中任务比率", required = true)
    private Double taskInTransitRate;

    @ApiModelProperty(value = "派送中任务数量", required = true)
    private Integer taskInDeliveryNumber;

    @ApiModelProperty(value = "派送中任务比率", required = true)
    private Double taskInDeliveryRate;
}
