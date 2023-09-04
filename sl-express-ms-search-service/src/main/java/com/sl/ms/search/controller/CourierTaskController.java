package com.sl.ms.search.controller;

import com.sl.ms.search.domain.dto.CourierTaskDTO;
import com.sl.ms.search.domain.dto.CourierTaskPageQueryDTO;
import com.sl.ms.search.service.CourierTaskService;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 快递员任务Controller
 **/
@RestController
@Api(tags = "快递员任务")
@RequestMapping("courierSearch")
public class CourierTaskController {

    @Resource
    private CourierTaskService courierTaskService;

    @PostMapping("pageQuery")
    @ApiOperation(value = "分页查询")
    public PageResponse<CourierTaskDTO> pageQuery(@RequestBody CourierTaskPageQueryDTO pageQueryDTO) {
        return courierTaskService.pageQuery(pageQueryDTO);
    }

    @PostMapping
    @ApiOperation(value = "新增/全量修改快递员任务")
    public void saveOrUpdate(@RequestBody CourierTaskDTO courierTaskDTO) {
        courierTaskService.saveOrUpdate(courierTaskDTO);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "根据取派件id查询快递员任务")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "取派件id", required = true, dataTypeClass = Long.class)
    })
    public CourierTaskDTO findById(@PathVariable("id") Long id) {
        return courierTaskService.findById(id);
    }
}
