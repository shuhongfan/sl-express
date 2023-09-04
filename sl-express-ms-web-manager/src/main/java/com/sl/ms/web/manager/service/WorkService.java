package com.sl.ms.web.manager.service;

import com.sl.ms.web.manager.vo.work.*;
import com.sl.ms.work.domain.dto.PickupDispatchTaskDTO;
import com.sl.transport.common.util.PageResponse;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

/**
 * 任务管理
 * 取派件任务、运输任务、运单
 */
public interface WorkService {

    /**
     * 运单分页
     *
     * @param vo 运单查询条件
     * @return 运单分页
     */
    PageResponse<TransportOrderVO> findTransportOrderByPage(TransportOrderQueryVO vo);

    /**
     * 运单简要信息
     *
     * @param id 运单ID
     * @return 运单详情
     */
    TransportOrderVO findTransportOrderSimple(String id);

    /**
     * 运单详情页面
     *
     * @param id 运单ID
     * @return 运单详情
     */
    TransportOrderVO findTransportOrderDetail(String id);

    /**
     * 统计运单
     *
     * @return 按状态统计运单
     */
    Map<Integer, Long> countTransportOrder();

    /**
     * 运输任务分页
     *
     * @param vo 查询条件
     * @return 运输任务分页
     */
    PageResponse<TaskTransportVO> findTaskByPage(TaskTransportQueryVO vo);


    /**
     * 运输任务详情
     *
     * @param id 运输任务ID
     * @return 运输任务详情
     */
    TaskTransportVO findTaskById(Long id);

    /**
     * 手动调整运输任务
     *
     * @param id 运输任务ID
     * @param vo 司机 车辆 车次等信息
     */
    void adjustTask(Long id, TaskTransportUpdateVO vo);

    /**
     * 运输任务统计
     *
     * @return 按状态统计
     */
    Map<Integer, Long> countTask();

    /**
     * 获取运输任务坐标
     *
     * @param id 运输任务ID
     * @return 运输任务坐标
     */
    LinkedHashSet<PointVO> findTaskPointById(Long id);

    /**
     * 获取取派件任务分页数据
     *
     * @param vo 查询条件
     * @return 取派件分页数据
     */
    PageResponse<PickupDispatchTaskListVO> findTaskPickupDispatchByPage(TaskPickupDispatchQueryVO vo);

    /**
     * 转换取派件任务
     *
     * @param dto 任务DTO
     * @return 任务VO
     */
    TaskPickupDispatchVO parsePickupDispatchTaskDTO2Vo(PickupDispatchTaskDTO dto);


    /**
     * 分配快递员
     *
     * @param ids       取派件任务id
     * @param courierId 快递员ID
     */
    void updateTaskPickupDispatchById(List<String> ids, Long courierId);

    /**
     * 空车取消运输任务
     *
     * @param id 运输任务id
     */
    void cancel(Long id);
    /**
     * 运单轨迹
     *
     * @param id 运单ID
     * @return 轨迹
     */
    TrackVO findTrackById(String id);
}
