package com.sl.ms.web.driver.controller;

import com.sl.ms.web.driver.service.TaskService;
import com.sl.ms.web.driver.vo.request.DriverDelayDeliveryVO;
import com.sl.ms.web.driver.vo.request.DriverDeliverVO;
import com.sl.ms.web.driver.vo.request.DriverPickUpVO;
import com.sl.ms.web.driver.vo.request.DriverReturnRegisterVO;
import com.sl.ms.web.driver.vo.response.DriverJobDetailVO;
import com.sl.ms.web.driver.vo.response.DriverJobVO;
import com.sl.ms.web.driver.vo.response.TransportOrderVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Api(tags = "任务相关接口")
@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Resource
    private TaskService taskService;

    @GetMapping(value = "/list")
    @ApiOperation(value = "任务列表", notes = "分页查询任务列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "pageSize", value = "页面大小", required = true, dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "status", value = "作业状态，1为待提货）、2为在途(在途和已交付)、3为改派、5为已作废、6为已完成（已回车登记）", required = true, dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "startTime", value = "开始时间", example = "2022-06-12", dataTypeClass = String.class),
            @ApiImplicitParam(name = "endTime", value = "结束时间", example = "2022-07-12", dataTypeClass = String.class),
            @ApiImplicitParam(name = "transportTaskId", value = "运输任务id", dataTypeClass = String.class)
    })
    public R<PageResponse<DriverJobVO>> pageQuery(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                                  @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
                                                  @RequestParam("status") Integer status,
                                                  @RequestParam(name = "startTime", required = false) String startTime,
                                                  @RequestParam(name = "endTime", required = false) String endTime,
                                                  @RequestParam(name = "transportTaskId", required = false) String transportTaskId) {
        PageResponse<DriverJobVO> pageResponse = taskService.pageQuery(page, pageSize, status, startTime, endTime, transportTaskId);
        return R.success(pageResponse);
    }

    @GetMapping("details/{jobId}")
    @ApiOperation(value = "任务详情", notes = "获取任务详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "jobId", value = "作业id", required = true, dataTypeClass = String.class)
    })
    public R<DriverJobDetailVO> details(@PathVariable("jobId") String jobId) {
        return R.success(taskService.details(jobId));
    }

    @GetMapping("orders")
    @ApiOperation(value = "条件查询货物信息列表", notes = "根据运输任务id分页查询运单列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, example = "1", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "pageSize", value = "页面大小", required = true, example = "10", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "taskId", value = "运输任务id", required = true, dataTypeClass = String.class),
            @ApiImplicitParam(name = "transportOrderId", value = "运单id", dataTypeClass = String.class)
    })
    public R<PageResponse<TransportOrderVO>> pageQueryTransportOrder(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                                                     @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
                                                                     @RequestParam("taskId") String taskId,
                                                                     @RequestParam(name = "transportOrderId", required = false) String transportOrderId) {
        return R.success(taskService.pageQueryTransportOrder(page, pageSize, taskId, transportOrderId));
    }


    @PostMapping("takeDelivery")
    @ApiOperation(value = "提货", notes = "提货需要更新关联司机作业单、运输任务")
    public R<Void> takeDelivery(@RequestBody DriverPickUpVO driverPickUpVO) {
        taskService.takeDelivery(driverPickUpVO);
        return R.success();
    }

    @PutMapping("delay")
    @ApiOperation(value = "延迟提货", notes = "延迟时间以提货时间往后推最多不超过2小时")
    public R<Void> delayedDelivery(@RequestBody DriverDelayDeliveryVO driverDelayDeliveryVO) {
        taskService.delayedDelivery(driverDelayDeliveryVO);
        return R.success();
    }

    @PostMapping("deliver")
    @ApiOperation(value = "交付", notes = "交付需要更新关联司机作业单、运输任务")
    public R<Void> deliver(@RequestBody DriverDeliverVO driverDeliverVO) {
        taskService.deliver(driverDeliverVO);
        return R.success();
    }

    @PostMapping("truckRegistration")
    @ApiOperation(value = "回车登记", notes = "回车登记,并根据是否可用设置车辆状态")
    public R<Void> truckRegistration(@RequestBody DriverReturnRegisterVO driverDeliverVO) {
        taskService.truckRegistration(driverDeliverVO);
        return R.success();
    }

    @GetMapping("dispatchCenterPhone")
    @ApiOperation(value = "联系调度中心", notes = "司机无法主动取消任务，需要联系调度中心")
    public R<String> dispatchCenterPhone() {
        return R.success(taskService.dispatchCenterPhone());
    }
}
