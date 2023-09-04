package com.sl.ms.work.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author zzj
 * @version 1.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourierTaskCountDTO {

    /**
     * 快递员
     */
    private Long courierId;
    /**
     * 数量
     */
    private Long count;

}
