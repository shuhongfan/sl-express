package com.sl.ms.track.domain.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MarkerPointDTO {
    @ApiModelProperty("精度")
    private Double lng;
    @ApiModelProperty("纬度")
    private Double lat;
}
