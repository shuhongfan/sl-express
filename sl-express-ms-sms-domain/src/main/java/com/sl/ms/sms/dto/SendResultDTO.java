package com.sl.ms.sms.dto;

import com.sl.ms.sms.enums.SendStatusEnum;
import io.swagger.annotations.ApiModel;
import lombok.Data;

/**
 * 发送结果
 */
@Data
@ApiModel("发送结果")
public class SendResultDTO {

    /**
     * 发送记录id
     */
    private Long id;

    /**
     * 手机号
     */
    private String mobile;

    /**
     * 发起发送请求的微服务名称，如：sl-express-ms-work
     */
    private String appName;

    /**
     * 发送批次id，用于判断这些数据是同一批次发送的
     */
    private Long batchId;

    /**
     * 发送状态，1：成功，2：失败
     */
    private SendStatusEnum status;

}
