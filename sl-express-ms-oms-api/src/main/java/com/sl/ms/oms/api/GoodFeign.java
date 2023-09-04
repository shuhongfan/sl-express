package com.sl.ms.oms.api;

import com.sl.ms.oms.dto.OrderCargoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@FeignClient(name = "sl-express-ms-oms", path = "good", contextId = "good")
@ApiIgnore
public interface GoodFeign {

    /**
     * 批量查询货物信息表
     *
     * @param name 名称
     * @return 货物信息
     */
    @GetMapping("/hot")
    List<OrderCargoDTO> list(@RequestParam(name = "name", required = false) String name);
}
