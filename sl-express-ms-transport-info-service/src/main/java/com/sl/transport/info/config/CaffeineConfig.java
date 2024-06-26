package com.sl.transport.info.config;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.sl.transport.info.domain.TransportInfoDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * Caffeine缓存配置
 */
@Configuration
public class CaffeineConfig {

    @Value("${caffeine.init}")
    private Integer init;

    @Value("${caffeine.max}")
    private Integer max;

    @Bean
    public Cache<String, TransportInfoDTO> transportInfoCache() {
        return Caffeine.newBuilder()
                .initialCapacity(init)
                .maximumSize(max)
                .build();
    }

}
