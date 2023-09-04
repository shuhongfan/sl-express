package com.sl.ms.work.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskAssignedStatus;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskLoadingStatus;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskStatus;
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
@TableName("sl_transport_task")
public class TransportTaskEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 车辆计划id
     */
    private Long truckPlanId;
    /**
     * 车次id
     */
    private Long transportTripsId;

    /**
     * 起始机构id
     */
    private Long startAgencyId;

    /**
     * 目的机构id
     */
    private Long endAgencyId;

    /**
     * 任务状态，1为待执行（对应 待提货）、2为进行中（对应在途）、3为待确认（保留状态）、4为已完成（对应 已交付）、5为已取消
     */
    private TransportTaskStatus status;

    /**
     * 任务分配状态(1未分配2已分配3待人工分配)
     */
    private TransportTaskAssignedStatus assignedStatus;

    /**
     * 满载状态(1.半载2.满载3.空载)
     */
    private TransportTaskLoadingStatus loadingStatus;

    /**
     * 车辆id
     */
    private Long truckId;

    /**
     * 提货凭证
     */
    private String cargoPickUpPicture;

    /**
     * 货物照片
     */
    private String cargoPicture;

    /**
     * 运回单凭证
     */
    private String transportCertificate;

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

    /**
     * 交付货物照片
     */
    private String deliverPicture;
    /**
     * 提货纬度
     */
    private String deliveryLatitude;
    /**
     * 提货经度
     */
    private String deliveryLongitude;
    /**
     * 交付纬度
     */
    private String deliverLatitude;
    /**
     * 交付经度
     */
    private String deliverLongitude;

    /**
     * 备注
     */
    private String mark;

    /**
     * 距离，单位：米
     */
    private Double distance;

}
