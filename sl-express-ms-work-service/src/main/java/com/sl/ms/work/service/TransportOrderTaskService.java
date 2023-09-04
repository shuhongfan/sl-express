package com.sl.ms.work.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.work.entity.TransportOrderTaskEntity;

import java.util.List;

/**
 * 运单和运输任务关联表 服务类
 */
public interface TransportOrderTaskService extends IService<TransportOrderTaskEntity> {

    /**
     * 批量添加运单与运输任务关联关系
     *
     * @param transportOrderTaskList 关联关系列表
     */
    void batchSaveTransportOrder(List<TransportOrderTaskEntity> transportOrderTaskList);

    /**
     * 获取运单与运输任务关联关系分页数据
     *
     * @param page             页码
     * @param pageSize         页尺寸
     * @param transportOrderId 运单id
     * @param transportTaskId  订单id
     * @return 运单与运输任务关联关系分页数据
     */
    IPage<TransportOrderTaskEntity> findByPage(Integer page, Integer pageSize, String transportOrderId, Long transportTaskId);

    /**
     * 获取运单与运输任务关联关系列表
     *
     * @param transportOrderId 运单id
     * @param transportTaskId  运输任务id
     * @return 运单与运输任务关联关系列表
     */
    List<TransportOrderTaskEntity> findAll(String transportOrderId, Long transportTaskId);

    /**
     * 统计关联数量
     *
     * @param transportOrderId 运单Id
     * @param transportTaskId  运输任务Id
     * @return 数量
     */
    Long count(String transportOrderId, Long transportTaskId);

    /**
     * 根据条件删除关联关系
     *
     * @param transportOrderId 运单id
     * @param transportTaskId  运输任务id
     */
    void del(String transportOrderId, Long transportTaskId);
}
