package com.sl.ms.web.courier.vo.pay;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("支付二维码相关数据")
public class TradeResponseVO {
    @ApiModelProperty(value = "二维码base64数据")
    private String qrCode;

    @ApiModelProperty(value = "交易系统订单号【对于三方来说：商户订单】")
    private Long tradingOrderNo;
}
