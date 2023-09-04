package com.sl.ms.scope.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 服务范围实体
 */
@Data
@Document("sl_service_scope")
public class ServiceScopeEntity {

    @Id
    @JsonIgnore
    private ObjectId id;

    /**
     * 业务id，可以是机构或快递员
     */
    @Indexed
    private Long bid;

    /**
     * 类型 {@link com.sl.ms.scope.enums.ServiceTypeEnum}
     */
    @Indexed
    private Integer type;

    /**
     * 多边形范围，是闭合的范围,开始经纬度与结束经纬度必须一样
     * x: 经度，y：纬度
     */
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPolygon polygon;

    private Long created; //创建时间
    private Long updated; //更新时间
}
