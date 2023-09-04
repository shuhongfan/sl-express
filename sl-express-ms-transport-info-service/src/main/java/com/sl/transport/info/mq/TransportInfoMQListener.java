package com.sl.transport.info.mq;

import com.sl.transport.common.constant.Constants;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * 物流信息消息
 */
@Component
public class TransportInfoMQListener {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = Constants.MQ.Queues.TRANSPORT_INFO_APPEND),
            exchange = @Exchange(name = Constants.MQ.Exchanges.TRANSPORT_INFO, type = ExchangeTypes.TOPIC),
            key = Constants.MQ.RoutingKeys.TRANSPORT_INFO_APPEND
    ))
    @Transactional
    public void listenTransportInfoMsg(String msg) {
        //{"info":"您的快件已到达【$organId】", "status":"运输中", "organId":90001, "transportOrderId":"SL920733749248" , "created":1653133234913}

    }
}
