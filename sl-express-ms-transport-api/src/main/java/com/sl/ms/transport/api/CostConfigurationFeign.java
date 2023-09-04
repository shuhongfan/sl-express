package com.sl.ms.transport.api;

import com.sl.transport.domain.CostConfigurationDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 成本配置相关业务对外提供接口服务
 *
 * @author wxb
 * @version 1.0
 */
@FeignClient(name = "sl-express-transport", contextId = "CostConfiguration", path = "/cost-configuration")
@ApiIgnore
public interface CostConfigurationFeign {

    /**
     * 查询成本配置
     *
     * @return 成本配置
     */
    @GetMapping
    List<CostConfigurationDTO> findConfiguration();

    /**
     * 保存成本配置
     *
     * @param dto 成本配置
     */
    @PostMapping
    void saveConfiguration(@RequestBody List<CostConfigurationDTO> dto);
}
