package com.sl.ms.oms.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.oms.dto.OrderCargoDTO;
import com.sl.ms.oms.dto.OrderDTO;
import com.sl.ms.oms.dto.OrderPickupDTO;
import com.sl.ms.oms.dto.OrderStatusCountDTO;
import com.sl.ms.oms.entity.OrderCargoEntity;
import com.sl.ms.oms.entity.OrderEntity;
import com.sl.ms.oms.entity.OrderLocationEntity;
import com.sl.ms.oms.enums.MailType;
import com.sl.ms.oms.enums.OrderPaymentStatus;
import com.sl.ms.oms.enums.OrderPickupType;
import com.sl.ms.oms.enums.OrderStatus;
import com.sl.ms.oms.mapper.OrderMapper;
import com.sl.ms.oms.service.CrudOrderService;
import com.sl.ms.oms.service.OrderCargoService;
import com.sl.ms.oms.service.OrderLocationService;
import com.sl.ms.user.api.MemberFeign;
import com.sl.ms.user.domain.dto.MemberDTO;
import com.sl.ms.work.api.TransportOrderFeign;
import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.vo.TradeStatusMsg;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 订单  服务实现类
 */
@Service
@Slf4j
public class CrudOrderServiceImpl extends ServiceImpl<OrderMapper, OrderEntity> implements CrudOrderService {

    @Resource
    private OrderCargoService orderCargoService;

    @Resource
    private OrderLocationService orderLocationService;

    @Resource
    private MemberFeign memberFeign;

    @Resource
    private TransportOrderFeign transportOrderFeign;

    @Transactional
    @Override
    public void saveOrder(OrderEntity order, OrderCargoEntity orderCargo, OrderLocationEntity orderLocation) throws SLException {
        order.setCreateTime(LocalDateTime.now());
        order.setPaymentStatus(OrderPaymentStatus.UNPAID.getStatus());
        if (OrderPickupType.NO_PICKUP.getCode().equals(order.getPickupType())) {
            order.setStatus(OrderStatus.OUTLETS_SINCE_SENT.getCode());
        } else {
            order.setStatus(OrderStatus.PENDING.getCode());
        }
        // 保存订单
        if (save(order)) {
            // 保存货物
            orderCargo.setOrderId(order.getId());
            orderCargoService.saveSelective(orderCargo);
            // 保存位置
            orderLocation.setOrderId(order.getId());
            orderLocationService.save(orderLocation);
            return;
        }
        throw new SLException("保存订单失败");
    }

