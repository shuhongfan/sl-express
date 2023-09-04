package com.sl.ms.base.entity.user;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 司机表
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("sl_truck_driver")
public class TruckDriverEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 车辆id
     */
    private Long truckId;

    /**
     * 用户id，来自用户表
     */
    private Long userId;

    /**
     * 年龄
     */
    private Integer age;

    /**
     * 图片
     */
    private String picture;

    /**
     * 驾龄
     */
    private Integer drivingAge;

}
