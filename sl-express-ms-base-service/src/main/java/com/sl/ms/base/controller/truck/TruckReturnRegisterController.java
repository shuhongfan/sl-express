package com.sl.ms.base.controller.truck;

import cn.hutool.core.bean.BeanUtil;
import com.sl.ms.base.domain.truck.TruckReturnRegisterDTO;
import com.sl.ms.base.domain.truck.TruckReturnRegisterListDTO;
import com.sl.ms.base.domain.truck.TruckReturnRegisterPageQueryDTO;
import com.sl.ms.base.entity.truck.TruckReturnRegisterEntity;
import com.sl.ms.base.service.truck.TruckReturnRegisterService;
import com.sl.transport.common.util.PageResponse;
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
@RequestMapping("base/returnRegister")
@Slf4j
public class TruckReturnRegisterController {
    @Resource
    private TruckReturnRegisterService truckReturnRegisterService;

    @PostMapping
    @ApiOperation(value = "新增回车登记", notes = "新增回车登记记录")
    public void save(@RequestBody TruckReturnRegisterDTO truckReturnRegisterDTO) {
        TruckReturnRegisterEntity truckReturnRegisterEntity = BeanUtil.toBean(truckReturnRegisterDTO, TruckReturnRegisterEntity.class);
        truckReturnRegisterService.save(truckReturnRegisterEntity);
    }

    @PostMapping("pageQuery")
    @ApiOperation(value = "分页查询回车登记列表")
    public PageResponse<TruckReturnRegisterListDTO> pageQuery(@RequestBody TruckReturnRegisterPageQueryDTO truckReturnRegisterPageQueryDTO) {
        return truckReturnRegisterService.pageQuery(truckReturnRegisterPageQueryDTO);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "根据id查询回车登记详情")
    @ApiImplicitParams({@ApiImplicitParam(name = "id", value = "回车登记id",dataTypeClass = Long.class)})
    public TruckReturnRegisterDTO findById(@PathVariable("id") Long id) {
        return truckReturnRegisterService.findById(id);
    }
}