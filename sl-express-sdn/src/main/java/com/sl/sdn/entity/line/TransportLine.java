package com.sl.sdn.entity.line;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 运输路线实体
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransportLine {

    private Long id;
    private Double cost; //成本

}
