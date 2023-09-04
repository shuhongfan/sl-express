package com.sl.ms.web.driver.service;

import com.sl.ms.web.driver.vo.request.DriverDelayDeliveryVO;
import com.sl.ms.web.driver.vo.request.DriverDeliverVO;
import com.sl.ms.web.driver.vo.request.DriverPickUpVO;
import com.sl.ms.web.driver.vo.request.DriverReturnRegisterVO;
import com.sl.ms.web.driver.vo.response.DriverJobDetailVO;
import com.sl.ms.web.driver.vo.response.DriverJobVO;
import com.sl.ms.web.driver.vo.response.TransportOrderVO;
import com.sl.transport.common.util.PageResponse;

public interface TaskService {

    /**
     * 分页查询任务列表
     *
     * @param page            页码
     * @param pageSize        页面大小
     * @param status          作业状态，1为待提货）、2为在途(在途和已交付)、3为改派、5为已作废、6为已完成（已回车登记）
     * @param startTime       开始时间
     * @param endTime         结束时间
     * @param transportTaskId 运输任务id
     * @return 分页数据
     */
    PageResponse<DriverJobVO> pageQuery(Integer page, Integer pageSize, Integer status, String startTime, String endTime, String transportTaskId);

    /**
     * 获取任务详情
     *
     * @param jobId 作业id
     * @return 任务详情
     */
    DriverJobDetailVO details(String jobId);

    /**
     * 根据运输任务id分页查询运单信息
     *
     * @param page             页码
     * @param pageSize         页面大小
     * @param taskId           运输任务id
     * @param transportOrderId 运单id
     * @return 运单对象分页数据
     */
    PageResponse<TransportOrderVO> pageQueryTransportOrder(Integer page, Integer pageSize, String taskId, String transportOrderId);

    /**
     * 提货
     *
     * @param driverPickUpVO 提货对象（作业id、提货凭证、提货图片）
     */
    void takeDelivery(DriverPickUpVO driverPickUpVO);

    /**
     * 延迟提货
     *
     * @param driverDelayDeliveryVO 延迟提货对象
     */
    void delayedDelivery(DriverDelayDeliveryVO driverDelayDeliveryVO);

    /**
     * 交付
     *
     * @param driverDeliverVO 提货对象（作业id、交付凭证、交付图片）
     */
    void deliver(DriverDeliverVO driverDeliverVO);

    /**
     * 回车登记
     *
     * @param driverDeliverVO 回车登记信息
     */
    void truckRegistration(DriverReturnRegisterVO driverDeliverVO);

    /**
     * 联系调度中心
     *
     * @return 调度中心电话
     */
    String dispatchCenterPhone();
}
