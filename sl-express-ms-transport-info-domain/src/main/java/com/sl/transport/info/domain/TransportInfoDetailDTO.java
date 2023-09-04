package com.sl.transport.info.domain;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class TransportInfoDetailDTO {

    @ApiModelProperty(value = "创建时间，时间戳", required = true)
    private Long created;
    @ApiModelProperty(value = "详细信息", example = "例如：您的快件已到达【北京通州分拣中心】", required = true)
    private String info;
    @ApiModelProperty(value = "状态，", example = "例如：运输中", required = true)
    private String status;

}
