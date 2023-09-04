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
                .token("zhangsan", "123456");

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
        String token = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDAyNjIxMzAwOTkwMDc2NzA1IiwiYWNjb3VudCI6InpoYW5nc2FuIiwibmFtZSI6IuW8oOS4iSIsIm9yZ2lkIjoxMDAyNjE5NTU4MzU3NDI1OTUzLCJzdGF0aW9uaWQiOjk4MTIyMzcwMzMzNTQxMDYyNSwiYWRtaW5pc3RyYXRvciI6ZmFsc2UsImV4cCI6MTY1OTEzNDA0MH0.WBZaeBvmuw202raw7JvvHnIMpST28d0gv6ufVDenL_iGQwdClucUfd3YPLg9BLoiosaP16SEuB1nM_-HWl8rUA";
        AuthUserInfoDTO authUserInfo = this.tokenCheckService.parserToken(token);
        System.out.println(authUserInfo);

        System.out.println(JSONUtil.toJsonStr(authUserInfo));
    }
}
