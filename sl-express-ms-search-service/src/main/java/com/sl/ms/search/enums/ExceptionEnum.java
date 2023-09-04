package com.sl.ms.search.enums;

import cn.hutool.core.util.EnumUtil;
import com.sl.transport.common.enums.BaseExceptionEnum;

/**
 * 搜索微服务异常枚举
 **/
public enum ExceptionEnum implements BaseExceptionEnum {
    ES_ACCESS_ERROR(9901, "访问es出现未知异常！"),
    TASK_NOT_FOUND(9902, "任务不存在！");

    private final Integer code;
    private final Integer status;
    private final String value;

    ExceptionEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
        this.status = 500;
    }

    ExceptionEnum(Integer code, Integer status, String value) {
        this.code = code;
        this.value = value;
        this.status = status;
    }

    @Override
    public Integer getCode() {
        return this.code;
    }

    @Override
    public String getValue() {
        return this.value;
    }

    @Override
    public Integer getStatus() {
        return this.status;
    }

    public static ExceptionEnum codeOf(Integer code) {
        return EnumUtil.getBy(ExceptionEnum::getCode, code);
    }
}
