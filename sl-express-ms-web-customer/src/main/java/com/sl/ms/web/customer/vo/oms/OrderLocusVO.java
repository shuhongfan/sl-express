package com.sl.ms.web.customer.vo.oms;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("订单轨迹参数")
public class OrderLocusVO {
    @ApiModelProperty("业务id")
    private String businessId;

    @ApiModelProperty("开始时间")
    private String ge___time;

    @ApiModelProperty("结束时间")
    private String le___time;

    @ApiModelProperty("运输任务id")
    private String transportTaskId;
}
