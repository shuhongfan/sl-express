package com.sl.transport.enums;

import cn.hutool.core.util.EnumUtil;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 路线类型枚举
 *
 * @author zzj
 * @version 1.0
 */
public enum TransportLineEnum implements BaseEnum {

    TRUNK_LINE(1, "干线", "一级转运中心到一级转运中心"),
    BRANCH_LINE(2, "支线", "一级转运中心与二级转运中心之间线路"),
    CONNECT_LINE(3, "接驳路线", "二级转运中心到网点"),
    SPECIAL_LINE(4, "专线", "任务城市到任意城市"),
    TEMP_LINE(5, "临时线路", "任意转运中心到任意转运中心");

    /**
     * 类型编码
     */
    private final Integer code;

    /**
     * 类型值
     */
    private final String value;

    /**
     * 描述
     */
    private final String desc;

    TransportLineEnum(Integer code, String value, String desc) {
        this.code = code;
        this.value = value;
        this.desc = desc;
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

    public String getDesc() {
        return desc;
    }

    public static TransportLineEnum codeOf(Integer code) {
        return EnumUtil.getBy(TransportLineEnum::getCode, code);
    }
}
