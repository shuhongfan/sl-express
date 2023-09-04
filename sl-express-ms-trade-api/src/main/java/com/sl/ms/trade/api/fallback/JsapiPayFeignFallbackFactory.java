package com.sl.ms.trade.api.fallback;

import com.sl.ms.trade.api.JsapiPayFeign;
import com.sl.ms.trade.domain.request.JsapiPayDTO;
import com.sl.ms.trade.domain.response.JsapiPayResponseDTO;
import org.springframework.cloud.openfeign.FallbackFactory;

/**
 * @author zzj
 * @version 1.0
 */
public class JsapiPayFeignFallbackFactory implements FallbackFactory<JsapiPayFeign> {
    @Override
    public JsapiPayFeign create(Throwable cause) {
        return new JsapiPayFeign() {
            @Override
            public JsapiPayResponseDTO createJsapiTrading(JsapiPayDTO jsapiPayDTO) {
                return null;
            }
        };
    }
}
