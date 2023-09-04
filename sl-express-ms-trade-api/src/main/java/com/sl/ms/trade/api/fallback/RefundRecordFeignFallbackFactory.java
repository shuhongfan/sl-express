package com.sl.ms.trade.api.fallback;

import com.sl.ms.trade.api.RefundRecordFeign;
import com.sl.ms.trade.domain.RefundRecordDTO;
import org.springframework.cloud.openfeign.FallbackFactory;

import java.util.List;

/**
 * @author zzj
 * @version 1.0
 */
public class RefundRecordFeignFallbackFactory implements FallbackFactory<RefundRecordFeign> {
    @Override
    public RefundRecordFeign create(Throwable cause) {
        return new RefundRecordFeign() {
            @Override
            public List<RefundRecordDTO> findList(Long productOrderNo, Long tradingOrderNo) {
                return null;
            }
        };
    }
}
