package com.sl.ms.web.customer.vo.oms;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MarkerPointVO {
    @ApiModelProperty("精度")
    private Double lng;
    @ApiModelProperty("纬度")
    private Double lat;
}
