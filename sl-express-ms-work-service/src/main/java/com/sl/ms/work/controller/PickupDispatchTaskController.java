package com.sl.ms.work.controller;

import cn.hutool.core.bean.BeanUtil;
import com.sl.ms.work.domain.dto.CourierTaskCountDTO;
import com.sl.ms.work.domain.dto.PickupDispatchTaskDTO;
import com.sl.ms.work.domain.dto.request.PickupDispatchTaskPageQueryDTO;
import com.sl.ms.work.domain.dto.response.PickupDispatchTaskStatisticsDTO;
import com.sl.ms.work.domain.enums.WorkExceptionEnum;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskIsDeleted;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskStatus;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskType;
import com.sl.ms.work.entity.PickupDispatchTaskEntity;
import com.sl.ms.work.service.PickupDispatchTaskService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.ObjectUtil;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 取件、派件任务信息表 前端控制器
 */
@RestController
@Api(tags = "取派件任务")
@RequestMapping("pickup-dispatch-task")
public class PickupDispatchTaskController {

    @Resource
    private PickupDispatchTaskService pickupDispatchTaskService;

    @PutMapping
    @ApiOperation(value = "更新取派件任务状态", notes = "更新状态，不允许 NEW 状态")
    public Boolean updateStatus(@RequestBody PickupDispatchTaskDTO pickupDispatchTaskDTO) {
        return this.pickupDispatchTaskService.updateStatus(pickupDispatchTaskDTO);
    }

