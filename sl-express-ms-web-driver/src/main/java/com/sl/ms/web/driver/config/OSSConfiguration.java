package com.sl.ms.web.driver.config;

import com.sl.transport.common.properties.AliOSSProperties;
import com.sl.transport.common.service.AliOssService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 配置对象存储工具类
 * 主要用于上传图片和文件
 */
@Configuration
@Slf4j
public class OSSConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public AliOssService aliOSSUtil(AliOSSProperties aliOSSProperties) {
        log.info("创建阿里云OSS工具类...");

        return new AliOssService(
                aliOSSProperties.getEndpoint(),
                aliOSSProperties.getAccessKeyId(),
                aliOSSProperties.getAccessKeySecret(),
                aliOSSProperties.getBucketName());
    }
}
