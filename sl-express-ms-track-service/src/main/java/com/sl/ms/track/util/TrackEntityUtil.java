package com.sl.ms.track.util;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import com.sl.ms.track.domain.dto.MarkerPointDTO;
import com.sl.ms.track.domain.dto.TrackDTO;
import com.sl.ms.track.entity.TrackEntity;
import com.sl.transport.common.util.ObjectUtil;
import org.springframework.data.mongodb.core.geo.GeoJsonLineString;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author zzj
 * @version 1.0
 */
public class TrackEntityUtil {

    public static TrackDTO toDTO(TrackEntity trackEntity) {
        CopyOptions copyOptions = CopyOptions.create().setIgnoreProperties("planGeoJsonLine", "lastPoint").ignoreNullValue();
        TrackDTO trackDTO = BeanUtil.toBean(trackEntity, TrackDTO.class, copyOptions);
        //转化轨迹点
        GeoJsonLineString planGeoJsonLine = trackEntity.getPlanGeoJsonLine();
        if (ObjectUtil.isAllNotEmpty(planGeoJsonLine, planGeoJsonLine.getCoordinates())) {
            List<MarkerPointDTO> coordinateList = planGeoJsonLine.getCoordinates().stream()
                    .map(point -> new MarkerPointDTO(point.getX(), point.getY()))
                    .collect(Collectors.toList());
            trackDTO.setPointList(coordinateList);
        }

        //转化最新位置坐标
        if (ObjectUtil.isNotEmpty(trackEntity.getLastPoint())) {
            GeoJsonPoint point = trackEntity.getLastPoint();
            trackDTO.setLastPoint(new MarkerPointDTO(point.getX(), point.getY()));
        }
        return trackDTO;
    }

}
