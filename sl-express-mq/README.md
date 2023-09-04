# sl-express-mq使用手册

## 1、说明

为了将MQ的使用相关的代码进行统一，所以将发送消息的代码、消费者的配置抽取到sl-express-mq工程中。

主要功能：

- 为RabbitTemplate设置了ReturnsCallback，如果消息发送到交换机但是没有到达队列，会进行日志的记录。
- 统一了配置了消息的消费，消费者如果处理消息失败，会进行重试，如果依然是失败的话，会将错误消息发送到error.queue队列，后续需要人工进行处理。
- 统一了发送消息代码，如果网络等异常情况导致发送消息失败会进行重试，如果依然失败的话将消息内容持久化到mysql数据库，后续通过xxl-job任务进行重新发送；如果其他情况导致失败，不会进行重试，直接存储消息到mysql数据库中。

## 2、SQL脚本

错误消息记录的SQL脚本：

~~~sql
CREATE TABLE `sl_fail_msg` (
  `id` bigint NOT NULL,
  `msg_id` varchar(32) DEFAULT NULL COMMENT '消息id',
  `exchange` varchar(100) DEFAULT NULL COMMENT '交换机',
  `routing_key` varchar(50) DEFAULT NULL COMMENT '路由key',
  `msg` text COMMENT '消息内容',
  `reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '失败原因',
  `created` datetime DEFAULT NULL COMMENT '创建时间',
  `updated` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `created` (`created`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='失败消息记录表';
~~~

## 3、使用

### 3.1、导入依赖

~~~xml
<dependency>
    <groupId>com.sl-express.mq</groupId>
    <artifactId>sl-express-mq</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
~~~

### 3.2、启动类增加@EnableRetry

例如：

~~~java
package com.sl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.retry.annotation.EnableRetry;

@EnableRetry  //开启重试机制
@EnableFeignClients
@SpringBootApplication
public class DispatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(DispatchApplication.class, args);
    }

}

~~~

### 3.3、编写配置

在springboot的配置文件中bootstrap-*.yml修改配置：

~~~yaml
spring:
  rabbitmq: #mq的配置
    host: ${rabbitmq.host}
    port: ${rabbitmq.port}
    username: ${rabbitmq.username}
    password: ${rabbitmq.password}
    virtual-host: ${rabbitmq.virtual-host}
    publisher-confirm-type: correlated #发送消息的异步回调，记录消息是否发送成功
    publisher-returns: true #开启publish-return功能，消息到达交换机，但是没有到达对列表
    template:
      mandatory: true #消息路由失败时的策略, true: 调用ReturnCallback, false：丢弃消息
    listener:
      simple:
        acknowledge-mode: auto #，出现异常时返回nack，消息回滚到mq；没有异常，返回ack
        retry:
          enabled: true # 开启消费者失败重试
          initial-interval: 1000 # 初识的失败等待时长为1秒
          multiplier: 1 # 失败的等待时长倍数，下次等待时长 = multiplier * last-interval
          max-attempts: 3 # 最大重试次数
          stateless: true # true无状态；false有状态。如果业务中包含事务，这里改为false
~~~

### 3.4、使用

~~~java
	//注入Service
    @Resource
    private MQService mqService;

	....................

    //发送消息
    this.mqService.sendMsg(exchange, null, msg);
~~~

> **消息的消费，依然是SpringBoot的写法。例如：**
>
> ~~~java
> @Component
> public class OrderMQListener {
>     
> 	@RabbitListener(bindings = @QueueBinding(
>             value = @Queue(name = "${rabbitmq.order.queue}"),
>             exchange = @Exchange(name = "${rabbitmq.order.exchange}", type = ExchangeTypes.TOPIC),
>             key = "#"
>     ))
>     public void listenOrderMsg(String msg) {
>      
>         //此处编写业务逻辑
>     
>     }
> }
> ~~~