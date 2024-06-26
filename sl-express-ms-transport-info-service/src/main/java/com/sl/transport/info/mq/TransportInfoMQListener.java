package com.sl.transport.info.mq;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.sl.ms.transport.api.OrganFeign;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.vo.TransportInfoMsg;
import com.sl.transport.domain.OrganDTO;
import com.sl.transport.info.entity.TransportInfoDetail;
import com.sl.transport.info.service.TransportInfoService;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * 物流信息消息
 */
@Component
public class TransportInfoMQListener {

    @Autowired
    private OrganFeign organFeign;

    @Autowired
    private TransportInfoService transportInfoService;


    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = Constants.MQ.Queues.TRANSPORT_INFO_APPEND),
            exchange = @Exchange(name = Constants.MQ.Exchanges.TRANSPORT_INFO, type = ExchangeTypes.TOPIC),
            key = Constants.MQ.RoutingKeys.TRANSPORT_INFO_APPEND
    ))
    @Transactional
    public void listenTransportInfoMsg(String msg) {
        //{"info":"您的快件已到达【$organId】", "status":"运输中", "organId":90001, "transportOrderId":"SL920733749248" , "created":1653133234913}
        TransportInfoMsg transportInfoMsg = JSONUtil.toBean(msg, TransportInfoMsg.class);
        Long organId = transportInfoMsg.getOrganId();
        String transportOrderId = Convert.toStr(transportInfoMsg.getTransportOrderId());
        String info = transportInfoMsg.getInfo();

//        查询机构信息
        if (StrUtil.contains(info, "$organId")) {
            OrganDTO organDTO = organFeign.queryById(organId);
            if (organDTO == null) {
                return;
            }
            info = StrUtil.replace(info, "$organId", organDTO.getName());
        }

//        封装Detail对象
        TransportInfoDetail infoDetail = TransportInfoDetail.builder()
                .info(info)
                .status(transportInfoMsg.getStatus())
                .created(transportInfoMsg.getCreated())
                .build();

//        存储到MongoDB
        transportInfoService.saveOrUpdate(transportOrderId, infoDetail);

    }
}
