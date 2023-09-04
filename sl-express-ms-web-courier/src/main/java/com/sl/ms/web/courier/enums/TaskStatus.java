package com.sl.ms.web.courier.enums;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 任务状态，对应前端的任务列表tap
 */
public enum TaskStatus {
    /**
     * 1待取件
     */
    WAITING_PICKUP(1, "待取件"),
    /**
     * 2已取件
     */
    COMPLETE_PICKUP(2, "已取件"),
    /**
     * 3已取消
     */
    CANCELED(3, "已取消"),
    /**
     * 4待派件
     */
    WAITING_DISPATCH(4, "待派件"),
    /**
     * 5已签收
     */
    COMPLETE_DISPATCH(5, "已签收");


    TaskStatus(Integer code, String value) {
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
    private static final Map<Integer, TaskStatus> LOOKUP = new HashMap<>();

    //静态初始化
    static {

        for (TaskStatus statusEnum : EnumSet.allOf(TaskStatus.class)) {

            LOOKUP.put(statusEnum.code, statusEnum);
        }
    }

    /**
     * 根据code获取枚举项
     *
     * @param code 值
     * @return 值
     */
    public static TaskStatus lookup(Integer code) {
        return LOOKUP.get(code);
    }

}
