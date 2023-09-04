package com.sl.ms.trade.handler.wechat;

import cn.hutool.core.net.url.UrlBuilder;
import cn.hutool.core.net.url.UrlPath;
import cn.hutool.core.net.url.UrlQuery;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.sl.ms.trade.constant.TradingConstant;
import com.sl.ms.trade.entity.PayChannelEntity;
import com.sl.ms.trade.enums.TradingEnum;
import com.sl.ms.trade.handler.wechat.response.WeChatResponse;
import com.sl.ms.trade.service.PayChannelService;
import com.sl.transport.common.exception.SLException;
import com.wechat.pay.contrib.apache.httpclient.auth.PrivateKeySigner;
import com.wechat.pay.contrib.apache.httpclient.auth.WechatPay2Credentials;
import com.wechat.pay.contrib.apache.httpclient.auth.WechatPay2Validator;
import com.wechat.pay.contrib.apache.httpclient.cert.CertificatesManager;
import com.wechat.pay.contrib.apache.httpclient.util.PemUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.security.PrivateKey;
import java.util.Map;

/**
 * 微信支付远程调用对象
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WechatPayHttpClient {

    private String mchId; //商户号
    private String appId; //商户号
    private String privateKey; //私钥字符串
    private String mchSerialNo; //商户证书序列号
    private String apiV3Key; //V3密钥
    private String domain; //请求域名
    private String notifyUrl; //请求地址

    public static WechatPayHttpClient get(Long enterpriseId) {
        // 查询配置
        PayChannelService payChannelService = SpringUtil.getBean(PayChannelService.class);
        PayChannelEntity payChannel = payChannelService.findByEnterpriseId(enterpriseId, TradingConstant.TRADING_CHANNEL_WECHAT_PAY);

        if (ObjectUtil.isEmpty(payChannel)) {
            throw new SLException(TradingEnum.CONFIG_EMPTY);
        }

        //通过渠道对象转化成微信支付的client对象
        JSONObject otherConfig = JSONUtil.parseObj(payChannel.getOtherConfig());
        return WechatPayHttpClient.builder()
                .appId(payChannel.getAppId())
                .domain(payChannel.getDomain())
                .privateKey(payChannel.getMerchantPrivateKey())
                .mchId(otherConfig.getStr("mchId"))
                .mchSerialNo(otherConfig.getStr("mchSerialNo"))
                .apiV3Key(otherConfig.getStr("apiV3Key"))
                .notifyUrl(payChannel.getNotifyUrl())
                .build();
    }

    /***
     * 构建CloseableHttpClient远程请求对象
     * @return {@link CloseableHttpClient}
     */
    public CloseableHttpClient createHttpClient() throws Exception {
        // 加载商户私钥（privateKey：私钥字符串）
        PrivateKey merchantPrivateKey = PemUtil
                .loadPrivateKey(new ByteArrayInputStream(privateKey.getBytes("utf-8")));

        // 加载平台证书（mchId：商户号,mchSerialNo：商户证书序列号,apiV3Key：V3密钥）
        PrivateKeySigner privateKeySigner = new PrivateKeySigner(mchSerialNo, merchantPrivateKey);
        WechatPay2Credentials wechatPay2Credentials = new WechatPay2Credentials(
                mchId, privateKeySigner);

        // 向证书管理器增加需要自动更新平台证书的商户信息
        CertificatesManager certificatesManager = CertificatesManager.getInstance();
        certificatesManager.putMerchant(mchId, wechatPay2Credentials, apiV3Key.getBytes("utf-8"));

        // 初始化httpClient
        return com.wechat.pay.contrib.apache.httpclient.WechatPayHttpClientBuilder.create()
                .withMerchant(mchId, mchSerialNo, merchantPrivateKey)
                .withValidator(new WechatPay2Validator(certificatesManager.getVerifier(mchId)))
                .build();
    }

    /***
     * 支持post请求的远程调用
     * @param apiPath api地址
     * @param params 携带请求参数
     * @return 返回字符串
     */
    public WeChatResponse doPost(String apiPath, Map<String, Object> params) throws Exception {
        String url = StrUtil.format("https://{}{}", this.domain, apiPath);
        HttpPost httpPost = new HttpPost(url);
        httpPost.addHeader("Accept", "application/json");
        httpPost.addHeader("Content-type", "application/json; charset=utf-8");

        String body = JSONUtil.toJsonStr(params);
        httpPost.setEntity(new StringEntity(body, CharsetUtil.UTF_8));

        CloseableHttpResponse response = this.createHttpClient().execute(httpPost);
        return new WeChatResponse(response);
    }

    /***
     * 支持get请求的远程调用
     * @param apiPath api地址
     * @param params 在路径中请求的参数
     * @return 返回字符串
     */
    public WeChatResponse doGet(String apiPath, Map<String, Object> params) throws Exception {
        URI uri = UrlBuilder.create()
                .setHost(this.domain)
                .setScheme("https")
                .setPath(UrlPath.of(apiPath, CharsetUtil.CHARSET_UTF_8))
                .setQuery(UrlQuery.of(params))
                .setCharset(CharsetUtil.CHARSET_UTF_8)
                .toURI();
        return this.doGet(uri);
    }

    /***
     * 支持get请求的远程调用
     * @param apiPath api地址
     * @return 返回字符串
     */
    public WeChatResponse doGet(String apiPath) throws Exception {
        URI uri = UrlBuilder.create()
                .setHost(this.domain)
                .setScheme("https")
                .setPath(UrlPath.of(apiPath, CharsetUtil.CHARSET_UTF_8))
                .setCharset(CharsetUtil.CHARSET_UTF_8)
                .toURI();
        return this.doGet(uri);
    }

    private WeChatResponse doGet(URI uri) throws Exception {
        HttpGet httpGet = new HttpGet(uri);
        httpGet.addHeader("Accept", "application/json");
        CloseableHttpResponse response = this.createHttpClient().execute(httpGet);
        return new WeChatResponse(response);
    }

}
