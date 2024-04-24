package com.sl.sdn.repository.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.StrUtil;
import com.sl.sdn.dto.OrganDTO;
import com.sl.sdn.dto.TransportLineNodeDTO;
import com.sl.sdn.entity.node.AgencyEntity;
import com.sl.sdn.enums.OrganTypeEnum;
import com.sl.sdn.repository.TransportLineRepository;
import com.sl.transport.common.util.BeanUtil;
import org.neo4j.driver.internal.value.PathValue;
import org.neo4j.driver.types.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;

/**
 * 运输路线相关操作
 */
@Repository
public class TransportLineRepositoryImpl implements TransportLineRepository {

    @Autowired
    private Neo4jClient neo4jClient;


    /**
     * 查询两个网点之间最短的路线，查询深度为：10
     * @param start
     * @param end
     * @return
     */
    @Override
    public TransportLineNodeDTO findShortTestPath(AgencyEntity start, AgencyEntity end) {
//        获取网点数据在Neo4j中的类型
        String type = AgencyEntity.class.getAnnotation(Node.class).value()[0];

//        构造查询语句
        String cypherQuery = StrUtil.format("MATCH path = shortestPath((start:{}) -[*..10]-> (end:{}))\n" +
                "WHERE start.bid = $startId AND end.bid = $endId \n" +
                "RETURN path", type, type);

//        执行查询语句
        Optional<TransportLineNodeDTO> transportLineNodeDTOOptional = neo4jClient.query(cypherQuery)
                .bind(start.getBid()).to("startId") // 设置参数
                .bind(end.getBid()).to("endId") // 设置参数
                .fetchAs(TransportLineNodeDTO.class) // 设置想要数据类型
                .mappedBy(((typeSystem, record) -> { // 对响应结果进行处理
                    PathValue pathValue = (PathValue) record.get(0);
                    Path path = pathValue.asPath();
                    TransportLineNodeDTO transportLineNodeDTO = new TransportLineNodeDTO();

//                    读取节点数据
                    path.nodes().forEach(node -> {
                        Map<String, Object> map = node.asMap();
                        OrganDTO organDTO = BeanUtil.toBeanIgnoreError(map, OrganDTO.class);

//                        读取第一个标签作为类型
                        organDTO.setType(OrganTypeEnum.valueOf(CollUtil.getFirst(node.labels())).getCode());

//                        查询处理的数据源，x:经度，y：纬度
                        organDTO.setLatitude(BeanUtil.getProperty(map.get("location"), "y"));
                        organDTO.setLongitude(BeanUtil.getProperty(map.get("location"), "x"));
                        transportLineNodeDTO.getNodeList().add(organDTO);
                    });

//                    取2位小数
                    transportLineNodeDTO.setCost(NumberUtil.round(transportLineNodeDTO.getCost(), 2).doubleValue());
                    return transportLineNodeDTO;

                })).one();


        return transportLineNodeDTOOptional.orElse(null);
    }

}
