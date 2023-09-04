package com.sl.ms.web.customer.vo.oms;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.web.customer.vo.base.AreaSimpleVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@ApiModel(value = "订单信息")
public class OrderVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "货品集合")
    private List<OrderCargoVO> orderCargoVOS;

    @ApiModelProperty(value = "订单类型，1为同城订单，2为城际订单")
    private Integer orderType;

    @ApiModelProperty(value = "取件类型，1为网点自寄，2为上门取件")
    private Integer pickupType;

    @ApiModelProperty(value = "下单时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime createTime;

    @ApiModelProperty(value = "客户id")
    private Long memberId;

    @ApiModelProperty(value = "收件人省份")
    private AreaSimpleVO receiverProvince;

    @ApiModelProperty(value = "收件人城市")
    private AreaSimpleVO receiverCity;

    @ApiModelProperty(value = "收件人区县")
    private AreaSimpleVO receiverCounty;

    @ApiModelProperty(value = "收件人详细地址")
    private String receiverAddress;

    @ApiModelProperty(value = "收件人姓名")
    private String receiverName;

    @ApiModelProperty(value = "收件人电话")
    private String receiverPhone;

    @ApiModelProperty(value = "发件人省份")
    private AreaSimpleVO senderProvince;

    @ApiModelProperty(value = "发件人城市")
    private AreaSimpleVO senderCity;

    @ApiModelProperty(value = "发件人区县")
    private AreaSimpleVO senderCounty;

    @ApiModelProperty(value = "发件人详细地址")
    private String senderAddress;

    @ApiModelProperty(value = "发件人姓名")
    private String senderName;

    @ApiModelProperty(value = "发件人电话")
    private String senderPhone;

    @ApiModelProperty(value = "付款方式,1.预结2到付")
    private Integer paymentMethod;

    @ApiModelProperty(value = "付款状态,1.未付2已付")
    private Integer paymentStatus;

    @ApiModelProperty(value = "金额")
    private BigDecimal amount = new BigDecimal("0.0");

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

    @ApiModelProperty(value = "预计到达时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime estimatedArrivalTime;

    @ApiModelProperty(value = "距离，单位：米")
    private Double distance;

    /**
     * 订单状态: 22000已关闭, 23000为待取件,23001为已取件，23002为网点自寄，23003为网点入库，
     * 23004为待装车，23005为运输中，23006为网点出库，23007为待派送，23008为派送中，
     * 23009为已签收，23010为拒收，230011为已取消
     */
    @ApiModelProperty(value = "订单状态: 22000已关闭,23000为待取件,23001为已取件，23002为网点自寄，" +
            "23003为网点入库，23004为待装车，23005为运输中，23006为网点出库，23007为待派送，" +
            "23008为派送中，23009为已签收，23010为拒收，230011为已取消")
    private Integer status;

    @ApiModelProperty(value = "页码")
    private Integer page;

    @ApiModelProperty(value = "页尺寸")
    private Integer pageSize;

    @ApiModelProperty(value = "运单ID")
    private String transportOrderId;

    @ApiModelProperty(value = "条形码内容 base64编码 png格式")
    private String barCode;

    @ApiModelProperty(value = "运单信息流")
    List<TransportOrderPointVO> transportOrderPointVOS;

    /**
     * 预计取件时间
     */
    @ApiModelProperty(value = "预计取件时间")
    private LocalDateTime estimatedStartTime;

    @ApiModelProperty(value = "更新时间")
    private LocalDateTime updated;
}
