package com.sl.ms.web.courier.controller;

import com.sl.ms.web.courier.service.TaskService;
import com.sl.ms.web.courier.vo.task.*;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.List;

@Api(tags = "任务（取件和派件）相关接口")
@RequestMapping("/tasks")
@RestController
@Validated
public class TaskController {

    @Resource
    private TaskService taskService;

    @ApiOperation("获取任务详情")
    @GetMapping("/get/{id}")
    @ApiImplicitParams({@ApiImplicitParam(name = "id", value = "派件或取件id", required = true, dataTypeClass = String.class)})
    public R<TaskInfoVO> detail(@PathVariable("id") String id) {
        return R.success(taskService.detail(id));
    }


    @ApiOperation("分页查询任务列表")
    @GetMapping("/page")
    public R<PageResponse<TaskVO>> pageQuery(@Valid TaskQueryVO vo) {
        return R.success(taskService.pageQuery(vo));
    }

    @ApiOperation("取消任务")
    @PostMapping("/cancel")
    public R<Void> cancel(@RequestBody TasksCancelVO tasksCancelVO) {
        taskService.cancel(tasksCancelVO);
        return R.success();
    }

    @ApiOperation("删除任务")
    @DeleteMapping("/{id}")
    @ApiImplicitParams({@ApiImplicitParam(name = "id", value = "派件或取件id", required = true, dataTypeClass = String.class)})
    public R<Void> delete(@PathVariable("id") String id) {
        taskService.delete(id);
        return R.success();
    }

    @ApiOperation("批量删除")
    @DeleteMapping("/batch")
    public R<Void> batchDelete(@RequestBody TaskBatchVO taskBatchVO) {
        taskService.batchDelete(taskBatchVO);
        return R.success();
    }

    @ApiOperation("批量转单")
    @PostMapping("/transfer/batch")
    public R<Void> batchTransfer(@RequestBody TaskBatchTransferVO taskBatchTransferVO) {
        taskService.batchTransfer(taskBatchTransferVO);
        return R.success();
    }

    @ApiOperation("身份验证")
    @PostMapping("/idCard/check")
    public R<RealNameVerifyVO> idCardCheck(@RequestBody TaskIdCardCheckVO taskIdCardCheckVO) {
        RealNameVerifyVO realNameVerifyVO = taskService.idCardCheck(taskIdCardCheckVO);
        if (realNameVerifyVO.getFlag()) {
            return R.success(realNameVerifyVO);
        }
        return R.error(realNameVerifyVO, "身份校验未通过");
    }

    @ApiOperation("取件")
    @PutMapping("/pickup")
    public R<Void> pickup(@RequestBody TaskPickupVO taskPickupVO) {
        if (taskService.pickup(taskPickupVO)) {
            return R.success();
        }
        return R.error("身份校验未通过");
    }

    @ApiOperation("用户拒收")
    @PutMapping("/reject/{id}")
    @ApiImplicitParams({@ApiImplicitParam(name = "id", value = "派件或取件id", required = true, dataTypeClass = String.class)})
    public R<Void> reject(@PathVariable("id") String id) {
        taskService.reject(id);
        return R.success();
    }

    @ApiOperation("签收")
    @PutMapping("sign")
    public R<Void> sign(@RequestBody TaskSignVO taskSignVO) {
        taskService.sign(taskSignVO);
        return R.success();
    }

    @ApiOperation("最近查找")
    @GetMapping("/recentSearch")
    public R<List<String>> recentSearch() {
        return R.success(taskService.recentSearch());
    }

    @ApiOperation("标记为最近查找")
    @GetMapping("/markRecent/{transportOrderId}")
    @ApiImplicitParams({@ApiImplicitParam(name = "transportOrderId", value = "运单号", required = true, dataTypeClass = String.class)})
    public R<Void> markRecent(@PathVariable("transportOrderId") String transportOrderId) {
        taskService.markRecent(transportOrderId);
        return R.success();
    }

    @ApiOperation("清空最近查找")
    @DeleteMapping("/recentSearch")
    public R<Void> recentSearchDeleteAll() {
        taskService.recentSearchDeleteAll();
        return R.success();
    }

    @PostMapping("calculate")
    @ApiOperation("运单费用计算")
    public R<CarriageVO> calculate(@RequestBody CarriageCalculateVO carriageCalculateVO) {
        return R.success(taskService.calculate(carriageCalculateVO));
    }

    @ApiOperation("订单跟踪")
    @GetMapping("/tracks/{id}")
    @ApiImplicitParams({@ApiImplicitParam(name = "id", value = "运单id", required = true, dataTypeClass = String.class)})
    public R<List<TransportOrderPointVO>> tracks(@PathVariable(value = "id") String id) {
        return R.success(taskService.tracks(id));
    }

    @GetMapping("taskStatistics")
    @ApiOperation("今日任务数据统计")
    public R<TaskStatisticsVO> tasksStatistics() {
        return R.success(taskService.taskStatistics());
    }

    @ApiOperation("搜索任务")
    @PostMapping("/search")
    public R<PageResponse<TaskVO>> search(@RequestBody TaskSearchVO taskSearchVO) {
        return R.success(taskService.search(taskSearchVO));
    }
}
