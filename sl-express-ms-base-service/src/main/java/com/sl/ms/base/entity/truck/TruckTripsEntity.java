package com.sl.ms.base.entity.truck;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 车次信息表
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sl_truck_trips")
public class TruckTripsEntity extends BaseEntity {

    private static final long serialVersionUID = -934311173866081843L;

    /**
     * 车次名称
     */
    private String name;

    /**
     * 发车时间 分钟
     */
    private Integer departureTime;

    /**
     * 持续时间 分钟
     */
    private Integer estimatedTime;

    /**
     * 所属线路id
     */
    private Long transportLineId;

    /**
     * 周期，1为天，2为周，3为月
     */
    private Integer period;

    /**
     * 状态  0：禁用   1：正常
     */
    private Integer status;
}
