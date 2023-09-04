package com.sl.ms.base.controller.base;

import cn.hutool.core.bean.BeanUtil;
import com.sl.ms.base.domain.base.AreaDto;
import com.sl.ms.base.service.base.AreaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * <p>
 * 前端控制器
 * 系统日志
 * </p>
 */
@Slf4j
@Validated
@RestController
@RequestMapping("/area")
@Api(value = "Area", tags = "行政区域")
public class AreaController {
    @Autowired
    private AreaService areaService;


    /**
     * 根据id获取行政区域详情
     *
     * @param id 行政区域id
     * @return 行政区域id
     */
    @GetMapping("/{id}")
    public AreaDto get(@PathVariable Long id) {
        AreaDto areaDto = BeanUtil.toBean(areaService.getById(id), AreaDto.class);
        areaDto.setName(areaDto.getShortName());
        return areaDto;
    }

    @GetMapping("/code/{code}")
    public AreaDto getByCode(@PathVariable String code) {
        AreaDto areaDto = BeanUtil.toBean((areaService.getByCode(code)), AreaDto.class);
        areaDto.setName(areaDto.getShortName());
        return areaDto;
    }

    @GetMapping("/children")
    @ApiOperation(value = "根据父级id查询子级行政区域")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "parentId", value = "父级id", required = true, dataTypeClass = Long.class)})
    public List<AreaDto> findChildren(@NotNull(message = "父id不能为空!") @RequestParam("parentId") Long parentId) {
        return areaService.findChildren(parentId);
    }

    @GetMapping("/batch")
    @ApiOperation(value = "根据id批量查询")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "id列表", required = true, dataTypeClass = Long.class)})
    public List<AreaDto> findBatch(@NotNull(message = "列表不能为空!") @RequestParam("ids") List<Long> ids) {
        return areaService.findBatch(ids);
    }
}
