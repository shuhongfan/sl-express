package com.sl.ms.trade.handler.wechat;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.sl.ms.trade.annotation.PayChannel;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.ms.trade.enums.PayChannelEnum;
import com.sl.ms.trade.enums.TradingEnum;
import com.sl.ms.trade.enums.TradingStateEnum;
import com.sl.ms.trade.handler.JsapiPayHandler;
import com.sl.ms.trade.handler.wechat.bean.JsapiPayParam;
import com.sl.ms.trade.handler.wechat.response.WeChatResponse;
import com.sl.transport.common.exception.SLException;
import com.wechat.pay.contrib.apache.httpclient.util.PemUtil;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.security.PrivateKey;
import java.security.Signature;
import java.util.Base64;
import java.util.Map;

/**
 * 微信jsapi的实现
 *
 * @author zzj
 * @version 1.0
 */
@Component("wechatJsapiPayHandler")
@PayChannel(type = PayChannelEnum.WECHAT_PAY)
public class WechatJsapiPayHandler implements JsapiPayHandler {

    @Override
    public void createJsapiTrading(TradingEntity tradingEntity) {
        // 查询配置
        WechatPayHttpClient client = WechatPayHttpClient.get(tradingEntity.getEnterpriseId());
        //请求地址
        String apiPath = "/v3/pay/transactions/jsapi";
        //请求参数
        Map<String, Object> params = MapUtil.<String, Object>builder()
                .put("mchid", client.getMchId())
                .put("appid", client.getAppId())
                .put("description", tradingEntity.getMemo())
                .put("notify_url", client.getNotifyUrl())
                .put("out_trade_no", Convert.toStr(tradingEntity.getTradingOrderNo()))
                .put("amount", MapUtil.<String, Object>builder()
                        .put("total", Convert.toInt(NumberUtil.mul(tradingEntity.getTradingAmount(), 100))) //金额，单位：分
                        .put("currency", "CNY") //人民币
                        .build())
                .put("payer", MapUtil.<String, Object>builder()
                        .put("openid", tradingEntity.getOpenId()) //用户识别标识
                        .build())
                .build();
        try {
            WeChatResponse response = client.doPost(apiPath, params);
            if (!response.isOk()) {
                //下单失败
                throw new SLException(TradingEnum.NATIVE_PAY_FAIL);
            }
            //指定统一下单code
            tradingEntity.setPlaceOrderCode(Convert.toStr(response.getStatus()));
            //jsapi发起支付需要的预支付id
            tradingEntity.setPlaceOrderMsg(JSONUtil.parseObj(response.getBody()).getStr("prepay_id"));

            //指定交易状态
            tradingEntity.setTradingState(TradingStateEnum.FKZ);

            //封装JSAPI调起支付的参数（给前端使用）
            Long timeStamp = System.currentTimeMillis() / 1000;
            String nonceStr = IdUtil.simpleUUID();
            String packages = "prepay_id=" + tradingEntity.getPlaceOrderMsg();
            JsapiPayParam jsapiPayParam = JsapiPayParam.builder()
                    .timeStamp(timeStamp)
                    .appId(client.getAppId())
                    .nonceStr(nonceStr)
                    .packages(packages)
                    .paySign(this.createPaySign(client, timeStamp, nonceStr, packages))
                    .build();

            //设置jsapi调起支付的参数
            tradingEntity.setPlaceOrderJson(JSONUtil.toJsonStr(jsapiPayParam));
        } catch (Exception e) {
            throw new SLException(TradingEnum.NATIVE_PAY_FAIL);
        }
    }

    /**
     * 生成
     *
     * @param client    微信client对象
     * @param timeStamp 时间戳
     * @param nonceStr  随机数
     * @param packages  预支付字符串
     * @return 签名字符串
     * @throws Exception 不处理异常，全部抛出
     */
    private String createPaySign(WechatPayHttpClient client, Long timeStamp, String nonceStr, String packages) throws Exception {
        Signature sign = Signature.getInstance("SHA256withRSA");
        // 加载商户私钥
        PrivateKey privateKey = PemUtil
                .loadPrivateKey(new ByteArrayInputStream(client.getPrivateKey().getBytes(CharsetUtil.CHARSET_UTF_8)));
        sign.initSign(privateKey);
        String message = StrUtil.format("{}\n{}\n{}\n{}\n",
                client.getAppId(),
                timeStamp,
                nonceStr,
                packages);
        sign.update(message.getBytes());
        return Base64.getEncoder().encodeToString(sign.sign());
    }
}
