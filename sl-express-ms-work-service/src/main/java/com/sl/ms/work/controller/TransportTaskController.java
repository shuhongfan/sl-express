package com.sl.ms.work.controller;

import com.sl.ms.work.domain.dto.TaskTransportUpdateDTO;
import com.sl.ms.work.domain.dto.TransportTaskDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskCompleteDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskDelayDeliveryDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskPageQueryDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskStartDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskMonthlyDistanceDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskStatusCountDTO;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskStatus;
import com.sl.ms.work.service.TransportTaskService;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 运输任务表 前端控制器
 */
@Slf4j
@RestController
@Api(tags = "运输任务")
@RequestMapping("transport-task")
public class TransportTaskController {

    @Resource
    private TransportTaskService transportTaskService;

    @PutMapping
    @ApiOperation(value = "更新状态", notes = "更新状态，不允许 CREATED 状态")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运输任务id", required = true),
            @ApiImplicitParam(name = "status", value = "运输任务状态", required = true),
    })
    public Boolean updateStatus(@RequestParam("id") Long id,
                                @RequestParam("status") TransportTaskStatus status) {
        return this.transportTaskService.updateStatus(id, status);
    }

    /**
     * 获取运输任务分页数据
     *
     * @return 运输任务分页数据
     */
    @PostMapping("page")
    PageResponse<TransportTaskDTO> findByPage(@RequestBody TransportTaskPageQueryDTO pageQueryDTO) {
        return this.transportTaskService.findByPage(pageQueryDTO);
    }

    @GetMapping("{id}")
    @ApiOperation(value = "id查询", notes = "根据id获取运输任务信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运输任务id")
    })
    public TransportTaskDTO findById(@PathVariable("id") Long id) {
        return transportTaskService.findById(id);
    }


    @GetMapping("listByOrderIdOrTaskId")
    @ApiOperation(value = "查询列表", notes = "根据运单id或运输任务id获取运输任务列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "transportOrderId", value = "运单id"),
            @ApiImplicitParam(name = "taskTransportId", value = "运输任务id"),
    })
    public List<TransportTaskDTO> findAllByOrderIdOrTaskId(@RequestParam(name = "transportOrderId", required = false) String transportOrderId,
                                                           @RequestParam(name = "taskTransportId", required = false) Long taskTransportId) {
        return this.transportTaskService.findAllByOrderIdOrTaskId(transportOrderId, taskTransportId);
    }

    @GetMapping("count")
    @ApiOperation(value = "统计", notes = "统计各个状态的数量")
    public List<TransportTaskStatusCountDTO> count() {
        return transportTaskService.groupByStatus();
    }

    /**
     * 手动调整
     *
     * @param id  运输任务id
     * @param dto 运输任务信息
     * @return 运输任务信息
     */
    @PutMapping("adjust/{id}")
    public void adjust(@PathVariable(name = "id") Long id,
                       @RequestBody TaskTransportUpdateDTO dto) {
        dto.setId(id);
        this.transportTaskService.adjust(dto);
    }

    @PutMapping("startTransportTask")
    @ApiOperation(value = "开始运输任务")
    public void startTransportTask(@RequestBody TransportTaskStartDTO transportTaskStartDTO) {
        transportTaskService.startTransportTask(transportTaskStartDTO);
    }

    @PutMapping("completeTransportTask")
    @ApiOperation(value = "完成运输任务")
    public void completeTransportTask(@RequestBody TransportTaskCompleteDTO transportTaskCompleteDTO) {
        transportTaskService.completeTransportTask(transportTaskCompleteDTO);
    }

    @GetMapping("queryTransportOrderIdListById/{id}")
    @ApiOperation(value = "根据运输任务id查询运单id列表", notes = "根据运输任务id查询所对应的运单id列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运输任务id"),
    })
    public List<String> queryTransportOrderIdListById(@PathVariable("id") Long id) {
        return transportTaskService.queryTransportOrderIdListById(id);
    }

    @PutMapping("delayDelivery")
    @ApiOperation(value = "延迟提货", notes = "延迟时间以提货时间往后推最多不超过2小时")
    public void delayedDelivery(@RequestBody TransportTaskDelayDeliveryDTO transportTaskDelayDeliveryDTO) {
        transportTaskService.delayedDelivery(transportTaskDelayDeliveryDTO);
    }

    @GetMapping("monthlyDistanceStatistics")
    @ApiOperation(value = "任务里程统计", notes = "按月统计已完成任务的每日里程")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "transportTaskIds", value = "运输任务id列表", required = true, dataTypeClass = String.class),
            @ApiImplicitParam(name = "month", value = "月份", required = true, example = "2022-07", dataTypeClass = String.class)
    })
    public List<TransportTaskMonthlyDistanceDTO> monthlyDistanceStatistics(@RequestParam(name = "transportTaskIds") List<String> transportTaskIds,
                                                                           @RequestParam(name = "month") String month) {
        return transportTaskService.monthlyDistanceStatistics(transportTaskIds, month);
    }
}
