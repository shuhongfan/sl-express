package com.sl.ms.driver.domain.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 司机作业单分页查询
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("司机作业单分页查询")
public class DriverJobPageQueryDTO {

    @ApiModelProperty(value = "页码", required = true, example = "1")
    private Integer page;

    @ApiModelProperty(value = "页尺寸", required = true, example = "10")
    private Integer pageSize;

    @ApiModelProperty(value = "司机作业单id")
    private Long id;

    @ApiModelProperty(value = "司机id")
    private Long driverId;

    @ApiModelProperty(value = "运输任务id")
    private Long transportTaskId;

    @ApiModelProperty(value = "作业状态，1为待提货）、2为在途(在途和已交付)、3为改派、5为已作废、6为已完成（已回车登记）")
    private List<DriverJobStatus> statusList;

    @ApiModelProperty(value = "最小任务时间", example = "2022-07-13 00:00:00")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime minTaskTime;

    @ApiModelProperty(value = "最大任务时间", example = "2022-07-13 23:59:59")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime maxTaskTime;


}
