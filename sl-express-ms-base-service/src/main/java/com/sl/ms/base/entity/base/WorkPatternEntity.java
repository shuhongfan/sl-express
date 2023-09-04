package com.sl.ms.base.entity.base;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sl_work_pattern")
public class WorkPatternEntity extends BaseEntity {

    private String name;

    private Byte userType;

    private Byte workPatternType;

    private Byte monday;

    private Byte tuesday;

    private Byte wednesday;

    private Byte thursday;

    private Byte friday;

    private Byte saturday;

    private Byte sunday;

    private Integer workDayNum;

    private Integer restDayNum;

    private Byte status;

    private Integer workStartMinute1;

    private Integer workEndMinute1;

    private Long creater;

    private Long updater;

    private Boolean isDelete;

}