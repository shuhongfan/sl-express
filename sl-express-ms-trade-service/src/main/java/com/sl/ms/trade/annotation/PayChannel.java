package com.sl.ms.trade.annotation;

import com.sl.ms.trade.enums.PayChannelEnum;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented //标记注解
public @interface PayChannel {

    PayChannelEnum type();

}