package com.sl.ms.oms.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.oms.dto.OrderDTO;
import com.sl.ms.oms.dto.OrderPickupDTO;
import com.sl.ms.oms.dto.OrderStatusCountDTO;
import com.sl.ms.oms.entity.OrderCargoEntity;
import com.sl.ms.oms.entity.OrderEntity;
import com.sl.ms.oms.entity.OrderLocationEntity;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.vo.TradeStatusMsg;

import java.util.List;

public interface CrudOrderService extends IService<OrderEntity> {

    /**
     * 新增订单
     *
     * @param order         订单信息
     * @param orderCargo    订单
     * @param orderLocation 位置
     * @throws SLException 异常
     */
    void saveOrder(OrderEntity order, OrderCargoEntity orderCargo, OrderLocationEntity orderLocation) throws SLException;

    /**
     * 获取订单分页数据
     *
     * @param page     页码
     * @param pageSize 页尺寸
     * @param order    查询条件
     * @return 订单分页数据
     */
    IPage<OrderEntity> findByPage(Integer page, Integer pageSize, OrderDTO order);

    /**
     * 获取订单列表
     *
     * @param ids 订单id列表
     * @return 订单列表
     */
    List<OrderEntity> findAll(List<Long> ids);

    /**
     * 统计各个状态的数量
     *
     * @param memberId 用户ID
     * @return 状态数量数据
     */
    List<OrderStatusCountDTO> groupByStatus(Long memberId);

    /**
     * 快递员取件更新订单和货物信息
     *
     * @param orderPickupDTO 订单和货物信息
     */
    void orderPickup(OrderPickupDTO orderPickupDTO);

    /**
     * 状态更新
     *
     * @param orderId 订单ID
     * @param code    状态码
     */
    void updateStatus(List<Long> orderId, Integer code);

    /**
     * 更新支付状态
     *
     * @param ids    订单ID
     * @param status 状态
     */
    void updatePayStatus(List<Long> ids, Integer status);

    /**
     * 退款成功
     *
     * @param msgList 退款消息
     */
    void updateRefundInfo(List<TradeStatusMsg> msgList);

    /**
     * 根据用户id查询订单
     *
     * @param memberId 用户id
     * @return 订单信息
     */
    List<OrderEntity> findByMemberId(Long memberId);
}
