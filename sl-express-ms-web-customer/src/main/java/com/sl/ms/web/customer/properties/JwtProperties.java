package com.sl.ms.web.customer.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "sl.jwt")
@Data
public class JwtProperties {

    /**
     * RSA私钥（base64加密后）
     */
    private String privateKey;
    /**
     * RSA公钥（base64加密后）
     */
    private String publicKey;
    /**
     * 短令牌有效期时间，单位：分钟
     */
    private Integer accessTtl;
    /**
     * 长令牌有效期时间，单位：小时
     */
    private Integer refreshTtl;
}
