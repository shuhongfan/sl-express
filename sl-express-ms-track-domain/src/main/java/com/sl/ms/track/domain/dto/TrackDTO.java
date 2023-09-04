package com.sl.ms.track.domain.dto;

import cn.hutool.core.util.CoordinateUtil;
import com.sl.ms.track.domain.enums.TrackStatusEnum;
import com.sl.ms.track.domain.enums.TrackTypeEnum;
import lombok.Data;

import java.util.List;

/**
 * @author zzj
 * @version 1.0
 */
@Data
public class TrackDTO {

    /**
     * 运单id
     */
    private String transportOrderId;

    /**
     * 轨迹坐标点列表
     */
    private List<MarkerPointDTO> pointList;

    /**
     * 距离，单位：米
     */
    private Double distance;

    /**
     * 最新的位置坐标，x：经度，y：纬度
     */
    private MarkerPointDTO lastPoint;

    /**
     * 状态
     */
    private TrackStatusEnum status;

    /**
     * 类型
     */
    private TrackTypeEnum type;

    /**
     * 创建时间
     */
    private Long created;

    /**
     * 更新时间
     */
    private Long updated;
}
