package com.sl.ms.track.controller;

import com.sl.ms.track.domain.dto.TrackDTO;
import com.sl.ms.track.entity.TrackEntity;
import com.sl.ms.track.service.TrackService;
import com.sl.ms.track.util.TrackEntityUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@Api(tags = "轨迹管理")
@RequestMapping("track")
public class TrackController {

    @Resource
    private TrackService trackService;

    @PostMapping
    @ApiOperation(value = "创建轨迹", notes = "创建轨迹，会完成路线规划")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "transportOrderId", value = "运单号", required = true)
    })
    public boolean create(@RequestParam("transportOrderId") String transportOrderId) {
        return this.trackService.create(transportOrderId);
    }

    @PutMapping("complete")
    @ApiOperation(value = "完成轨迹", notes = " 完成轨迹，修改为完成状态")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "transportOrderIds", value = "运单号列表", required = true)
    })
    public boolean complete(@RequestParam("transportOrderIds") List<String> transportOrderIds) {
        return this.trackService.complete(transportOrderIds);
    }

    /**
     * 通过运单号查询轨迹
     *
     * @param transportOrderId 运单号
     * @return 轨迹数据
     */
    @GetMapping("{transportOrderId}")
    @ApiOperation(value = "查询轨迹", notes = "通过运单号查询轨迹")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "transportOrderId", value = "运单号", required = true)
    })
    public TrackDTO queryByTransportOrderId(@PathVariable("transportOrderId") String transportOrderId) {
        TrackEntity trackEntity = this.trackService.queryByTransportOrderId(transportOrderId);
        return TrackEntityUtil.toDTO(trackEntity);
    }

    @PutMapping("upload/truck")
    @ApiOperation(value = "车辆上报位置", notes = "车辆上报位置")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "transportTaskId", value = "运输任务id", required = true),
            @ApiImplicitParam(name = "lng", value = "经度", required = true),
            @ApiImplicitParam(name = "lat", value = "纬度", required = true),
    })
    public boolean uploadFromTruck(@RequestParam("transportTaskId") Long transportTaskId,
                                   @RequestParam("lng") double lng,
                                   @RequestParam("lat") double lat) {
        return this.trackService.uploadFromTruck(transportTaskId, lng, lat);
    }

    @PutMapping("upload/courier")
    @ApiOperation(value = "快递员上报位置", notes = "快递员上报位置")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "transportOrderIds", value = "运单号列表", required = true),
            @ApiImplicitParam(name = "lng", value = "经度", required = true),
            @ApiImplicitParam(name = "lat", value = "纬度", required = true),
    })
    public boolean uploadFromCourier(@RequestParam("transportOrderIds") List<String> transportOrderIds,
                                     @RequestParam("lng") double lng,
                                     @RequestParam("lat") double lat) {
        return this.trackService.uploadFromCourier(transportOrderIds, lng, lat);
    }

}
