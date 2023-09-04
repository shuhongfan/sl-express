package com.sl.ms.web.driver.service;

import com.sl.ms.web.driver.vo.response.TaskReportVO;
import com.sl.ms.web.driver.vo.response.TruckDetailVO;
import com.sl.ms.web.driver.vo.response.UserDetailVO;

public interface UserService {
    /**
     * 获取用户信息
     *
     * @return 用户信息
     */
    UserDetailVO userDetail();

    /**
     * 获取车辆信息
     *
     * @return 车辆信息
     */
    TruckDetailVO truckDetail();

    /**
     * 任务数据
     *
     * @param year  年份
     * @param month 月份
     * @return 任务相关统计
     */
    TaskReportVO taskReport(String year, String month);
}
