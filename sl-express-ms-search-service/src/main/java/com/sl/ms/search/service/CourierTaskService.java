package com.sl.ms.search.service;

import com.sl.ms.search.domain.dto.CourierTaskDTO;
import com.sl.ms.search.domain.dto.CourierTaskPageQueryDTO;
import com.sl.ms.search.entity.CourierTaskEntity;
import com.sl.transport.common.util.PageResponse;

import java.util.List;

/**
 * 快递员任务服务接口
 **/
public interface CourierTaskService {
    /**
     * 分页查询
     *
     * @param pageQueryDTO 分页查询条件
     * @return 分页查询结果
     */
    PageResponse<CourierTaskDTO> pageQuery(CourierTaskPageQueryDTO pageQueryDTO);

    /**
     * 新增快递员任务
     *
     * @param courierTaskDTO 快递员任务
     */
    void saveOrUpdate(CourierTaskDTO courierTaskDTO);

    /**
     * 根据取派件id查询快递员任务
     *
     * @param id 取派件id
     * @return 快递员任务
     */
    CourierTaskDTO findById(Long id);

    /**
     * 根据订单id查询快递员任务
     *
     * @param orderId 订单id
     * @return 快递员任务列表
     */
    List<CourierTaskEntity> findByOrderId(Long orderId);
}
