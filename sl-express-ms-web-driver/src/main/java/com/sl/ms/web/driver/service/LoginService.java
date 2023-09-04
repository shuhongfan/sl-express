package com.sl.ms.web.driver.service;

import com.sl.ms.web.driver.vo.request.AccountLoginVO;

public interface LoginService {
    /**
     * 账号登录
     *
     * @param accountLoginVO 账号登录请求
     * @return token
     */
    String accountLogin(AccountLoginVO accountLoginVO);
}
