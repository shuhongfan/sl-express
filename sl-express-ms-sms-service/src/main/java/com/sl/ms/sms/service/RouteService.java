package com.sl.ms.sms.service;

import com.sl.ms.sms.entity.SmsThirdChannelEntity;
import com.sl.ms.sms.enums.SmsContentTypeEnum;
import com.sl.ms.sms.enums.SmsTypeEnum;

public interface RouteService {

    /**
     * 目前只根据优先级进行路由选出前五，然后随机选择渠道
     *
     * @param smsTypeEnum        短信类型
     * @param smsContentTypeEnum 内容类型
     * @param smsCode            短信code，短信微服务发放的code，与sms_code是一对多的关系
     * @return 选中的发送通道信息
     */
    SmsThirdChannelEntity route(SmsTypeEnum smsTypeEnum, SmsContentTypeEnum smsContentTypeEnum,
                                String smsCode);
}
