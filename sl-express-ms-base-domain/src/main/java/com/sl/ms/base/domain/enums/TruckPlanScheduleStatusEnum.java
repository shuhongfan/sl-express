package com.sl.ms.base.domain.enums;

/***
 * @author wangxiaobing
 *
 * 车辆计划运行状态枚举
 */
public enum TruckPlanScheduleStatusEnum {
    /**
     * 已调度
     */
    SCHEDULED(2, "SCHEDULED"),

    /**
     * 已分配调度任务
     */
    ASSIGNED(1, "ASSIGNED"),

    /**
     * 待分配运输任务
     */
    UNASSIGNED(0, "UNASSIGNED");

    TruckPlanScheduleStatusEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    /**
     * 类型编码
     */
    private final Integer code;

    /**
     * 类型值
     */
    private final String value;


    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }
}
