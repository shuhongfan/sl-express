package com.sl.ms.web.courier.vo.pay;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.DecimalMin;
import java.math.BigDecimal;

@Data
@ApiModel("支付发起对象")
public class TradeLaunchVO {
    @ApiModelProperty(value = "订单号", required = true)
    private String productOrderNo;

    @ApiModelProperty(value = "支付渠道,1-支付宝，2-微信支付;默认为2", required = true, example = "2")
    private Integer payMethod = 2;

    @ApiModelProperty(value = "交易金额，单位：元", required = true)
    @DecimalMin("0.01")
    private BigDecimal tradingAmount;

    @ApiModelProperty(value = "备注，如：运费", required = true)
    private String memo = "金额";
}
