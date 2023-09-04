package com.sl.ms.base.controller.base;

import com.itheima.auth.sdk.dto.UserDTO;
import com.sl.ms.base.service.base.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 权限系统对接接口
 */
@Slf4j
@Validated
@RestController
@RequestMapping("auth")
@Api(tags = "权限系统对接接口")
public class AuthController {
    @Autowired
    private AuthService authService;

    @GetMapping("/{id}")
    @ApiOperation(value = "根据用户id获得详细信息")
    public UserDTO getByUserId(@PathVariable("id") Long id) {
        return authService.getByUserId(id);
    }
}
