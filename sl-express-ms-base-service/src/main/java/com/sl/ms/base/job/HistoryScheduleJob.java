package com.sl.ms.base.job;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.toolkit.SimpleQuery;
import com.sl.ms.base.entity.base.WorkHistorySchedulingEntity;
import com.sl.ms.base.entity.base.WorkPatternEntity;
import com.sl.ms.base.entity.base.WorkSchedulingEntity;
import com.sl.ms.base.mapper.base.WorkSchedulingMapper;
import com.sl.ms.base.service.base.WorkHistorySchedulingService;
import com.sl.ms.base.utils.WorkSchedulingUtils;
import com.sl.transport.common.util.DateUtils;
import com.xxl.job.core.handler.annotation.XxlJob;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 历史排班保存
 * 每晚凌晨2点执行保存前一天排班数据
 * @author wxb
 * @version 1.0
 */
@Slf4j
@Component
public class HistoryScheduleJob {

    @Resource
    private WorkHistorySchedulingService workHistorySchedulingService;

    @Resource
    private WorkSchedulingMapper workSchedulingMapper;

    @XxlJob("historyScheduleJob")
    public void execute() {
        log.info("historyScheduleJob 执行生成排班历史数据任务！！！");
        // 查询当前排班
        List<WorkSchedulingEntity> workSchedulingEntities = workSchedulingMapper.selectList(Wrappers.<WorkSchedulingEntity>lambdaQuery().eq(WorkSchedulingEntity::getIsDelete, 0));

        // 查询工作模式
        List<Long> workPatternIds = workSchedulingEntities.parallelStream().map(WorkSchedulingEntity::getWorkPatternId).distinct().collect(Collectors.toList());
        Map<Long, WorkPatternEntity> workPatternEntityMap = SimpleQuery.keyMap(
                Wrappers.<WorkPatternEntity>lambdaQuery().in(WorkPatternEntity::getId, workPatternIds),
                WorkPatternEntity::getId);

        // 补充日期数据
        List<WorkHistorySchedulingEntity> workHistorySchedulingEntities = workSchedulingEntities.parallelStream().map(workSchedulingEntity -> {
            WorkHistorySchedulingEntity workHistorySchedulingEntity = BeanUtil.toBean(workSchedulingEntity, WorkHistorySchedulingEntity.class);
            // 重置ID
            workHistorySchedulingEntity.setId(null);
            WorkPatternEntity workPatternEntity = workPatternEntityMap.get(workSchedulingEntity.getWorkPatternId());
            if (ObjectUtil.isEmpty(workPatternEntity)) {
                return null;
            }

            workHistorySchedulingEntity.setWorkPatternType(workPatternEntity.getWorkPatternType());
            // 月 前一天对应的月
            String workMonth = LocalDateTimeUtil.format(LocalDateTimeUtil.now().minusDays(1), DateUtils.DEFAULT_MONTH_FORMAT);
            workHistorySchedulingEntity.setWorkMonth(workMonth);
            // 日 前一天对应的日
            int dayOfMonth = LocalDateTimeUtil.now().minusDays(1).getDayOfMonth();
            workHistorySchedulingEntity.setWorkDay(dayOfMonth);

            // 只保存上班数据
            boolean worded = WorkSchedulingUtils.isWorded(workSchedulingEntity, workMonth, dayOfMonth, workPatternEntity, null, true);
            if (worded) {
                return workHistorySchedulingEntity;
            }
            return null;
        }).filter(ObjectUtil::isNotEmpty).collect(Collectors.toList());

        // 落库
        workHistorySchedulingService.saveBatch(workHistorySchedulingEntities);
    }
}
