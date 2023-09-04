package com.sl.transport.enums;

import cn.hutool.core.util.EnumUtil;
import com.sl.transport.common.enums.BaseExceptionEnum;

/**
 * 异常枚举
 *
 * @author zzj
 * @version 1.0
 */
public enum ExceptionEnum implements BaseExceptionEnum {

    ORGAN_NOT_FOUND(1001, "机构不存在"),
    START_END_ORGAN_NOT_FOUND(1002, "起点、终点机构不能为空"),
    TRANSPORT_LINE_ALREADY_EXISTS(1003, "路线已经存在"),
    TRANSPORT_LINE_NOT_FOUND(1004, "路线不存在"),
    TRANSPORT_LINE_TYPE_ERROR(1005, "路线类型错误"),
    ORGAN_TYPE_ERROR(1006, "机构类型错误");

    private Integer code;
    private Integer status;
    private String value;

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
