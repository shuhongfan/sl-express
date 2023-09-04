package com.sl.ms.base.domain.user;

import lombok.Data;

/**
 * TruckDriverDto
 */
@Data
public class TruckDriverDto {

    private Long id;

    /**
     * 车辆id
     */
    private Long truckId;

    /**
     * 用户Id
     */
    private Long userId;

    /**
     * 年龄
     */
    private Integer age;
    /**
     * 照片
     */
    private String picture;
    /**
     * 驾龄
     */
    private Integer drivingAge;
}