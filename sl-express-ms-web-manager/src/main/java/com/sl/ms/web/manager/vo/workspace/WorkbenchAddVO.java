package com.sl.ms.web.manager.vo.workspace;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel(value = "工作台数据")
public class WorkbenchAddVO {
    @ApiModelProperty(value = "机构概述", required = true)
    private OrganOverviewVO organOverview;

    @ApiModelProperty(value = "今日数据", required = true)
    private TodayDataVO todayData;

    @ApiModelProperty(value = "待办事项", required = true)
    private BacklogVO backlog;

    @ApiModelProperty(value = "运输任务 从后台数据导入", required = true)
    private List<WorkbenchTransportTaskVO> transportTaskList;
}
