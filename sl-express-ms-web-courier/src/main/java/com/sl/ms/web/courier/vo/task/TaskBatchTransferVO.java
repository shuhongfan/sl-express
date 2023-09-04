package com.sl.ms.web.courier.vo.task;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("批量转单")
public class TaskBatchTransferVO {
    @ApiModelProperty("被转单快递员id")
    private String anotherCourierId;
    @ApiModelProperty("任务id列表")
    private List<String> idList;
}
