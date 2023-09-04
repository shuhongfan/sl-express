package com.sl.transport.common.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

/**
 * 生成快递员取派件任务消息体
 *
 * @author zzj
 * @version 1.0
 */
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class CourierTaskMsg extends BaseMsg{

    /**
     * 快递员id
     */
    private Long courierId;

    /**
     * 网点id
     */
    private Long agencyId;

    /**
     * 任务类型，1为取件任务，2为派件任务
     */
    private Integer taskType;

    /**
     * 订单id
     */
    private Long orderId;

    /**
     * 订单备注
     */
    private String mark;

    /**
     * 上门时间，用户选择13~14点上门，该值记录的是14点
     */
    private LocalDateTime estimatedEndTime;

}
