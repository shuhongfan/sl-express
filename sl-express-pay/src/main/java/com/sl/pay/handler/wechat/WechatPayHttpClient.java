package com.sl.pay.handler.wechat;

import cn.hutool.core.net.url.UrlBuilder;
import cn.hutool.core.net.url.UrlPath;
import cn.hutool.core.net.url.UrlQuery;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.sl.pay.handler.wechat.response.WeChatResponse;
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
import java.nio.charset.StandardCharsets;
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
    private String appId; //应用号
    private String privateKey; //私钥字符串
    private String mchSerialNo; //商户证书序列号
    private String apiV3Key; //V3密钥
    private String domain; //请求域名
    private String notifyUrl; //请求地址

    public static WechatPayHttpClient get() {
        //通过渠道对象转化成微信支付的client对象
        return WechatPayHttpClient.builder()
                .appId("wx6592a2db3f85ed25")
                .domain("api.mch.weixin.qq.com")
                .privateKey("-----BEGIN PRIVATE KEY-----\n" +
                        "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBHGgIh80193Gh\n" +
                        "dpD1LtMZfTRpcWI0fImyuBCyrd3gYb3rrsARebGcHdJsQA3mVjVqVp5ybhEZDPa4\n" +
                        "ecoK4Ye1hTppNpI/lmLt4/uUV/zhF5ahli7hi+116Ty6svHSbuMQBuUZeTFOwGrx\n" +
                        "jvofU/4pGIwh8ZvkcSnyOp9uX2177UVxDBkhgbZbJp9XF2b83vUa5eHo93CziPzn\n" +
                        "3hFdAlBCdTXB7DH+m0nN3Jou0szGukvq7cIgGpHku4ycKSTkIhhl9WRhN6OoSEJx\n" +
                        "q88MXzjkzTruc85PHN52aUTUifwg3T8Y4XqFQ61dTnEmgxeD2O6/pLdB9gLsp6yC\n" +
                        "GqN5Lqk7AgMBAAECggEBAL4X+WzUSbSjFS9NKNrCMjm4H1zgqTxjj6TnPkC1mGEl\n" +
                        "tjAHwLgzJBw62wWGdGhWWpSIGccpBBm1wjTMZpAZfF66fEpP1t1Ta6UjtGZNyvfF\n" +
                        "IZmE3jdWZ/WXGBnsxtFQKKKBNwrBW0Fbdqq9BQjLxLitmlxbmwrgPttcy855j6vZ\n" +
                        "qq4MBT1v8CtUT/gz4UWW2xWovVnmWOrRSScv7Nh0pMbRpPLkNHXrBwSSNz/keORz\n" +
                        "XB9JSm85wlkafa7n5/IJbdTml3A/uAgW3q3JZZQotHxQsYvD4Zb5Cnc9CPAXE5L2\n" +
                        "Yk877kVXZMGt5QPIVcPMj/72AMtaJT67Y0fN0RYHEGkCgYEA38BIGDY6pePgPbxB\n" +
                        "7N/l6Df0/OKPP0u8mqR4Q0aQD3VxeGiZUN1uWXEFKsKwlOxLfIFIFk1/6zQeC0xe\n" +
                        "tNTKk0gTL8hpMUTNkE7vI9gFWws2LY6DE86Lm0bdFEIwh6d7Fr7zZtyQKPzMsesC\n" +
                        "3XV9sdSUExEi5o/VwAyf+xZlOXcCgYEA3PGZYlILjg3esPNkhDz2wxFw432i8l/B\n" +
                        "CPD8ZtqIV9eguu4fVtFYcUVfawBb0T11RamJkc4eiSOqayC+2ehgb+GyRLJNK4Fq\n" +
                        "bFcsIT+CK0HlscZw51jrMR0MxTc4RzuOIMoYDeZqeGB6/YnNyG4pw2sD8bIwHm84\n" +
                        "06gtJsX/v10CgYAo8g3/aEUZQHcztPS3fU2cTkkl0ev24Ew2XGypmwsX2R0XtMSB\n" +
                        "uNPNyFHyvkgEKK2zrhDcC/ihuRraZHJcUyhzBViFgP5HBtk7VEaM36YzP/z9Hzw7\n" +
                        "bqu7kZ85atdoq6xpwC3Yn/o9le17jY8rqamD1mv2hUdGvAGYsHbCQxnpBwKBgHTk\n" +
                        "eaMUBzr7yZLS4p435tHje1dQVBJpaKaDYPZFrhbTZR0g+IGlNmaPLmFdCjbUjiPy\n" +
                        "A2+Znnwt227cHz0IfWUUAo3ny3419QkmwZlBkWuzbIO2mms7lwsf9G6uvV6qepKM\n" +
                        "eVd5TWEsokVbT/03k27pQmfwPxcK/wS0GFdIL/udAoGAOYdDqY5/aadWCyhzTGI6\n" +
                        "qXPLvC+fsJBPhK2RXyc+jYV0KmrEv4ewxlK5NksuFsNkyB7wlI1oMCa/xB3T/2vT\n" +
                        "BALgGFPi8BJqceUjtnTYtI4R2JIVEl08RtEJwyU5JZ2rvWcilsotVZYwfuLZ9Kfd\n" +
                        "hkTrgNxlp/KKkr+UuKce4Vs=\n" +
                        "-----END PRIVATE KEY-----\n")
                .mchId("1561414331")
                .mchSerialNo("25FBDE3EFD31B03A4377EB9A4A47C517969E6620")
                .apiV3Key("CZBK51236435wxpay435434323FFDuv3")
                .notifyUrl("https://www.itcast.cn/")
                .build();
    }

    /***
     * 构建CloseableHttpClient远程请求对象
     * @return org.apache.http.impl.client.CloseableHttpClient
     */
    public CloseableHttpClient createHttpClient() throws Exception {
        // 加载商户私钥（privateKey：私钥字符串）
        PrivateKey merchantPrivateKey = PemUtil.loadPrivateKey(new ByteArrayInputStream(privateKey.getBytes(StandardCharsets.UTF_8)));

        // 加载平台证书（mchId：商户号,mchSerialNo：商户证书序列号,apiV3Key：V3密钥）
        PrivateKeySigner privateKeySigner = new PrivateKeySigner(mchSerialNo, merchantPrivateKey);
        WechatPay2Credentials wechatPay2Credentials = new WechatPay2Credentials(mchId, privateKeySigner);

        // 向证书管理器增加需要自动更新平台证书的商户信息
        CertificatesManager certificatesManager = CertificatesManager.getInstance();
        certificatesManager.putMerchant(mchId, wechatPay2Credentials, apiV3Key.getBytes(StandardCharsets.UTF_8));

        // 初始化httpClient
        return com.wechat.pay.contrib.apache.httpclient.WechatPayHttpClientBuilder.create()
                .withMerchant(mchId, mchSerialNo, merchantPrivateKey)
                .withValidator(new WechatPay2Validator(certificatesManager.getVerifier(mchId)))
                .build();
    }

    /***
     * 支持post请求的远程调用
     *
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
