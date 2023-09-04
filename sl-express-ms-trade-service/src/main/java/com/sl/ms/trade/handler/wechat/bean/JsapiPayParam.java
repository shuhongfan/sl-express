package com.sl.ms.trade.handler.wechat.bean;

import cn.hutool.core.annotation.Alias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JsapiPayParam {

    /**
     * 由微信生成的应用ID，全局唯一。
     * 请求基础下单接口时请注意APPID的应用属性，例如公众号场景下，需使用应用属性为公众号的服务号APPID
     */
    private String appId;

    /**
     * 时间戳，标准北京时间，时区为东八区，
     * 自1970年1月1日 0点0分0秒以来的秒数。
     * 注意：部分系统取到的值为毫秒级，需要转换成秒(10位数字)。
     */
    private Long timeStamp;

    /**
     * 随机字符串，不长于32位。
     */
    private String nonceStr;

    /**
     * JSAPI下单接口返回的prepay_id参数值，提交格式如：
     * prepay_id=wx201410272009395522657a690389285100
     */
    @Alias("package")
    private String packages;

    /**
     * 签名类型，默认为RSA，仅支持RSA。
     */
    private String signType = "RSA";

    /**
     * 签名，使用字段appId、timeStamp、nonceStr、package计算得出的签名值
     */
    private String paySign;

}
