package com.sl.ms.courier.domain.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 取派件任务状态
 *
 * @author itcast
 */

public enum PickupDispatchTaskStatus {
    /**
     * 待执行,对应 待上门和须交接
     */
    PENDING(1, "待执行"),
    /**
     * 进行中，在该状态中暂不使用，属于保留状态
     */
    PROCESSING(2, "进行中"),
    /**
     * 待确认，对应 待妥投和须交件
     */
    CONFIRM(3, "待确认"),
    /**
     * 已完成
     */
    COMPLETED(4, "已完成"),
    /**
     * 已取消
     */
    CANCELLED(5, "已取消");


    PickupDispatchTaskStatus(Integer code, String value) {

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
    private static final Map<Integer, PickupDispatchTaskStatus> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (PickupDispatchTaskStatus statusEnum : EnumSet.allOf(PickupDispatchTaskStatus.class)) {

            LOOKUP.put(statusEnum.code, statusEnum);
        }
    }

    /**
     * 根据code获取枚举项
     *
     * @param code 值
     * @return 值
     */
    public static PickupDispatchTaskStatus lookup(Integer code) {
        return LOOKUP.get(code);
    }

}
