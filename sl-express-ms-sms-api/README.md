# sl-express-ms-sms-api使用手册

## 1、说明

为了将短信相关的代码进行统一，所以将发送短信的代码抽取到sl-express-ms-sms-service中，而sl-express-ms-sms-api提供了短信服务的功能。

主要功能：

- 短信（短信验证码，通知短信）发送功能，支持同时发送多个短信验证码，暂时支持文字短信验证码

## 2、使用

### 2.1、导入依赖

~~~xml
<dependency>
    <groupId>com.sl-express.ms.sms</groupId>
    <artifactId>sl-express-ms-sms-api</artifactId>
    <version>1.1-SNAPSHOT</version>
</dependency>
~~~

### 2.2、使用

~~~java
package com.sl.ms.work.service;

import cn.hutool.core.collection.ListUtil;
import com.sl.ms.sms.SmsFeign;
import com.sl.ms.sms.dto.SendResultDTO;
import com.sl.ms.sms.dto.SmsInfoDTO;
import com.sl.ms.sms.enums.SmsContentTypeEnum;
import com.sl.ms.sms.enums.SmsTypeEnum;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
public class SmsTest {

    @Resource
    private SmsFeign smsFeign;

    @Test
    public void testSend(){
        SmsInfoDTO smsInfoDTO = SmsInfoDTO.builder()
                .appName("sl-express-ms-work")
                .smsContent("测试短信")
                .contentType(SmsContentTypeEnum.WORD_MESSAGE)
                .smsType(SmsTypeEnum.VERIFY)
                .mobiles(ListUtil.of("13888888888"))
                .smsCode("1001")
                .build();
        List<SendResultDTO> resultDTOS = this.smsFeign.send(smsInfoDTO);
        resultDTOS.forEach(System.out::println);
    }

}

~~~