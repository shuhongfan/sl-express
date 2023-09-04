package com.sl.ms.web.customer.config;

import com.sl.transport.common.config.FeignErrorDecoder;
import com.sl.transport.common.exception.SLWebException;
import org.springframework.context.annotation.Configuration;

/**
 * web调用feign失败解码器实现
 *
 * @author zzj
 * @version 1.0
 */
@Configuration
public class WebFeignErrorDecoder extends FeignErrorDecoder {

    @Override
    public Exception call(int status, int code, String msg) {
        return new SLWebException(msg);
    }
}
