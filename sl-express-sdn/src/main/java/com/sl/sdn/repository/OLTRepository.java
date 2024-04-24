package com.sl.sdn.repository;

import com.sl.sdn.entity.node.OLTEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

/**
 * 一级转运中心数据操作
 */
@Repository
public interface OLTRepository extends Neo4jRepository<OLTEntity, Long> {

    /**
     * 根据bid查询
     * @param bid
     * @return
     */
    OLTEntity findByBid(Long bid);

    /**
     * 根据bid删除
     * @param bid
     * @return
     */
    Long deleteByBid(Long bid);
}
