package com.sl.ms.oms.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 订单状态
 */
@Data
@Builder
@TableName("sl_order")
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity extends BaseEntity {
    private static final long serialVersionUID = 3686422248878046126L;

    /**
     * 订单类型，1为同城订单，2为城际订单
     */
    private Integer orderType;


    /**
     * 取件类型，1为同城订单，2为城际订单
     */
    private Integer pickupType;

    /**
     * 下单时间
     */
    private LocalDateTime createTime;

    /**
     * 客户id
     */
    private Long memberId;

    /**
     * 收件人省份id
     */
    private Long receiverProvinceId;

    /**
     * 收件人城市id
     */
    private Long receiverCityId;

    /**
     * 收件人区县id
     */
    private Long receiverCountyId;

    /**
     * 收件人详细地址
     */
    private String receiverAddress;

    /**
     * 收件人地址Id
     */
    private Long receiverAddressId;

    /**
     * 收件人姓名
     */
    private String receiverName;

    /**
     * 收件人电话
     */
    private String receiverPhone;

    /**
     * 发件人省份id
     */
    private Long senderProvinceId;

    /**
     * 发件人城市id
     */
    private Long senderCityId;

    /**
     * 发件人区县id
     */
    private Long senderCountyId;

    /**
     * 发件人详细地址
     */
    private String senderAddress;

    /**
     * 发件人地址Id
     */
    private Long senderAddressId;

    /**
     * 发件人姓名
     */
    private String senderName;

    /**
     * 发件人电话
     */
    private String senderPhone;

    /**
     * 当前所在网点
     */
    private Long currentAgencyId;

    /**
     * 付款方式,1.预结2到付
     */
    private Integer paymentMethod;

    /**
     * 付款状态,1.未付2已付
     */
    private Integer paymentStatus;

    /**
     * 金额
     */
    private BigDecimal amount;

    /**
     * 预计到达时间
     */
    private LocalDateTime estimatedArrivalTime;

    /**
     * 备注
     */
    private String mark;

    /**
     * 预计取件时间
     */
    private LocalDateTime estimatedStartTime;

    public LocalDateTime getEstimatedArrivalTime() {
        if (createTime == null) {
            return null;
        }
        estimatedArrivalTime = createTime.plusDays(4);
        return estimatedArrivalTime;
    }

    /**
     * 距离
     */
    @ApiModelProperty(value = "距离，单位：米")
    private Double distance;

    /**
     * 订单状态: 22000已关闭, 23000为待取件,23001为已取件，23002为网点自寄，23003为网点入库，
     * 23004为待装车，23005为运输中，23006为网点出库，23007为待派送，23008为派送中，
     * 23009为已签收，23010为拒收，230011为已取消
     */
    private Integer status;

    @ApiModelProperty(value = "交易系统订单号【对于三方来说：商户订单】")
    private Long tradingOrderNo;

    @ApiModelProperty(value = "支付渠道【支付宝、微信、现金、免单挂账】")
    private String tradingChannel;

    @ApiModelProperty(value = "退款金额【付款后】")
    private BigDecimal refund;

    @ApiModelProperty(value = "是否有退款：YES，NO")
    private String isRefund;



}
