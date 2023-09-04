package com.sl.ms.web.courier.controller;

import com.sl.ms.web.courier.service.UserService;
import com.sl.ms.web.courier.vo.user.ServiceScopeVO;
import com.sl.ms.web.courier.vo.user.UserSimpleInfoVO;
import com.sl.ms.web.courier.vo.user.UsersInfoVO;
import com.sl.transport.common.util.PageResponse;
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

@Api(tags = "快递员信息相关接口")
@RestController
@RequestMapping("users")
public class UserController {
    @Resource
    private UserService userService;

    @ApiOperation("通过token获取用户信息")
    @GetMapping("/get")
    public R<UsersInfoVO> get() {
        return R.success(userService.get());
    }

    @ApiOperation("获取当前用户同一个网点的其他快递员")
    @GetMapping("/sameAgency")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "pageSize", value = "页面大小", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "keyword", value = "关键词", dataTypeClass = String.class)
    })
    public R<PageResponse<UserSimpleInfoVO>> sameAgency(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                                        @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
                                                        @RequestParam(value = "keyword", required = false) String keyword) {
        return R.success(userService.sameAgency(page, pageSize, keyword));
    }

    @ApiOperation(value = "获取作业范围")
    @GetMapping("/scope")
    public R<ServiceScopeVO> findScope() {
        return R.success(userService.findScope());
    }


}
