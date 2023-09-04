package com.sl.ms.scope.api;

import com.sl.ms.scope.dto.ServiceScopeDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@FeignClient(name = "sl-express-ms-service-scope", contextId = "ServiceScope", path = "scopes")
@ApiIgnore
public interface ServiceScopeFeign {

    /**
     * 新增或更新服务服务范围
     *
     * @param serviceScopeDTO 范围数据
     */
    @PostMapping
    void saveScope(@RequestBody ServiceScopeDTO serviceScopeDTO);

    /**
     * 删除服务范围
     *
     * @param bid  业务id
     * @param type 类型，1-机构，2-快递员
     */
    @DeleteMapping("{bid}/{type}")
    void delete(@PathVariable("bid") Long bid, @PathVariable("type") Integer type);

    /**
     * 查询服务范围
     *
     * @param bid  业务id
     * @param type 类型，1-机构，2-快递员
     * @return 服务范围数据
     */
    @GetMapping("{bid}/{type}")
    ServiceScopeDTO queryServiceScope(@PathVariable("bid") Long bid, @PathVariable("type") Integer type);

    /**
     * 地址查询服务范围
     *
     * @param type    类型，1-机构，2-快递员
     * @param address 详细地址，如：北京市昌平区金燕龙办公楼传智教育总部
     * @return 服务范围数据列表
     */
    @GetMapping("address")
    List<ServiceScopeDTO> queryListByAddress(@RequestParam("type") Integer type, @RequestParam("address") String address);

    /**
     * 位置查询服务范围
     *
     * @param type      类型，1-机构，2-快递员
     * @param longitude 经度
     * @param latitude  纬度
     * @return 服务范围数据列表
     */
    @GetMapping("location")
    List<ServiceScopeDTO> queryListByLocation(@RequestParam("type") Integer type, @RequestParam("longitude") Double longitude, @RequestParam("latitude") Double latitude);
}
