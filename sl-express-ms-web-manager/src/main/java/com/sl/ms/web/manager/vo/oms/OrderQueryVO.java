package com.sl.ms.web.manager.vo.oms;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class OrderQueryVO {

    @ApiModelProperty(value = "页码")
    private Integer page;

    @ApiModelProperty(value = "页尺寸")
    private Integer pageSize;

    @ApiModelProperty(value = "id")
    private Long id;

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


    @ApiModelProperty(value = "收件人详细地址")
    private String receiverAddress;

    @ApiModelProperty(value = "收件人姓名")
    private String receiverName;

    @ApiModelProperty(value = "收件人电话")
    private String receiverPhone;

    @ApiModelProperty("发件人省份id")
    private Long senderProvinceId;
    @ApiModelProperty("发件人城市id")
    private Long senderCityId;
    @ApiModelProperty("发件人区域id")
    private Long senderCountyId;

    @ApiModelProperty("收件人省份id")
    private Long receiverProvinceId;
    @ApiModelProperty("收件人城市id")
    private Long receiverCityId;
    @ApiModelProperty("收件人区域id")
    private Long receiverCountyId;

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
    private BigDecimal amount;

    @ApiModelProperty(value = "预计到达时间")
    @JsonFormat(
            pattern = "yyyy-MM-dd HH:mm:ss"
    )
    private LocalDateTime estimatedArrivalTime;


    @ApiModelProperty(value = "订单状态: 23000为待取件,23001为已取件，23002为网点自寄，" +
            "23003为网点入库，23004为待装车，23005为运输中，23006为网点出库，23007为待派送，" +
            "23008为派送中，23009为已签收，23010为拒收，230011为已取消")
    private Integer status;
}
