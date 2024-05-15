package com.sl.transport.mq;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.entity.node.AgencyEntity;
import com.sl.transport.entity.node.BaseEntity;
import com.sl.transport.entity.node.OLTEntity;
import com.sl.transport.entity.node.TLTEntity;
import com.sl.transport.enums.OrganTypeEnum;
import com.sl.transport.service.IService;
import com.sl.transport.utils.OrganServiceFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * 对于权限管家消息的处理
 */
@Slf4j
@Component
public class AuthMQListener {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = Constants.MQ.Queues.AUTH_TRANSPORT),
            exchange = @Exchange(name = "${rabbitmq.exchange}", type = ExchangeTypes.TOPIC),
            key = "#"
    ))
    public void listenAgencyMsg(String msg) {
        log.info("接收到消息->{}", msg);
        JSONObject jsonObject = JSONUtil.parseObj(msg);

//        获取type的值，如果不为ORG，直接return
        String type = jsonObject.getStr("type");
        if (!StrUtil.equalsIgnoreCase(type, "ORG")) {
//            非机构消息
            return;
        }

//        获取json中其他值 operation操作类型 content是数组0号下表
        String operation = jsonObject.getStr("operation");
        JSONObject content = (JSONObject) jsonObject.getJSONArray("content").getObj(0);

//        取到content中的元素后,获取name机构名称 parentId父机构ID
        String name = content.getStr("name");
        Long parentId = content.getLong("parentId");

        IService iService;
        BaseEntity baseEntity;
        if (StrUtil.endWith(name, "转运中心")) {
//            一级转运中心
            iService = OrganServiceFactory.getBean(OrganTypeEnum.OLT.getCode());
            baseEntity = new OLTEntity();
            baseEntity.setParentId(0L);
        } else if (StrUtil.endWith(name, "分拣中心")) {
//            二级转运中心
            iService = OrganServiceFactory.getBean(OrganTypeEnum.TLT.getCode());
            baseEntity = new TLTEntity();
            baseEntity.setParentId(parentId);
        } else if (StrUtil.endWith(name, "营业部")) {
//            网点
            iService = OrganServiceFactory.getBean(OrganTypeEnum.AGENCY.getCode());
            baseEntity = new AgencyEntity();
            baseEntity.setParentId(parentId);
        } else {
            return;
        }

        baseEntity.setBid(content.getLong("id"));
        baseEntity.setName(name);
        baseEntity.setStatus(content.getBool("status"));


        switch (operation) {
            case "ADD": {
                iService.create(baseEntity);
                break;
            }
            case "UPDATE":{
                iService.update(baseEntity);
                break;
            }
            case "DEL":{
                iService.deleteByBid(baseEntity.getBid());
                break;
            }
        }
    }


}
