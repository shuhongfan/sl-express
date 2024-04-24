package com.sl.sdn.repository;

import com.sl.sdn.entity.node.AgencyEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

/**
 * 网点操作
 */
@Repository
public interface AgencyRepository extends Neo4jRepository<AgencyEntity,Long> {
    /**
     * 根据bid查询
     * @param bid
     * @return
     */
    AgencyEntity findByBid(Long bid);

    /**
     * 根据bid删除
     * @param bid
     * @return
     */
    Long deleteByBid(Long bid);

}
