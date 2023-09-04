package com.sl.ms.transport.api;

import com.sl.transport.domain.DispatchConfigurationDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 调度配置相关业务对外提供接口服务
 *
 * @author zzj
 * @version 1.0
 */
@FeignClient(name = "sl-express-transport", contextId = "DispatchConfiguration", path = "/dispatch-configuration")
@ApiIgnore
public interface DispatchConfigurationFeign {

    /**
     * 查询调度配置
     *
     * @return 调度配置
     */
    @GetMapping
    DispatchConfigurationDTO findConfiguration();

    /**
     * 保存调度配置
     *
     * @param dto 调度配置
     */
    @PostMapping
    void saveConfiguration(@RequestBody DispatchConfigurationDTO dto);
}
