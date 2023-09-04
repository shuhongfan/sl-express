package com.sl.ms.dispatch.job;

import com.xxl.job.core.context.XxlJobHelper;
import com.xxl.job.core.handler.annotation.XxlJob;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * 调度运输任务
 */
@Component
@Slf4j
public class DispatchJob {

    /**
     * 分片广播方式处理运单，生成运输任务
     */
    @XxlJob("transportTask")
    public void transportTask() {
        // 分片参数
        int shardIndex = XxlJobHelper.getShardIndex();
        int shardTotal = XxlJobHelper.getShardTotal();

        //TODO 待实现
    }
}
