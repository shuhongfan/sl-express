package com.sl.transport.info.config;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.RandomUtil;
import org.springframework.data.redis.cache.RedisCache;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.cache.RedisCacheWriter;

import java.time.Duration;

/**
 * 自定义CacheManager，用于设置不同的过期时间，防止雪崩问题的发生
 */
public class MyRedisCacheManager extends RedisCacheManager {

    public MyRedisCacheManager(RedisCacheWriter cacheWriter, RedisCacheConfiguration defaultCacheConfiguration) {
        super(cacheWriter, defaultCacheConfiguration);
    }

    @Override
    protected RedisCache createRedisCache(String name, RedisCacheConfiguration cacheConfig) {
        //获取到原有过期时间
        Duration duration = cacheConfig.getTtl();
        if (ObjectUtil.isNotEmpty(duration)) {
            //在原有时间上随机增加1~10分钟
            Duration newDuration = duration.plusMinutes(RandomUtil.randomInt(1, 11));
            cacheConfig = cacheConfig.entryTtl(newDuration);
        }
        return super.createRedisCache(name, cacheConfig);
    }
}
