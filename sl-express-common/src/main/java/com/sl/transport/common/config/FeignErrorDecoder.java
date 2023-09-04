package com.sl.transport.common.config;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import feign.Response;
import feign.codec.ErrorDecoder;
import lombok.extern.slf4j.Slf4j;

/**
 * Feign解码器
 *
 * @author zzj
 * @version 1.0
 */
@Slf4j
public abstract class FeignErrorDecoder implements ErrorDecoder {

    public abstract Exception call(int status, int code, String msg);

    @Override
    public Exception decode(String methodKey, Response response) {
        String message = null;
        try {
            message = IoUtil.read(response.body().asReader(CharsetUtil.CHARSET_UTF_8));
            log.info("methodKey {} response {}", methodKey, message);
            JSONObject jsonObject = JSONUtil.parseObj(message);
            return this.call(response.status(), jsonObject.getInt("code"), jsonObject.getStr("msg"));
        } catch (Exception e) {
            //出现网络中断、服务宕机
            String msg = StrUtil.format("Feign调用失败，methodKey = {}, message = {}", methodKey, message);
            return this.call(response.status(), -1, msg);
        }
    }
}
