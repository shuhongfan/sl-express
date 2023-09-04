package com.sl.ms.trade.api;

import com.sl.ms.trade.api.fallback.TradingFeignFallbackFactory;
import com.sl.ms.trade.domain.TradingDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "sl-express-ms-trade", contextId = "Trading", path = "tradings", fallbackFactory = TradingFeignFallbackFactory.class)
public interface TradingFeign {

    /**
     * 根据业务系统订单号 或 交易单号查询交易单 （二个至少传递一个，优先按照交易单号查询）
     *
     * @param productOrderNo 业务订单号
     * @param tradingOrderNo 交易单号
     * @return 交易单数据
     */
    @GetMapping
    TradingDTO queryTrading(@RequestParam(value = "productOrderNo", required = false) Long productOrderNo,
                            @RequestParam(value = "tradingOrderNo", required = false) Long tradingOrderNo);

}
