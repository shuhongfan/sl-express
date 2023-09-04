package com.sl.ms.work.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderSchedulingStatus;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 运单表
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("sl_transport_order")
public class TransportOrderEntity implements Serializable {

    @TableId
    private String id; //主键id

    /**
     * 订单ID
     */
    private Long orderId;

    /**
     * 运单状态(1.新建 2.已装车，发往x转运中心 3.到达 4.到达终端网点)
     * {@link TransportOrderStatus}
     */
    private TransportOrderStatus status;

    /**
     * 调度状态调度状态(1.待调度2.未匹配线路3.已调度)
     * <p>
     * {@link TransportOrderSchedulingStatus}
     */
    private TransportOrderSchedulingStatus schedulingStatus;

    /**
     * 起始网点id
     */
    private Long startAgencyId;

    /**
     * 终点网点id
     */
    private Long endAgencyId;

    /**
     * 当前所在机构id
     */
    private Long currentAgencyId;

    /**
     * 下一个机构id
     */
    private Long nextAgencyId;

    /**
     * 完整的运输路线
     */
    private String transportLine;

    /**
     * 货品总体积，单位：立方米
     */
    private BigDecimal totalVolume;

    /**
     * 货品总重量，单位：kg
     */
    private BigDecimal totalWeight;

    /**
     * 是否为拒收运单
     */
    private Boolean isRejection;

    @TableField(fill = FieldFill.INSERT) //MP自动填充
    private LocalDateTime created;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updated;

}
