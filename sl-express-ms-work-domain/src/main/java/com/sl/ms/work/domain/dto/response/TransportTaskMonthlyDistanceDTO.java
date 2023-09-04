package com.sl.ms.work.domain.dto.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TransportTaskMonthlyDistanceDTO {
    @ApiModelProperty(value = "日期，格式：2022-07-16 00:00:00")
    private LocalDateTime dateTime;

    @ApiModelProperty(value = "里程")
    private Double mileage;
}
