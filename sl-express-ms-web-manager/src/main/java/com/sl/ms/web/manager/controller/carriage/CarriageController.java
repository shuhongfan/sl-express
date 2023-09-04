package com.sl.ms.web.manager.controller.carriage;

import cn.hutool.core.util.ObjectUtil;
import com.sl.ms.carriage.domain.dto.CarriageDTO;
import com.sl.ms.web.manager.service.CarriageService;
import com.sl.ms.web.manager.vo.carriage.CarriageVO;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("carriages")
@Api(tags = "运费管理")
public class CarriageController {
    @Resource
    private CarriageService carriageService;

    @ApiOperation(value = "运费模板列表")
    @GetMapping
    public R<List<CarriageVO>> findAll() {
        return R.success(carriageService.findAll());
    }

    @ApiOperation(value = "新增/修改运费模板")
    @PostMapping
    public R<CarriageVO> saveOrUpdate(@RequestBody CarriageDTO carriageDto) {
        CarriageVO vo = carriageService.saveOrUpdate(carriageDto);
        if (ObjectUtil.isEmpty(vo)) {
            R.error("运费模板存在重复");
        }
        return R.success(vo);
    }

    @DeleteMapping("{id}")
    @ApiOperation(value = "删除运费模板")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运费模板id", required = true, dataTypeClass = Long.class)})
    public R<CarriageVO> delete(@NotNull(message = "id不能为空") @PathVariable("id") Long id) {
        carriageService.delete(id);
        return R.success();
    }
}
