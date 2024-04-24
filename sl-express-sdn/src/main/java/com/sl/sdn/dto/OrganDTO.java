package com.sl.sdn.dto;

import cn.hutool.core.annotation.Alias;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 机构数据对象，网点、一级转运、二级转运都是看作是机构
 * BaseEntity中的location无法序列化，需要将经纬度拆开封装对象
 */
@Data
public class OrganDTO {

    @Alias("bid") //业务id作为id进行封装
    @ApiModelProperty(value = "机构id", required = true)
    private Long id;
    @ApiModelProperty(value = "名称", required = true)
    private String name;
    @ApiModelProperty(value = "类型，1:一级转运，2：二级转运，3:网点", required = true)
    private Integer type;
    @ApiModelProperty(value = "电话", required = true)
    private String phone;
    @ApiModelProperty(value = "地址", required = true)
    private String address;
    @ApiModelProperty(value = "纬度", required = true)
    private Double latitude;
    @ApiModelProperty(value = "经度", required = true)
    private Double longitude;

}
