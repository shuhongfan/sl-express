package com.sl.ms.web.driver.service;

public interface TrackService {

    /**
     * 车辆上报位置
     *
     * @param lng 经度
     * @param lat 纬度
     * @return 是否成功
     */
    Boolean uploadLocation(String lng, String lat);
}
