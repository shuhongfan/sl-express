package com.sl.ms.track.service;

import com.sl.ms.track.entity.TrackEntity;

import java.util.List;

/**
 * 轨迹服务
 *
 * @author zzj
 * @version 1.0
 */
public interface TrackService {


    /**
     * 创建轨迹，会完成路线规划
     *
     * @param transportOrderId 运单号
     * @return 是否成功
     */
    boolean create(String transportOrderId);

    /**
     * 完成轨迹，修改为完成状态
     *
     * @param transportOrderIds 运单号列表
     * @return 是否成功
     */
    boolean complete(List<String> transportOrderIds);

    /**
     * 通过运单号查询轨迹
     *
     * @param transportOrderId 运单号
     * @return 轨迹数据
     */
    TrackEntity queryByTransportOrderId(String transportOrderId);

    /**
     * 车辆上报位置
     *
     * @param transportTaskId 运输任务id
     * @param lng             经度
     * @param lat             纬度
     * @return 是否成功
     */
    boolean uploadFromTruck(Long transportTaskId, double lng, double lat);

    /**
     * 快递员上报位置
     *
     * @param transportOrderIds 运单号列表
     * @param lng               经度
     * @param lat               纬度
     * @return 是否成功
     */
    boolean uploadFromCourier(List<String> transportOrderIds, double lng, double lat);

}
