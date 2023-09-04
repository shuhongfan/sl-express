package com.sl.transport.controller;

import cn.hutool.core.bean.BeanUtil;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.domain.TransportLineDTO;
import com.sl.transport.domain.TransportLineNodeDTO;
import com.sl.transport.domain.TransportLineSearchDTO;
import com.sl.transport.entity.line.TransportLine;
import com.sl.transport.service.TransportLineService;
import com.sl.transport.utils.TransportLineUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * 物流路线相关业务对外提供接口服务
 *
 * @author zzj
 * @version 1.0
 */
@Api(tags = "物流路线")
@RequestMapping("transports")
@Validated
@RestController
public class TransportLineController {

    @Resource
    private TransportLineService transportLineService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "startId", value = "开始网点业务id", required = true),
            @ApiImplicitParam(name = "endId", value = "结束网点业务id", required = true)
    })
    @ApiOperation(value = "最短的路线", notes = "查询两个网点之间最短的路线，最大查询深度为：10")
    @GetMapping("{startId}/{endId}")
    public TransportLineNodeDTO queryShortestPath(@NotNull(message = "startId不能为空") @PathVariable("startId") Long startId,
                                                  @NotNull(message = "endId不能为空") @PathVariable("endId") Long endId) {
        return this.transportLineService.queryShortestPath(startId, endId);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "startId", value = "开始网点业务id", required = true),
            @ApiImplicitParam(name = "endId", value = "结束网点业务id", required = true)
    })
    @ApiOperation(value = "成本最低的路线", notes = "查询两个网点之间成本最低的路线，最大查询深度为：10")
    @GetMapping("lowest/{startId}/{endId}")
    public TransportLineNodeDTO findLowestPath(@NotNull(message = "startId不能为空") @PathVariable("startId") Long startId,
                                               @NotNull(message = "endId不能为空") @PathVariable("endId") Long endId) {
        return this.transportLineService.findLowestPath(startId, endId);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "startId", value = "开始网点业务id", required = true),
            @ApiImplicitParam(name = "endId", value = "结束网点业务id", required = true)
    })
    @ApiOperation(value = "根据调度策略查询路线", notes = "根据调度策略选择最短路线或者成本最低路线")
    @GetMapping("/dispatchMethod/{startId}/{endId}")
    public TransportLineNodeDTO queryPathByDispatchMethod(@NotNull(message = "startId不能为空") @PathVariable("startId") Long startId,
                                                          @NotNull(message = "endId不能为空") @PathVariable("endId") Long endId) {
        return this.transportLineService.queryPathByDispatchMethod(startId, endId);
    }

    @ApiOperation(value = "新增路线", notes = "新增路线，干线：起点终点无顺序，支线：起点必须是二级转运中心，接驳路线：起点必须是网点")
    @PostMapping
    public void createLine(@RequestBody TransportLineDTO transportLineDTO) {
        TransportLine transportLine = TransportLineUtils.toEntity(transportLineDTO);
        Boolean result = this.transportLineService.createLine(transportLine);
        if (!result) {
            throw new SLException("新增路线失败！", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @ApiOperation(value = "更新路线", notes = "更新路线，可更新字段：cost、name、distance、time、extra，更新数据时id不能为空")
    @PutMapping
    public void updateLine(@RequestBody TransportLineDTO transportLineDTO) {
        TransportLine transportLine = TransportLineUtils.toEntity(transportLineDTO);
        Boolean result = this.transportLineService.updateLine(transportLine);
        if (!result) {
            throw new SLException("更新路线失败！", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "路线id", required = true)
    })
    @ApiOperation(value = "删除路线", notes = "删除路线，单向删除")
    @DeleteMapping("{id}")
    public void deleteLine(@PathVariable("id") Long id) {
        Boolean result = this.transportLineService.deleteLine(id);
        if (!result) {
            throw new SLException("更新路线失败！", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "路线id", required = true)
    })
    @ApiOperation(value = "根据id查询路线", notes = "根据id查询路线")
    @GetMapping("{id}")
    public TransportLineDTO queryById(@PathVariable("id") Long id) {
        TransportLine transportLine = this.transportLineService.queryById(id);
        return TransportLineUtils.toDTO(transportLine);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "路线id列表", required = true)
    })
    @ApiOperation(value = "根据ids批量查询路线", notes = "根据ids批量查询路线")
    @GetMapping("list")
    public List<TransportLineDTO> queryByIds(@Size(min = 1, message = "至少要传入1个id") @RequestParam("ids") Long[] ids) {
        List<TransportLine> list = this.transportLineService.queryByIds(ids);
        return TransportLineUtils.toDTOList(list);
    }

    @ApiOperation(value = "分页查询路线", notes = "分页查询路线，如果有条件就进行筛选查询")
    @PostMapping("page")
    public PageResponse<TransportLineDTO> queryPageList(@RequestBody TransportLineSearchDTO transportLineSearchDTO) {
        PageResponse<TransportLine> pageResponse = this.transportLineService.queryPageList(transportLineSearchDTO);

        PageResponse<TransportLineDTO> result = new PageResponse<>();
        BeanUtil.copyProperties(pageResponse, result, "items");
        result.setItems(TransportLineUtils.toDTOList(pageResponse.getItems()));
        return result;
    }

}
