package com.sl.ms.driver.api;


import com.sl.ms.driver.domain.dto.request.*;
import com.sl.ms.driver.domain.dto.response.DriverJobDTO;
import com.sl.ms.driver.domain.dto.response.DriverJobStatisticsDTO;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import com.sl.transport.common.util.PageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@FeignClient(value = "sl-express-ms-driver", contextId = "DriverJob", path = "driver-job")
public interface DriverJobFeign {

    /**
     * 更新司机作业状态，不允许 PENDING 状态，PROCESSING：出库业务，COMPLETED：入库业务
     *
     * @param id     司机作业单id
     * @param status 司机任务状态
     * @return 是否成功
     */
    @PutMapping
    boolean updateStatus(@RequestParam("id") Long id, @RequestParam("status") DriverJobStatus status);

    /**
     * 根据id获取司机作业单信息
     *
     * @param id 司机作业单id
     * @return 司机作业单信息
     */
    @GetMapping("{id}")
    DriverJobDTO findById(@PathVariable("id") Long id);

    /**
     * 根据运输任务删除司机作业单
     *
     * @param transportTaskId 运输任务id
     * @return 是否成功
     */
    @DeleteMapping("removeByTransportTaskId/{transportTaskId}")
    boolean removeByTransportTaskId(@PathVariable("transportTaskId") Long transportTaskId);

    /**
     * 根据运输任务生成司机作业单
     *
     * @param transportTaskId 运输任务id
     * @param driverId        司机id
     * @return 司机作业单id
     */
    @PostMapping("createDriverJob/{transportTaskId}/{driverId}")
    Long createDriverJob(@PathVariable("transportTaskId") Long transportTaskId, @PathVariable("driverId") Long driverId);

    /**
     * 司机入库，修改运单的当前节点和下个节点 以及 修改运单为待调度状态，结束运输任务
     *
     * @param driverDeliverDTO 司机作业单id
     */
    @PostMapping("intoStorage")
    void intoStorage(@RequestBody DriverDeliverDTO driverDeliverDTO);

    /**
     * 司机出库，修改运单为运输中状态，开始运输任务
     *
     * @param driverPickUpDTO 提货对象
     */
    @PostMapping("outStorage")
    void outStorage(@RequestBody DriverPickUpDTO driverPickUpDTO);

    /**
     * 延迟提货,延迟时间以提货时间往后推最多不超过2小时
     *
     * @param driverDelayDeliveryDTO 运输任务延时对象
     */
    @PutMapping("delayDelivery")
    void delayedDelivery(@RequestBody DriverDelayDeliveryDTO driverDelayDeliveryDTO);

    /**
     * 回车登记
     *
     * @param driverReturnRegisterDTO 回车登记对象
     */
    @PostMapping("returnRegister")
    void returnRegister(@RequestBody DriverReturnRegisterDTO driverReturnRegisterDTO);

    /**
     * 司机作业单月度统计
     *
     * @param driverId 司机id
     * @param month    月份
     * @return 统计数据
     */
    @GetMapping("jobMonthlyStatistics/{driverId}/{month}")
    DriverJobStatisticsDTO jobMonthlyStatistics(@PathVariable("driverId") String driverId, @PathVariable("month") String month);


    /**
     * 分页查询
     *
     * @param driverJobPageQueryDTO 查询条件
     * @return 司机作业单分页结果
     */
    @PostMapping("pageQuery")
    PageResponse<DriverJobDTO> pageQuery(@RequestBody DriverJobPageQueryDTO driverJobPageQueryDTO);
}
