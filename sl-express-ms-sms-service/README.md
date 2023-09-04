# sl-express-ms-sms-service使用手册

## 1、说明

为了将短信相关的代码进行统一，所以将发送短信的代码抽取到sl-express-ms-sms-service

主要功能：

- 发送短信包含文字短信、语音短信，现在第三方短信通道还没有对接
- 可以配置多个第三方短信通过实现动态切换
- 一条短信同时可以多条发送

## 2、SQL脚本

~~~sql
CREATE TABLE `sl_sms_record` (
  `id` bigint NOT NULL COMMENT '短信发送记录id',
  `send_channel_id` bigint NOT NULL COMMENT '发送通道id，对应sl_sms_third_channel的主键',
  `batch_id` bigint NOT NULL COMMENT '发送批次id，用于判断这些数据是同一批次发送的',
  `app_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT '发起发送请求的微服务名称，如：sl-express-ms-work',
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '手机号',
  `sms_content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '短信内容，一般为json格式的参数数据，用于填充短信模板中的占位符参数',
  `status` int NOT NULL COMMENT '发送状态，1：成功，2：失败',
  `created` datetime NOT NULL COMMENT '创建时间',
  `updated` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `created` (`created`) USING BTREE,
  KEY `batch_id` (`batch_id`) USING BTREE,
  KEY `mobile` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='短信发送记录';



CREATE TABLE `sl_sms_third_channel` (
  `id` bigint NOT NULL COMMENT '主键id',
  `sms_type` int NOT NULL COMMENT '短信类型，1：验证类型短信，2：通知类型短信',
  `content_type` int NOT NULL COMMENT '内容类型，1:文字短信，2：语音短信',
  `sms_code` int NOT NULL COMMENT '短信code，短信微服务发放的code，与sms_code是一对多的关系',
  `template_code` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT '第三方平台模板code',
  `send_channel` int NOT NULL COMMENT '第三方短信平台码',
  `sign_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '签名',
  `sms_priority` int NOT NULL COMMENT '数字越大优先级越高',
  `account` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '三方平台对应的账户信息，如：accessKeyId、accessKeySecret等，以json格式存储，使用时自行解析',
  `status` int NOT NULL COMMENT '通道状态1：使用 中，2：已经停用',
  `created` datetime NOT NULL COMMENT '创建时间',
  `updated` datetime NOT NULL COMMENT '更新时间',
  `is_delete` bit(1) NOT NULL COMMENT '是否删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `created` (`created`) USING BTREE,
  KEY `sms_priority` (`sms_priority`),
  KEY `index_type` (`sms_type`,`content_type`,`sms_code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='短信发送通道';
~~~

## 3、使用

> 短信中心使用方法见 sl-express-ms-sms-api项目中的README.md


## 4.配置
### 4.1、通道配置（表字段介绍）
~~~
表sl_sms_third_channel
通道信息：
sms_type：短信类型，1：验证类型短信，2：通知类型短信
content_type：内容类型，1:文字短信，2：语音短信
sms_code：短信code，短信微服务发放的code，与sms_code是一对多的关系
template_code 第三方平台模板code
send_channel 第三方短信平台码
sign_name 签名，短信中的签名 
sms_priority 数字越大优先级越高
account 三方平台对应的账户信息，如：accessKeyId、accessKeySecret等，以json格式存储，使用时自行解析

~~~~

### 4.2、路由规则
路由规则现在只有一个：
根据短信类型、内容类型、短信code、状态使用中作为查询条件，通过权重排序，取优先级前五的通道，然后从这些通道中随机选择一条通道。
路由规则后续可以进行拓展。代码展示

~~~java
    /**
     * 目前只根据优先级进行路由选出前五，然后随机选择渠道
     *
     * @param smsTypeEnum        短信类型
     * @param smsContentTypeEnum 内容类型
     * @param smsCode            短信code，短信微服务发放的code，与sms_code是一对多的关系
     * @return 选中的发送通道信息
     */
    @Override
    public SmsThirdChannelEntity route(SmsTypeEnum smsTypeEnum, SmsContentTypeEnum smsContentTypeEnum, String smsCode) {

        //取前五条记录
        LambdaQueryWrapper<SmsThirdChannelEntity> queryWrapper = Wrappers.<SmsThirdChannelEntity>lambdaQuery()
                .eq(SmsThirdChannelEntity::getSmsType, smsTypeEnum)
                .eq(SmsThirdChannelEntity::getContentType, smsContentTypeEnum)
                .eq(SmsThirdChannelEntity::getSmsCode, smsCode)
                .eq(SmsThirdChannelEntity::getStatus, 1) //使用中的状态
                .orderByDesc(SmsThirdChannelEntity::getSmsPriority).last("LIMIT 5");

        //查询数据
        List<SmsThirdChannelEntity> smsThirdChannelEntities = super.list(queryWrapper);
        if (CollUtil.isEmpty(smsThirdChannelEntities)) {
            return null;
        }

        //随机选择
        int index = RandomUtil.randomInt(0, CollUtil.size(smsThirdChannelEntities));
        return CollUtil.get(smsThirdChannelEntities, index);
    }
~~~
### 4.3、第三方通道对接

例如
~~~java
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

~~~

> **对接短信通道时一定要加上@SendChannel注解，并且指定type，枚举中的code与sl_sms_third_channel表中的send_channel字段值一致**
