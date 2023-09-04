package com.sl.ms.carriage.domain.enums;

/**
 * 经济区枚举
 */
public enum EconomicRegionEnum {

    BTH("2", new Long[] {1L, 7362L, 13267L}),
    JZS("3", new Long[] {167904L, 191019L, 161792L}),
    SC("4", new Long[] {545532L, 533328L}),
    HJL("5", new Long[] {145665L, 145665L, 115224L});

    /**
     * 类型编码
     */
    private final String code;

    /**
     * 类型值
     */
    private final Long[] value;

    EconomicRegionEnum(String code, Long[] value) {
        this.code = code;
        this.value = value;
    }

    public String getCode() {
        return code;
    }

    public Long[] getValue() {
        return value;
    }

    public static EconomicRegionEnum codeOf(String code) {
        switch (code) {
            case "2": {
                return BTH;
            }
            case "3": {
                return JZS;
            }
            case "4": {
                return SC;
            }
            case "5": {
                return HJL;
            }
            default: {
                return null;
            }
        }
    }
}
