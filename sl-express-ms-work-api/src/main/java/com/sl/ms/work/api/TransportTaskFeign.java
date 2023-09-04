package com.sl.ms.work.api;

import com.sl.ms.work.domain.dto.TaskTransportUpdateDTO;
import com.sl.ms.work.domain.dto.TransportTaskDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskCompleteDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskDelayDeliveryDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskPageQueryDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskStartDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskMonthlyDistanceDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskStatusCountDTO;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskStatus;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.ApiOperation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "sl-express-ms-work", contextId = "TransportTask", path = "transport-task")
public interface TransportTaskFeign {

    /**
     * 更新状态
     *
     * @param id     运输任务id
     * @param status 任务状态 PROCESSING：开始任务，COMPLETED：完成任务
     * @return 是否成功
     */
    @PutMapping
    Boolean updateStatus(@RequestParam("id") Long id,
                         @RequestParam("status") TransportTaskStatus status);

    /**
     * 获取运输任务分页数据
     *
     * @param pageQueryDTO 分页查询条件
     * @return 运输任务分页数据
     */
    @PostMapping("page")
    PageResponse<TransportTaskDTO> findByPage(@RequestBody TransportTaskPageQueryDTO pageQueryDTO);

    /**
     * 根据id获取运输任务信息
     *
     * @param id 运输任务id
     * @return 运输任务信息
     */
    @GetMapping("{id}")
    TransportTaskDTO findById(@PathVariable("id") Long id);

    /**
     * 根据运单id或运输任务id获取运输任务列表
     *
     * @param transportOrderId 运单id
     * @param taskTransportId  运输任务id
     * @return 运输任务列表
     */
    @GetMapping("listByOrderIdOrTaskId")
    List<TransportTaskDTO> findAllByOrderIdOrTaskId(@RequestParam(name = "transportOrderId", required = false) String transportOrderId,
                                                    @RequestParam(name = "taskTransportId", required = false) Long taskTransportId);

    /**
     * 统计各个状态的数量
     *
     * @return 状态数量数据
     */
    @GetMapping("count")
    List<TransportTaskStatusCountDTO> count();

    /**
     * 手动调整
     *
     * @param id  运输任务id
     * @param dto 运输任务
     * @return 运输任务
     */
    @PutMapping("adjust/{id}")
    TransportTaskDTO adjust(@PathVariable(name = "id") Long id, @RequestBody TaskTransportUpdateDTO dto);

    /**
     * 开始运输任务
     *
     * @param transportTaskStartDTO 提货对象
     */
    @PutMapping("startTransportTask")
    void startTransportTask(@RequestBody TransportTaskStartDTO transportTaskStartDTO);

    /**
     * 完成运输任务
     *
     * @param transportTaskCompleteDTO 交付对象
     */
    @PutMapping("completeTransportTask")
    @ApiOperation(value = "完成运输任务")
    void completeTransportTask(@RequestBody TransportTaskCompleteDTO transportTaskCompleteDTO);

    /**
     * 根据运输任务id查询运单id列表
     *
     * @param id 运输任务id
     * @return 运单id列表
     */
    @GetMapping("queryTransportOrderIdListById/{id}")
    List<String> queryTransportOrderIdListById(@PathVariable("id") Long id);

    /**
     * 延迟提货,延迟时间以提货时间往后推最多不超过2小时
     *
     * @param transportTaskDelayDeliveryDTO 运输任务延时对象
     */
    @PutMapping("delayDelivery")
    void delayedDelivery(@RequestBody TransportTaskDelayDeliveryDTO transportTaskDelayDeliveryDTO);

    /**
     * 月度任务里程统计
     *
     * @param transportTaskIds 运输任务id列表
     * @param month            月份，格式：2022-06
     * @return 每日里程数据
     */
    @GetMapping("monthlyDistanceStatistics")
    List<TransportTaskMonthlyDistanceDTO> monthlyDistanceStatistics(@RequestParam(name = "transportTaskIds") List<String> transportTaskIds,
                                                                    @RequestParam(name = "month") String month);

    /**
     * 根据起始机构查询运输任务id列表
     *
     * @param startAgencyId 起始机构id
     * @param endAgencyId   结束机构id
     * @return 运输任务id列表
     */
    @GetMapping("findByAgencyId")
    List<Long> findByAgencyId(@RequestParam(name = "startAgencyId", required = false) Long startAgencyId,
                              @RequestParam(name = "endAgencyId", required = false) Long endAgencyId);


    /**
     * 根据车辆ID统计
     *
     * @param truckId 车辆ID
     * @return 个数
     */
    @GetMapping("countByTruckId")
    Long countByTruckId(@RequestParam(name = "truckId", required = false) Long truckId);
}
