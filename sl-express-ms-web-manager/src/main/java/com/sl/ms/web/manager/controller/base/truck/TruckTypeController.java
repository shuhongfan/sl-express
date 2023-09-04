package com.sl.ms.web.manager.controller.base.truck;

import com.sl.ms.web.manager.enums.TruckTypeAllowableLoadEnum;
import com.sl.ms.web.manager.enums.TruckTypeAllowableVolumeEnum;
import com.sl.ms.web.manager.service.BaseCommonService;
import com.sl.ms.web.manager.vo.baseTruck.TruckTypeVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 车辆类型管理
 */
@RestController
@Api(tags = "车型管理")
@Slf4j
public class TruckTypeController {

    @Resource
    private BaseCommonService baseCommonService;

    @ApiOperation(value = "获取车辆类型信息列表")
    @GetMapping(value = "truckType/simple")
    public R<List<TruckTypeVO>> truckTypeSimple() {
        return R.success(baseCommonService.truckTypeSimple());
    }

    @ApiOperation(value = "添加车辆类型")
    @PostMapping("/truckType")
    public R<TruckTypeVO> saveTruckType(@RequestBody TruckTypeVO vo) {
        baseCommonService.saveTruckType(vo);
        return R.success();
    }

    @ApiOperation(value = "更新车辆类型")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "车辆类型id", required = true, example = "1")
    })
    @PutMapping("/truckType/{id}")
    public R<TruckTypeVO> updateTruckType(@PathVariable(name = "id") Long id, @RequestBody TruckTypeVO vo) {
        baseCommonService.updateTruckType(id, vo);
        return R.success();
    }

    @ApiOperation(value = "获取车辆类型分页数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, example = "1", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "pageSize", value = "页尺寸", required = true, example = "10", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "name", value = "车辆类型名称", dataTypeClass = String.class),
            @ApiImplicitParam(name = "allowableLoad", value = "车型载重,单位：吨；左闭右开区间", example = "[1.8,6)", dataTypeClass = TruckTypeAllowableLoadEnum.class),
            @ApiImplicitParam(name = "allowableVolume", value = "车型体积，单位：立方米；左闭右开区间", example = "[5,10)", dataTypeClass = TruckTypeAllowableVolumeEnum.class),
            @ApiImplicitParam(name = "id", value = "车型id", dataTypeClass = Long.class)
    })
    @GetMapping("/truckType/page")
    public R<PageResponse<TruckTypeVO>> findTruckTypeByPage(@RequestParam(name = "page") Integer page,
                                                            @RequestParam(name = "pageSize") Integer pageSize,
                                                            @RequestParam(name = "name", required = false) String name,
                                                            @RequestParam(name = "allowableLoad", required = false) TruckTypeAllowableLoadEnum allowableLoad,
                                                            @RequestParam(name = "allowableVolume", required = false) TruckTypeAllowableVolumeEnum allowableVolume,
                                                            @RequestParam(name = "id", required = false) Long id) {
        return R.success(baseCommonService.findTruckTypeByPage(page, pageSize, name, allowableLoad, allowableVolume, id));
    }

    @ApiOperation(value = "获取车辆类型详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "车辆类型id", required = true, example = "1")
    })
    @GetMapping("/truckType/{id}")
    public R<TruckTypeVO> findTruckTypeById(@PathVariable(name = "id") Long id) {
        return R.success(baseCommonService.findTruckTypeById(id));
    }

    @ApiOperation(value = "删除车辆类型")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "车辆类型id", required = true, example = "1")
    })
    @DeleteMapping("/truckType/{id}")
    public R<Void> deleteTruckType(@PathVariable(name = "id") Long id) {
        baseCommonService.deleteTruckType(id);
        return R.success();
    }
}
