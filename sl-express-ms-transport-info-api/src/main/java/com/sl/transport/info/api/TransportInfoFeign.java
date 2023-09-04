package com.sl.transport.info.api;

import com.sl.transport.info.api.fallback.TransportInfoFeignFallbackFactory;
import com.sl.transport.info.domain.TransportInfoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "sl-express-ms-transport-info", contextId = "TransportInfo", path = "infos", fallbackFactory = TransportInfoFeignFallbackFactory.class)
public interface TransportInfoFeign {

    /**
     * 根据运单id查询运单信息
     *
     * @param transportOrderId 运单号
     * @return 运单信息
     */
    @GetMapping("{transportOrderId}")
    TransportInfoDTO queryByTransportOrderId(@PathVariable("transportOrderId") String transportOrderId);

}