    @Override
    public Page<OrderEntity> findByPage(Integer page, Integer pageSize, OrderDTO orderDTO) {
        OrderEntity order = BeanUtil.toBean(orderDTO, OrderEntity.class);

        Page<OrderEntity> iPage = new Page<>(page, pageSize);
        LambdaQueryWrapper<OrderEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();

        // 客户端搜索
        if (ObjectUtil.isNotEmpty(orderDTO.getKeyword())) {
            List<Long> orderIds = new ArrayList<>();
            // 运单号
            try {
                TransportOrderDTO transportOrderDTO = transportOrderFeign.findById(orderDTO.getKeyword());
                Long orderId = transportOrderDTO.getOrderId();
                orderIds.add(orderId);
            } catch (Exception ignored) {
                log.info("Exception:{}", ignored.getMessage());
            }

            // 订单号
            if (NumberUtil.isLong(orderDTO.getKeyword())) {
                orderIds.add(Long.valueOf(orderDTO.getKeyword()));
            }

            // 搜索条件不满足
            if (CollUtil.isEmpty(orderIds)) {
                return iPage;
            }

            // 查询条件
            lambdaQueryWrapper.in(CollUtil.isNotEmpty(orderIds), OrderEntity::getId, orderIds);
        }

        lambdaQueryWrapper
                .like(ObjectUtil.isNotEmpty(order.getId()), OrderEntity::getId, order.getId())
                .eq(ObjectUtil.isNotEmpty(order.getStatus()), OrderEntity::getStatus, order.getStatus())
                .eq(ObjectUtil.isNotEmpty(order.getPaymentStatus()), OrderEntity::getPaymentStatus, order.getPaymentStatus())

                //发件人信息
                .like(ObjectUtil.isNotEmpty(order.getSenderName()), OrderEntity::getSenderName, order.getSenderName())
                .like(StrUtil.isNotEmpty(order.getSenderPhone()), OrderEntity::getSenderPhone, order.getSenderPhone())
                .eq(ObjectUtil.isNotEmpty(order.getSenderProvinceId()), OrderEntity::getSenderProvinceId, order.getSenderProvinceId())
                .eq(ObjectUtil.isNotEmpty(order.getSenderCityId()), OrderEntity::getSenderCityId, order.getSenderCityId())
                .eq(ObjectUtil.isNotEmpty(order.getSenderCountyId()), OrderEntity::getSenderCountyId, order.getSenderCountyId())

                //收件人信息
                .like(ObjectUtil.isNotEmpty(order.getReceiverName()), OrderEntity::getReceiverName, order.getReceiverName())
                .eq(ObjectUtil.isNotEmpty(order.getReceiverProvinceId()), OrderEntity::getReceiverProvinceId, order.getReceiverProvinceId())
                .eq(ObjectUtil.isNotEmpty(order.getReceiverCityId()), OrderEntity::getReceiverCityId, order.getReceiverCityId())
                .eq(ObjectUtil.isNotEmpty(order.getReceiverCountyId()), OrderEntity::getReceiverCountyId, order.getReceiverCountyId())

                // 不展示删除状态
                .ne(OrderEntity::getStatus, OrderStatus.DEL.getCode());

        // 是否客户端查询
        boolean isQueryByCustom = ObjectUtil.isNotEmpty(orderDTO.getMailType());

        // 收件人手机号查询 客户端、管理端共用
        lambdaQueryWrapper
                .eq(isQueryByCustom && StrUtil.isNotEmpty(order.getReceiverPhone()), OrderEntity::getReceiverPhone, order.getReceiverPhone())
                .like(!isQueryByCustom && StrUtil.isNotEmpty(order.getReceiverPhone()), OrderEntity::getReceiverPhone, order.getReceiverPhone())
                // 客户端非寄件列表 不展示这些状态
                .notIn(isQueryByCustom && !MailType.SEND.getCode().equals(orderDTO.getMailType()), OrderEntity::getStatus, Arrays.asList(OrderStatus.CLOSE.getCode(), OrderStatus.CANCELLED.getCode(), OrderStatus.PENDING.getCode()));

        // 客户端 寄件列表
        lambdaQueryWrapper.eq(isQueryByCustom && MailType.SEND.getCode().equals(orderDTO.getMailType()), OrderEntity::getMemberId, order.getMemberId());

        // 客户端 混合列表 客户端根据用户ID查询 或者用收件人手机号查询都可以
        lambdaQueryWrapper.or(isQueryByCustom && MailType.ALL.getCode().equals(orderDTO.getMailType()))
                .eq(isQueryByCustom && MailType.ALL.getCode().equals(orderDTO.getMailType()), OrderEntity::getMemberId, order.getMemberId())
                .ne(isQueryByCustom && MailType.ALL.getCode().equals(orderDTO.getMailType()), OrderEntity::getStatus, OrderStatus.DEL.getCode());
        lambdaQueryWrapper.orderBy(true, false, OrderEntity::getCreateTime);
        return page(iPage, lambdaQueryWrapper);
    }

    @Override
    public List<OrderEntity> findAll(List<Long> ids) {
        LambdaQueryWrapper<OrderEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        if (ObjectUtil.isNotEmpty(ids) && ids.size() > 0) {
            lambdaQueryWrapper.in(OrderEntity::getId, ids);
        }
        lambdaQueryWrapper.orderBy(true, false, OrderEntity::getCreateTime);
        return list(lambdaQueryWrapper);
    }

