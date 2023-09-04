package com.sl.transport.common.config;

import com.sl.transport.common.properties.SwaggerConfigProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import javax.annotation.Resource;

@Configuration
@ConditionalOnBean(value = SwaggerConfigProperties.class)
public class Knife4jConfiguration {

    @Resource
    private SwaggerConfigProperties swaggerConfigProperties;

    @Bean(value = "defaultApi2")
    public Docket defaultApi2() {
        Docket docket = new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(new ApiInfoBuilder()
                        .title(this.swaggerConfigProperties.getTitle())
                        .description(this.swaggerConfigProperties.getDescription())
                        .contact(new Contact(
                                this.swaggerConfigProperties.getContactName(),
                                this.swaggerConfigProperties.getContactUrl(),
                                this.swaggerConfigProperties.getContactEmail()))
                        .version(this.swaggerConfigProperties.getVersion())
                        .build())
                .select()
                //这里指定Controller扫描包路径
                .apis(RequestHandlerSelectors.basePackage(swaggerConfigProperties.getPackagePath()))
                .paths(PathSelectors.any())
                .build();
        return docket;
    }

}