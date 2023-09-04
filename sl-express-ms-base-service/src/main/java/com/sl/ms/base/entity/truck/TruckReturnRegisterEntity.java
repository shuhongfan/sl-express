package com.sl.ms.base.entity.truck;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.ms.base.domain.enums.TruckAccidentTypeEnum;
import com.sl.ms.base.domain.enums.TruckBreakRulesTypeEnum;
import com.sl.ms.base.domain.enums.TruckFaultTypeEnum;
import com.sl.transport.common.entity.BaseEntity;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 回车登记表
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sl_truck_return_register")
public class TruckReturnRegisterEntity extends BaseEntity {
    private static final long serialVersionUID = 9041809464760457223L;

    /**
     * 主键
     */
    private Long id;

    /**
     * 车辆id
     */
    private Long truckId;

    /**
     * 运输任务id
     */
    private Long transportTaskId;

    /**
     * 出库时间
     */
    private LocalDateTime outStorageTime;

    /**
     * 入库时间
     */
    private LocalDateTime intoStorageTime;

    /**
     * 车辆是否违章，1-是，0-否
     */
    private boolean isBreakRules;

    /**
     * 违章类型，1-闯红灯，2-无证驾驶，3-超载，4-酒后驾驶，5-超速行驶
     */
    private TruckBreakRulesTypeEnum breakRulesType;

    /**
     * 违章说明，类型为“其他”时填写
     */
    private String breakRulesDescription;

    /**
     * 罚款金额
     */
    private BigDecimal penaltyAmount;

    /**
     * 扣分
     */
    private Integer deductPoints;

    /**
     * 车辆是否故障，1-是，0-否
     */
    private boolean isFault;

    /**
     * 车辆是否可用，1-是，0-否
     */
    private Boolean isAvailable = true;

    /**
     * 故障类型，1-发动机启动困难，2-不着车，3-漏油，4-漏水，5-照明失灵，6-有异响，7-排烟异常，8-温度异常，9-其他
     */
    private TruckFaultTypeEnum faultType;

    /**
     * 故障说明，类型为“其他”时填写
     */
    private String faultDescription;

    /**
     * 故障图片
     */
    private String faultImages;

    /**
     * 车辆是否发生事故，1-是，0-否
     */
    private boolean isAccident;

    /**
     * 事故类型，1-直行事故，2-追尾事故，3-超车事故，4-左转弯事故，5-右转弯事故，6-弯道事故，7-坡道事故，8-会车事故，9-其他
     */
    private TruckAccidentTypeEnum accidentType;

    /**
     * 事故说明，类型为“其他”时填写
     */
    private String accidentDescription;

    /**
     * 事故图片
     */
    private String accidentImages;
}
