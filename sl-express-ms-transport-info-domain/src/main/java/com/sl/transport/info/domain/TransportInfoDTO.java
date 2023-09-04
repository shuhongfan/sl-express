package com.sl.transport.info.domain;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class TransportInfoDTO {

    @ApiModelProperty(value = "运单id", required = true)
    private String transportOrderId;
    @ApiModelProperty(value = "info信息列表", required = true)
    private List<TransportInfoDetailDTO> infoList;

}
