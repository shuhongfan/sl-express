package com.sl.ms.oms.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.oms.dto.OrderCargoDTO;
import com.sl.ms.oms.entity.OrderCargoEntity;
import com.sl.ms.oms.entity.OrderEntity;
import com.sl.ms.oms.mapper.OrderCargoMapper;
import com.sl.ms.oms.service.CrudOrderService;
import com.sl.ms.oms.service.OrderCargoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 货品总重量  服务实现类
 */
@Service
public class OrderCargoServiceImpl extends ServiceImpl<OrderCargoMapper, OrderCargoEntity>
        implements OrderCargoService {

    @Resource
    private CrudOrderService crudOrderService;

    @Override
    public OrderCargoEntity saveSelective(OrderCargoEntity record) {
        super.saveOrUpdate(record);
        return record;
    }

    @Override
    public List<OrderCargoEntity> findAll(Long tranOrderId, Long orderId) {
        LambdaQueryWrapper<OrderCargoEntity> queryWrapper = new LambdaQueryWrapper<>();
        if (ObjectUtil.isNotEmpty(tranOrderId)) {
            queryWrapper.eq(OrderCargoEntity::getTranOrderId, tranOrderId);
        }
        if (ObjectUtil.isNotEmpty(orderId)) {
            queryWrapper.eq(OrderCargoEntity::getOrderId, orderId);
        }
        queryWrapper.orderBy(true, false, OrderCargoEntity::getCreated);
        return super.list(queryWrapper);
    }

    /**
     * 根据订单id查询货品信息
     *
     * @param id 订单id
     * @return 货品信息
     */
    @Override
    public OrderCargoDTO findByOrderId(Long id) {
        //构造查询条件
        LambdaQueryWrapper<OrderCargoEntity> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(OrderCargoEntity::getOrderId,id);

        //根据订单id查询
        OrderCargoEntity orderCargo = getOne(queryWrapper);
        return BeanUtil.toBean(orderCargo, OrderCargoDTO.class);
    }

    @Override
    public List<OrderCargoDTO> listRecent(String name, Long memberId) {
        List<Long> orderIds = crudOrderService.findByMemberId(memberId).parallelStream().map(OrderEntity::getId).collect(Collectors.toList());
        if (CollUtil.isEmpty(orderIds)) {
            return new ArrayList<>();
        }
        return list(Wrappers.<OrderCargoEntity>lambdaQuery()
                .like(ObjectUtil.isNotEmpty(name), OrderCargoEntity::getName, name)
                .in(OrderCargoEntity::getOrderId, orderIds)
                .groupBy(ObjectUtil.isEmpty(name), OrderCargoEntity::getName)
                .last("limit 20")
                .orderByDesc(OrderCargoEntity::getCreated)
        )
                .stream()
                .map(orderCargo -> BeanUtil.toBean(orderCargo, OrderCargoDTO.class))
                .collect(Collectors.toList());
    }
}
