package com.sl.ms.trade.domain;

import com.sl.ms.trade.enums.TradingStateEnum;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("交易数据对象")
public class TradingDTO {

    @ApiModelProperty(value = "主键")
    private Long id;
    @ApiModelProperty(value = "openId标识")
    private String openId;
    @ApiModelProperty(value = "业务系统订单号")
    private Long productOrderNo;
    @ApiModelProperty(value = "交易系统订单号【对于三方来说：商户订单】")
    private Long tradingOrderNo;
    @ApiModelProperty(value = "支付渠道【支付宝、微信、现金、免单挂账】")
    private String tradingChannel;
    @ApiModelProperty(value = "交易类型【付款、退款、免单、挂账】")
    private String tradingType;
    @ApiModelProperty(value = "交易单状态【DFK待付款,FKZ付款中,QXDD取消订单,YJS已结算,MD免单,GZ挂账】")
    private TradingStateEnum tradingState;
    @ApiModelProperty(value = "收款人姓名")
    private String payeeName;
    @ApiModelProperty(value = "收款人账户ID")
    private Long payeeId;
    @ApiModelProperty(value = "付款人姓名")
    private String payerName;
    @ApiModelProperty(value = "付款人Id")
    private Long payerId;
    @ApiModelProperty(value = "交易金额，单位：元")
    private BigDecimal tradingAmount;
    @ApiModelProperty(value = "退款金额【付款后】，单位：元")
    private BigDecimal refund;
    @ApiModelProperty(value = "是否有退款：YES，NO")
    private String isRefund;
    @ApiModelProperty(value = "第三方交易返回编码【最终确认交易结果】")
    private String resultCode;
    @ApiModelProperty(value = "第三方交易返回提示消息【最终确认交易信息】")
    private String resultMsg;
    @ApiModelProperty(value = "第三方交易返回信息json【分析交易最终信息】")
    private String resultJson;
    @ApiModelProperty(value = "统一下单返回编码")
    private String placeOrderCode;
    @ApiModelProperty(value = "统一下单返回信息")
    private String placeOrderMsg;
    @ApiModelProperty(value = "统一下单返回信息json【用于生产二维码、Android ios唤醒支付等】")
    private String placeOrderJson;
    @ApiModelProperty(value = "商户号")
    private Long enterpriseId;
    @ApiModelProperty(value = "备注，如：运费")
    private String memo;
    @ApiModelProperty(value = "二维码base64数据")
    private String qrCode;
    @ApiModelProperty(value = "是否有效")
    protected String enableFlag;
    @ApiModelProperty(value = "退款请求号")
    private String outRequestNo;
    @ApiModelProperty(value = "操作退款金额")
    private BigDecimal operTionRefund;
    @ApiModelProperty(value = "创建时间")
    protected LocalDateTime created;
    @ApiModelProperty(value = "更新时间")
    protected LocalDateTime updated;
}