    /**
     * 统计各个状态的数量
     *
     * @param memberId 用户ID
     * @return 状态数量数据
     */
    @Override
    public List<OrderStatusCountDTO> groupByStatus(Long memberId) {
        List<OrderStatusCountDTO> list = new ArrayList<>();
        MemberDTO detail = memberFeign.detail(memberId);
        // 收件数量
        long count = count(Wrappers.<OrderEntity>lambdaQuery()
                .eq(OrderEntity::getReceiverPhone, detail.getPhone())
                .ne(OrderEntity::getStatus, OrderStatus.DEL.getCode())
                .notIn(OrderEntity::getStatus, Arrays.asList(OrderStatus.CLOSE.getCode(), OrderStatus.CANCELLED.getCode(), OrderStatus.PENDING.getCode()))
        );
        OrderStatusCountDTO orderStatusCountDTO = new OrderStatusCountDTO();
        orderStatusCountDTO.setStatus(MailType.RECEIVE);
        orderStatusCountDTO.setStatusCode(MailType.RECEIVE.getCode());
        orderStatusCountDTO.setCount(count);
        list.add(orderStatusCountDTO);

        // 寄件数量
        long sendCount = count(Wrappers.<OrderEntity>lambdaQuery()
                .eq(OrderEntity::getMemberId, memberId)
                .ne(OrderEntity::getStatus, OrderStatus.DEL.getCode())

        );
        OrderStatusCountDTO send = new OrderStatusCountDTO();
        send.setStatus(MailType.SEND);
        send.setStatusCode(MailType.SEND.getCode());
        send.setCount(sendCount);
        list.add(send);
        return list;
    }

    /**
     * 状态更新
     *
     * @param orderId 订单ID
     * @param code    状态码
     */
    @Override
    public void updateStatus(List<Long> orderId, Integer code) {
        update(Wrappers.<OrderEntity>lambdaUpdate()
                .in(OrderEntity::getId, orderId)
                .set(OrderEntity::getStatus, code));
    }

    /**
     * 快递员取件更新订单和货物信息
     *
     * @param orderPickupDTO 订单和货物信息
     */
    @Transactional
    @Override
    public void orderPickup(OrderPickupDTO orderPickupDTO) {
        //5.更新订单
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setPaymentMethod(orderPickupDTO.getPayMethod());//付款方式,1.预结2到付
        orderEntity.setPaymentStatus(OrderPaymentStatus.UNPAID.getStatus());//付款状态,1.未付2已付
        orderEntity.setAmount(orderPickupDTO.getAmount());//金额
        orderEntity.setStatus(OrderStatus.PICKED_UP.getCode());//订单状态
        orderEntity.setMark(orderPickupDTO.getRemark());//备注
        orderEntity.setId(orderPickupDTO.getId());
        updateById(orderEntity);

        //6.更新订单货品
        BigDecimal volume = NumberUtil.round(orderPickupDTO.getVolume(), 4);
        BigDecimal weight = NumberUtil.round(orderPickupDTO.getWeight(), 2);
        OrderCargoDTO cargoDTO = orderCargoService.findByOrderId(orderPickupDTO.getId());
        OrderCargoEntity orderCargoEntity = new OrderCargoEntity();
        orderCargoEntity.setName(orderPickupDTO.getGoodName());//货物名称
        orderCargoEntity.setVolume(volume);//货品体积，单位m^3
        orderCargoEntity.setWeight(weight);//货品重量，单位kg
        orderCargoEntity.setTotalVolume(volume);//货品总体积，单位m^3
        orderCargoEntity.setTotalWeight(weight);//货品总重量，单位kg
        orderCargoEntity.setId(cargoDTO.getId());
        orderCargoService.saveOrUpdate(orderCargoEntity);
    }

    /**
     * 更新支付状态
     *
     * @param ids    订单ID
     * @param status 状态
     */
    @Override
    public void updatePayStatus(List<Long> ids, Integer status) {
        LambdaUpdateWrapper<OrderEntity> updateWrapper = Wrappers.<OrderEntity>lambdaUpdate()
                .set(OrderEntity::getPaymentStatus, status)
                .in(OrderEntity::getId, ids);
        update(updateWrapper);
    }

    /**
     * 退款成功
     *
     * @param msgList 退款消息
     */
    @Override
    public void updateRefundInfo(List<TradeStatusMsg> msgList) {
        // 退款功能暂不实现 涉及逻辑较多
    }

    /**
     * 根据用户id查询订单
     *
     * @param memberId 用户id
     * @return 订单信息
     */
    @Override
    public List<OrderEntity> findByMemberId(Long memberId) {
        return list(Wrappers.<OrderEntity>lambdaQuery().eq(OrderEntity::getMemberId, memberId));
    }
}
