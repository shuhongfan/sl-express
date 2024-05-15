package com.sl.transport.repository.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.sl.transport.common.util.BeanUtil;
import com.sl.transport.domain.OrganDTO;
import com.sl.transport.enums.OrganTypeEnum;
import com.sl.transport.repository.OrganRepository;
import jdk.jfr.Registered;
import org.neo4j.driver.internal.InternalPoint2D;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class OrganRepositoryImpl implements OrganRepository {

    @Autowired
    private Neo4jClient neo4jClient;

    @Override
    public OrganDTO findByBid(Long bid) {
        String cypherQuery = StrUtil.format("MATCH (n)\n" +
                "WHERE n.bid = {}\n" +
                "RETURN n", bid);
        return CollUtil.getFirst(executeQuery(cypherQuery));
    }

    @Override
    public List<OrganDTO> findByBids(List<Long> bids) {
        String cypherQuery = StrUtil.format("MATCH (n)\n" +
                "WHERE n.bid in {}\n" +
                "RETURN n", bids);
        return executeQuery(cypherQuery);
    }

    @Override
    public List<OrganDTO> findAll(String name) {
        name = StrUtil.removeAll(name, '\'', '"');
        String cypherQuery = StrUtil.isEmpty(name) ?
                "MATCH (n) RETURN n" :
                StrUtil.format("MATCH (n) WHERE n.name CONTAINS '{}' RETURN n", name);
        return executeQuery(cypherQuery);
    }

    private List<OrganDTO> executeQuery(String cypherQuery) {
        return ListUtil.toList(this.neo4jClient.query(cypherQuery)
                        .fetchAs(OrganDTO.class)
                        .mappedBy(((typeSystem, record) -> {
                            Map<String, Object> map = record.get("n").asMap();
                            OrganDTO organDTO = BeanUtil.toBean(map, OrganDTO.class);
                            InternalPoint2D location = (InternalPoint2D) map.get("location");
                            if (ObjectUtil.isNotEmpty(location)) {
                                organDTO.setLongitude(location.x());
                                organDTO.setLatitude(location.y());
                            }

//                    获取类型
                            String type = CollUtil.getFirst(record.get("n").asNode().labels());
                            organDTO.setType(OrganTypeEnum.valueOf(type).getCode());
                            return organDTO;
                        })).all()
        );
    }
}
