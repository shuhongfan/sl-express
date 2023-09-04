package com.sl.ms.sms.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.ms.sms.enums.SendChannelEnum;
import com.sl.ms.sms.enums.SmsContentTypeEnum;
import com.sl.ms.sms.enums.SmsTypeEnum;
import com.sl.transport.common.entity.BaseEntity;
import lombok.Data;

@Data
@TableName("sl_sms_third_channel")
public class SmsThirdChannelEntity extends BaseEntity {

    /**
     * 短信类型,1:文字短信，2：语音短信
     */
    private SmsTypeEnum smsType;

    /**
     * 内容类型，1：短信验证码，2：营销短信
     */
    private SmsContentTypeEnum contentType;

    /**
     * 短信code，短信微服务发放的code，与sms_code是一对多的关系
     */
    private String smsCode;

    /**
     * 第三方平台模板code
     */
    private String templateCode;

    /**
     * 第三方短信平台码
     */
    private SendChannelEnum sendChannel;

    /**
     * 签名
     */
    private String signName;

    /**
     * 优先级，数字越大优先级越高
     */
    private Integer smsPriority;

    /**
     * 三方平台对应的账户信息，如：accessKeyId、accessKeySecret等，以json格式存储，使用时自行解析
     */
    private String account;

    /**
     * 通道状态1：使用 中，2：已经停用
     */
    private Integer status;

    /**
     * 是否删除
     */
    private Boolean isDelete;

}