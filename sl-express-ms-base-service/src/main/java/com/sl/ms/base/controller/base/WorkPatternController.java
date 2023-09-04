package com.sl.ms.base.controller.base;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.sl.ms.base.domain.base.WorkPatternAddDTO;
import com.sl.ms.base.domain.base.WorkPatternDTO;
import com.sl.ms.base.domain.base.WorkPatternQueryDTO;
import com.sl.ms.base.domain.base.WorkPatternUpdateDTO;
import com.sl.ms.base.entity.base.WorkPatternEntity;
import com.sl.ms.base.service.base.WorkPatternService;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("work-patterns")
@RestController
@Slf4j
@Api(tags = "工作模式相关接口")
public class WorkPatternController {

    @Resource
    private WorkPatternService workPatternService;

    @GetMapping("all")
    @ApiOperation("工作模式列表查询")
    public List<WorkPatternDTO> all() {
       return workPatternService.all();
    }

    @GetMapping("page")
    @ApiOperation("工作模式列表查询")
    public PageResponse<WorkPatternDTO> list(WorkPatternQueryDTO workPatternQueryDTO) {
        log.info("workPatternQueryDTO : {}", workPatternQueryDTO);
        return workPatternService.page(workPatternQueryDTO);
    }

    @GetMapping("{id}")
    @ApiOperation("根据工作模式id获取工作模式详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "工作模式id")
    })
    public ResponseEntity<WorkPatternDTO> getById(@PathVariable("id") Long id) {
        WorkPatternDTO workPatternDTO = workPatternService.findById(id);
        return ResponseEntity.ok(workPatternDTO);
    }

    @DeleteMapping("{id}")
    @ApiOperation("工作模式删除")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "工作模式id")
    })
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        workPatternService.delete(id);
        return ResponseEntity.ok(null);
    }

    @PostMapping
    @ApiOperation("新增工作模式")
    public ResponseEntity<Void> add(@RequestBody WorkPatternAddDTO workPatternAddDTO) {
        workPatternService.add(workPatternAddDTO);
        return ResponseEntity.ok(null);
    }
    @PutMapping("")
    @ApiOperation("修改工作模式")
    public ResponseEntity<Void> put(@RequestBody WorkPatternUpdateDTO workPatternUpdateDTO){
        workPatternService.update(workPatternUpdateDTO);
        return ResponseEntity.ok(null);
    }

}
