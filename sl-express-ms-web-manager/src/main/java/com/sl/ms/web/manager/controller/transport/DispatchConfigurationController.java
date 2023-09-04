package com.sl.ms.web.manager.controller.transport;

import com.sl.ms.web.manager.service.TransportService;
import com.sl.ms.web.manager.vo.work.DispatchConfigurationVO;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * 调度配置管理
 */
@Api(tags = "调度配置")
@Slf4j
@RestController
@RequestMapping("dispatch-configuration-manager")
public class DispatchConfigurationController {
    @Resource
    private TransportService transportService;

    @ApiOperation(value = "保存调度配置")
    @PostMapping
    public R<Void> saveConfiguration(@Valid @RequestBody DispatchConfigurationVO vo) {
        transportService.saveConfiguration(vo);
        return R.success();
    }

    @ApiOperation(value = "查询调度配置")
    @GetMapping
    public R<DispatchConfigurationVO> findConfiguration() {
        return R.success(transportService.findConfiguration());
    }
}
