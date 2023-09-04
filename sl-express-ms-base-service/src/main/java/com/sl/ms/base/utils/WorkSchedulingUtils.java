package com.sl.ms.base.utils;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import com.sl.ms.base.domain.enums.WorkPatternEnum;
import com.sl.ms.base.entity.base.WorkPatternEntity;
import com.sl.ms.base.entity.base.WorkSchedulingEntity;
import com.sl.transport.common.util.DateUtils;
import com.sl.transport.common.util.ObjectUtil;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Map;

@Slf4j
public class WorkSchedulingUtils {

    /**
     * 查询列表信息时是否需要查询历史列表
     * 当前月份1号查询的时候不需要查询历史数据
     * @param queryMonth 月份
     * @return 是否需要
     */
    public static boolean isQueryHistory(String queryMonth){
        LocalDateTime now = LocalDateTimeUtil.now(); //当前时间
        String currentMonth = LocalDateTimeUtil.format( now, DateUtils.DEFAULT_MONTH_FORMAT);
        int result = queryMonth.compareTo(currentMonth);
        if(result > 0) { //查询未来月份不用查询历史记录
            return false;
        }else if (result == 0) { //当前月份
            int dayOfMonth = now.getDayOfMonth();
            return dayOfMonth > 1;
        }else { //查询以前月份，直接查询历史
            return true;
        }
    }

    /**
     * 是否上班
     * @param workSchedulingEntity 排班数据
     * @param month 月
     * @param dayOfMonth 日
     * @param patternEntity 工作模式
     * @param workHistory 历史数据
     * @param forceUserWorkPattern 是否强制使用工作模式推断
     * @return 是否上班
     */
    public static boolean isWorded(WorkSchedulingEntity workSchedulingEntity, String month, int dayOfMonth,
                                   WorkPatternEntity patternEntity, Map<String,String> workHistory, Boolean forceUserWorkPattern){
        String nowDay = LocalDateTimeUtil.format(LocalDateTime.now(), DateUtils.DEFAULT_DATE_FORMAT);
        String queryDay = String.format("%s-%s", month, dayOfMonth >= 10 ? "" + dayOfMonth : "0" + dayOfMonth);
        if(nowDay.compareTo(queryDay) > 0 && !forceUserWorkPattern) { //查询历史数据
            return CollUtil.isEmpty(workHistory) ? false : workHistory.containsKey(workSchedulingEntity.getUserId() + "" + dayOfMonth);
        }else { //根据排班推断
            if (ObjectUtil.isEmpty(patternEntity)) {
                // 默认不上班
                return false;
            }
            Byte workPatternType = patternEntity.getWorkPatternType();
            if(workPatternType.byteValue() == WorkPatternEnum.Weeks.getType()) { //礼拜制
                int dayOfWeek = LocalDateTimeUtil.parse(queryDay,DateUtils.DEFAULT_DATE_FORMAT).getDayOfWeek().getValue();
                return isWorked(dayOfWeek, patternEntity);
            }else { //连续制
                long workContinueStartTime = DateUtils.getStartTime(workSchedulingEntity.getWorkContinueStartTime())
                        .toEpochSecond(ZoneOffset.of("+8"));
                long queryDayStartTime = DateUtils.getStartTime(LocalDateTimeUtil.parse(queryDay, DateUtils.DEFAULT_DATE_FORMAT))
                        .toEpochSecond(ZoneOffset.of("+8"));
                int day = (int)(queryDayStartTime - workContinueStartTime) / (24 * 3600) ; //已经连续工作和休息的天数
                int dayNum = patternEntity.getRestDayNum() + patternEntity.getWorkDayNum() == 0 ? 0: day % ( patternEntity.getRestDayNum() + patternEntity.getWorkDayNum()); //连续工作休息n个周期后的第几天
                return dayNum < patternEntity.getWorkDayNum(); //dayNum小于等于连续工作天数则今天在上班，否则在休息

            }
        }
    }

    private static boolean isWorked(int dayOfWeek, WorkPatternEntity entity) {
        switch (dayOfWeek) {
            case 1 : //周一是否上班
                return entity.getMonday() == 1;
            case 2: //周二是否上班
                return entity.getTuesday() == 1;
            case 3: //周三是否上班
                return entity.getWednesday() == 1;
            case 4: //周四是否上班
                return entity.getThursday() == 1;
            case 5: //周五是否上班
                return entity.getFriday() == 1;
            case 6: //周六是否上班
                return entity.getSaturday() == 1;
            case 7: //周日是否上班
                return entity.getSunday() == 1;
            default:
                return false;
        }
    }
}
