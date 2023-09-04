package com.sl.ms.web.manager.vo.work;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("调度配置")
public class DispatchConfigurationVO {
    @ApiModelProperty(value = "调度时间，单位：小时。分配运输任务的提前量，限定1-48小时", required = true)
    @NotNull(message = "调度时间不能为空！")
    @Min(value = 1, message = "调度时间最小为1！")
    @Max(value = 48, message = "调度时间最大为48！")
    private Integer dispatchTime;

    @ApiModelProperty(value = "调度方式，1转运次数最少，2成本最低；默认成本最低", required = true)
    @NotNull(message = "调度方式不能为空！")
    @Min(value = 1, message = "调度方式最小为1！")
    @Max(value = 2, message = "调度方式最大为2！")
    private Integer dispatchMethod;
}
