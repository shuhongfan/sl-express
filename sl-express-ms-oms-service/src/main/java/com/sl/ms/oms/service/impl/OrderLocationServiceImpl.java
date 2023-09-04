package com.sl.ms.oms.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.oms.dto.OrderLocationDTO;
import com.sl.ms.oms.entity.OrderLocationEntity;
import com.sl.ms.oms.mapper.OrderLocationMapper;
import com.sl.ms.oms.service.OrderLocationService;
import org.springframework.stereotype.Service;

/**
 * 位置信息服务实现
 */
@Service
public class OrderLocationServiceImpl extends ServiceImpl<OrderLocationMapper, OrderLocationEntity>
        implements OrderLocationService {

    @Override
    public OrderLocationDTO findOrderLocationByOrderId(Long orderId) {
        QueryWrapper<OrderLocationEntity> queryWrapper = new QueryWrapper<OrderLocationEntity>()
                .eq("order_id", orderId).last(" limit 1");
        OrderLocationEntity location = getOne(queryWrapper);
        if (ObjectUtil.isNotEmpty(location)) {
            return BeanUtil.toBean(location, OrderLocationDTO.class);
        }
        return null;
    }
}
