package com.sl.sdn.repository;

import com.sl.sdn.dto.TransportLineNodeDTO;
import com.sl.sdn.entity.node.AgencyEntity;

/**
 * 运输路线相关操作
 */
public interface TransportLineRepository {

    /**
     * 查询两个网点之间最短的路线，查询深度为：10
     * @param start
     * @param end
     * @return
     */
    TransportLineNodeDTO findShortTestPath(AgencyEntity start, AgencyEntity end);
}
