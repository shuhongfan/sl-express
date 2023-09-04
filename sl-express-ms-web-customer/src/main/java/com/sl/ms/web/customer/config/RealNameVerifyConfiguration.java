package com.sl.ms.web.customer.config;

import com.sl.transport.common.properties.RealNameVerifyProperties;
import com.sl.transport.common.service.RealNameVerifyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class RealNameVerifyConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public RealNameVerifyService realNameVerifyUtil(RealNameVerifyProperties realNameVerifyProperties) {
        log.info("实名认证工具类...");

        return new RealNameVerifyService(
                realNameVerifyProperties.getUrl(),
                realNameVerifyProperties.getAppCode());
    }
}
