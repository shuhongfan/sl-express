package com.sl.transport.repository;

import com.sl.transport.common.util.PageResponse;
import com.sl.transport.domain.TransportLineNodeDTO;
import com.sl.transport.domain.TransportLineSearchDTO;
import com.sl.transport.entity.line.TransportLine;
import com.sl.transport.entity.node.AgencyEntity;
import com.sl.transport.entity.node.BaseEntity;

import java.util.List;

/**
 * 运输路线查询
 *
 * @author zzj
 * @version 1.0
 */
public interface TransportLineRepository {

    /**
     * 查询两个网点之间最短的路线，查询深度为：10
     *
     * @param start 开始网点
     * @param end   结束网点
     * @return 路线
     */
    TransportLineNodeDTO findShortestPath(AgencyEntity start, AgencyEntity end);

    /**
     * 查询两个网点之间最短的路线，最大查询深度为：10
     *
     * @param start 开始网点
     * @param end   结束网点
     * @param depth 查询深度，最大为：10
     * @return 路线
     */
    TransportLineNodeDTO findShortestPath(AgencyEntity start, AgencyEntity end, int depth);

    /**
     * 查询两个网点之间的路线列表，成本优先 > 转运节点优先
     *
     * @param start 开始网点
     * @param end   结束网点
     * @param depth 查询深度
     * @param limit 返回路线的数量
     * @return 路线
     */
    List<TransportLineNodeDTO> findPathList(AgencyEntity start, AgencyEntity end, int depth, int limit);

    /**
     * 查询数据节点之间的关系数量
     *
     * @param firstNode  第一个节点
     * @param secondNode 第二个节点
     * @return 数量
     */
    Long queryCount(BaseEntity firstNode, BaseEntity secondNode);

    /**
     * 新增路线
     *
     * @param firstNode     第一个节点
     * @param secondNode    第二个节点
     * @param transportLine 路线数据
     * @return 新增关系的数量
     */
    Long create(BaseEntity firstNode, BaseEntity secondNode, TransportLine transportLine);

    /**
     * 更新路线
     *
     * @param transportLine 路线数据
     * @return 更新的数量
     */
    Long update(TransportLine transportLine);

    /**
     * 删除路线
     *
     * @param lineId 关系id
     * @return 删除关系的数量
     */
    Long remove(Long lineId);

    /**
     * 分页查询路线
     *
     * @param transportLineSearchDTO 搜索参数
     * @return 路线列表
     */
    PageResponse<TransportLine> queryPageList(TransportLineSearchDTO transportLineSearchDTO);


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
