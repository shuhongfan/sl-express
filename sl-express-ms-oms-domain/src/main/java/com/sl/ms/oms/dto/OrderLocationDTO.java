package com.sl.ms.oms.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 位置信息
 */
@ApiModel("位置信息")
@Data
public class OrderLocationDTO {

    @ApiModelProperty(value = "主键", required = true)
    private Long id;
    /**
     * 订单id
     */
    @ApiModelProperty(value = "订单id", required = true)
    private Long orderId;
    /**
     * 发送地址坐标
     */
    @ApiModelProperty(value = "发送地址坐标", required = false)
    private String sendLocation;
    /**
     * 收货地址坐标
     */
    @ApiModelProperty(value = "收货地址坐标", required = false)
    private String receiveLocation;
    /**
     * 发送起始网点
     */
    @ApiModelProperty(value = "发送起始网点", required = false)
    private String sendAgentId;

    /**
     * 接受的终止网点
     */
    @ApiModelProperty(value = "接受的终止网点", required = false)
    private String receiveAgentId;
    /**
     * 记录状态 0：无效，1有效
     */
    @ApiModelProperty(value = "记录状态", required = false)
    private String status;
}
