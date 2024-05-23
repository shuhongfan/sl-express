package com.sl.ms.dispatch.mq;

import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.sl.ms.dispatch.dto.DispatchMsgDTO;
import com.sl.transport.common.constant.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 对于待调度运单消息的处理
 */
@Slf4j
@Component
public class TransportOrderDispatchMQListener {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    /**
     * 处理消息，合并运单到Redis队列
     *
     * @param msg
     */
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = Constants.MQ.Queues.DISPATCH_MERGE_TRANSPORT_ORDER),
            exchange = @Exchange(name = Constants.MQ.Exchanges.TRANSPORT_ORDER_DELAYED, type = ExchangeTypes.TOPIC, delayed = Constants.MQ.DELAYED),
            key = Constants.MQ.RoutingKeys.JOIN_DISPATCH
    ))
    public void listenDispatchMsg(String msg) {
        // {"transportOrderId":"SL1000000000560","currentAgencyId":100280,"nextAgencyId":90001,"totalWeight":3.5,"totalVolume":2.1,"created":1652337676330}
        log.info("接收到新运单的消息 >>> msg = {}", msg);

        DispatchMsgDTO dispatchMsgDTO = JSONUtil.toBean(msg, DispatchMsgDTO.class);
        if (ObjectUtil.isEmpty(dispatchMsgDTO)) {
            return;
        }

        Long startId = dispatchMsgDTO.getCurrentAgencyId();
        Long endId = dispatchMsgDTO.getNextAgencyId();
        String transportOrderId = dispatchMsgDTO.getTransportOrderId();

//        消息幂等性处理，将相同起始节点的运单存放到set结构的redis中，在相应的运单处理完成之后将其删除掉
        String setRedisKey = getSetRedisKey(startId, endId);
        if (Boolean.TRUE.equals(stringRedisTemplate.opsForSet().isMember(setRedisKey, transportOrderId))) {
//            重复消息
            return;
        }

//        存储数据到Redis，采用list结构，从左边写入数据，读取数据时从右边读取
        //key =>  DISPATCH_LIST_CurrentAgencyId_NextAgencyId
        //value =>  {"transportOrderId":111222, "totalVolume":0.8, "totalWeight":2.1, "created":111222223333}
        String listRedisKey = getListRedisKey(startId, endId);
        String value = JSONUtil.toJsonStr(MapUtil.builder()
                .put("transportOrderId", transportOrderId)
                .put("totalVolume", dispatchMsgDTO.getTotalVolume())
                .put("totalWeight", dispatchMsgDTO.getTotalWeight())
                .put("created", dispatchMsgDTO.getCreated()).build());

//        存储到redis
        stringRedisTemplate.opsForList().leftPush(listRedisKey, value);
        stringRedisTemplate.opsForSet().add(setRedisKey, transportOrderId);
    }

    public String getListRedisKey(Long startId, Long endId) {
        return StrUtil.format("DISPATCH_LIST_{}_{}", startId, endId);
    }

    public String getSetRedisKey(Long startId, Long endId) {
        return StrUtil.format("DISPATCH_SET_{}_{}", startId, endId);
    }

}
