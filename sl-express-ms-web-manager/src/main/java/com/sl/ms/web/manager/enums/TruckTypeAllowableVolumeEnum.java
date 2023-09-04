package com.sl.ms.web.manager.enums;

import cn.hutool.core.util.EnumUtil;
import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import com.sl.ms.web.manager.vo.baseCommon.LoadRangeVO;

import java.math.BigDecimal;

/**
 * 车型应载体积枚举类
 */

public enum TruckTypeAllowableVolumeEnum {
    /**
     * 应载体积:0<=体积<3
     */
    RANGE_LEVEL_1(1, new LoadRangeVO(BigDecimal.valueOf(0), BigDecimal.valueOf(3))),
    /**
     * 应载体积:3<=体积<5
     */
    RANGE_LEVEL_2(2, new LoadRangeVO(BigDecimal.valueOf(3), BigDecimal.valueOf(5))),
    /**
     * 应载体积:5<=体积<10
     */
    RANGE_LEVEL_3(3, new LoadRangeVO(BigDecimal.valueOf(5), BigDecimal.valueOf(10))),
    /**
     * 应载体积:10<=体积<15
     */
    RANGE_LEVEL_4(4, new LoadRangeVO(BigDecimal.valueOf(10), BigDecimal.valueOf(15))),
    /**
     * 应载体积:15<=体积<30
     */
    RANGE_LEVEL_5(5, new LoadRangeVO(BigDecimal.valueOf(15), BigDecimal.valueOf(30))),
    /**
     * 应载体积:30<=体积<50
     */
    RANGE_LEVEL_6(6, new LoadRangeVO(BigDecimal.valueOf(30), BigDecimal.valueOf(50))),
    /**
     * 应载体积:50<=体积<80
     */
    RANGE_LEVEL_7(7, new LoadRangeVO(BigDecimal.valueOf(50), BigDecimal.valueOf(80))),
    /**
     * 应载体积:80<=体积<150
     */
    RANGE_LEVEL_8(8, new LoadRangeVO(BigDecimal.valueOf(80), BigDecimal.valueOf(150))),
    /**
     * 应载体积:150<=体积
     */
    RANGE_LEVEL_9(9, new LoadRangeVO(BigDecimal.valueOf(150), null));

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

    TruckTypeAllowableVolumeEnum(Integer code, LoadRangeVO value) {
        this.code = code;
        this.value = value;
    }

    public static TruckTypeAllowableVolumeEnum codeOf(Integer code) {
        return EnumUtil.getBy(TruckTypeAllowableVolumeEnum::getCode, code);
    }

    public Integer getCode() {
        return code;
    }

    public LoadRangeVO getValue() {
        return value;
    }

}
