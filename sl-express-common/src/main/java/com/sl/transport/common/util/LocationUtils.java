package com.sl.transport.common.util;

/**
 * 经纬度位置距离计算工具类
 */
public class LocationUtils {
    private LocationUtils(){}
    /**
     * 赤道半径
     */
    private static final double EARTH_RADIUS = 6378.137;

    private static double rad(double d) {
        return d * Math.PI / 180.0;
    }

    /**
     * Description : 通过经纬度获取距离(单位：米)
     * Group :
     *
     * @param originLon      出发点经度
     * @param originLat      出发点纬度
     * @param destinationLon 目的地经度
     * @param destinationLat 目的地纬度
     * @return double 距离
     */
    public static double getDistance(Double originLon, Double originLat, Double destinationLon, Double destinationLat) {
        double radLat1 = rad(originLat);
        double radLat2 = rad(destinationLat);
        double a = radLat1 - radLat2;
        double b = rad(originLon) - rad(destinationLon);
        double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                + Math.cos(radLat1) * Math.cos(radLat2)
                * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        // 保留两位小数
        s = Math.round(s * 100d) / 100d;
        s = s * 1000;
        return s;
    }

    /**
     * Description : 通过经纬度获取距离(单位：米)
     * Group :
     *
     * @param originLon      出发点经度
     * @param originLat      出发点纬度
     * @param location       目的地经度纬度，格式：经度,纬度
     * @return double 距离
     */
    public static double getDistance(Double originLon, Double originLat, String location) {
        String[] locationInfos = location.split(",");
        return getDistance(originLon, originLat, Double.parseDouble(locationInfos[0]), Double.parseDouble(locationInfos[1]));
    }
}
