package com.sl.transport.common.util;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;

/**
 * 扩展hutool的CoordinateUtil
 *
 * @author zzj
 * @version 1.0
 */
public class CoordinateUtil extends cn.hutool.core.util.CoordinateUtil {

    /**
     * 将字符串格式化成 Coordinate 对象
     *
     * @param coordinateStr 经度,纬度
     * @return Coordinate对象
     */
    public static Coordinate format(String coordinateStr) {
        double[] ds = Convert.convert(double[].class, StrUtil.splitTrim(coordinateStr, ','));
        return new Coordinate(ds[0], ds[1]);
    }

}
