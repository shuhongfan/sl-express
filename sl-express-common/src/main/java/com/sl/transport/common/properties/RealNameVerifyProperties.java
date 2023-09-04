package com.sl.transport.common.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "spring.eidverify")
@Data
public class RealNameVerifyProperties {

    private String url;
    private String appCode;
}