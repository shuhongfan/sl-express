package com.sl.transport.domain;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author zzj
 * @version 1.0
 */
@Data
public class TransportLineSearchDTO {

    @ApiModelProperty(value = "路线名称")
    private String name;
    @ApiModelProperty(value = "编号")
    private String number;
    @ApiModelProperty(value = "起点机构id")
    private Long startOrganId;
    @ApiModelProperty(value = "终点机构id")
    private Long endOrganId;
    @ApiModelProperty(value = "页数")
    private Integer page = 1;
    @ApiModelProperty(value = "页数大小")
    private Integer pageSize = 10;
}
