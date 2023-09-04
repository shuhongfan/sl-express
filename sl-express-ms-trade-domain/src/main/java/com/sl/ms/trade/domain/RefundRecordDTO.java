package com.sl.ms.trade.domain;

import com.sl.ms.trade.enums.RefundStatusEnum;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * @Description：
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("退款对象")
public class RefundRecordDTO {

    @ApiModelProperty(value = "主键")
    private Long id;
    @ApiModelProperty(value = "交易系统订单号【对于三方来说：商户订单】")
    private Long tradingOrderNo;
    @ApiModelProperty(value = "业务系统订单号")
    private Long productOrderNo;
    @ApiModelProperty(value = "本次退款订单号")
    private String refundNo;
    @ApiModelProperty(value = "商户号")
    private Long enterpriseId;
    @ApiModelProperty(value = "退款渠道【支付宝、微信、现金】")
    private String tradingChannel;
    @ApiModelProperty(value = "退款状态")
    private RefundStatusEnum refundStatus;
    @ApiModelProperty(value = "返回编码")
    private String refundCode;
    @ApiModelProperty(value = "返回信息")
    private String refundMsg;
    @ApiModelProperty(value = "备注【订单门店，桌台信息】")
    private String memo;
    @ApiModelProperty(value = "原订单金额")
    private BigDecimal total;
    @ApiModelProperty(value = "创建时间")
    protected LocalDateTime created;
    @ApiModelProperty(value = "更新时间")
    protected LocalDateTime updated;

}
