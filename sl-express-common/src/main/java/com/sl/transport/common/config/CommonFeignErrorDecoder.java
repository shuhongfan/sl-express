package com.sl.transport.common.config;

import com.sl.transport.common.exception.SLException;

/**
 * 通用解码器实现
 *
 * @author zzj
 * @version 1.0
 */
public class CommonFeignErrorDecoder extends FeignErrorDecoder {

    @Override
    public Exception call(int status, int code, String msg) {
        return new SLException(msg, code, status);
    }
}
