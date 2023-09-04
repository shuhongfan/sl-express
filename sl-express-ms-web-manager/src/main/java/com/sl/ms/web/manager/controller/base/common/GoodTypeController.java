package com.sl.ms.web.manager.controller.base.common;

import com.sl.ms.web.manager.service.BaseCommonService;
import com.sl.ms.web.manager.vo.baseCommon.GoodsTypeVO;
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
 * 货物类型管理
 */
@RestController
@Api(tags = "货物类型")
@Slf4j
public class GoodTypeController {

    @Resource
    private BaseCommonService baseCommonService;

    @ApiOperation(value = "添加货物类型")
    @PostMapping("/goodsType")
    public R<GoodsTypeVO> saveGoodsType(@RequestBody GoodsTypeVO vo) {
        baseCommonService.saveGoodsType(vo);
        return R.success();
    }

    @ApiOperation(value = "更新货物类型")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "货物类型id", required = true, example = "1")
    })
    @PutMapping("/goodsType/{id}")
    public R<GoodsTypeVO> updateGoodsType(@PathVariable(name = "id") Long id, @RequestBody GoodsTypeVO vo) {
        baseCommonService.updateGoodsType(id, vo);
        return R.success();
    }

    @ApiOperation(value = "获取货物类型分页数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, example = "1"),
            @ApiImplicitParam(name = "pageSize", value = "页尺寸", required = true, example = "10"),
            @ApiImplicitParam(name = "name", value = "货物类型名称"),
            @ApiImplicitParam(name = "truckTypeId", value = "车辆类型Id")
    })
    @GetMapping("/goodsType/page")
    public R<PageResponse<GoodsTypeVO>> findGoodsTypeByPage(@RequestParam(name = "page") Integer page,
                                                            @RequestParam(name = "pageSize") Integer pageSize,
                                                            @RequestParam(name = "name", required = false) String name,
                                                            @RequestParam(name = "truckTypeId", required = false) Long truckTypeId) {
        return R.success(baseCommonService.findGoodsTypeByPage(page, pageSize, name, truckTypeId));
    }

    @ApiOperation(value = "获取货物类型详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "货物类型id", required = true, example = "1")
    })
    @GetMapping("/goodsType/{id}")
    public R<GoodsTypeVO> findGoodsTypeById(@PathVariable(name = "id") Long id) {
        return R.success(baseCommonService.fineGoodsTypeById(id));
    }

    @ApiOperation(value = "删除货物类型")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "货物类型id", required = true, example = "1")
    })
    @DeleteMapping("/goodsType/{id}")
    public R<GoodsTypeVO> deleteGoodsType(@PathVariable(name = "id") Long id) {
        baseCommonService.disableGoodsType(id);
        return R.success();
    }

    @ApiOperation(value = "获取货物类型信息列表")
    @GetMapping(value = "goodsType/simple")
    public R<List<GoodsTypeVO>> goodsTypeSimple() {
        return R.success(baseCommonService.findGoodsTypeAll(null));
    }
}
