package com.sl.ms.web.manager.vo.baseTruck;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/**
 * 回车登记分页查询条件
 */
@Data
@ApiModel(value = "回车登记分页查询条件")
public class TruckReturnRegisterPageQueryVO {

    @ApiModelProperty(value = "页码", example = "1", required = true)
    private Integer page;

    @ApiModelProperty(value = "页面大小", example = "10", required = true)
    private Integer pageSize;

    @ApiModelProperty(value = "运输任务id")
    private Long transportTaskId;

    @ApiModelProperty(value = "起始机构id")
    private Long startAgencyId;

    @ApiModelProperty(value = "结束机构id")
    private Long endAgencyId;

    @ApiModelProperty(value = "开始回车时间", example = "2022-09-12 15:37:00")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime intoStorageStartTime;

    @ApiModelProperty(value = "结束回车时间", example = "2022-09-13 15:37:00")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime intoStorageEndTime;

    @ApiModelProperty(value = "车辆是否可用")
    private Boolean isAvailable;
}
