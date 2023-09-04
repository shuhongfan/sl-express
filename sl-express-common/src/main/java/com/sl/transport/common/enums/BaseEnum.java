package com.sl.transport.common.enums;

/**
 * 所有的枚举都需要实现此接口
 *
 * @author zzj
 * @version 1.0
 */
public interface BaseEnum {

    /**
     * 业务状态码
     */
    Integer getCode();

    /**
     * 业务说明
     */
    String getValue();

}
