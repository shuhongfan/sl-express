package com.sl.ms.web.manager.vo.workspace;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "月度订单数量")
public class MonthlyOrderVO {
    @ApiModelProperty(value = "日期", example = "2022-06", required = true)
    @JsonFormat(pattern = "yyyy-MM")
    private LocalDate dateTime;

    @ApiModelProperty(value = "订单数量", required = true)
    private Integer orderNumber;
}
