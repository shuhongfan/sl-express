package com.sl.transport.domain;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

/**
 * 路线对象
 *
 * @author zzj
 * @version 1.0
 */
@Data
public class TransportLineDTO {

    @ApiModelProperty(value = "名称", required = true)
    private Long id;
    @ApiModelProperty(value = "编号")
    private String number;
    @ApiModelProperty(value = "成本")
    private Double cost;
    @ApiModelProperty(value = "类型，1:干线，2：支线，3:接驳路线", required = true)
    @Max(value = 3, message = "类型值必须是1、2、3")
    @Min(value = 1, message = "类型值必须是1、2、3")
    private Integer type;
    @ApiModelProperty(value = "路线名称")
    private String name;
    @ApiModelProperty(value = "距离，单位：米")
    private Double distance;
    @ApiModelProperty(value = "时间，单位：秒")
    private Double time;
    @ApiModelProperty(value = "创建时间")
    private Long created;
    @ApiModelProperty(value = "修改时间")
    private Long updated;
    @ApiModelProperty(value = "扩展字段，以json格式存储")
    private String extra;
    @ApiModelProperty(value = "起点机构id")
    private Long startOrganId;
    @ApiModelProperty(value = "起点机构名称，只有在查询时返回")
    private String startOrganName;
    @ApiModelProperty(value = "终点机构id")
    private Long endOrganId;
    @ApiModelProperty(value = "终点机构名称，只有在查询时返回")
    private String endOrganName;

}
