package com.sl.ms.driver.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.driver.domain.dto.request.*;
import com.sl.ms.driver.domain.dto.response.DriverJobDTO;
import com.sl.ms.driver.domain.dto.response.DriverJobStatisticsDTO;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import com.sl.ms.driver.entity.DriverJobEntity;
import com.sl.transport.common.util.PageResponse;

/**
 * 司机作业 服务类
 */
public interface DriverJobService extends IService<DriverJobEntity> {

    /**
     * 根据运输任务生成司机作业单
     *
     * @param transportTaskId 运输任务id
     * @param driverId        司机id
     * @return 司机作业单id
     */
    Long createDriverJob(Long transportTaskId, Long driverId);

    /**
     * 更新司机作业状态，不允许 PENDING 状态
     *
     * @param id     司机作业单id
     * @param status 司机任务状态
     * @return 是否成功
     */
    boolean updateStatus(Long id, DriverJobStatus status);

    /**
     * 司机入库，修改运单的当前节点和下个节点 以及 修改运单为待调度状态，结束运输任务
     *
     * @param driverDeliverDTO 司机作业单id
     */
    void intoStorage(DriverDeliverDTO driverDeliverDTO);

    /**
     * 司机出库，修改运单为运输中状态，开始运输任务
     *
     * @param driverPickUpDTO 司机作业单id
     */
    void outStorage(DriverPickUpDTO driverPickUpDTO);


    /**
     * 根据运输任务删除司机作业单
     *
     * @param transportTaskId 运输任务id
     * @return 是否成功
     */
    boolean removeByTransportTaskId(Long transportTaskId);

    /**
     * 延迟提货
     *
     * @param driverDelayDeliveryDTO 延迟提货对象
     */
    void delayedDelivery(DriverDelayDeliveryDTO driverDelayDeliveryDTO);

    /**
     * 回车登记
     *
     * @param driverReturnRegisterDTO 回车登记对象
     */
    void returnRegister(DriverReturnRegisterDTO driverReturnRegisterDTO);

    /**
     * 司机作业单月度统计
     *
     * @param driverId 司机id
     * @param month    月份
     * @return 统计数据
     */
    DriverJobStatisticsDTO jobMonthlyStatistics(String driverId, String month);

    /**
     * 分页查询
     *
     * @param dto 查询条件
     * @return 司机作业单分页结果
     */
    PageResponse<DriverJobDTO> pageQuery(DriverJobPageQueryDTO dto);
}
