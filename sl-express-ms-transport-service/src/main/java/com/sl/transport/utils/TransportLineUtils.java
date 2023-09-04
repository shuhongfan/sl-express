package com.sl.transport.utils;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.NumberUtil;
import com.sl.transport.domain.OrganDTO;
import com.sl.transport.domain.TransportLineDTO;
import com.sl.transport.domain.TransportLineNodeDTO;
import com.sl.transport.entity.line.TransportLine;
import com.sl.transport.enums.OrganTypeEnum;
import org.neo4j.driver.internal.value.PathValue;
import org.neo4j.driver.types.Path;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 对象转化工具类
 *
 * @author zzj
 * @version 1.0
 */
public class TransportLineUtils {

    public static TransportLine toEntity(TransportLineDTO transportLineDTO) {
        return BeanUtil.toBeanIgnoreError(transportLineDTO, TransportLine.class);
    }

    public static TransportLineDTO toDTO(TransportLine transportLine) {
        return BeanUtil.toBeanIgnoreError(transportLine, TransportLineDTO.class);
    }

    public static List<TransportLineDTO> toDTOList(List<TransportLine> transportLine) {
        return transportLine.stream()
                .map(TransportLineUtils::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * PathValue对象转化成TransferLineDTO对象
     *
     * @param pathValue Neo4j对象
     * @return TransferLineDTO对象
     */
    public static TransportLineNodeDTO convert(PathValue pathValue) {
        TransportLineNodeDTO transportLineNodeDTO = new TransportLineNodeDTO();
        Path path = pathValue.asPath();

        //提取node中的数据，封装成 NodeDTO 对象
        path.nodes().forEach(node -> {
            Map<String, Object> map = node.asMap();
            OrganDTO organDTO = BeanUtil.toBeanIgnoreError(map, OrganDTO.class);
            //取第一个标签作为类型
            organDTO.setType(OrganTypeEnum.valueOf(CollUtil.getFirst(node.labels())).getCode());
            //查询出来的数据，x：经度，y：纬度
            organDTO.setLatitude(BeanUtil.getProperty(map.get("location"), "y"));
            organDTO.setLongitude(BeanUtil.getProperty(map.get("location"), "x"));
            transportLineNodeDTO.getNodeList().add(organDTO);
        });

        //提取关系中的 cost 数据，进行求和计算，算出该路线的总成本
        path.relationships().forEach(relationship -> {
            Map<String, Object> objectMap = relationship.asMap();
            double cost = Convert.toDouble(objectMap.get("cost"), 0d);
            transportLineNodeDTO.setCost(NumberUtil.add(cost, transportLineNodeDTO.getCost().doubleValue()));
        });

        //取2位小数
        transportLineNodeDTO.setCost(NumberUtil.round(transportLineNodeDTO.getCost(), 2).doubleValue());
        return transportLineNodeDTO;
    }
}
