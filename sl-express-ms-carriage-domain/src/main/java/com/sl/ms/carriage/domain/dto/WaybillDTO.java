package com.sl.ms.carriage.domain.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

/**
 * 运费计算参数
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WaybillDTO {

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

    @ApiModelProperty(value = "收件地址id，市级", required = true)
    @NotNull(message = "收件地址id不能为空")
    private Long receiverCityId;

    @ApiModelProperty(value = "寄件地址id，市级", required = true)
    @NotNull(message = "寄件地址id不能为空")
    private Long senderCityId;

    @ApiModelProperty(value = "重量，单位kg", required = true)
    @DecimalMin(value = "0.1", message = "重量必须大于等于0.1")
    @DecimalMax(value = "9999", message = "重量必须小于等于9999")
    @NotNull(message = "重量不能为空")
    private Double weight;

    @ApiModelProperty(value = "体积，单位cm^3")
    @Min(value = 1, message = "体积最小为1cm^3")
    @Max(value = 99000000, message = "体积最大为99m^3")
    private Integer volume;
}
