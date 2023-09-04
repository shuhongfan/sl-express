package com.sl.mq.config;

import com.sl.transport.common.constant.Constants;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.retry.MessageRecoverer;
import org.springframework.amqp.rabbit.retry.RepublishMessageRecoverer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ErrorMessageConfig {

    @Value("${spring.application.name}") //获取微服务的名称
    private String appName;

    @Bean
    public TopicExchange errorMessageExchange() {
        //定义错误消息的交换机，类型为：topic
        return new TopicExchange(Constants.MQ.Exchanges.ERROR, true, false);
    }

    @Bean
    public Queue errorQueue() {
        //【前缀+微服务】名作为错误消息存放的队列名称，并且开启了持久化
        return new Queue(Constants.MQ.Queues.ERROR_PREFIX + appName, true);
    }

    @Bean
    public Binding errorBinding(Queue errorQueue, TopicExchange errorMessageExchange) {
        //完成绑定关系
        return BindingBuilder.bind(errorQueue).to(errorMessageExchange).with(appName);
    }

    @Bean
    public MessageRecoverer republishMessageRecoverer(RabbitTemplate rabbitTemplate) {
        //设置全部重试失败后进行重新发送消息，指定了交换机以及路由key
        //需要注意的是，路由key是应用名称，与上述的绑定关系中的路由key一致
        return new RepublishMessageRecoverer(rabbitTemplate, Constants.MQ.Exchanges.ERROR, appName);
    }
}
