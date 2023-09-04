package com.sl.ms.courier.controller;

import com.sl.ms.courier.service.CourierUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/couriers")
@Api(tags = "快递员相关接口")
public class CourierController {

    @Resource
    private CourierUserService courierUserService;

    /**
     * 条件查询快递员列表（结束取件时间当天快递员有排班）
     * 如果服务范围内无快递员，或满足服务范围的快递员无排班，则返回该网点所有满足排班的快递员
     *
     * @param agencyId         网点id
     * @param longitude        用户地址的经度
     * @param latitude         用户地址的纬度
     * @param estimatedEndTime 结束取件时间
     * @return 快递员id列表
     */
    @ApiOperation("根据用户地址的坐标查询为其服务的快递员列表")
    @GetMapping("{agencyId}/{longitude}/{latitude}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "longitude", value = "经度"),
            @ApiImplicitParam(name = "latitude", value = "纬度"),
            @ApiImplicitParam(name = "agencyId", value = "网点id"),
            @ApiImplicitParam(name = "estimatedEndTime", value = "结束取件时间")
    })
    public ResponseEntity<List<Long>> queryCourierIdListByCondition(@PathVariable("agencyId") Long agencyId,
                                                                    @PathVariable("longitude") Double longitude,
                                                                    @PathVariable("latitude") Double latitude,
                                                                    @RequestParam("estimatedEndTime") Long estimatedEndTime) {
        return ResponseEntity.ok(courierUserService.queryCourierIdListByCondition(agencyId, longitude, latitude, estimatedEndTime));

    }

}
