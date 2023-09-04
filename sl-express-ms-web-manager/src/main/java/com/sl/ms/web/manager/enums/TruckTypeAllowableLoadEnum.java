package com.sl.ms.web.manager.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.ms.web.manager.vo.baseCommon.LoadRangeVO;

import java.math.BigDecimal;

/**
 * 车型应载重量枚举类
 */

public enum TruckTypeAllowableLoadEnum {
    /**
     * 应载重量:0<=weight<1.8
     */
    RANGE_LEVEL_1(1, new LoadRangeVO(BigDecimal.valueOf(0.0), BigDecimal.valueOf(1.8))),
    /**
     * 应载重量:1.8<=weight<6
     */
    RANGE_LEVEL_2(2, new LoadRangeVO(BigDecimal.valueOf(1.8), BigDecimal.valueOf(6.0))),
    /**
     * 应载重量:6<=weight<14
     */
    RANGE_LEVEL_3(3, new LoadRangeVO(BigDecimal.valueOf(6.0), BigDecimal.valueOf(14.0))),
    /**
     * 应载重量:14<=weight<30
     */
    RANGE_LEVEL_4(4, new LoadRangeVO(BigDecimal.valueOf(14.0), BigDecimal.valueOf(30.0))),
    /**
     * 应载重量:30<=weight<50
     */
    RANGE_LEVEL_5(5, new LoadRangeVO(BigDecimal.valueOf(30.0), BigDecimal.valueOf(50.0))),
    /**
     * 应载重量:50<=weight<100
     */
    RANGE_LEVEL_6(6, new LoadRangeVO(BigDecimal.valueOf(50.0), BigDecimal.valueOf(100.0))),
    /**
     * 应载重量:100<=weight
     */
    RANGE_LEVEL_7(7, new LoadRangeVO(BigDecimal.valueOf(100.0), null));

    /**
     * 类型编码
     */
    @EnumValue
    @JsonValue
    private final Integer code;
    /**
     * 类型值
     */
    private final LoadRangeVO value;

    TruckTypeAllowableLoadEnum(Integer code, LoadRangeVO value) {
        this.code = code;
        this.value = value;
    }

    public static TruckTypeAllowableLoadEnum codeOf(Integer code) {
        return EnumUtil.getBy(TruckTypeAllowableLoadEnum::getCode, code);
    }

    public Integer getCode() {
        return code;
    }

    public LoadRangeVO getValue() {
        return value;
    }

}
