package com.sl.ms.oms.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.oms.dto.OrderLocationDTO;
import com.sl.ms.oms.entity.OrderLocationEntity;

/**
 * 位置信息 服务
 */
public interface OrderLocationService extends IService<OrderLocationEntity> {

    OrderLocationDTO findOrderLocationByOrderId(Long orderId);
}
