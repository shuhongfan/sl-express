package com.sl.ms.work.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.work.domain.dto.TaskTransportUpdateDTO;
import com.sl.ms.work.domain.dto.TransportTaskDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskCompleteDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskDelayDeliveryDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskPageQueryDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskStartDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskMonthlyDistanceDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskStatusCountDTO;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskStatus;
import com.sl.ms.work.entity.TransportTaskEntity;
import com.sl.transport.common.util.PageResponse;

import java.util.List;

/**
 * 运输任务表 服务类
 */
public interface TransportTaskService extends IService<TransportTaskEntity> {


    /**
     * 更新状态
     *
     * @param id     运输任务id
     * @param status 任务状态 PROCESSING：开始任务，COMPLETED：完成任务
     * @return 是否成功
     */
    Boolean updateStatus(Long id, TransportTaskStatus status);

    /**
     * 获取运输任务分页数据
     *
     * @return 运输任务分页数据
     */
    PageResponse<TransportTaskDTO> findByPage(TransportTaskPageQueryDTO pageQueryDTO);

    /**
     * 获取运输任务列表
     *
     * @param ids              运输任务id列表
     * @param id               运输任务Id
     * @param status           运单状态
     * @param transportTaskDTO 运输任务对象
     * @return 运输任务列表
     */
    List<TransportTaskEntity> findAll(List<Long> ids, Long id, Integer status, TransportTaskDTO transportTaskDTO);

    /**
     * 完成运输任务
     *
     * @param transportTaskCompleteDTO 交付对象
     */
    void completeTransportTask(TransportTaskCompleteDTO transportTaskCompleteDTO);

    /**
     * 开始运输任务
     *
     * @param transportTaskStartDTO 提货对象
     */
    void startTransportTask(TransportTaskStartDTO transportTaskStartDTO);

    /**
     * 根据运输任务id查询所对应的运单id列表
     *
     * @param id 运输任务id
     * @return 运单id列表
     */
    List<String> queryTransportOrderIdListById(Long id);

    /**
     * 根据运单id 或 运输任务id 查询运输任务列表
     *
     * @param transportOrderId 运单id
     * @param transportTaskId  运输任务id
     * @return 运输任务列表
     */
    List<TransportTaskDTO> findAllByOrderIdOrTaskId(String transportOrderId, Long transportTaskId);

    /**
     * 根据id获取运输任务信息
     *
     * @param id 运输任务id
     * @return 运输任务信息
     */
    TransportTaskDTO findById(Long id);

    /**
     * 统计各个状态的数量
     *
     * @return 状态数量数据
     */
    List<TransportTaskStatusCountDTO> groupByStatus();

    /**
     * 手动调整运输任务
     *
     * @param dto 调整的数据
     */
    void adjust(TaskTransportUpdateDTO dto);

    /**
     * 延迟提货
     *
     * @param transportTaskDelayDeliveryDTO 延迟提货对象
     */
    void delayedDelivery(TransportTaskDelayDeliveryDTO transportTaskDelayDeliveryDTO);

    /**
     * 任务里程统计
     *
     * @param transportTaskIds 运输任务id列表
     * @param month            月份，格式：2022-06
     * @return 每日里程数据
     */
    List<TransportTaskMonthlyDistanceDTO> monthlyDistanceStatistics(List<String> transportTaskIds, String month);

    /**
     * 根据起始机构查询运输任务id列表
     *
     * @param startAgencyId 起始机构id
     * @param endAgencyId   结束机构id
     * @return 运输任务id列表
     */
    List<Long> findByAgencyId(Long startAgencyId, Long endAgencyId);

    /**
     * 根据车辆ID统计
     *
     * @param truckId 车辆ID
     * @return 个数
     */
    Long countByTruckId(Long truckId);
}
