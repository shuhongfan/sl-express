package com.sl.ms.work.domain.enums;

import cn.hutool.core.util.EnumUtil;
import com.sl.transport.common.enums.BaseExceptionEnum;

/**
 * 异常枚举
 *
 * @author zzj
 * @version 1.0
 */
public enum WorkExceptionEnum implements BaseExceptionEnum {

    ORDER_NOT_FOUND(1001, "订单不存在"),
    ORDER_LOCATION_NOT_FOUND(1002, "订单位置信息不存在"),
    TRANSPORT_LINE_NOT_FOUND(1003, "没有查询到路线"),
    ORDER_CARGO_NOT_FOUND(1004, "订单中的货物信息不存在"),
    TRANSPORT_ORDER_SAVE_ERROR(1006, "订单转运单出错"),
    TRANSPORT_ORDER_NOT_FOUND(1007, "运单不存在"),
    TRANSPORT_ORDER_STATUS_NOT_CREATED(1008, "更新运单状态不能更新成 CREATED 状态"),
    TRANSPORT_TASK_NOT_FOUND(1009, "运输任务不存在"),
    DRIVER_JOB_SAVE_ERROR(1010, "司机作业单保存失败"),
    DRIVER_JOB_NOT_FOUND(1011, "司机作业单不存在"),
    DRIVER_JOB_STATUS_NOT_PENDING(1012, "更新司机作业单不能更新成 PENDING 状态"),
    TRANSPORT_TASK_QUERY_PARAM_ERROR(1013, "查询运输任务的参数不正确"),
    TRANSPORT_TASK_STATUS_NOT_PENDING(1014, "更新运输任务不能更新成 PENDING 状态"),
    PICKUP_DISPATCH_TASK_SAVE_ERROR(1015, "新增取派件任务失败"),
    PICKUP_DISPATCH_TASK_NOT_FOUND(1016, "取派件任务不存在"),
    PICKUP_DISPATCH_TASK_STATUS_NOT_NEW(1017, "取派件任务不能更新成 NEW 状态"),
    PICKUP_DISPATCH_TASK_PARAM_ERROR(1018, "取派件任务的参数不正确"),
    UPDATE_COURIER_PARAM_ERROR(1019, "改派快递员，任务id、目标快递员id不能空"),
    UPDATE_COURIER_EQUAL_PARAM_ERROR(1020, "改派快递员，原id和目标id不能相同"),
    UPDATE_COURIER_ID_PARAM_ERROR(1021, "改派快递员，原快递员id不正确"),
    TRANSPORT_TASK_UPDATE_PARAM_ERROR(1022, "更新运输任务的参数不正确"),
    TRANSPORT_TASK_CANCEL_FAILED(1022, "运输任务有关联运单，不可取消！");

    private Integer code;
    private Integer status;
    private String value;

    WorkExceptionEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
        this.status = 500;
    }

    WorkExceptionEnum(Integer code, Integer status, String value) {
        this.code = code;
        this.value = value;
        this.status = status;
    }

    public static WorkExceptionEnum codeOf(Integer code) {
        return EnumUtil.getBy(WorkExceptionEnum::getCode, code);
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
}
