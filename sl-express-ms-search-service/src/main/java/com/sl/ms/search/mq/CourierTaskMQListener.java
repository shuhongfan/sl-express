package com.sl.ms.search.mq;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import com.sl.ms.search.service.CourierTaskService;
import com.sl.transport.common.constant.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 快递员任务消息处理
 **/
@Slf4j
@Component
public class CourierTaskMQListener {

    @Resource
    private CourierTaskService courierTaskService;
    @Resource
    private ElasticsearchClient client;
    @Value("${sl.es.index_name}")
    private String indexName;

    /**
     * 新增/更新快递员任务
     *
     * @param msg 消息
     */
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = Constants.MQ.Queues.COURIER_TASK_SAVE_OR_UPDATE),
            exchange = @Exchange(name = Constants.MQ.Exchanges.COURIER_TASK, type = ExchangeTypes.TOPIC),
            key = Constants.MQ.RoutingKeys.COURIER_TASK_SAVE_OR_UPDATE
    ))
    public void listenCourierTaskCreateMsg(String msg) {
        log.info("接收到新增/更新快递员任务的消息 ({})-> {}", Constants.MQ.Queues.COURIER_TASK_SAVE_OR_UPDATE, msg);
        // TODO 具体业务逻辑的处理
    }

    /**
     * 创建运单后同步数据到es
     *
     * @param msg 消息
     */
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = Constants.MQ.Queues.SEARCH_TRANSPORT_ORDER_CREATED),
            exchange = @Exchange(name = Constants.MQ.Exchanges.TRANSPORT_ORDER_DELAYED, type = ExchangeTypes.TOPIC, delayed = Constants.MQ.DELAYED),
            key = Constants.MQ.RoutingKeys.TRANSPORT_ORDER_CREATE
    ))
    public void listenTransportOrderCreatedMsg(String msg) {
        log.info("接收到新增运单的消息 ({})-> {}", Constants.MQ.Queues.TRACK_TRANSPORT_ORDER_CREATED, msg);
        // TODO 具体业务逻辑的处理
    }
}
