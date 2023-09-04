package com.sl.ms.oms.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class OrderDTO {
    /**
     * id
     */
    private Long id;

    /**
     * 订单类型，1为同城订单，2为城际订单
     */
    private Integer orderType;


    /**
     * 取件类型，1为网点自寄，2为上门取件
     */
    private Integer pickupType;

    @ApiModelProperty(value = "下单类型 1 寄件用户 2收件用户")
    private Integer mailType;

    /**
     * 下单时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
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
     * 收件人地址id
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
     * 发件人地址id
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

    /**
     * 页码
     */
    private Integer page;

    /**
     * 页尺寸
     */
    private Integer pageSize;

    private OrderCargoDTO orderCargoDto;

    /**
     * 备注
     */
    private String mark;

    /**
     * 预计取件时间
     */
    private LocalDateTime estimatedStartTime;

    /**
     * 首重价格
     */
    @ApiModelProperty(value = "首重价格")
    private Double firstWeight;

    /**
     * 续重价格
     */
    @ApiModelProperty(value = "续重价格")
    private Double continuousWeight;

    /**
     * 基础运费
     */
    @ApiModelProperty(value = "基础运费")
    private Double baseFreight;


    @ApiModelProperty(value = "交易系统订单号【对于三方来说：商户订单】")
    private Long tradingOrderNo;

    @ApiModelProperty(value = "支付渠道【支付宝、微信、现金、免单挂账】")
    private String tradingChannel;

    @ApiModelProperty(value = "退款金额【付款后】")
    private BigDecimal refund;

    @ApiModelProperty(value = "是否有退款：YES，NO")
    private String isRefund;

    @ApiModelProperty(value = "更新时间")
    private LocalDateTime updated;

    @ApiModelProperty(value = "搜索关键词")
    private String keyword;
}
