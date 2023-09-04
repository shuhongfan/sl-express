package com.sl.ms.trade.api.fallback;

import com.sl.ms.trade.api.TradingFeign;
import com.sl.ms.trade.domain.TradingDTO;
import org.springframework.cloud.openfeign.FallbackFactory;

/**
 * @author zzj
 * @version 1.0
 */
public class TradingFeignFallbackFactory implements FallbackFactory<TradingFeign> {
    @Override
    public TradingFeign create(Throwable cause) {
        return new TradingFeign() {
            @Override
            public TradingDTO queryTrading(Long productOrderNo, Long tradingOrderNo) {
                return null;
            }
        };
    }
}
