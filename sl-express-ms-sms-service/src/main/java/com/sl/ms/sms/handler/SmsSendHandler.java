package com.sl.ms.sms.handler;

import com.sl.ms.sms.entity.SmsRecordEntity;
import com.sl.ms.sms.entity.SmsThirdChannelEntity;

import java.util.List;

/**
 * 对接三方平台发送短信
 */
public interface SmsSendHandler {

    /**
     * 发送短信，发送成功后需要修改状态为成功状态
     *
     * @param smsThirdChannelEntity 发送通道信息
     * @param smsRecordEntities     待发送列表
     */
    void send(SmsThirdChannelEntity smsThirdChannelEntity, List<SmsRecordEntity> smsRecordEntities);

}
