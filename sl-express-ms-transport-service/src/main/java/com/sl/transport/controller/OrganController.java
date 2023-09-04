package com.sl.transport.controller;

import com.sl.transport.common.exception.SLException;
import com.sl.transport.domain.OrganDTO;
import com.sl.transport.entity.node.BaseEntity;
import com.sl.transport.service.OrganService;
import com.sl.transport.utils.OrganServiceFactory;
import com.sl.transport.utils.OrganUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 对外提供机构服务，机构、一级转运中心、二级转运中心统称为机构
 *
 * @author zzj
 * @version 1.0
 */
@Api(tags = "机构服务")
@RequestMapping("organs")
@Validated
@RestController
public class OrganController {

    @Resource
    private OrganService organService;


    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "机构id", dataTypeClass = String.class)
    })
    @ApiOperation(value = "查询", notes = "根据业务id查询机构数据")
    @GetMapping("{id}")
    public OrganDTO queryById(@NotNull(message = "id不能为空") @PathVariable("id") Long id) {
        return this.organService.findByBid(id);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "机构ids", dataTypeClass = String.class)
    })
    @ApiOperation(value = "批量查询", notes = "根据业务ids查询机构数据")
    @GetMapping("/ids")
    public List<OrganDTO> queryByIds(@NotNull(message = "ids不能为空") @RequestParam("ids") List<Long> ids) {
        return this.organService.findByBids(ids);
    }

    @ApiOperation(value = "更新", notes = "更新机构")
    @PutMapping
    public void update(@RequestBody OrganDTO organDTO) {
        BaseEntity entity = OrganUtils.toEntity(organDTO);
        BaseEntity entityData = OrganServiceFactory.getBean(organDTO.getType()).update(entity);
        if (null == entityData) {
            throw new SLException("更新机构失败！", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @ApiOperation(value = "查询所有的机构", notes = "查询所有的机构，如果name不为空的按照name模糊查询")
    @GetMapping("all")
    public List<OrganDTO> findAll(@RequestParam(value = "name", required = false) String name) {
        return this.organService.findAll(name);
    }

    @ApiOperation(value = "查询机构树", notes = "查询机构树")
    @GetMapping("tree")
    public String findAllTree() {
        return this.organService.findAllTree();
    }
}
