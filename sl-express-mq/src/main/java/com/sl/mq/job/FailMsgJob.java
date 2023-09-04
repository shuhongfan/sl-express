package com.sl.mq.job;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.sl.mq.entity.FailMsgEntity;
import com.sl.mq.service.FailMsgService;
import com.sl.mq.service.MQService;
import com.xxl.job.core.handler.annotation.XxlJob;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * 失败消息的处理任务
 *
 * @author zzj
 * @version 1.0
 */
@Slf4j
@Component
@ConditionalOnBean({MQService.class, FailMsgService.class})
public class FailMsgJob {

    @Resource
    private FailMsgService failMsgService;
    @Resource
    private MQService mqService;

    @XxlJob("failMsgJob")
    public void execute() {
        //查询失败的数据，每次最多处理100条错误消息
        LambdaQueryWrapper<FailMsgEntity> queryWrapper = new LambdaQueryWrapper<FailMsgEntity>()
                .orderByAsc(FailMsgEntity::getCreated)
                .last("limit 100");
        List<FailMsgEntity> failMsgEntityList = this.failMsgService.list(queryWrapper);
        if (CollUtil.isEmpty(failMsgEntityList)) {
            return;
        }

        for (FailMsgEntity failMsgEntity : failMsgEntityList) {
            try {
                //发送消息
                this.mqService.sendMsg(failMsgEntity.getExchange(), failMsgEntity.getRoutingKey(), failMsgEntity.getMsg());
                //删除数据
                this.failMsgService.removeById(failMsgEntity.getId());
            } catch (Exception e) {
                log.error("处理错误消息失败, failMsgEntity = {}", failMsgEntity);
            }
        }
    }
}
