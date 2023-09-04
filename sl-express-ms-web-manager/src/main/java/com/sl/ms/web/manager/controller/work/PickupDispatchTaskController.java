package com.sl.ms.web.manager.controller.work;

import com.sl.ms.web.manager.service.WorkService;
import com.sl.ms.web.manager.vo.work.PickupDispatchTaskListVO;
import com.sl.ms.web.manager.vo.work.TaskPickupDispatchQueryVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 取件、派件任务管理
 */
@Api(tags = "派件、取件任务")
@Slf4j
@RestController
@RequestMapping("pickup-dispatch-task-manager")
public class PickupDispatchTaskController {
    @Resource
    private WorkService workService;

    @ApiOperation(value = "获取取派件分页数据")
    @PostMapping("/page")
    public R<PageResponse<PickupDispatchTaskListVO>> findByPage(@RequestBody TaskPickupDispatchQueryVO vo) {
        return R.success(workService.findTaskPickupDispatchByPage(vo));
    }

    @ApiOperation(value = "分配快递员")
    @ApiImplicitParams({@ApiImplicitParam(name = "courierId", value = "快递员id", required = true, dataTypeClass = Long.class)})
    @PutMapping("/{courierId}")
    public R<Void> update(@PathVariable(name = "courierId") Long courierId, @RequestBody List<String> ids) {
        workService.updateTaskPickupDispatchById(ids, courierId);
        return R.success();
    }
}
