package com.sl.ms.work.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.ms.work.domain.dto.request.TransportOrderQueryDTO;
import com.sl.ms.work.domain.dto.response.TransportOrderStatusCountDTO;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderStatus;
import com.sl.ms.work.entity.TransportOrderEntity;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.OrderMsg;

import java.util.List;

/**
 * 运单表 服务类
 */
public interface TransportOrderService extends IService<TransportOrderEntity> {
    /**
     * 订单转运单
     *
     * @param orderId 订单号
     * @return 运单号
     */
    TransportOrderEntity orderToTransportOrder(Long orderId);

    /**
     * 获取运单分页数据
     *
     * @return 运单分页数据
     */
    Page<TransportOrderEntity> findByPage(TransportOrderQueryDTO transportOrderQueryDTO);

    /**
     * 通过订单id获取运单信息
     *
     * @param orderId 订单id
     * @return 运单信息
     */
    TransportOrderEntity findByOrderId(Long orderId);

    /**
     * 通过订单id列表获取运单列表
     *
     * @param orderIds 订单id列表
     * @return 运单列表
     */
    List<TransportOrderEntity> findByOrderIds(Long[] orderIds);

    /**
     * 通过运单id列表获取运单列表
     *
     * @param ids 订单id列表
     * @return 运单列表
     */
    List<TransportOrderEntity> findByIds(String[] ids);

    /**
     * 根据运单号搜索运单
     *
     * @param id 运单号
     * @return 运单列表
     */
    List<TransportOrderEntity> searchById(String id);

    /**
     * 修改运单状态
     *
     * @param ids                  运单id列表
     * @param transportOrderStatus 修改的状态
     * @return 是否成功
     */
    boolean updateStatus(List<String> ids, TransportOrderStatus transportOrderStatus);

    /**
     * 根据运输任务id批量修改运单，其中会涉及到下一个节点的流转，已经发送消息的业务
     *
     * @param taskId 运输任务id
     * @return 是否成功
     */
    boolean updateByTaskId(Long taskId);

    /**
     * 统计各个状态的数量
     *
     * @return 状态数量数据
     */
    List<TransportOrderStatusCountDTO> findStatusCount();

    /**
     * 发送消息到调度中心，用于生成取派件任务
     *
     * @param transportOrder 运单对象
     * @param orderMsg       消息对象
     */
    void sendPickupDispatchTaskMsgToDispatch(TransportOrderEntity transportOrder, OrderMsg orderMsg);

    /**
     * 根据运输任务id分页查询运单信息
     *
     * @param page             页码
     * @param pageSize         页面大小
     * @param taskId           运输任务id
     * @param transportOrderId 运单id
     * @return 运单对象分页数据
     */
    PageResponse<TransportOrderDTO> pageQueryByTaskId(Integer page, Integer pageSize, String taskId, String transportOrderId);
}
