package com.sl.ms.web.manager.controller.base.truck;

import com.sl.ms.web.manager.service.BaseTruckService;
import com.sl.ms.web.manager.vo.baseTruck.BindingTrucksVO;
import com.sl.ms.web.manager.vo.baseTruck.TransportTripsUpdateVO;
import com.sl.ms.web.manager.vo.baseTruck.TransportTripsVO;
import com.sl.ms.web.manager.vo.baseTruck.TruckVO;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;


/**
 * 车次管理
 */
@RestController
@Api(tags = "车次管理")
@Slf4j
public class TruckTripsController {

    @Resource
    private BaseTruckService baseTruckService;

    @ApiOperation(value = "添加车次")
    @PostMapping("/transportLine/trips")
    public R<TransportTripsUpdateVO> saveTransportTrips(@RequestBody TransportTripsUpdateVO vo) {
        baseTruckService.saveTrips(vo);
        return R.success();
    }

    @ApiOperation(value = "更新车次")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "车次id", required = true, example = "1")
    })
    @PutMapping("/transportLine/trips/{id}")
    public R<TransportTripsUpdateVO> updateTransportTrips(@PathVariable(name = "id") Long id, @RequestBody TransportTripsUpdateVO vo) {
        baseTruckService.updateTrips(id, vo);
        return R.success();
    }

    @ApiOperation(value = "获取车次列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "transportLineId", value = "线路id")
    })
    @GetMapping("/transportLine/trips")
    public R<List<TransportTripsVO>> findAllTransportLineTrips(@RequestParam(name = "transportLineId", required = false) Long transportLineId) {
        return R.success(baseTruckService.findAllTrips(transportLineId));
    }

    @ApiOperation(value = "获取车次详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "车次id", required = true, example = "1")
    })
    @GetMapping("/transportLine/trips/{id}")
    public R<TransportTripsVO> findTransportLineTripsById(@PathVariable(name = "id") Long id) {
        return R.success(baseTruckService.findTripsDetail(id));
    }

    @ApiOperation(value = "删除车次")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "车次id", required = true, example = "1")
    })
    @DeleteMapping("/transportLine/trips/{id}")
    public R<Void> deleteTransportLineTrips(@PathVariable(name = "id") Long id) {
        baseTruckService.deleteTransportLineTrips(id);
        return R.success();
    }

    @ApiOperation(value = "车次-安排车辆 不涉及司机的安排 司机会根据【司机车辆绑定关系】和排班情况调度决定")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "车次id", required = true, example = "1")
    })
    @PostMapping("/transportLine/trips/{id}/truckDrivers")
    public R<Void> saveTransportTripsTruck(@PathVariable(name = "id") Long id, @RequestBody BindingTrucksVO bindingTrucksVO) {
        //保存车辆安排信息
        baseTruckService.bindingTrucks(id, bindingTrucksVO);
        return R.success();
    }

    @ApiOperation(value = "获取车次-车辆绑定关系")
    @GetMapping("/transportLine/trips/truckDrivers")
    public R<List<TruckVO>> getTransportTripsTruck(Long transportTripsId) {
        return R.success(baseTruckService.getTransportTripsTruck(transportTripsId));
    }
}
