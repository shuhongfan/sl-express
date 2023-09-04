package com.sl.ms.scope.controller;

import com.sl.ms.scope.dto.ServiceScopeDTO;
import com.sl.ms.scope.entity.ServiceScopeEntity;
import com.sl.ms.scope.enums.ServiceTypeEnum;
import com.sl.ms.scope.service.ScopeService;
import com.sl.ms.scope.util.EntityUtils;
import com.sl.transport.common.util.ResponseEntityUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 服务范围
 */
@Api(tags = "服务范围")
@RestController
@RequestMapping("scopes")
@Validated
public class ScopeController {

    @Resource
    private ScopeService scopeService;

    /**
     * 新增或更新服务服务范围
     *
     * @return REST标准响应
     */
    @ApiOperation(value = "新增/更新", notes = "新增或更新服务服务范围")
    @PostMapping
    public ResponseEntity<Void> saveScope(@RequestBody ServiceScopeDTO serviceScopeDTO) {
        ServiceScopeEntity serviceScopeEntity = EntityUtils.toEntity(serviceScopeDTO);
        Long bid = serviceScopeEntity.getBid();
        ServiceTypeEnum type = ServiceTypeEnum.codeOf(serviceScopeEntity.getType());
        Boolean result = this.scopeService.saveOrUpdate(bid, type, serviceScopeEntity.getPolygon());
        if (result) {
            return ResponseEntityUtils.ok();
        }
        return ResponseEntityUtils.error();
    }

    /**
     * 删除服务范围
     *
     * @param bid  业务id
     * @param type 类型
     * @return REST标准响应
     */
    @ApiImplicitParams({
            @ApiImplicitParam(name = "bid", value = "业务id，可以是机构或快递员", dataTypeClass = Long.class),
            @ApiImplicitParam(name = "type", value = "类型，1-机构，2-快递员", dataTypeClass = Integer.class)
    })
    @ApiOperation(value = "删除", notes = "删除服务范围")
    @DeleteMapping("{bid}/{type}")
    public ResponseEntity<Void> delete(@NotNull(message = "bid不能为空") @PathVariable("bid") Long bid,
                                       @NotNull(message = "type不能为空") @PathVariable("type") Integer type) {
        Boolean result = this.scopeService.delete(bid, ServiceTypeEnum.codeOf(type));
        if (result) {
            return ResponseEntityUtils.ok();
        }
        return ResponseEntityUtils.error();
    }

    /**
     * 查询服务范围
     *
     * @param bid  业务id
     * @param type 类型
     * @return 服务范围数据
     */
    @ApiImplicitParams({
            @ApiImplicitParam(name = "bid", value = "业务id，可以是机构或快递员", dataTypeClass = Long.class),
            @ApiImplicitParam(name = "type", value = "类型，1-机构，2-快递员", dataTypeClass = Integer.class)
    })
    @ApiOperation(value = "查询", notes = "查询服务范围")
    @GetMapping("{bid}/{type}")
    public ResponseEntity<ServiceScopeDTO> queryServiceScope(@NotNull(message = "bid不能为空") @PathVariable("bid") Long bid,
                                                             @NotNull(message = "type不能为空") @PathVariable("type") Integer type) {
        ServiceScopeEntity serviceScopeEntity = this.scopeService.queryByBidAndType(bid, ServiceTypeEnum.codeOf(type));
        return ResponseEntityUtils.ok(EntityUtils.toDTO(serviceScopeEntity));
    }

    /**
     * 地址查询服务范围
     *
     * @param type    类型，1-机构，2-快递员
     * @param address 详细地址，如：北京市昌平区金燕龙办公楼传智教育总部
     * @return 服务范围数据列表
     */
    @ApiImplicitParams({
            @ApiImplicitParam(name = "type", value = "类型，1-机构，2-快递员", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "address", value = "详细地址，如：北京市昌平区金燕龙办公楼传智教育总部", dataTypeClass = String.class)
    })
    @ApiOperation(value = "地址查询服务范围", notes = "地址查询服务范围")
    @GetMapping("address")
    public ResponseEntity<List<ServiceScopeDTO>> queryListByAddress(@NotNull(message = "type不能为空") @RequestParam("type") Integer type,
                                                                    @NotNull(message = "address不能为空") @RequestParam("address") String address) {
        List<ServiceScopeEntity> serviceScopeEntityList = this.scopeService.queryListByPoint(ServiceTypeEnum.codeOf(type), address);
        return ResponseEntityUtils.ok(EntityUtils.toDTOList(serviceScopeEntityList));
    }

    /**
     * 位置查询服务范围
     *
     * @param type      类型，1-机构，2-快递员
     * @param longitude 经度
     * @param latitude  纬度
     * @return 服务范围数据列表
     */
    @ApiImplicitParams({
            @ApiImplicitParam(name = "type", value = "类型，1-机构，2-快递员", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "longitude", value = "经度", dataTypeClass = Double.class),
            @ApiImplicitParam(name = "latitude", value = "纬度", dataTypeClass = Double.class)
    })
    @ApiOperation(value = "位置查询服务范围", notes = "位置查询服务范围")
    @GetMapping("location")
    public ResponseEntity<List<ServiceScopeDTO>> queryListByAddress(@NotNull(message = "type不能为空") @RequestParam("type") Integer type,
                                                                    @NotNull(message = "longitude不能为空") @RequestParam("longitude") Double longitude,
                                                                    @NotNull(message = "latitude不能为空") @RequestParam("latitude") Double latitude) {
        List<ServiceScopeEntity> serviceScopeEntityList = this.scopeService.queryListByPoint(ServiceTypeEnum.codeOf(type), new GeoJsonPoint(longitude, latitude));
        return ResponseEntityUtils.ok(EntityUtils.toDTOList(serviceScopeEntityList));
    }
}
