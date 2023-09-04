package com.sl.ms.sms.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.ms.sms.enums.SendStatusEnum;
import com.sl.transport.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sl_sms_record")
public class SmsRecordEntity extends BaseEntity {

    /**
     * 发送通道id，对应sl_sms_third_channel的主键
     */
    private Long sendChannelId;

    /**
     * 发送批次id，用于判断这些数据是同一批次发送的
     */
    private Long batchId;

    /**
     * 发起发送请求的微服务名称，如：sl-express-ms-work
     */
    private String appName;

    /**
     * 手机号
     */
    private String mobile;

    /**
     * 短信内容，一般为json格式的参数数据，用于填充短信模板中的占位符参数
     */
    private String smsContent;

    /**
     * 发送状态，1：成功，2：失败
     */
    private SendStatusEnum status;

}