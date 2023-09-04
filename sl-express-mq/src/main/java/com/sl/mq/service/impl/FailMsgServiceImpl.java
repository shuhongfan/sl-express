package com.sl.mq.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.mq.entity.FailMsgEntity;
import com.sl.mq.mapper.FailMsgMapper;
import com.sl.mq.service.FailMsgService;
import com.sl.mq.service.MQService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.stereotype.Service;

/**
 * 失败消息处理服务
 *
 * @author zzj
 * @version 1.0
 */
@Service
@ConditionalOnBean(MQService.class)
public class FailMsgServiceImpl extends ServiceImpl<FailMsgMapper, FailMsgEntity>
        implements FailMsgService {
}
