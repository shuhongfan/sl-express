package com.sl.ms.track.api;

import com.sl.ms.track.domain.dto.TrackDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 终端管理
 *
 * @author zzj
 * @version 1.0
 */
@FeignClient(value = "sl-express-ms-track", contextId = "Track", path = "track")
public interface TrackFeign {

    /**
     * 创建轨迹，会完成路线规划
     *
     * @param transportOrderId 运单号
     * @return 是否成功
     */
    @PostMapping
    boolean create(@RequestParam("transportOrderId") String transportOrderId);

    /**
     * 完成轨迹，修改为完成状态
     *
     * @param transportOrderIds 运单号列表
     * @return 是否成功
     */
    @PutMapping("complete")
    boolean complete(@RequestParam("transportOrderIds") List<String> transportOrderIds);

    /**
     * 通过运单号查询轨迹
     *
     * @param transportOrderId 运单号
     * @return 轨迹数据
     */
    @GetMapping("{transportOrderId}")
    TrackDTO queryByTransportOrderId(@PathVariable("transportOrderId") String transportOrderId);

    /**
     * 车辆上报位置
     *
     * @param transportTaskId 运输任务id
     * @param lng             经度
     * @param lat             纬度
     * @return 是否成功
     */
    @PutMapping("upload/truck")
    boolean uploadFromTruck(@RequestParam("transportTaskId") Long transportTaskId, @RequestParam("lng") double lng, @RequestParam("lat") double lat);

    /**
     * 快递员上报位置
     *
     * @param transportOrderIds 运单号列表
     * @param lng               经度
     * @param lat               纬度
     * @return 是否成功
     */
    @PutMapping("upload/courier")
    boolean uploadFromCourier(@RequestParam("transportOrderIds") List<String> transportOrderIds, @RequestParam("lng") double lng, @RequestParam("lat") double lat);
}
