package com.sl.ms.transport.api;

import com.sl.transport.common.util.PageResponse;
import com.sl.transport.domain.TransportLineDTO;
import com.sl.transport.domain.TransportLineNodeDTO;
import com.sl.transport.domain.TransportLineSearchDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@FeignClient(name = "sl-express-transport", contextId = "TransportLine", path = "/transports")
@ApiIgnore
public interface TransportLineFeign {

    /**
     * 查询两个网点之间最短的路线，最大查询深度为：10
     *
     * @param startId 开始网点
     * @param endId   结束网点
     * @return 路线节点数据
     */
    @GetMapping("{startId}/{endId}")
    TransportLineNodeDTO queryShortestPath(@PathVariable("startId") Long startId, @PathVariable("endId") Long endId);

    /**
     * 查询两个网点之间成本最低的路线，最大查询深度为：10
     *
     * @param startId 开始网点
     * @param endId   结束网点
     * @return 路线节点数据
     */
    @GetMapping("lowest/{startId}/{endId}")
    TransportLineNodeDTO findLowestPath(@PathVariable("startId") Long startId, @PathVariable("endId") Long endId);

    /**
     * 根据调度策略查询路线
     *
     * @param startId 开始网点id
     * @param endId   结束网点id
     * @return 路线
     */
    @GetMapping("/dispatchMethod/{startId}/{endId}")
    TransportLineNodeDTO queryPathByDispatchMethod(@PathVariable("startId") Long startId, @PathVariable("endId") Long endId);

    /**
     * 新增路线，干线：起点终点无顺序，支线：起点必须是二级转运中心，接驳路线：起点必须是网点
     *
     * @param transportLineDTO 路线数据
     */
    @PostMapping
    void createLine(@RequestBody TransportLineDTO transportLineDTO);

    /**
     * 更新路线，可更新字段：cost、name、distance、time、extra，更新数据时id不能为空
     *
     * @param transportLineDTO 更新字段数据
     */
    @PutMapping
    void updateLine(@RequestBody TransportLineDTO transportLineDTO);

    /**
     * 删除路线，单向删除
     *
     * @param id 路线id
     */
    @DeleteMapping("{id}")
    void deleteLine(@PathVariable("id") Long id);

    /**
     * 根据id查询
     *
     * @param id 路线id
     * @return 路线信息
     */
    @GetMapping("{id}")
    TransportLineDTO queryById(@PathVariable("id") Long id);

    /**
     * 根据ids批量查询路线
     *
     * @param ids 路线id列表
     * @return 路线列表
     */
    @GetMapping("list")
    List<TransportLineDTO> queryByIds(@RequestParam("ids") Long... ids);

    /**
     * 分页查询路线，如果有条件就进行筛选查询
     *
     * @param transportLineSearchDTO 搜索参数
     * @return 分页数据
     */
    @PostMapping("page")
    PageResponse<TransportLineDTO> queryPageList(@RequestBody TransportLineSearchDTO transportLineSearchDTO);
}
