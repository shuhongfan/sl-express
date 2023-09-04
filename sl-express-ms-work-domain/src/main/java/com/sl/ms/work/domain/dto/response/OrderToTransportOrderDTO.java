package com.sl.ms.work.domain.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author zzj
 * @version 1.0
 */
@Data
public class OrderToTransportOrderDTO {

    private String id; //运单号
    private Long orderId; //订单id
    private LocalDateTime created;//时间

}
