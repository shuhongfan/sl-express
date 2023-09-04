package com.sl.ms.sms.dto;

import com.sl.ms.sms.enums.SmsContentTypeEnum;
import com.sl.ms.sms.enums.SmsTypeEnum;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Builder
@ApiModel("短信信息")
@NoArgsConstructor
@AllArgsConstructor
public class SmsInfoDTO {

    @ApiModelProperty(value = "短信类型，1：验证类型短信，2：通知类型短信")
    @NotNull(message = "短信类型不能为空")
    private SmsTypeEnum smsType;

    @ApiModelProperty("内容类型，1：文字短信，2：语音短信")
    @NotNull(message = "内容类型不能为空")
    private SmsContentTypeEnum contentType;

    @ApiModelProperty(value = "手机号")
    @NotNull(message = "手机号不能为空")
    private List<String> mobiles;

    @ApiModelProperty("短信code，短信微服务发放的code")
    private String smsCode;

    @ApiModelProperty(value = "微服务名称", notes = "发起发送请求的微服务名称，如：sl-express-ms-work")
    @NotNull(message = "微服务名称不能为空")
    private String appName;

    @ApiModelProperty(value = "短信内容", notes = "短信内容，一般为json格式的参数数据，用于填充短信模板中的占位符参数")
    @NotNull(message = "短信内容不能为空")
    private String smsContent;

}
