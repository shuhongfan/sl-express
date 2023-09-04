package com.sl.ms.web.courier.service;

import com.sl.ms.web.courier.vo.task.*;
import com.sl.transport.common.util.PageResponse;

import java.util.List;

public interface TaskService {

    /**
     * 计算运费
     *
     * @param calculateVO 运费计算对象
     * @return 运费 体积 重量
     */
    CarriageVO calculate(CarriageCalculateVO calculateVO);

    /**
     * 分页查询任务列表
     *
     * @param vo 取/派件查询模型
     * @return 任务列表
     */
    PageResponse<TaskVO> pageQuery(TaskQueryVO vo);

    /**
     * 任务详情
     *
     * @param id 任务id
     * @return 任务详情
     */
    TaskInfoVO detail(String id);

    /**
     * 身份验证
     *
     * @param taskIdCardCheckVO 身份信息
     * @return 是否通过验证
     */
    RealNameVerifyVO idCardCheck(TaskIdCardCheckVO taskIdCardCheckVO);

    /**
     * 取件
     *
     * @param taskPickupVO 取件对象
     * @return 是否成功
     */
    boolean pickup(TaskPickupVO taskPickupVO);

    /**
     * 批量转单
     *
     * @param taskBatchTransferVO 转单对象
     */
    void batchTransfer(TaskBatchTransferVO taskBatchTransferVO);

    /**
     * 取消任务
     *
     * @param tasksCancelVO 取消任务对象
     */
    void cancel(TasksCancelVO tasksCancelVO);

    /**
     * 删除任务(逻辑删除)
     *
     * @param id 任务id
     */
    void delete(String id);

    /**
     * 批量删除任务
     *
     * @param taskBatchVO 任务id列表
     */
    void batchDelete(TaskBatchVO taskBatchVO);


    /**
     * 签收任务
     *
     * @param taskSignVO 签收对象
     */
    void sign(TaskSignVO taskSignVO);

    /**
     * 拒收任务
     *
     * @param id 任务id
     */
    void reject(String id);

    /**
     * 运单跟踪
     *
     * @param id 运单id
     * @return 运单跟踪信息
     */
    List<TransportOrderPointVO> tracks(String id);

    /**
     * 今日任务数据统计
     *
     * @return 今日任务统计数据
     */
    TaskStatisticsVO taskStatistics();

    /**
     * 展示最近查找运单号
     *
     * @return 最近查找运单号
     */
    List<String> recentSearch();

    /**
     * 标记为最近查找
     *
     * @param transportOrderId 运单号
     */
    void markRecent(String transportOrderId);

    /**
     * 清空最近查找
     */
    void recentSearchDeleteAll();

    /**
     * 搜索任务
     *
     * @param taskSearchVO 搜索条件
     * @return 分页结果
     */
    PageResponse<TaskVO> search(TaskSearchVO taskSearchVO);
}
