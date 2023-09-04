package com.sl.ms.web.courier.vo.task;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@ApiModel("运费计算条件")
public class CarriageCalculateVO {

    @ApiModelProperty(value = "寄件地址id，这里指的是区/县的地址ID", required = true)
    @NotNull(message = "寄件地址没有选择")
    private Long senderCountyId;

    @ApiModelProperty(value = "收件地址id，这里指的是区/县的地址ID", required = true)
    @NotNull(message = "收件地址没有选择")
    private Long receiverCountyId;

    @ApiModelProperty(value = "重量，单位：kg", required = true)
    @NotNull(message = "运费不能为空")
    @Min(value = 0L, message = "重点不能小于0")
    private BigDecimal weight;

    @ApiModelProperty(value = "长，单位cm")
    @Min(value = 1, message = "长度最小为1")
    @Max(value = 999, message = "长度最大为999")
    private Integer measureLong;

    @ApiModelProperty(value = "宽，单位cm")
    @Min(value = 1, message = "宽度最小为1")
    @Max(value = 999, message = "宽度最大为999")
    private Integer measureWidth;

    @ApiModelProperty(value = "高，单位cm")
    @Min(value = 1, message = "高度最小为1")
    @Max(value = 999, message = "高度最大为999")
    private Integer measureHigh;

    @ApiModelProperty(value = "体积，单位：cm^3", required = true)
    @Min(value = 1, message = "体积最小为1")
    @Max(value = 99000000, message = "体积最大为999m^3")
    private Integer volume;
}
