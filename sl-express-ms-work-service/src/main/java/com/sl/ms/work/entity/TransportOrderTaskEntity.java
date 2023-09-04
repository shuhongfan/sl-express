package com.sl.ms.work.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 运单与运输任务关联表
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("sl_transport_order_task")
public class TransportOrderTaskEntity extends BaseEntity {

    /**
     * 运单Id
     */
    private String transportOrderId;

    /**
     * 运输任务Id
     */
    private Long transportTaskId;
}
