package com.sl.ms.web.manager.vo.work;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("位置打点")
public class PointVO {
    @ApiModelProperty("名称")
    private String name;
    @ApiModelProperty("坐标")
    private MarkerPoint markerPoint;

    public void setMarkerPoints(String lng, String lat) {
        MarkerPoint markerPoint = new MarkerPoint();
        markerPoint.setLat(lat);
        markerPoint.setLng(lng);
        this.markerPoint = markerPoint;
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof PointVO) {
            PointVO orderPointVO = (PointVO) obj;
            return (name.equals(orderPointVO.name));
        }
        return super.equals(obj);
    }

    @Data
    class MarkerPoint {
        @ApiModelProperty("精度")
        private String lng;
        @ApiModelProperty("纬度")
        private String lat;
    }
}
