package com.sl.ms.oms.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.Data;

/**
 * 订单位置信息
 */
@Data
@TableName("sl_order_location")
public class OrderLocationEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 订单id
     */
    private Long orderId;
    /**
     * 发送地址坐标
     */
    private String sendLocation;
    /**
     * 收货地址坐标
     */
    private String receiveLocation;
    /**
     * 发送起始网点
     */
    private Long sendAgentId;

    /**
     * 接受的终止网点
     */
    private Long receiveAgentId;
    /**
     * 记录状态 0：无效，1有效
     */
    private String status;

}
