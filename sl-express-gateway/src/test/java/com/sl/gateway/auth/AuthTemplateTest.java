package com.sl.gateway.auth;

import cn.hutool.json.JSONUtil;
import com.itheima.auth.boot.autoconfigure.AuthorityProperties;
import com.itheima.auth.factory.AuthTemplateFactory;
import com.itheima.auth.sdk.AuthTemplate;
import com.itheima.auth.sdk.common.Result;
import com.itheima.auth.sdk.dto.AuthUserInfoDTO;
import com.itheima.auth.sdk.dto.LoginDTO;
import com.itheima.auth.sdk.dto.UserDTO;
import com.itheima.auth.sdk.service.TokenCheckService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zzj
 * @version 1.0
 */
@SpringBootTest(properties = "spring.main.web-application-type = reactive")
public class AuthTemplateTest {

    @Resource
    private AuthTemplate authTemplate;
    @Resource
    private TokenCheckService tokenCheckService;
    @Autowired
    private AuthorityProperties authorityProperties;

    @Test
    public void testLogin() {
        //登录
        Result<LoginDTO> result = this.authTemplate.opsForLogin()
                .token("sl001", "123456");

        String token = result.getData().getToken().getToken();
        System.out.println("token为：" + token);

        UserDTO user = result.getData().getUser();
        System.out.println("user信息：" + user);

        //查询角色
        Result<List<Long>> resultRole = AuthTemplateFactory.get(token).opsForRole()
                .findRoleByUserId(user.getId());
        System.out.println(resultRole);
    }

    @Test
    public void checkToken() {
        //上面方法中生成的token
        String token = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDI1NDI4Njg3MzEyNjg0OTI5IiwiYWNjb3VudCI6InNsMDAxIiwibmFtZSI6IuW8oOaIkOmjniIsIm9yZ2lkIjoxMDI0NzA0ODQ0NDg2NzU2NjQxLCJzdGF0aW9uaWQiOjEwMjQ3MDU0ODk0MzY0OTQ3MjEsImFkbWluaXN0cmF0b3IiOmZhbHNlLCJleHAiOjE2OTYzNjMwNDF9.kOtK7uEGXOqCQIqFYV88ITie-_ppcooX3nrs4ojSYsCB0ir0JBx_eO1WWw5Mqw0K3sVSf6-Rfxu-Dpr-IhRTgA";
        AuthUserInfoDTO authUserInfo = this.tokenCheckService.parserToken(token);
        System.out.println(authUserInfo);

        System.out.println(JSONUtil.toJsonStr(authUserInfo));
    }
}
