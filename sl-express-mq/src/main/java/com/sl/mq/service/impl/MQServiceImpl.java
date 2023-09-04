package com.sl.mq.service.impl;

import cn.hutool.core.exceptions.ExceptionUtil;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.sl.mq.entity.FailMsgEntity;
import com.sl.mq.exception.MsgException;
import com.sl.mq.service.FailMsgService;
import com.sl.mq.service.MQService;
import com.sl.transport.common.constant.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.core.MessageDeliveryMode;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 消息处理类
 *
 * @author zzj
 * @version 1.0
 */
@Slf4j
@Service
//设置初始化条件，只有在配置文件中设置sl.mq.enable=true才能触发
@ConditionalOnProperty(prefix = "sl.mq", value = "enable")
public class MQServiceImpl implements MQService {

    @Resource
    private RabbitTemplate rabbitTemplate;
    @Resource
    private FailMsgService failMsgService;

    /**
     * 发送消息 重试3次
     *
     * @param exchange   交换机
     * @param routingKey 路由key
     * @param msg        消息对象，会将对象序列化成json字符串发出
     * @return 是否发送成功
     */
    @Retryable(value = MsgException.class, maxAttempts = 3, backoff = @Backoff(value = 3000, multiplier = 1.5))
    @Override
    public Boolean sendMsg(String exchange, String routingKey, Object msg) {
        // 实时发送
        return this.sendMsg(exchange, routingKey, msg, Constants.MQ.DEFAULT_DELAY);
    }

    @Retryable(value = MsgException.class, maxAttempts = 3, backoff = @Backoff(value = 3000, multiplier = 1.5))
    @Override
    public Boolean sendMsg(String exchange, String routingKey, Object msg, int delay) {
        // 1.获取消息内容，如果非字符串将其序列化
        String jsonMsg = (msg instanceof String) ? (String) msg : JSONUtil.toJsonStr(msg);
        String msgId = IdUtil.simpleUUID();
        log.info("消息发送！exchange = {}, routingKey = {}, msg = {}, msgId = {}", exchange, routingKey, jsonMsg, msgId);
        // 2.全局唯一的消息ID，需要封装到CorrelationData中
        CorrelationData correlationData = new CorrelationData(msgId);
        // 3.添加callback
        correlationData.getFuture().addCallback(
                result -> {
                    if (result.isAck()) {
                        // 3.1.ack，消息成功
                        log.debug("消息发送成功, ID:{}", correlationData.getId());
                    } else {
                        // 3.2.nack，消息失败
                        log.error("消息发送失败, ID:{}, 原因:{}", correlationData.getId(), result.getReason());
                        FailMsgEntity failMsgEntity = FailMsgEntity.builder()
                                .exchange(exchange)
                                .msgId(correlationData.getId())
                                .msg(jsonMsg)
                                .reason(result.getReason()).build();
                        this.failMsgService.save(failMsgEntity);
                    }
                },
                ex -> {
                    //出现此异常情况，可能是发送消息后无法连接到发送者或其他一些未知的异常情况
                    String exceptionInfo = ExceptionUtil.getMessage(ex);
                    log.error("消息发送异常, ID:{}, 原因:{}", correlationData.getId(), exceptionInfo);
                    FailMsgEntity failMsgEntity = FailMsgEntity.builder()
                            .exchange(exchange)
                            .msgId(correlationData.getId())
                            .msg(jsonMsg)
                            .reason(exceptionInfo).build();
                    this.failMsgService.save(failMsgEntity);
                }
        );
        // 4.构造消息对象
        Message message = MessageBuilder.withBody(StrUtil.bytes(jsonMsg, CharsetUtil.CHARSET_UTF_8))
                .setDeliveryMode(MessageDeliveryMode.PERSISTENT) //持久化
                .build();

        try {
            // 5.发送消息
            this.rabbitTemplate.convertAndSend(exchange, routingKey, message, messagePostProcessor -> {
                //设置延时发送时间，delay小于0，实时发送
                messagePostProcessor.getMessageProperties().setDelay(delay);
                return messagePostProcessor;
            }, correlationData);
        } catch (Exception e) {
            //出现异常，这里将异常转化为自定义异常MsgException，主要是为了触发重试机制
            throw MsgException.builder()
                    .failMsgEntity(FailMsgEntity.builder()
                            .exchange(exchange)
                            .msgId(correlationData.getId())
                            .msg(jsonMsg)
                            .reason(ExceptionUtil.getMessage(e)).build())
                    .build();

        }
        return true;
    }

    /**
     * 3次失败后 存入数据库
     *
     * @param msgException 失败消息
     */
    @Recover
    public Boolean saveFailMag(MsgException msgException) {
        //发送消息失败，需要将消息持久化到数据库，通过任务调度的方式处理失败的消息
        this.failMsgService.save(msgException.getFailMsgEntity());
        return true;
    }

}
