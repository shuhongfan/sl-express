package com.sl.ms.web.courier.controller;

import com.sl.ms.web.courier.service.TrackService;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Api(tags = "运输轨迹相关接口")
@RestController
@RequestMapping("/track")
public class TrackController {
    @Resource
    private TrackService trackService;

    @PutMapping("upload")
    @ApiOperation(value = "快递员上报位置", notes = "快递员上报位置")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "lng", value = "经度", required = true, dataTypeClass = Double.class),
            @ApiImplicitParam(name = "lat", value = "纬度", required = true, dataTypeClass = Double.class)})
    public R<Boolean> uploadLocation(@RequestParam("lng") String lng,
                                     @RequestParam("lat") String lat) {
        return R.success(trackService.uploadLocation(lng, lat));
    }
}
