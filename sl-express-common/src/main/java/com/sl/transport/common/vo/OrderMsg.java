package com.sl.transport.common.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

/**
 * 订单消息
 */
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class OrderMsg extends BaseMsg{

    private static final long serialVersionUID = 1L;

    private Long orderId; //订单ID

    /**
     * 任务类型，1为取件，2为派件
     */
    private Integer taskType;

    /**
     * 当前所在网点
     */
    private Long agencyId;

    /**
     * 备注
     */
    private String mark;

    /**
     * 上门时间，用户选择13~14点上门，该值记录的是14点
     */
    private LocalDateTime estimatedEndTime;

    private Double longitude;

    private Double latitude;

}
