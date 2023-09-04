package com.sl.mq.service;

/**
 * 消息处理类
 *
 * @author zzj
 * @version 1.0
 */
public interface MQService {

    /**
     * 发送实时消息
     *
     * @param exchange   交换机
     * @param routingKey 路由key
     * @param msg        消息对象，会将对象序列化成json字符串发出
     * @return 是否成功
     */
    Boolean sendMsg(String exchange, String routingKey, Object msg);

    /**
     * 发送延迟消息
     *
     * @param exchange   交换机
     * @param routingKey 路由key
     * @param msg        消息对象，会将对象序列化成json字符串发出
     * @param delay      延时时间，单位：毫秒
     * @return 是否成功
     */
    Boolean sendMsg(String exchange, String routingKey, Object msg, int delay);
}
