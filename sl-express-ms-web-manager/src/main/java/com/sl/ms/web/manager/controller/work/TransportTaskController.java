package com.sl.ms.web.manager.controller.work;

import com.sl.ms.web.manager.service.WorkService;
import com.sl.ms.web.manager.vo.work.PointVO;
import com.sl.ms.web.manager.vo.work.TaskTransportQueryVO;
import com.sl.ms.web.manager.vo.work.TaskTransportUpdateVO;
import com.sl.ms.web.manager.vo.work.TaskTransportVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.LinkedHashSet;
import java.util.Map;


/**
 * 运输任务管理
 */
@Slf4j
@RestController
@Api(tags = "运输任务")
@RequestMapping("transport-task-manager")
public class TransportTaskController {
    @Resource
    private WorkService workService;

    @ApiOperation(value = "获取运输任务分页数据")
    @PostMapping("/page")
    public R<PageResponse<TaskTransportVO>> findByPage(@RequestBody TaskTransportQueryVO vo) {
        return R.success(workService.findTaskByPage(vo));
    }

    @ApiOperation(value = "获取运输任务详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运输任务id", required = true, example = "1")
    })
    @GetMapping("/{id}")
    public R<TaskTransportVO> findById(@PathVariable(name = "id") Long id) {
        return R.success(workService.findTaskById(id));
    }

    @ApiOperation(value = "获取运输任务坐标")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运输任务id", required = true, example = "1")
    })
    @GetMapping("point/{id}")
    public R<LinkedHashSet<PointVO>> findPointById(@PathVariable(name = "id") Long id) {
        return R.success(workService.findTaskPointById(id));
    }

    @ApiOperation(value = "手动调整 发车前调整车次 车辆 司机")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运输任务id", required = true, example = "1")
    })
    @PutMapping("/adjust/{id}")
    public R<TaskTransportVO> adjust(@PathVariable(name = "id") Long id, @RequestBody TaskTransportUpdateVO vo) {
        workService.adjustTask(id, vo);
        return R.success();
    }

    @ApiOperation(value = "统计运输任务")
    @GetMapping("/count")
    public R<Map<Integer, Long>> count() {
        return R.success(workService.countTask());
    }

    @ApiOperation(value = "空车取消运输任务")
    @ApiImplicitParams({@ApiImplicitParam(name = "id", value = "运输任务id", required = true, dataTypeClass = Long.class)})
    @PutMapping("/cancel/{id}")
    public R<Void> cancel(@PathVariable("id") Long id) {
        workService.cancel(id);
        return R.success();
    }
}
