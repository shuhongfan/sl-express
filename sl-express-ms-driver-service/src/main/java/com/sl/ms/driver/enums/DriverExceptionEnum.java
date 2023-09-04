package com.sl.ms.driver.enums;

import cn.hutool.core.util.EnumUtil;
import com.sl.transport.common.enums.BaseExceptionEnum;

/**
 * 异常枚举
 *
 * @author zzj
 * @version 1.0
 */
public enum DriverExceptionEnum implements BaseExceptionEnum {

    TRANSPORT_TASK_NOT_FOUND(1009, "运输任务不存在"),
    DRIVER_JOB_SAVE_ERROR(1010, "司机作业单保存失败"),
    DRIVER_JOB_NOT_FOUND(1011, "司机作业单不存在"),
    DRIVER_JOB_STATUS_NOT_PENDING(1012, "更新司机作业单不能更新成 PENDING 状态"),
    DRIVER_JOB_STATUS_UNKNOWN(1023, "不能识别的状态"),
    PROCESSING_DRIVER_JOB_NOT_EMPTY(1024, "司机仍有在途或交付任务，不可提货！"),
    DRIVER_JOB_INTO_STORAGE_ERROR(1025, "入库失败"),
    DRIVER_JOB_OUT_STORAGE_ERROR(1026, "出库失败");

    private Integer code;
    private Integer status;
    private String value;

    DriverExceptionEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
        this.status = 500;
    }

    DriverExceptionEnum(Integer code, Integer status, String value) {
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

    public static DriverExceptionEnum codeOf(Integer code) {
        return EnumUtil.getBy(DriverExceptionEnum::getCode, code);
    }
}
