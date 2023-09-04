package com.sl.transport.common.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * 交易状态消息
 */
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class TradeStatusMsg extends BaseMsg {

    /**
     * 交易单号
     */
    private Long tradingOrderNo;

    /**
     * 订单号
     */
    private Long productOrderNo;

    /**
     * 退款单号
     */
    private Long refundNo;

    /**
     * 支付/退款 状态名称
     */
    private String statusName;

    /**
     * 支付/退款 状态编码
     */
    private Integer statusCode;

}
