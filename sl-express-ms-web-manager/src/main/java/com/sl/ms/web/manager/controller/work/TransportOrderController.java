package com.sl.ms.web.manager.controller.work;

import com.sl.ms.web.manager.service.WorkService;
import com.sl.ms.web.manager.vo.work.TrackVO;
import com.sl.ms.web.manager.vo.work.TransportOrderQueryVO;
import com.sl.ms.web.manager.vo.work.TransportOrderVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Map;

/**
 * 运单管理
 */
@Slf4j
@Api(tags = "运单相关")
@RestController
@RequestMapping("transport-order-manager")
public class TransportOrderController {

    @Resource
    private WorkService workService;

    @ApiOperation(value = "获取运单分页数据")
    @PostMapping("/page")
    public R<PageResponse<TransportOrderVO>> findByPage(@RequestBody TransportOrderQueryVO vo) {
        return R.success(workService.findTransportOrderByPage(vo));
    }

    @ApiOperation(value = "获取运单详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运单id", required = true, example = "1")
    })
    @GetMapping("/{id}")
    public R<TransportOrderVO> findById(@PathVariable(name = "id") String id) {
        return R.success(workService.findTransportOrderDetail(id));
    }

    @ApiOperation(value = "统计运单")
    @GetMapping("/count")
    public R<Map<Integer, Long>> count() {
        return R.success(workService.countTransportOrder());
    }

    @ApiOperation(value = "获取运单轨迹详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运单id", required = true, example = "1")
    })
    @GetMapping("/track/{id}")
    public R<TrackVO> findTrackById(@PathVariable(name = "id") String id) {
        return R.success(workService.findTrackById(id));
    }
}
