package com.sl.xxljob.job;

import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.RandomUtil;
import com.xxl.job.core.context.XxlJobHelper;
import com.xxl.job.core.handler.annotation.XxlJob;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

/**
 * 任务处理器
 */
@Component
public class JobHandler {

    private List<Integer> dataList = Arrays.asList(1, 2, 3, 4, 5);

    /**
     * 普通任务
     */
    @XxlJob("firstJob")
    public void firstJob() throws Exception {
        System.out.println("firstJob执行了.... " + LocalDateTime.now());
        for (Integer data : dataList) {
            XxlJobHelper.log("data= {}", data);
            Thread.sleep(RandomUtil.randomInt(100, 500));
        }
        System.out.println("firstJob执行结束了.... " + LocalDateTime.now());
    }

    /**
     * 分片式任务
     */
    @XxlJob("shardingJob")
    public void shardingJob() throws Exception {
        // 分片参数
        // 分片节点总数
        int shardTotal = XxlJobHelper.getShardTotal();
        // 当前节点下标，从0开始
        int shardIndex = XxlJobHelper.getShardIndex();

        System.out.println("shardingJob执行了.... " + LocalDateTime.now());
        for (Integer data : dataList) {
            if (data % shardTotal == shardIndex) {
                XxlJobHelper.log("data= {}", data);
                Thread.sleep(RandomUtil.randomInt(100, 500));
            }
        }
        System.out.println("shardingJob执行结束了.... " + LocalDateTime.now());
    }
}
