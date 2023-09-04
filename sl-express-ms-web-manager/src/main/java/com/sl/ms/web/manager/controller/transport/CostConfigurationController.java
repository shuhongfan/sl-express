package com.sl.ms.web.manager.controller.transport;

import com.sl.ms.web.manager.service.TransportService;
import com.sl.ms.web.manager.vo.work.CostConfigurationVO;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.List;

/**
 * 调度配置管理
 */
@Api(tags = "成本配置")
@Slf4j
@RestController
@RequestMapping("cost-configuration-manager")
public class CostConfigurationController {
    @Resource
    private TransportService transportService;

    @ApiOperation(value = "保存成本配置")
    @PostMapping
    public R<Void> saveConfiguration(@Valid @RequestBody List<CostConfigurationVO> vo) {
        transportService.saveCostConfiguration(vo);
        return R.success();
    }

    @ApiOperation(value = "查询成本配置")
    @GetMapping
    public R<List<CostConfigurationVO>> findConfiguration() {
        return R.success(transportService.findCostConfiguration());
    }
}
