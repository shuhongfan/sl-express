package com.sl.ms.base.api.common;

import com.sl.ms.base.domain.base.WorkPatternAddDTO;
import com.sl.ms.base.domain.base.WorkPatternDTO;
import com.sl.ms.base.domain.base.WorkPatternQueryDTO;
import com.sl.ms.base.domain.base.WorkPatternUpdateDTO;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 工作模式API
 */
@FeignClient(name = "sl-express-ms-base", contextId = "workPattern", path = "work-patterns")
@ApiIgnore
public interface WorkPatternFeign {

    /**
     * 查询工作模式
     *
     * @return 工作模式列表
     */
    @GetMapping("all")
    @ApiOperation("工作模式列表查询")
    List<WorkPatternDTO> findAll();

    /**
     * 分页查询工作模式
     *
     * @param workPatternQueryDTO 分页查询条件
     * @return 工作模式数据
     */
    @GetMapping("page")
    @ApiOperation("工作模式分页查询")
    PageResponse<WorkPatternDTO> list(@SpringQueryMap WorkPatternQueryDTO workPatternQueryDTO);

    /**
     * 根据工作模式id查询工作模式详情
     *
     * @param id 工作模式id
     * @return 工作模式
     */
    @GetMapping("{id}")
    @ApiOperation("根据工作模式id获取工作模式详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "工作模式id")})
    WorkPatternDTO getById(@PathVariable("id") Long id);

    /**
     * 删除工作模式，逻辑删除
     *
     * @param id 工作模式ID
     */
    @DeleteMapping("{id}")
    @ApiOperation("工作模式删除")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "工作模式id")})
    void delete(@PathVariable("id") Long id);

    /**
     * 新增工作模式
     *
     * @param workPatternAddDTO 工作模式
     */
    @PostMapping
    @ApiOperation("新增工作模式")
    void add(@RequestBody WorkPatternAddDTO workPatternAddDTO);

    /**
     * 更新工作模式
     *
     * @param workPatternUpdateDTO 工作模式
     */
    @PutMapping("")
    void put(@RequestBody WorkPatternUpdateDTO workPatternUpdateDTO);
}
