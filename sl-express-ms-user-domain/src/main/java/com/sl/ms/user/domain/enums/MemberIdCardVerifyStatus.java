package com.sl.ms.user.domain.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 身份证号验证状态
 *
 * @author itcast
 */

public enum MemberIdCardVerifyStatus {
    /**
     * 未验证
     */
    NONE(0, "未验证"),
    /**
     * 验证通过
     */
    SUCCESS(1, "验证通过"),
    /**
     * 验证失败
     */
    FAIL(2, "验证失败");


    MemberIdCardVerifyStatus(Integer code, String value) {

        this.code = code;
        this.value = value;
    }

    /**
     * 类型编码
     */
    private final Integer code;

    /**
     * 类型值
     */
    private final String value;


    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }


    /**
     * 循环变量
     */
    private static final Map<Integer, MemberIdCardVerifyStatus> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (MemberIdCardVerifyStatus statusEnum : EnumSet.allOf(MemberIdCardVerifyStatus.class)) {

            LOOKUP.put(statusEnum.code, statusEnum);
        }
    }

    /**
     * 根据code获取枚举项
     *
     * @param code 值
     * @return 值
     */
    public static MemberIdCardVerifyStatus lookup(Integer code) {
        return LOOKUP.get(code);
    }

}
