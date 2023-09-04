package com.sl.ms.sms.handler;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.sl.ms.sms.annotation.SendChannel;
import com.sl.ms.sms.enums.SendChannelEnum;

import java.util.Map;

/**
 * Handler工厂，用于获取指定类型的具体短信通道的实例对象
 */
public class HandlerFactory {

    private HandlerFactory() {

    }

    public static <T> T get(SendChannelEnum sendChannelEnum, Class<T> handler) {
        Map<String, T> beans = SpringUtil.getBeansOfType(handler);
        for (Map.Entry<String, T> entry : beans.entrySet()) {
            SendChannel sendChannelAnnotation = entry.getValue().getClass().getAnnotation(SendChannel.class);
            if (ObjectUtil.isNotEmpty(sendChannelAnnotation) && ObjectUtil.equal(sendChannelEnum, sendChannelAnnotation.type())) {
                return entry.getValue();
            }
        }
        return null;
    }

    public static <T> T get(String payChannel, Class<T> handler) {
        return get(SendChannelEnum.valueOf(payChannel), handler);
    }

    public static <T> T get(Integer code, Class<T> handler) {
        return get(SendChannelEnum.codeOf(code), handler);
    }
}
