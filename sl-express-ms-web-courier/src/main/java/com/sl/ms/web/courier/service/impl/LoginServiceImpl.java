package com.sl.ms.web.courier.service.impl;

import com.itheima.auth.sdk.AuthTemplate;
import com.itheima.auth.sdk.common.Result;
import com.itheima.auth.sdk.dto.LoginDTO;
import com.sl.ms.web.courier.service.LoginService;
import com.sl.ms.web.courier.vo.login.AccountLoginVO;
import com.sl.ms.web.courier.vo.login.LoginVO;
import com.sl.transport.common.vo.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class LoginServiceImpl implements LoginService {
    @Resource
    private AuthTemplate authTemplate;

    /**
     * 根据用户名和密码进行登录
     *
     * @param accountLoginVO 登录信息
     * @return token
     */
    @Override
    public R<LoginVO> accountLogin(AccountLoginVO accountLoginVO) {
        //账号密码登录
        Result<LoginDTO> loginResult = authTemplate.opsForLogin().token(accountLoginVO.getAccount(), accountLoginVO.getPassword());

        //校验登录是否成功
        if (loginResult.getCode() != Result.success().getCode()) {
            return R.error(loginResult.getMsg());
        }

        return R.success(new LoginVO(loginResult.getData().getToken().getToken()));
    }
}
