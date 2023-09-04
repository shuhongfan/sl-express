package com.sl.ms.sms;

import com.sl.ms.sms.dto.SendResultDTO;
import com.sl.ms.sms.dto.SmsInfoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@ApiIgnore
@FeignClient(name = "sl-express-ms-sms", contextId = "Sms", path = "sms")
public interface SmsFeign {

    /**
     * 短信发送接口，可以同时发送给多个手机号码，多个手机号用逗号隔开
     *
     * @param smsInfoDTO
     * @return
     */
    @PostMapping("send")
    List<SendResultDTO> send(@RequestBody SmsInfoDTO smsInfoDTO);
}
