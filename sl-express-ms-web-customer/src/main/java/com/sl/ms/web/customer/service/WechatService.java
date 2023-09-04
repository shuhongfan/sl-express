package com.sl.ms.web.customer.service;

import cn.hutool.json.JSONObject;

import java.io.IOException;

public interface WechatService {
    /**
     * 获取openid
     *
     * @param code 登录凭证
     * @return 唯一标识
     * @throws IOException IO异常
     */
    JSONObject getOpenid(String code) throws IOException;

    /**
     * 获取手机号
     *
     * @param code 手机号凭证
     * @return 唯一标识
     * @throws IOException IO异常
     */
    String getPhone(String code) throws IOException;
}
