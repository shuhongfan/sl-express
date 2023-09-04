package com.sl.ms.web.manager.service;

import com.sl.ms.oms.dto.OrderDTO;
import com.sl.ms.web.manager.vo.oms.OrderCargoUpdateVO;
import com.sl.ms.web.manager.vo.oms.OrderCargoVO;
import com.sl.ms.web.manager.vo.oms.OrderQueryVO;
import com.sl.ms.web.manager.vo.oms.OrderVO;
import com.sl.transport.common.util.PageResponse;

import java.util.List;

/**
 * 订单服务
 */
public interface OmsService {
    /**
     * 根据ID查询
     *
     * @param id 订单ID
     * @return 订单VO
     */
    OrderVO findOrderSimple(Long id);

    /**
     * 根据ID查询详情
     *
     * @param id 订单ID
     * @return 订单VO
     */
    OrderVO findOrderDetail(Long id);

    /**
     * 更新
     *
     * @param id 订单ID
     * @param vo 订单VO
     */
    void updateOrder(Long id, OrderVO vo);

    /**
     * 分页查询
     *
     * @param vo 订单查询VO
     * @return 订单VO
     */
    PageResponse<OrderVO> findByPage(OrderQueryVO vo);

    /**
     * 获取货物列表
     *
     * @param tranOrderId 运单id
     * @param orderId     订单id
     * @return 货物列表
     */
    List<OrderCargoVO> findAll(Long tranOrderId,
                               Long orderId);

    /**
     * 添加货物
     *
     * @param vo 货物信息
     */
    void save(OrderCargoUpdateVO vo);

    /**
     * 更新货物信息
     *
     * @param id 货物id
     * @param vo 货物信息
     */
    void update(Long id, OrderCargoUpdateVO vo);

    /**
     * 删除货物信息
     *
     * @param id 货物id
     */
    void del(Long id);

    /**
     * 批量转换
     *
     * @param orderDTOList 订单列表
     * @return 订单列表
     */
    List<OrderVO> batchParseOrderDTO2Vo(List<OrderDTO> orderDTOList);


}
