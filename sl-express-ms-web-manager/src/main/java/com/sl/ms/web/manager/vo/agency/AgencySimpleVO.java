package com.sl.ms.web.manager.vo.agency;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel(value = "机构简要信息")
public class AgencySimpleVO {
    @ApiModelProperty(value = "id")
    private Long id;

    @ApiModelProperty(value = "机构名称")
    private String name;

    @ApiModelProperty(value = "机构类型")
    private Integer type;

    @ApiModelProperty(value = "子部门简要信息列表")
    private List<AgencySimpleVO> subAgencies;
}
