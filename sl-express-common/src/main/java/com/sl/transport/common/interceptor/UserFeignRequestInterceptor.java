package com.sl.transport.common.interceptor;

import cn.hutool.core.codec.Base64;
import cn.hutool.json.JSONUtil;
import com.sl.transport.common.util.UserThreadLocal;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/**
 * 如果需要通过Feign将用户信息向下游微服务传递，需要在配置文件中设置：sl.feign.user = true
 */
@Component
@ConditionalOnProperty(prefix = "sl.feign", value = "user")
public class UserFeignRequestInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        //将userInfo放到feign请求头中，向下游的服务传递
        String userInfo = Base64.encode(JSONUtil.toJsonStr(UserThreadLocal.get()));
        template.header("userInfo", userInfo);
        template.header("X-Request-From", "sl-express-gateway");
    }
}
