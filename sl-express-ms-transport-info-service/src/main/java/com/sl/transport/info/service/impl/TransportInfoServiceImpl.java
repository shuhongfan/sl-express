package com.sl.transport.info.service.impl;

import cn.hutool.core.collection.ListUtil;
import com.github.benmanes.caffeine.cache.Cache;
import com.sl.transport.common.util.ObjectUtil;
import com.sl.transport.info.config.RedisConfig;
import com.sl.transport.info.entity.TransportInfoDetail;
import com.sl.transport.info.entity.TransportInfoEntity;
import com.sl.transport.info.service.TransportInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class TransportInfoServiceImpl implements TransportInfoService {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private Cache transportInfoCache;
    private StringRedisTemplate stringRedisTemplate;
    @Autowired
    private BloomFilterServiceImpl bloomFilterService;

    /**
     * 如果运单数据不存在，就新增，否则更新数据
     *
     * @param transportOrderId 运单id
     * @param infoDetail       信息详情
     * @return 运输信息数据
     */
    @Override
    @CachePut(value = "transport-info",key = "#p0")
    public TransportInfoEntity saveOrUpdate(String transportOrderId, TransportInfoDetail infoDetail) {
//        根据运单ID查询
        Query query = Query.query(Criteria.where("transportOrderId").is(transportOrderId));
        TransportInfoEntity transportInfoEntity = mongoTemplate.findOne(query, TransportInfoEntity.class);
        if (ObjectUtil.isEmpty(transportInfoEntity)) {
//            运单信息不存在，新增数据
            transportInfoEntity = new TransportInfoEntity();
            transportInfoEntity.setTransportOrderId(transportOrderId);
            transportInfoEntity.setInfoList(ListUtil.toList(infoDetail));
            transportInfoEntity.setCreated(System.currentTimeMillis());

//            写到布隆过滤器中
            bloomFilterService.add(transportOrderId);
        } else {
//            运单信息存在，只需要追加物流详情数据
            transportInfoEntity.getInfoList().add(infoDetail);
        }

//        无论新增还是更新都要设置更新时间
        transportInfoEntity.setUpdated(System.currentTimeMillis());

//        清除缓存中的数据
//        transportInfoCache.invalidate(transportOrderId);
        stringRedisTemplate.convertAndSend(RedisConfig.CHANNEL_TOPIC, transportOrderId);

        return mongoTemplate.save(transportInfoEntity);
    }

    /**
     * 根据运单id查询运输信息
     *
     * @param transportOrderId 运单id
     * @return 运输信息数据
     */
    @Override
    @Cacheable(value = "transport-info", key = "#p0")
    public TransportInfoEntity queryByTransportOrderId(String transportOrderId) {
        Query query = Query.query(Criteria.where("transportOrderId").is(transportOrderId));
        return mongoTemplate.findOne(query, TransportInfoEntity.class);
    }

}
