package com.sl.ms.base.domain.truck;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 回车登记分页查询
 */
@Data
@ApiModel(value = "回车登记分页查询")
public class TruckReturnRegisterPageQueryDTO {

    @ApiModelProperty(value = "页码", example = "1", required = true)
    private Integer page;

    @ApiModelProperty(value = "页面大小", example = "10", required = true)
    private Integer pageSize;

    @ApiModelProperty(value = "运输任务id,用于模糊查询")
    private Long transportTaskId;

    @ApiModelProperty(value = "运输任务id列表，用于精确查询")
    private List<Long> transportTaskIds;

    @ApiModelProperty(value = "开始回车时间", example = "2022-08-15 15:00:00")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime intoStorageStartTime;

    @ApiModelProperty(value = "结束回车时间", example = "2022-08-16 15:00:00")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime intoStorageEndTime;

    @ApiModelProperty(value = "车辆是否可用，1-是，0-否")
    private Boolean isAvailable;
}
