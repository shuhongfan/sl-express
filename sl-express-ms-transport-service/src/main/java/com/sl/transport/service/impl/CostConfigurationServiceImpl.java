package com.sl.transport.service.impl;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.domain.CostConfigurationDTO;
import com.sl.transport.enums.ExceptionEnum;
import com.sl.transport.enums.TransportLineEnum;
import com.sl.transport.service.CostConfigurationService;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 成本配置相关业务
 *
 * @author wxb
 * @version 1.0
 */
@Service
public class CostConfigurationServiceImpl implements CostConfigurationService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    /**
     * 成本配置 redis key
     */
    static final String SL_TRANSPORT_COST_REDIS_KEY = "SL_TRANSPORT_COST_CONFIGURATION";

    /**
     * 默认成本配置
     */
    static final Map<Object, Object> DEFAULT_COST = Map.of(
            TransportLineEnum.TRUNK_LINE.getCode(), 0.8,
            TransportLineEnum.BRANCH_LINE.getCode(), 1.2,
            TransportLineEnum.CONNECT_LINE.getCode(), 1.5);

    /**
     * 查询成本配置
     *
     * @return 成本配置
     */
    @Override
    public List<CostConfigurationDTO> findConfiguration() {
        Map<Object, Object> entries = stringRedisTemplate.opsForHash().entries(SL_TRANSPORT_COST_REDIS_KEY);
        if (ObjectUtil.isEmpty(entries)) {
            // 使用默认值
            entries = DEFAULT_COST;
        }
        // 返回
        return entries.entrySet().stream()
                .map(v -> new CostConfigurationDTO(Convert.toInt(v.getKey()), Convert.toDouble(v.getValue())))
                .collect(Collectors.toList());
    }

    /**
     * 保存成本配置
     *
     * @param dto 成本配置
     */
    @Override
    public void saveConfiguration(List<CostConfigurationDTO> dto) {
        Map<Object, Object> map = dto.stream().collect(Collectors.toMap(v -> v.getTransportLineType().toString(), v -> v.getCost().toString()));
        stringRedisTemplate.opsForHash().putAll(SL_TRANSPORT_COST_REDIS_KEY, map);
    }

    /**
     * 查询成本根据类型
     *
     * @param type 类型
     * @return 成本
     */
    @Override
    public Double findCostByType(Integer type) {
        if (ObjectUtil.isEmpty(type)) {
            throw new SLException(ExceptionEnum.TRANSPORT_LINE_TYPE_ERROR);
        }
        // 查询redis
        Object o = stringRedisTemplate.opsForHash().get(SL_TRANSPORT_COST_REDIS_KEY, type.toString());
        if (ObjectUtil.isNotEmpty(o)) {
            return Convert.toDouble(o);
        }
        // 返回默认值
        return Convert.toDouble(DEFAULT_COST.get(type));
    }
}
