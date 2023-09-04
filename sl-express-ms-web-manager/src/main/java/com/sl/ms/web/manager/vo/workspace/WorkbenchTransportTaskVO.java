package com.sl.ms.web.manager.vo.workspace;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "运输任务")
public class WorkbenchTransportTaskVO {
    @ApiModelProperty(value = "运输任务id", required = true)
    private Long id;

    @ApiModelProperty(value = "起始机构", required = true)
    private String startAgency;

    @ApiModelProperty(value = "目的机构", required = true)
    private String endAgency;

    @ApiModelProperty(value = "车牌号码", required = true)
    private String licensePlate;

    @ApiModelProperty(value = "任务状态，1为待执行（对应 待提货）、2为进行中（对应在途）、3为待确认（保留状态）、4为已完成（对应 已交付）、5为已取消", required = true)
    private Integer status;
}
