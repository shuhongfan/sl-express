package com.sl.ms.trade.domain.request;

import com.sl.ms.trade.enums.PayChannelEnum;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class NativePayDTO {

    @ApiModelProperty(value = "商户号", required = true)
    @NotNull(message = "商户号不能为空")
    private Long enterpriseId;

    @ApiModelProperty(value = "业务系统订单号", required = true)
    @NotNull(message = "业务系统订单号不能为空")
    private Long productOrderNo;

    @ApiModelProperty(value = "支付渠道", required = true)
    @NotNull(message = "支付渠道不能为空")
    private PayChannelEnum tradingChannel;

    @ApiModelProperty(value = "交易金额，单位：元", required = true)
    @NotNull(message = "交易金额不能为空")
    private BigDecimal tradingAmount;

    @ApiModelProperty(value = "备注，如：运费", required = true)
    @NotNull(message = "备注不能为空")
    private String memo;
}
