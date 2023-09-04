package com.sl.ms.web.manager.controller.transport;

import com.sl.ms.web.manager.service.TransportService;
import com.sl.ms.web.manager.vo.transportLine.TransportLineQueryVO;
import com.sl.ms.web.manager.vo.transportLine.TransportLineVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 线路管理
 */
@RestController
@Api(tags = "线路管理")
@Slf4j
public class TransportLineController {

    @Resource
    private TransportService transportService;

    @ApiOperation(value = "添加线路")
    @PostMapping("/transportLine")
    public R<TransportLineVO> saveTransportLine(@RequestBody TransportLineVO vo) {
        transportService.saveTransportLine(vo);
        return R.success();
    }

    @ApiOperation(value = "更新线路")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "线路id", required = true, example = "1")
    })
    @PutMapping("/transportLine/{id}")
    public R<TransportLineVO> updateTransportLine(@PathVariable(name = "id") Long id, @RequestBody TransportLineVO vo) {
        transportService.updateTransportLine(id, vo);
        return R.success();
    }

    @ApiOperation(value = "获取线路分页数据")
    @PostMapping("/transportLine/page")
    public R<PageResponse<TransportLineVO>> findTransportLineByPage(@RequestBody TransportLineQueryVO transportLineQueryVO) {
        return R.success(transportService.findTransportLineByPage(transportLineQueryVO));
    }

    @ApiOperation(value = "获取线路详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "线路id", required = true, example = "1")
    })
    @GetMapping("/transportLine/{id}")
    public R<TransportLineVO> findTransportLineById(@PathVariable(name = "id") Long id) {
        return R.success(transportService.findTransportLineById(id));
    }

    @ApiOperation(value = "删除线路")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "线路id", required = true, example = "1")
    })
    @DeleteMapping("/transportLine/{id}")
    public R<Void> deleteTransportLine(@PathVariable(name = "id") Long id) {
        transportService.deleteTransportLine(id);
        return R.success();
    }
}
