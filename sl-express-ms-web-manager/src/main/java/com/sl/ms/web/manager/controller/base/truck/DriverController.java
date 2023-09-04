package com.sl.ms.web.manager.controller.base.truck;

import com.sl.ms.web.manager.service.BaseTruckService;
import com.sl.ms.web.manager.vo.baseTruck.BindingDriversVO;
import com.sl.ms.web.manager.vo.baseTruck.DriverLicenseVO;
import com.sl.ms.web.manager.vo.baseTruck.DriverUpdateVO;
import com.sl.ms.web.manager.vo.baseTruck.DriverVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 司机管理
 */
@RestController
@Api(tags = "司机管理")
@Slf4j
public class DriverController {


    @Resource
    private BaseTruckService baseTruckService;

    @ApiOperation(value = "获取司机分页数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, example = "1"),
            @ApiImplicitParam(name = "pageSize", value = "页尺寸", required = true, example = "10"),
            @ApiImplicitParam(name = "name", value = "司机名称"),
            @ApiImplicitParam(name = "account", value = "司机编号 账号"),
            @ApiImplicitParam(name = "agentId", value = "机构ID"),
            @ApiImplicitParam(name = "phone", value = "电话"),
            @ApiImplicitParam(name = "workStatus", value = "工作状态")
    })
    @GetMapping("/driver/page")
    public R<PageResponse<DriverVO>> findDriverByPage(@RequestParam(name = "page") Integer page,
                                                      @RequestParam(name = "pageSize") Integer pageSize,
                                                      @RequestParam(name = "name", required = false) String name,
                                                      @RequestParam(name = "account", required = false) String account,
                                                      @RequestParam(name = "workStatus", required = false) String workStatus,
                                                      @RequestParam(name = "agentId", required = false) Long agentId,
                                                      @RequestParam(name = "phone", required = false) String phone) {
        return R.success(baseTruckService.findDriverByPage(page, pageSize, name, account, workStatus, agentId, phone));
    }

    @ApiOperation(value = "获取司机基本信息详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "司机id", required = true, example = "1")
    })
    @GetMapping("/driver/{id}")
    public R<DriverVO> findDriverById(@PathVariable(name = "id") Long id) {
        return R.success(baseTruckService.findDriverById(id));
    }

    @ApiOperation(value = "保存司机信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "司机id", required = true, example = "1")
    })
    @PutMapping("/driver/{id}")
    public R<DriverUpdateVO> saveDriver(@PathVariable(name = "id") Long id, @RequestBody DriverUpdateVO vo) {
        baseTruckService.saveDriver(id, vo);
        return R.success();
    }

    @ApiOperation(value = "保存司机驾驶证信息")
    @PostMapping("/driverLicense")
    public R<DriverLicenseVO> saveDriverLicense(@RequestBody DriverLicenseVO vo) {
        baseTruckService.saveDriverLicense(vo);
        return R.success();
    }

    @ApiOperation(value = "获取司机驾驶证信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "司机id", required = true, example = "1")
    })
    @GetMapping("/driverLicense/{id}")
    public R<DriverLicenseVO> findDriverLicenseById(@PathVariable(name = "id") Long id) {
        DriverLicenseVO driverLicenseById = baseTruckService.findDriverLicenseById(id);
        return R.success(driverLicenseById);
    }

    @ApiOperation(value = "司机安排车辆 【司机：车辆 = n:1】")
    @PostMapping("/driver/truckDrivers")
    public R<Void> BindingDrivers(@RequestBody BindingDriversVO bindingDriversVO) {
        baseTruckService.bindingTrucks(bindingDriversVO);
        return R.success();
    }
}
