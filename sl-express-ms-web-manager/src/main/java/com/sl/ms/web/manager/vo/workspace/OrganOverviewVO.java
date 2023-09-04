package com.sl.ms.web.manager.vo.workspace;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "机构概述")
public class OrganOverviewVO {
    @ApiModelProperty(value = "机构名称", required = true)
    private String organName;

    @ApiModelProperty(value = "机构地址", required = true)
    private String organAddress;

    @ApiModelProperty(value = "负责人", required = true)
    private String principal;

    @ApiModelProperty(value = "电话", required = true)
    private String phone;

    @ApiModelProperty(value = "分拣中心数量", required = true)
    private Integer sortingCenterNumber;

    @ApiModelProperty(value = "营业部数量", required = true)
    private Integer agencyNumber;

    @ApiModelProperty(value = "司机人数", required = true)
    private Integer driverNumber;

    @ApiModelProperty(value = "快递员人数", required = true)
    private Integer courierNumber;

}
