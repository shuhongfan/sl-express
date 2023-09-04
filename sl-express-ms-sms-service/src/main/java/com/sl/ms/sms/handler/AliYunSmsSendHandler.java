package com.sl.ms.sms.handler;

import cn.hutool.core.collection.CollUtil;
import com.sl.ms.sms.annotation.SendChannel;
import com.sl.ms.sms.entity.SmsRecordEntity;
import com.sl.ms.sms.entity.SmsThirdChannelEntity;
import com.sl.ms.sms.enums.SendChannelEnum;
import com.sl.ms.sms.enums.SendStatusEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@SendChannel(type = SendChannelEnum.ALI_YUN)
public class AliYunSmsSendHandler implements SmsSendHandler {

    @Override
    public void send(SmsThirdChannelEntity smsThirdChannelEntity, List<SmsRecordEntity> smsRecordEntities) {
        //第三方发送短信验证码
        log.info("smsRecordEntities：{}", smsRecordEntities);
        log.info("smsThirdChannelEntity：{}", smsThirdChannelEntity);
        CollUtil.forEach(smsRecordEntities, (value, index) -> {
            log.info("短信发送成功 ...");
            //设置发送成功状态
            value.setStatus(SendStatusEnum.SUCCESS);
        });
    }
}
