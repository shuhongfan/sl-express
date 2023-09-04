package com.sl.transport.common.exception;

import com.sl.transport.common.enums.BaseEnum;
import com.sl.transport.common.enums.BaseExceptionEnum;
import lombok.Data;

/**
 * 自定义异常
 */
@Data
public class SLWebException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private String msg; //异常中的信息
    private int code = 1; //业务状态码，规则：异常弹窗状态码
    private int status = 200; //http状态码，按照http协议规范，如：200,201,400等

    public SLWebException(BaseEnum baseEnum) {
        super(baseEnum.getValue());
        this.msg = baseEnum.getValue();
        this.code = baseEnum.getCode();
    }

    public SLWebException(BaseEnum baseEnum, Throwable e) {
        super(baseEnum.getValue(), e);
        this.msg = baseEnum.getValue();
        this.code = baseEnum.getCode();
    }

    public SLWebException(BaseExceptionEnum errorEnum) {
        super(errorEnum.getValue());
        this.status = errorEnum.getStatus();
        this.msg = errorEnum.getValue();
        this.code = errorEnum.getCode();
    }

    public SLWebException(BaseExceptionEnum errorEnum, Throwable e) {
        super(errorEnum.getValue(), e);
        this.status = errorEnum.getStatus();
        this.msg = errorEnum.getValue();
        this.code = errorEnum.getCode();
    }

    public SLWebException(String msg) {
        super(msg);
        this.msg = msg;
    }

    public SLWebException(String msg, Throwable e) {
        super(msg, e);
        this.msg = msg;
    }

    public SLWebException(String msg, int code) {
        super(msg);
        this.msg = msg;
        this.code = code;
    }

    public SLWebException(String msg, int code, int status) {
        super(msg);
        this.msg = msg;
        this.code = code;
        this.status = status;
    }

    public SLWebException(String msg, int code, Throwable e) {
        super(msg, e);
        this.msg = msg;
        this.code = code;
    }

    public SLWebException(String msg, int code, int status, Throwable e) {
        super(msg, e);
        this.msg = msg;
        this.code = code;
        this.status = status;
    }

}
