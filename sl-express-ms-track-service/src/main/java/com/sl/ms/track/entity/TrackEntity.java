package com.sl.ms.track.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sl.ms.track.domain.enums.TrackStatusEnum;
import com.sl.ms.track.domain.enums.TrackTypeEnum;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonLineString;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 轨迹数据
 *
 * @author zzj
 * @version 1.0
 */
@Data
@Document("sl_track")
public class TrackEntity {

    @Id
    @JsonIgnore
    private ObjectId id;

    /**
     * 运单id
     */
    @Indexed
    private String transportOrderId;

    /**
     * 规划的轨迹坐标点线（通过地图服务商规划出来的轨迹点）
     */
    private GeoJsonLineString planGeoJsonLine;

    /**
     * 距离，单位：米
     */
    private Double distance;

    /**
     * 最新的位置坐标，x：经度，y：纬度
     */
    private GeoJsonPoint lastPoint;

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
