package com.sl.ms.oms.dto;

import lombok.Data;

@Data
public class OrderDetailDTO {

    /**
     * 订单
     */
    private OrderDTO orderDTO;

    /**
     * 货物
     */
    private OrderLocationDTO orderLocationDTO;
}
