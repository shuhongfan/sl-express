package com.sl.ms.web.customer.service.impl;

import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.sl.ms.web.customer.service.WechatService;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.util.ObjectUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class WechatServiceImpl implements WechatService {

    // 登录
    private static final String REQUEST_URL = "https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code";

    // 获取token
    private static final String TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";

    // 获取手机号
    private static final String PHONE_REQUEST_URL = "https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=";

    @Value("${sl.wechat.appid}")
    private String appId;

    @Value("${sl.wechat.secret}")
    private String secret;

    /**
     * 获取openid
     * @param code 登录凭证
     * @return 唯一标识
     */
    @Override
    public JSONObject getOpenid(String code) {
        Map<String, Object> requestUrlParam = getAppConfig();
        // 小程序端授权后的code 登录临时凭证
        requestUrlParam.put("js_code", code);
        // 发送post请求读取调用微信接口获取openid用户唯一标识
        String result = HttpUtil.get(REQUEST_URL, requestUrlParam);
        log.info("getOpenid result:{}", result);
        // {"session_key":"QbEw1Bp2OpkeCQ36gXvPRg==","openid":"oV4KY1Exd7NebGjfbYK7_KTPeNm4"}
        return JSONUtil.parseObj(result);

    }

    /**
     * 获取服务端调用凭证 token
     * @return token
     */
    public String getToken() {
        Map<String, Object> requestUrlParam = getAppConfig();
        String result = HttpUtil.get(TOKEN_URL, requestUrlParam);
        log.info("getToken result:{}", result);
        JSONObject jsonObject = JSONUtil.parseObj(result);
        //若code不正确，则获取不到openid，响应失败
        if (ObjectUtil.isNotEmpty(jsonObject.getInt("errcode"))) {
            throw new SLWebException(jsonObject.getStr("errmsg"));
        }
        return jsonObject.getStr("access_token");
    }

    /**
     * 获取手机号
     *
     * @param code 手机号凭证
     * @return 唯一标识
     */
    @Override
    public String getPhone(String code) {
        // 获取服务端调用凭证 token
        String token = getToken();
        // 增加请求token
        String url = PHONE_REQUEST_URL + token;
        Map<String, String> map = new HashMap<>();
        // 小程序端授权后的手机号临时凭证
        map.put("code", code);
        // 发送post请求读取调用微信接口获取手机号
        String result = HttpUtil.post(url, JSONUtil.toJsonStr(map));
        log.info("getPhone result:{}", result);
        JSONObject jsonObject = JSONUtil.parseObj(result);
        if (jsonObject.getInt("errcode") != 0) {
            //若code不正确，则获取不到phone，响应失败
            throw new SLWebException(jsonObject.getStr("errmsg"));

        }
        return jsonObject.getJSONObject("phone_info").getStr("purePhoneNumber");
    }

    /**
     * 获取应用配置
     * @return 参数集合
     */
    private Map<String, Object> getAppConfig() {
        Map<String, Object> requestUrlParam = new HashMap<>();
        // 小程序appId，开发者后台获取
        requestUrlParam.put("appid", appId);
        // 小程序secret，开发者后台获取
        requestUrlParam.put("secret", secret);
        return requestUrlParam;
    }

}
