package com.sl.ms.sms.service.impl;

import cn.hutool.core.stream.StreamUtil;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.sms.dto.SendResultDTO;
import com.sl.ms.sms.dto.SmsInfoDTO;
import com.sl.ms.sms.entity.SmsRecordEntity;
import com.sl.ms.sms.entity.SmsThirdChannelEntity;
import com.sl.ms.sms.enums.SendStatusEnum;
import com.sl.ms.sms.enums.SmsExceptionEnum;
import com.sl.ms.sms.handler.HandlerFactory;
import com.sl.ms.sms.handler.SmsSendHandler;
import com.sl.ms.sms.mapper.SmsRecordMapper;
import com.sl.ms.sms.service.RouteService;
import com.sl.ms.sms.service.SmsService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.BeanUtil;
import com.sl.transport.common.util.ObjectUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SmsServiceImpl extends ServiceImpl<SmsRecordMapper, SmsRecordEntity> implements SmsService {

    @Resource
    private RouteService routeService;

    @Override
    public List<SendResultDTO> sendSms(SmsInfoDTO smsInfoDTO) {
        // TODO 参数校验 1.数据校验 2.接口幂等性校验

        //路由短信发送通道
        SmsThirdChannelEntity smsThirdChannelEntity = routeService.route(smsInfoDTO.getSmsType(),
                smsInfoDTO.getContentType(), smsInfoDTO.getSmsCode());

        if (ObjectUtil.isEmpty(smsThirdChannelEntity)) {
            throw new SLException(SmsExceptionEnum.SMS_CHANNEL_DOES_NOT_EXIST);
        }

        //获取service
        SmsSendHandler smsSendHandler = HandlerFactory.get(smsThirdChannelEntity.getSendChannel(), SmsSendHandler.class);
        if (ObjectUtil.isEmpty(smsSendHandler)) {
            throw new SLException(SmsExceptionEnum.SMS_CHANNEL_DOES_NOT_EXIST);
        }

        //生成批次id
        long batchId = IdWorker.getId();

        //封装数据
        List<SmsRecordEntity> smsRecordEntities = StreamUtil.of(smsInfoDTO.getMobiles())
                .map(mobile -> SmsRecordEntity.builder()
                        .batchId(batchId) //批次id
                        .appName(smsInfoDTO.getAppName()) //微服务名称
                        .smsContent(smsInfoDTO.getSmsContent()) //短信内容
                        .sendChannelId(smsThirdChannelEntity.getId()) //发送渠道id
                        .mobile(mobile) //手机号
                        .status(SendStatusEnum.FAIL) //默认失败状态
                        .build())
                .collect(Collectors.toList());

        //发送短信
        smsSendHandler.send(smsThirdChannelEntity, smsRecordEntities);

        //入库
        super.saveBatch(smsRecordEntities);

        return BeanUtil.copyToList(smsRecordEntities, SendResultDTO.class);
    }

}
