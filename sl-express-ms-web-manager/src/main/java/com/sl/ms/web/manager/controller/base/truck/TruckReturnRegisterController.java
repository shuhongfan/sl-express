package com.sl.ms.web.manager.controller.base.truck;

import com.sl.ms.web.manager.service.TruckReturnRegisterService;
import com.sl.ms.web.manager.vo.baseTruck.TruckReturnRegisterListVO;
import com.sl.ms.web.manager.vo.baseTruck.TruckReturnRegisterPageQueryVO;
import com.sl.ms.web.manager.vo.baseTruck.TruckReturnRegisterVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 回车登记
 */

@Api(tags = "回车登记")
@RestController
@RequestMapping("truck-return-register")
@Slf4j
public class TruckReturnRegisterController {
    @Resource
    private TruckReturnRegisterService truckReturnRegisterService;

    @ApiOperation(value = "分页查询回车登记列表")
    @PostMapping("/pageQuery")
    public R<PageResponse<TruckReturnRegisterListVO>> pageQuery(@RequestBody TruckReturnRegisterPageQueryVO vo) {
        return R.success(truckReturnRegisterService.pageQuery(vo));
    }

    @ApiOperation(value = "回车登记详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "回车登记id", required = true, dataTypeClass = Long.class)
    })
    @GetMapping("/detail/{id}")
    public R<TruckReturnRegisterVO> detail(@PathVariable("id") Long id) {
        return R.success(truckReturnRegisterService.detail(id));
    }
}
