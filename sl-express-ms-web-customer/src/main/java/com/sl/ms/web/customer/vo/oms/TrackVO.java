package com.sl.ms.web.customer.vo.oms;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

/**
 * @author zzj
 * @version 1.0
 */
@Data
public class TrackVO {

    /**
     * 运单id
     */
    private String transportOrderId;

    /**
     * 轨迹坐标点列表
     */
    private List<MarkerPointVO> pointList;

    /**
     * 距离，单位：米
     */
    private Double distance;

    /**
     * 最新的位置坐标，x：经度，y：纬度
     */
    private MarkerPointVO lastPoint;

    /**
     * 状态
     */
    @ApiModelProperty(value = "轨迹状态，4 COMPLETE, 3 COURIER, 2 DRIVER, 1 NEW")
    private Integer status;

    /**
     * 创建时间
     */
    private Long created;

    /**
     * 更新时间
     */
    private Long updated;
}