    @PutMapping("courier")
    @ApiOperation(value = "批量改派快递员", notes = "批量改派快递员")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "任务id列表", required = true),
            @ApiImplicitParam(name = "originalCourierId", value = "原快递员id", required = true),
            @ApiImplicitParam(name = "targetCourierId", value = "目标快递员id", required = true),
    })
    public Boolean updateCourierId(@RequestParam("ids") List<Long> ids,
                                   @RequestParam("originalCourierId") Long originalCourierId,
                                   @RequestParam("targetCourierId") Long targetCourierId) {
        return this.pickupDispatchTaskService.updateCourierId(ids, originalCourierId, targetCourierId);
    }

    @PostMapping("page")
    @ApiOperation(value = "分页查询", notes = "获取取派件任务分页数据")
    public PageResponse<PickupDispatchTaskDTO> findByPage(@RequestBody PickupDispatchTaskPageQueryDTO dto) {
        return this.pickupDispatchTaskService.findByPage(dto);
    }

    @GetMapping("{id}")
    @ApiOperation(value = "id查询", notes = "根据id获取取派件任务信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "任务id")
    })
    public PickupDispatchTaskDTO findById(@PathVariable("id") Long id) {
        PickupDispatchTaskEntity pickupDispatchTask = this.pickupDispatchTaskService.getById(id);
        if (ObjectUtil.isEmpty(pickupDispatchTask)) {
            throw new SLException(WorkExceptionEnum.PICKUP_DISPATCH_TASK_NOT_FOUND);
        }
        return BeanUtil.toBean(pickupDispatchTask, PickupDispatchTaskDTO.class);
    }

    @GetMapping("ids")
    @ApiOperation(value = "id批量查询", notes = "根据id批量查询取派件任务信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "任务id列表")
    })
    public List<PickupDispatchTaskDTO> findByIds(@RequestParam("ids") List<Long> ids) {
        List<PickupDispatchTaskEntity> list = this.pickupDispatchTaskService.listByIds(ids);
        return BeanUtil.copyToList(list, PickupDispatchTaskDTO.class);
    }

    @DeleteMapping("ids")
    @ApiOperation(value = "id批量删除", notes = "根据id批量删除取派件任务信息（逻辑删除）")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "任务id列表")
    })
    public boolean deleteByIds(@RequestParam("ids") List<Long> ids) {
        return this.pickupDispatchTaskService.deleteByIds(ids);
    }

    @GetMapping("/orderId/{orderId}/{taskType}")
    @ApiOperation(value = "订单id查询", notes = "根据订单id获取取派件任务信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "orderId", value = "订单id"),
            @ApiImplicitParam(name = "taskType", value = "任务类型")
    })
    public List<PickupDispatchTaskDTO> findByOrderId(@PathVariable("orderId") Long orderId,
                                                     @PathVariable("taskType") PickupDispatchTaskType taskType) {
        List<PickupDispatchTaskEntity> entities = pickupDispatchTaskService.findByOrderId(orderId, taskType);
        return BeanUtil.copyToList(entities, PickupDispatchTaskDTO.class);
    }

    @GetMapping("count")
    @ApiOperation(value = "任务数量查询", notes = "按照当日快递员id列表查询每个快递员的取派件任务数")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "courierIds", value = "订单id列表", required = true),
            @ApiImplicitParam(name = "taskType", value = "任务类型", required = true),
            @ApiImplicitParam(name = "date", value = "日期，格式：yyyy-MM-dd 或 yyyyMMdd", required = true)
    })
    public List<CourierTaskCountDTO> findCountByCourierIds(@RequestParam("courierIds") List<Long> courierIds,
                                                           @RequestParam("taskType") PickupDispatchTaskType taskType,
                                                           @RequestParam("date") String date) {
        return this.pickupDispatchTaskService.findCountByCourierIds(courierIds, taskType, date);
    }

    @GetMapping("todayTasks/count")
    @ApiOperation(value = "今日任务分类计数")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "courierId", value = "快递员id", required = true, dataTypeClass = Long.class),
            @ApiImplicitParam(name = "taskType", value = "任务类型，1为取件任务，2为派件任务", dataTypeClass = PickupDispatchTaskType.class),
            @ApiImplicitParam(name = "status", value = "任务状态,1新任务，2已完成，3已取消", dataTypeClass = PickupDispatchTaskStatus.class),
            @ApiImplicitParam(name = "isDeleted", value = "是否逻辑删除", dataTypeClass = PickupDispatchTaskIsDeleted.class)
    })
    public Integer todayTasksCount(@RequestParam("courierId") Long courierId,
                                   @RequestParam(value = "taskType", required = false) PickupDispatchTaskType taskType,
                                   @RequestParam(value = "status", required = false) PickupDispatchTaskStatus status,
                                   @RequestParam(value = "isDeleted", required = false) PickupDispatchTaskIsDeleted isDeleted) {
        return pickupDispatchTaskService.todayTasksCount(courierId, taskType, status, isDeleted);
    }

    @GetMapping("/all")
    @ApiOperation(value = "条件查询所有")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "courierId", value = "快递员id", dataTypeClass = Long.class),
            @ApiImplicitParam(name = "taskType", value = "任务类型，1为取件任务，2为派件任务", dataTypeClass = PickupDispatchTaskType.class),
            @ApiImplicitParam(name = "taskStatus", value = "任务状态,1新任务，2已完成，3已取消", dataTypeClass = PickupDispatchTaskStatus.class),
            @ApiImplicitParam(name = "isDeleted", value = "是否逻辑删除", dataTypeClass = PickupDispatchTaskIsDeleted.class)
    })
    public List<PickupDispatchTaskDTO> findAll(@RequestParam(name = "courierId", required = false) Long courierId,
                                               @RequestParam(name = "taskType", required = false) PickupDispatchTaskType taskType,
                                               @RequestParam(name = "taskStatus", required = false) PickupDispatchTaskStatus taskStatus,
                                               @RequestParam(name = "isDeleted", required = false) PickupDispatchTaskIsDeleted isDeleted) {
        return pickupDispatchTaskService.findAll(courierId, taskType, taskStatus, isDeleted);
    }

    @GetMapping("/todayTasksStatistics")
    @ApiOperation(value = "今日任务分类统计")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "courierId", value = "快递员id", dataTypeClass = Long.class)
    })
    public PickupDispatchTaskStatisticsDTO todayTasksStatistics(@RequestParam(value = "courierId", required = false) Long courierId) {
        return pickupDispatchTaskService.todayTaskStatistics(courierId);
    }
}
