package com.sl.ms.courier.domain.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class CourierScopeDto {
    /**
     * id
     */
    private Long id;
    /**
     * 快递员id
     */
    private Long userId;

    /**
     * 行政区域id
     */
    private Long areaId;
    /**
     * 多边形经纬度坐标集合
     */
    private List<List<Map>> mutiPoints;

}
