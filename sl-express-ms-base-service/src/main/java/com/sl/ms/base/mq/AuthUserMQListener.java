package com.sl.ms.base.mq;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.sl.ms.base.domain.enums.WorkStatusEnum;
import com.sl.ms.base.domain.enums.WorkUserTypeEnum;
import com.sl.ms.base.entity.base.WorkSchedulingEntity;
import com.sl.ms.base.service.base.WorkSchedulingService;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.util.BeanUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 对于权限管家系统消息的处理
 *
 * @author zzj
 * @version 1.0
 */
@Slf4j
@Component
public class AuthUserMQListener {

    @Value("${rabbitmq.exchange}")
    private String rabbitmqExchange;

    @Value("${role.courier}")
    private String courier;

    @Value("${role.driver}")
    private String driver;

    @Resource
    private WorkSchedulingService workSchedulingService;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = Constants.MQ.Queues.AUTH_USER),
            exchange = @Exchange(name = "${rabbitmq.exchange}", type = ExchangeTypes.TOPIC),
            key = "#"
    ))
    public void listenUserMsg(String msg) {
        log.info("接收到消息 -> {}", msg);
        JSONObject jsonObject = JSONUtil.parseObj(msg);
        String type = jsonObject.getStr("type");
        if (!StrUtil.equalsIgnoreCase(type, "USER")) {
            //非用户消息
            return;
        }
        String operation = jsonObject.getStr("operation");
        // roles mobile id
        JSONArray jsonArray = jsonObject.getJSONArray("content");

        jsonArray.forEach(v -> {
            // 转换结构
            WorkSchedulingEntity user = parse((JSONObject) v);
            // 处理变更
            handlerUserChangeMsg(user, operation);
        });


    }

    /**
     * 处理变更
     *
     * @param entity    排班模型
     * @param operation 操作类型
     */
    private void handlerUserChangeMsg(WorkSchedulingEntity entity, String operation) {
        switch (operation) {
            case "ADD": {
                entity.setId(IdWorker.getId());
                //设置默认值
                BeanUtil.setDefault(entity);
                workSchedulingService.save(entity);
                break;
            }
            case "UPDATE": {
                WorkSchedulingEntity byUserId = workSchedulingService.getByUserId(entity.getUserId());
                if (ObjectUtil.isEmpty(byUserId)) {
                    log.error("不存在的员工");
                    break;
                }
                entity.setId(byUserId.getId());
                workSchedulingService.updateById(entity);
                break;
            }
            case "DEL": {
                WorkSchedulingEntity byUserId = workSchedulingService.getByUserId(entity.getUserId());
                if (ObjectUtil.isEmpty(byUserId)) {
                    log.error("不存在的员工");
                    break;
                }
                workSchedulingService.delete(byUserId.getId(), 0L);
                break;
            }
            default:
                break;
        }
    }

    /**
     * 转换数据
     *
     * @param content 消息内容
     * @return 排班信息
     */
    private WorkSchedulingEntity parse(JSONObject content) {
        JSONArray roles = content.getJSONArray("roles");
        String name = content.getStr("name");
        String mobile = content.getStr("mobile");
        Long agentId = content.getLong("orgId");
        Long id = content.getLong("id");
        String account = content.getStr("account");

        //设置参数
        WorkSchedulingEntity entity = new WorkSchedulingEntity();
        entity.setUserId(id);
        entity.setAgencyId(agentId);
        entity.setName(name);
        entity.setPhone(mobile);
        entity.setEmployeeNumber(account);
        entity.setState(WorkStatusEnum.NOMAL.getStatus());

        //判断角色
        Byte userType;
        if (ObjectUtil.isNotEmpty(roles)) {
            if (roles.contains(courier)) {
                userType = WorkUserTypeEnum.COURIER.getCode();
            } else if (roles.contains(driver)) {
                userType = WorkUserTypeEnum.DRIVER.getCode();
            } else {
                userType = WorkUserTypeEnum.USER.getCode();
            }
            entity.setUserType(userType);
        }

        return entity;
    }

    /**
     * 声明交换机，确保交换机一定存在
     */
    @Bean
    public TopicExchange authUserExchange() {
        return new TopicExchange(this.rabbitmqExchange, true, false);
    }

}
