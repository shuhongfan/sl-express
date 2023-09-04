package com.sl.ms.trade.domain.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 扫码支付响应数据
 *
 * @author zzj
 * @version 1.0
 */
@Data
public class JsapiPayResponseDTO {

    @ApiModelProperty(value = "业务系统订单号")
    private Long productOrderNo;
    @ApiModelProperty(value = "交易系统订单号【对于三方来说：商户订单】")
    private Long tradingOrderNo;
    @ApiModelProperty(value = "支付渠道【支付宝、微信、现金、免单挂账】")
    private String tradingChannel;
    @ApiModelProperty(value = "统一下单返回信息，预支付编号")
    private String placeOrderMsg;
    @ApiModelProperty(value = "统一下单返回信息json【用于生产二维码、Android ios唤醒支付等】")
    private String placeOrderJson;

}
