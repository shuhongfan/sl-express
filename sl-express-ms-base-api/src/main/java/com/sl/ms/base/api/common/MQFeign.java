package com.sl.ms.base.api.common;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 通用的消息中间件发送接口
 */
@ApiIgnore
@FeignClient(name = "sl-express-ms-base", contextId = "MQ", path = "/mq")
public interface MQFeign {

    /**
     * 发送实时消息
     *
     * @param exchange   交换机
     * @param routingKey 路由key，非必须
     * @param msg        消息对象（json字符串）
     * @return 是否成功
     */
    @PostMapping
    boolean sendMsg(@RequestParam("exchange") String exchange,
                    @RequestParam(value = "routingKey", required = false) String routingKey,
                    @RequestParam("msg") String msg);

    /**
     * 发送延迟消息
     *
     * @param exchange   交换机
     * @param routingKey 路由key，非必须
     * @param msg        消息对象（json字符串）
     * @param delay      延时时间，单位：毫秒
     * @return 是否成功
     */
    @PostMapping("delay")
    boolean sendMsg(@RequestParam("exchange") String exchange,
                    @RequestParam(value = "routingKey", required = false) String routingKey,
                    @RequestParam("msg") String msg,
                    @RequestParam(value = "delay") int delay);

}
