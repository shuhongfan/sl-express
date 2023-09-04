package com.sl.ms.driver.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import com.sl.transport.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

/**
 * 运输任务表
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("sl_driver_job")
public class DriverJobEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 起始机构id
     */
    private Long startAgencyId;

    /**
     * 目的机构id
     */
    private Long endAgencyId;

    /**
     * 作业状态，1为待执行（对应 待提货）、2为进行中（对应在途）、3为改派（对应 已交付）、4为已完成（对应 已交付）、5为已作废
     */
    private DriverJobStatus status;

    /**
     * 司机id
     */
    private Long driverId;

    /**
     * 运输任务id
     */
    private Long transportTaskId;

    /**
     * 提货对接人
     */
    private String startHandover;

    /**
     * 交付对接人
     */
    private String finishHandover;

    /**
     * 计划发车时间
     */
    private LocalDateTime planDepartureTime;

    /**
     * 实际发车时间
     */
    private LocalDateTime actualDepartureTime;

    /**
     * 计划到达时间
     */
    private LocalDateTime planArrivalTime;

    /**
     * 实际到达时间
     */
    private LocalDateTime actualArrivalTime;

}
