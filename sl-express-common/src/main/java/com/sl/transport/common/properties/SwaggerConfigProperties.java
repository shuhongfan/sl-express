package com.sl.transport.common.properties;

import lombok.Data;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * @Description SwaggerConfigProperties配置类
 */
@Data
@Component
@Configuration
@ConfigurationProperties(prefix = "sl.swagger")
@ConditionalOnProperty(prefix = "sl.swagger",value = "package-path")
public class SwaggerConfigProperties implements Serializable {

    public String packagePath;

    public String title;

    public String description;

    public String contactName;

    public String contactUrl;

    public String contactEmail;

    public String version;
}
