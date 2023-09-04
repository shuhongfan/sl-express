package com.sl.ms.driver.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.sl.ms.driver.domain.dto.request.*;
import com.sl.ms.driver.domain.dto.response.DriverJobDTO;
import com.sl.ms.driver.domain.dto.response.DriverJobStatisticsDTO;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import com.sl.ms.driver.entity.DriverJobEntity;
import com.sl.ms.driver.enums.DriverExceptionEnum;
import com.sl.ms.driver.service.DriverJobService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 司机作业单 前端控制器
 */
@Slf4j
@RestController
@Api(tags = "司机作业单")
@RequestMapping("/driver-job")
public class DriverJobController {

    @Resource
    private DriverJobService driverJobService;

    @PutMapping
    @ApiOperation(value = "更新状态", notes = "更新司机作业状态，不允许 PENDING 状态，PROCESSING：出库业务，COMPLETED：入库业务")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "司机作业单id", required = true, dataTypeClass = Long.class),
            @ApiImplicitParam(name = "status", value = "司机任务状态", required = true, dataTypeClass = DriverJobStatus.class),
    })
    public boolean updateStatus(@RequestParam("id") Long id,
                                @RequestParam("status") DriverJobStatus status) {
        return this.driverJobService.updateStatus(id, status);
    }

    @GetMapping("{id}")
    @ApiOperation(value = "id查询", notes = "根据id获取司机作业单信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "司机作业单id", required = true, dataTypeClass = Long.class)
    })
    public DriverJobDTO findById(@PathVariable("id") Long id) {
        DriverJobEntity driverJob = this.driverJobService.getById(id);
        if (ObjectUtil.isEmpty(driverJob)) {
            throw new SLException(DriverExceptionEnum.DRIVER_JOB_NOT_FOUND);
        }
        return BeanUtil.toBean(driverJob, DriverJobDTO.class);
    }

    @DeleteMapping("removeByTransportTaskId/{transportTaskId}")
    @ApiOperation(value = "根据运输任务删除司机作业单", notes = "根据运输任务删除司机作业单")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "transportTaskId", value = "运输任务id", required = true, dataTypeClass = Long.class)
    })
    public boolean removeByTransportTaskId(@PathVariable("transportTaskId") Long transportTaskId) {
        return driverJobService.removeByTransportTaskId(transportTaskId);
    }

    @PostMapping("createDriverJob/{transportTaskId}/{driverId}")
    @ApiOperation(value = "根据运输任务生成司机作业单", notes = "根据运输任务生成司机作业单")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "transportTaskId", value = "运输任务id", required = true, dataTypeClass = Long.class),
            @ApiImplicitParam(name = "driverId", value = "司机id", required = true, dataTypeClass = Long.class)
    })
    public Long createDriverJob(@PathVariable("transportTaskId") Long transportTaskId, @PathVariable("driverId") Long driverId) {
        return driverJobService.createDriverJob(transportTaskId, driverId);
    }

    @PostMapping("intoStorage")
    @ApiOperation(value = "司机入库", notes = "司机入库，修改运单的当前节点和下个节点 以及 修改运单为待调度状态，结束运输任务")
    public void intoStorage(@RequestBody DriverDeliverDTO driverDeliverDTO) {
        driverJobService.intoStorage(driverDeliverDTO);
    }

    @PostMapping("outStorage")
    @ApiOperation(value = "司机出库", notes = "司机出库，修改运单为运输中状态，开始运输任务")
    public void outStorage(@RequestBody DriverPickUpDTO driverPickUpDTO) {
        driverJobService.outStorage(driverPickUpDTO);
    }

    @PutMapping("delayDelivery")
    @ApiOperation(value = "延迟提货", notes = "延迟时间以提货时间往后推最多不超过2小时")
    public void delayedDelivery(@RequestBody DriverDelayDeliveryDTO driverDelayDeliveryDTO) {
        driverJobService.delayedDelivery(driverDelayDeliveryDTO);
    }

    @PostMapping("returnRegister")
    @ApiOperation(value = "回车登记", notes = "回车登记,并设置下一次车辆计划")
    public void returnRegister(@RequestBody DriverReturnRegisterDTO driverReturnRegisterDTO) {
        driverJobService.returnRegister(driverReturnRegisterDTO);
    }

    @GetMapping("jobMonthlyStatistics/{driverId}/{month}")
    @ApiOperation(value = "司机作业单月度统计", notes = "根据月份统计司机作业单数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "driverId", value = "司机id", required = true, dataTypeClass = String.class),
            @ApiImplicitParam(name = "month", value = "月份", example = "2022-07", required = true, dataTypeClass = String.class)
    })
    public DriverJobStatisticsDTO jobMonthlyStatistics(@PathVariable("driverId") String driverId, @PathVariable("month") String month) {
        return driverJobService.jobMonthlyStatistics(driverId, month);
    }

    @PostMapping("pageQuery")
    @ApiOperation(value = "分页查询")
    public PageResponse<DriverJobDTO> pageQuery(@RequestBody DriverJobPageQueryDTO driverJobPageQueryDTO) {
        return this.driverJobService.pageQuery(driverJobPageQueryDTO);
    }
}
