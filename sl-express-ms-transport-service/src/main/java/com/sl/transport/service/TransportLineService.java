package com.sl.transport.service;

import com.sl.transport.common.util.PageResponse;
import com.sl.transport.domain.TransportLineNodeDTO;
import com.sl.transport.domain.TransportLineSearchDTO;
import com.sl.transport.entity.line.TransportLine;

import java.util.List;

/**
 * 计算路线相关业务
 *
 * @author zzj
 * @version 1.0
 */
public interface TransportLineService {

    /**
     * 新增路线
     *
     * @param transportLine 路线数据
     * @return 是否成功
     */
    Boolean createLine(TransportLine transportLine);

    /**
     * 更新路线
     *
     * @param transportLine 路线数据
     * @return 是否成功
     */
    Boolean updateLine(TransportLine transportLine);

    /**
     * 删除路线
     *
     * @param id 路线id
     * @return 是否成功
     */
    Boolean deleteLine(Long id);

    /**
     * 分页查询路线
     *
     * @param transportLineSearchDTO 搜索参数
     * @return 路线列表
     */
    PageResponse<TransportLine> queryPageList(TransportLineSearchDTO transportLineSearchDTO);

    /**
     * 查询两个网点之间最短的路线，最大查询深度为：10
     *
     * @param startId 开始网点id
     * @param endId   结束网点id
     * @return 路线
     */
    TransportLineNodeDTO queryShortestPath(Long startId, Long endId);

    /**
     * 查询两个网点之间成本最低的路线，最大查询深度为：10
     *
     * @param startId 开始网点id
     * @param endId   结束网点id
     * @return 路线集合
     */
    TransportLineNodeDTO findLowestPath(Long startId, Long endId);

    /**
     * 根据调度策略查询路线
     *
     * @param startId 开始网点id
     * @param endId   结束网点id
     * @return 路线
     */
    TransportLineNodeDTO queryPathByDispatchMethod(Long startId, Long endId);

    /**
     * 根据ids批量查询路线
     *
     * @param ids id列表
     * @return 路线列表
     */
    List<TransportLine> queryByIds(Long... ids);

    /**
     * 根据id查询路线
     *
     * @param id 路线id
     * @return 路线数据
     */
    TransportLine queryById(Long id);
}
