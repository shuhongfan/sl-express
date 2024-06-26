package com.sl.transport.info.service.impl;

import com.sl.transport.info.config.BloomFilterConfig;
import com.sl.transport.info.service.BloomFilterService;
import org.redisson.api.RBloomFilter;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class BloomFilterServiceImpl implements BloomFilterService {

    @Autowired
    private RedissonClient redissonClient;

    @Autowired
    private BloomFilterConfig bloomFilterConfig;

    private RBloomFilter<Object> getBloomFilter() {
        return redissonClient.getBloomFilter(this.bloomFilterConfig.getName());
    }

    @Override
    @PostConstruct
    public void init() {
        RBloomFilter<Object> bloomFilter = getBloomFilter();
        bloomFilter.tryInit(
                bloomFilterConfig.getExpectedInsertions(),
                bloomFilterConfig.getFalseProbability());
    }

    @Override
    public boolean add(Object obj) {
        return getBloomFilter().add(obj);
    }

    @Override
    public boolean contains(Object obj) {
        return getBloomFilter().contains(obj);
    }

}
