package com.sl.ms.web.customer.service;

import com.sl.ms.oms.dto.OrderDTO;
import com.sl.ms.web.customer.vo.oms.*;
import com.sl.ms.web.customer.vo.oms.pay.TradeLaunchVO;
import com.sl.ms.web.customer.vo.oms.pay.TradeResponseVO;
import com.sl.transport.common.util.PageResponse;

import java.util.List;
import java.util.Map;

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
     * 删除订单
     *
     * @param id 货物id
     */
    void delOrder(Long id);

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
     * 常用货物
     *
     * @param name 货物名称
     * @return 常用货物
     */
    List<OrderCargoVO> hotGood(String name);

    /**
     * 统计
     *
     * @return 统计结果
     */
    Map<Integer, Long> count();

    /**
     * 下单
     *
     * @param vo 下单信息
     * @return 下单结果
     */
    OrderVO mailingSave(MailingSaveVO vo);

    /**
     * 支付
     *
     * @param tradeLaunchVO 订单号
     * @return 预支付编号 签名数据
     */
    TradeResponseVO pay(TradeLaunchVO tradeLaunchVO);

    /**
     * 取消订单
     *
     * @param id 订单号
     */
    void cancel(Long id);

    /**
     * 预估总价
     *
     * @param mailingSaveVO 订单信息
     * @return 预估信息
     */
    OrderCarriageVO totalPrice(MailingSaveVO mailingSaveVO);

    /**
     * 最近寄递
     *
     * @param name 名称
     * @return 订单货品
     */
    List<OrderCargoVO> lastGood(String name);

    /**
     * 批量转换
     * @param orderDTOList dto列表
     * @return vo列表
     */
    List<OrderVO> batchParseOrderDTO2Vo(List<OrderDTO> orderDTOList);

    /**
     * 运单轨迹
     *
     * @param id 运单ID
     * @return 轨迹
     */
    TrackVO findTrackById(String id);
}
