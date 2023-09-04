package com.sl.transport.common.util;

import cn.hutool.core.date.LocalDateTimeUtil;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Date;

public class DateUtils {

    public static final String DEFAULT_YEAR_FORMAT = "yyyy";
    public static final String DEFAULT_MONTH_FORMAT = "yyyy-MM";
    public static final String DEFAULT_MONTH_FORMAT_SLASH = "yyyy/MM";
    public static final String DEFAULT_MONTH_FORMAT_EN = "yyyy年MM月";
    public static final String DEFAULT_WEEK_FORMAT = "yyyy-ww";
    public static final String DEFAULT_WEEK_FORMAT_EN = "yyyy年ww周";
    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    public static final String DEFAULT_DATE_FORMAT_EN = "yyyy年MM月dd日";
    public static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";
    public static final String DEFAULT_TIME_WITHOUT_SECOND = "HH:mm";
    public static final String DEFAULT_TIME_WITHOUT_YEAR = "MM-dd HH:mm";
    public static final String DAY = "DAY";
    public static final String MONTH = "MONTH";
    public static final String WEEK = "WEEK";
    public static final long MAX_MONTH_DAY = 30L;
    public static final long MAX_3_MONTH_DAY = 90L;
    public static final long MAX_YEAR_DAY = 365L;

    public static final String TIME_ZONE_8 = "GMT+8";

    /**
     * 获取utc时间
     * @param localDateTime
     * @return
     */
    public static LocalDateTime getUTCTime(LocalDateTime localDateTime) {
        ZoneId australia = ZoneId.of("Asia/Shanghai");
        ZonedDateTime dateAndTimeInSydney = ZonedDateTime.of(localDateTime, australia);
        ZonedDateTime utcDate = dateAndTimeInSydney.withZoneSameInstant(ZoneOffset.UTC);
        return utcDate.toLocalDateTime();
    }

    /**
     * 获取utc时间
     * @param localDateTime
     * @return
     */
    public static LocalDateTime getAsiaTime(LocalDateTime localDateTime) {
        ZoneId australia = ZoneId.of("Asia/Shanghai");
        ZonedDateTime dateAndTimeInSydney = ZonedDateTime.of(localDateTime, ZoneOffset.UTC);
        ZonedDateTime utcDate = dateAndTimeInSydney.withZoneSameInstant(australia);
        return utcDate.toLocalDateTime();
    }

    /**
     * 根据月份计算月份的开始时间
     *
     * @param month 格式yyyy-MM
     * @return
     */
    public static LocalDateTime getMonthStartTime(String month) {
        LocalDateTime dateTime = LocalDateTimeUtil.parse(month, DEFAULT_MONTH_FORMAT);
        return dateTime;
    }

    /**
     * 根据月份计算月份的结束时间
     *
     * @param month 格式yyyy-MM
     * @return
     */
    public static LocalDateTime getMonthEndTime(String month) {
        if(StringUtils.isEmpty(month)){
            return null;
        }
        String[] dates = month.split("-");
        int year = Integer.parseInt(dates[0]);
        int nextMonth = Integer.parseInt(dates[1]) + 1;
        if (Integer.parseInt(dates[1]) == 12) {
            // 12月特殊处理
            year = Integer.parseInt(dates[0]) + 1;
            nextMonth = 1;
        }
        LocalDateTime of = LocalDateTime.of(year, nextMonth, 1, 0, 0);
        return of.minusSeconds(1);
    }

    /**
     * 获取指定时间当天的开始时间
     *
     * @param localDateTime 指定时间
     * @return 指定时间的当天开始时间
     */
    public static LocalDateTime getStartTime(LocalDateTime localDateTime){
        if(localDateTime == null){
            return null;
        }
        return LocalDateTime.of(localDateTime.getYear(), localDateTime.getMonth(), localDateTime.getDayOfMonth(), 0,0);
    }

    public static int getMonthNumber(LocalDateTime localDateTime) {
        int year = localDateTime.getYear();
        int month = localDateTime.getMonth().getValue();
        if(month == 12) {
            return LocalDateTime.of(year + 1, 1, 1,
                    0, 0, 0).plusHours(-1L).getDayOfMonth();
        }else {
            return LocalDateTime.of(year, month + 1, 1, 0, 0, 0).plusHours(-1L).getDayOfMonth();
        }
    }

    /**
     * 时间加上x分钟
     *
     * @param date
     * @param minutes
     * @return
     */
    public static Date plusMinutes(Date date, int minutes) {
        return Date.from(date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().plusMinutes(minutes).atZone(ZoneId.systemDefault()).toInstant());
    }

    /**
     * 时间加上x秒
     *
     * @param date
     * @param seconds
     * @return
     */
    public static Date plusSeconds(Date date, int seconds) {
        return Date.from(date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().plusSeconds(seconds).atZone(ZoneId.systemDefault()).toInstant());
    }

    /**
     * 时间减去x分钟
     *
     * @param date
     * @param minutes
     * @return
     */
    public static Date minusMinutes(Date date, int minutes) {
        return Date.from(date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().minusMinutes(minutes).atZone(ZoneId.systemDefault()).toInstant());
    }

    /**
     * 时间减去x秒
     *
     * @param date
     * @param seconds
     * @return
     */
    public static Date minusSeconds(Date date, int seconds) {
        return Date.from(date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().minusSeconds(seconds).atZone(ZoneId.systemDefault()).toInstant());
    }

    /**
     * 时间减去x天
     *
     * @param date
     * @param days
     * @return
     */
    public static Date minusDays(Date date, int days) {
        return Date.from(date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().minusDays(days).atZone(ZoneId.systemDefault()).toInstant());
    }

    /**
     * 时间增加x天
     *
     * @param date
     * @return
     */
    public static Date plusDays(Date date, int days) {
        return Date.from(date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().plusDays(days).atZone(ZoneId.systemDefault()).toInstant());
    }

    /**
     * 时间增加x天
     *
     * @param date
     * @return
     */
    public static LocalDateTime plusDays(LocalDateTime date, int days) {
        return date.plusDays(days);
    }
}
