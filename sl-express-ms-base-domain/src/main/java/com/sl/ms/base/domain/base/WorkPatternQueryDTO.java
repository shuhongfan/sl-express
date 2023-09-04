package com.sl.ms.base.domain.base;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("工作模式")
@Data
public class WorkPatternQueryDTO {
    @ApiModelProperty("页数")
    private Integer page = 1; //默认第一页
    @ApiModelProperty("每页条数")
    private Integer pageSize = 10;

}
