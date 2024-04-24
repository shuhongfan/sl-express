package com.sl.sdn.repository.impl;

import cn.hutool.core.collection.CollUtil;
import com.sl.sdn.dto.OrganDTO;
import com.sl.sdn.enums.OrganTypeEnum;
import com.sl.sdn.repository.OrganRepository;
import com.sl.transport.common.util.BeanUtil;
import org.neo4j.driver.internal.value.NodeValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * 通过机构查询
 */
@Repository
public class OrganRepositoryImpl implements OrganRepository {

    @Autowired
    private Neo4jClient neo4jClient;

    /**
     * 无需指定type，根据id查询
     * @param bid
     * @return
     */
    @Override
    public OrganDTO findByBid(Long bid) {
        String cypherQuery = "MATCH(n) where n.bid=$bid RETURN n";

        Optional<OrganDTO> organDTOOptional = neo4jClient.query(cypherQuery)
                .bind(bid).to("bid")
                .fetchAs(OrganDTO.class)
                .mappedBy(((typeSystem, record) -> {
                    NodeValue nodeValue = (NodeValue) record.get(0);
                    Map<String, Object> map = nodeValue.asMap();
                    OrganDTO organDTO = BeanUtil.toBeanIgnoreError(map, OrganDTO.class);
                    organDTO.setType(OrganTypeEnum.valueOf(CollUtil.getFirst(nodeValue.asNode().labels())).getCode());
                    organDTO.setLatitude(BeanUtil.getProperty(map.get("location"), "y"));
                    organDTO.setLongitude(BeanUtil.getProperty(map.get("location"), "x"));
                    return organDTO;
                })).one();
        return organDTOOptional.orElse(null);
    }

    /**
     * 查询所有的机构，如果name不为空的按照name模糊查询
     * @param name
     * @return
     */
    @Override
    public List<OrganDTO> findAll(String name) {
        String cypherQuery = "MATCH(n) where n.name CONTAINS $name RETURN n";

        Collection<OrganDTO> organDTOCollection = neo4jClient.query(cypherQuery)
                .bind(name).to("name")
                .fetchAs(OrganDTO.class)
                .mappedBy(((typeSystem, record) -> {
                    NodeValue nodeValue = (NodeValue) record.get(0);
                    Map<String, Object> map = nodeValue.asMap();
                    OrganDTO organDTO = BeanUtil.toBeanIgnoreError(map, OrganDTO.class);
                    organDTO.setType(OrganTypeEnum.valueOf(CollUtil.getFirst(nodeValue.asNode().labels())).getCode());
                    organDTO.setLatitude(BeanUtil.getProperty(map.get("location"), "y"));
                    organDTO.setLongitude(BeanUtil.getProperty(map.get("location"), "x"));
                    return organDTO;
                })).all();
        return (List<OrganDTO>) organDTOCollection;
    }
}
