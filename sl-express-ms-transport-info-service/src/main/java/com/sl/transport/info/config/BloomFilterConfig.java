package com.sl.transport.info.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * 布隆过滤器相关配置
 */
@Getter
@Configuration
public class BloomFilterConfig {

    /**
     * 名称，默认：sl-bloom-filter
     */
    @Value("${bloom.name:sl-bloom-filter}")
    private String name;

    /**
     * 布隆过滤器长度，最大支持Integer.MAX_VALUE*2，即：4294967294，默认：1千万
     */
    @Value("${bloom.expectedInsertions:10000000}")
    private long expectedInsertions;

    /**
     * 误判率，默认：0.05
     */
    @Value("${bloom.falseProbability:0.05d}")
    private double falseProbability;

}
