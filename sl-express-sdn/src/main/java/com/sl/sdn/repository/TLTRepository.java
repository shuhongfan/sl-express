package com.sl.sdn.repository;

import com.sl.sdn.entity.node.TLTEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

/**
 * 二级转运中心数据操作
 */
@Repository
public interface TLTRepository extends Neo4jRepository<TLTEntity,Long> {

    /**
     * 根据Bid查询
     * @param bid
     * @return
     */
    TLTEntity findByBid(Long bid);


    /**
     * 根据bid删除
     * @param bid
     * @return
     */
    Long deleteByBid(Long bid);

}
