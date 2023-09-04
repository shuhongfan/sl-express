package com.sl.ms.web.courier.vo.task;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("任务id列表")
public class TaskBatchVO {
    @ApiModelProperty(value = "id列表", required = true)
    private List<String> idList;
}
