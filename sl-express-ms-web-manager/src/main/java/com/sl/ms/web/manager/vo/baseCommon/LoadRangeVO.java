package com.sl.ms.web.manager.vo.baseCommon;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * 载荷取件
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoadRangeVO {
    /**
     * 最小载荷；重量单位：吨，体积单位：立方米
     */
    private BigDecimal minLoad;

    /**
     * 最大载荷；重量单位：吨，体积单位：立方米
     */
    private BigDecimal maxLoad;
}
