package com.sl.transport.repository;

import com.sl.transport.entity.node.BaseEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

/**
 * Repository基本方法的实现
 *
 * @author zzj
 * @version 1.0
 */
@NoRepositoryBean
public interface BaseRepository<T extends BaseEntity, ID> extends Neo4jRepository<T, ID> {

    /**
     * 根据业务id查询节点数据
     *
     * @param bid 业务id
     * @return 节点数据
     */
    Optional<T> findByBid(Long bid);

    /**
     * 根据业务id删除节点数据
     *
     * @param bid 业务id
     * @return 删除的数据数量
     */
    Long deleteByBid(Long bid);

}
