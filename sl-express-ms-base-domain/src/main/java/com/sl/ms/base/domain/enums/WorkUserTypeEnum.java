package com.sl.ms.base.domain.enums;

import cn.hutool.core.util.EnumUtil;

/**
 * 1:员工，2：快递员，3：司机
 */

public enum WorkUserTypeEnum {
    /**
     * 1:员工
     */
    USER((byte) 1, "员工"),
    /**
     * 2：快递员
     */
    COURIER((byte) 2, "快递员"),
    /**
     * 3：司机
     */
    DRIVER((byte) 3, "司机");


    WorkUserTypeEnum(Byte code, String value) {
        this.code = code;
        this.value = value;
    }

    /**
     * 类型编码
     */
    private final Byte code;

    /**
     * 类型值
     */
    private final String value;

    public Byte getCode() {
        return code;
    }


    public String getValue() {
        return value;
    }


    public static WorkUserTypeEnum codeOf(Integer code) {
        return EnumUtil.getBy(WorkUserTypeEnum::getCode, code);
    }

}
