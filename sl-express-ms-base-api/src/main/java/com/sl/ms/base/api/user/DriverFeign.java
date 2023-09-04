package com.sl.ms.base.api.user;

import com.sl.ms.base.domain.user.TruckDriverDto;
import com.sl.ms.base.domain.user.TruckDriverLicenseDto;
import com.sl.transport.common.util.PageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@FeignClient(name = "sl-express-ms-base", contextId = "Driver", path = "sys/driver")
@ApiIgnore
public interface DriverFeign {
    /**
     * 保存司机基本信息
     *
     * @param dto 司机基本信息
     * @return 返回信息
     */
    @PostMapping
    TruckDriverDto saveDriver(@RequestBody TruckDriverDto dto);

    /**
     * 获取司机基本信息列表
     *
     * @param userIds 司机id列表
     * @return 司机基本信息列表
     */
    @GetMapping
    List<TruckDriverDto> findAllDriver(@RequestParam(name = "userIds",required = false) List<Long> userIds);

    /**
     * 获取司机基本信息
     *
     * @param id 司机id
     * @return 司机基本信息
     */
    @GetMapping("/{id}")
    TruckDriverDto findOneDriver(@PathVariable(name = "id") Long id);

    /**
     * 保存司机驾驶证信息
     *
     * @param dto 司机驾驶证信息
     * @return 返回信息
     */
    @PostMapping("/driverLicense")
    TruckDriverLicenseDto saveDriverLicense(@RequestBody TruckDriverLicenseDto dto);

    /**
     * 获取司机驾驶证信息
     *
     * @param id 司机id
     * @return 司机驾驶证信息
     */
    @GetMapping("/{id}/driverLicense")
    TruckDriverLicenseDto findOneDriverLicense(@PathVariable(name = "id") Long id);

    /**
     * 绑定司机列表
     * @param truckId 车辆ID
     * @return 司机数量
     */
    @GetMapping("/count")
    List<TruckDriverDto> findByTruckId(@RequestParam(name = "truckId", required = false) Long truckId);

    /**
     * 获取司机分页数据
     *
     * @param page     页码
     * @param pageSize 页尺寸
     * @return 司机分页数据
     */
    @GetMapping("/page")
    PageResponse<TruckDriverDto> findByPage(@RequestParam(name = "page") Integer page,
                                            @RequestParam(name = "pageSize") Integer pageSize);


    /**
     * 查询全部
     * @param ids
     * @return
     */
    @GetMapping("/findAll")
    List<TruckDriverDto> findAll(@RequestParam(name = "ids", required = false) List<Long> ids);
}
