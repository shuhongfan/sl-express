package com.sl.ms.web.driver.controller;

import com.sl.ms.web.driver.service.UserService;
import com.sl.ms.web.driver.vo.response.TaskReportVO;
import com.sl.ms.web.driver.vo.response.TruckDetailVO;
import com.sl.ms.web.driver.vo.response.UserDetailVO;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Api(tags = "我的相关接口")
@RestController
@RequestMapping("/users")
public class UserController {
    @Resource
    private UserService userService;

    @GetMapping
    @ApiOperation(value = "用户信息", notes = "获取当前用户信息")
    public R<UserDetailVO> userDetail() {
        return R.success(userService.userDetail());
    }

    @GetMapping("truck")
    @ApiOperation(value = "车辆信息", notes = "获取关联用户的车辆信息")
    public R<TruckDetailVO> truckDetail() {
        return R.success(userService.truckDetail());
    }

    @GetMapping("taskReport")
    @ApiOperation(value = "任务数据", notes = "统计任务数量及每日里程数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "年份", required = true, example = "2022", dataTypeClass = String.class),
            @ApiImplicitParam(name = "month", value = "月份", required = true, example = "07", dataTypeClass = String.class)
    })
    public R<TaskReportVO> taskReport(@RequestParam("year") String year, @RequestParam("month") String month) {
        return R.success(userService.taskReport(year, month));
    }
}
