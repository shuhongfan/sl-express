package com.sl.ms.trade.api.fallback;

import com.sl.ms.trade.api.NativePayFeign;
import com.sl.ms.trade.domain.request.NativePayDTO;
import com.sl.ms.trade.domain.response.NativePayResponseDTO;
import org.springframework.cloud.openfeign.FallbackFactory;

/**
 * @author zzj
 * @version 1.0
 */
public class NativePayFeignFallbackFactory implements FallbackFactory<NativePayFeign> {
    @Override
    public NativePayFeign create(Throwable cause) {
        return new NativePayFeign() {
            @Override
            public NativePayResponseDTO createDownLineTrading(NativePayDTO nativePayDTO) {
                return null;
            }

            @Override
            public String queryQrCode(Long tradingOrderNo) {
                return null;
            }
        };
    }
}
