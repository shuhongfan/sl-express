package com.sl.transport.info.api.fallback;

import com.sl.transport.info.api.TransportInfoFeign;
import com.sl.transport.info.domain.TransportInfoDTO;
import org.springframework.cloud.openfeign.FallbackFactory;

/**
 * @author zzj
 * @version 1.0
 */
public class TransportInfoFeignFallbackFactory implements FallbackFactory<TransportInfoFeign> {
    @Override
    public TransportInfoFeign create(Throwable cause) {
        return new TransportInfoFeign() {
            @Override
            public TransportInfoDTO queryByTransportOrderId(String transportOrderId) {
                return null;
            }
        };
    }
}
