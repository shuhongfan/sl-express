package com.sl.ms.base.mq;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.sl.ms.base.service.truck.TruckPlanService;
import com.sl.transport.common.constant.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 更新车辆计划调度状态
 *
 * @author wxb
 * @version 1.0
 */
@Slf4j
@Service
public class TruckPlanScheduledMQListener{

    @Resource
    TruckPlanService truckPlanService;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = Constants.MQ.Queues.BASE_TRUCK_PLAN_COMPLETE),
            exchange = @Exchange(name = Constants.MQ.Exchanges.TRUCK_PLAN, type = ExchangeTypes.TOPIC),
            key = Constants.MQ.RoutingKeys.TRUCK_PLAN_COMPLETE
    ))
    public void listenTruckPlanScheduledMsg(String msg) {
        log.info("listenTruckPlanScheduledMsg msg {}", msg);
        // {"ids":[1,2,3], "created":123456}
        JSONObject jsonObject = JSONUtil.parseObj(msg);
        if (ObjectUtil.isEmpty(jsonObject)) {
            return;
        }
        JSONArray ids = jsonObject.getJSONArray("ids");
        Set<Long> collect = ids.stream().map(Convert::toLong).collect(Collectors.toSet());
        truckPlanService.scheduledPlan(collect);
    }
}
