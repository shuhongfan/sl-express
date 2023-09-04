package com.sl.ms.base.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum WorkStatusEnum {
    NOMAL((byte) 1, "正常"),STOPING((byte) 2, "停用");
    private byte status;
    private String desc;

    public static String desc(byte status) {
        for (WorkStatusEnum workStatusEnum : values()) {
            if(status == workStatusEnum.getStatus()) {
                return workStatusEnum.getDesc();
            }
        }
        return null;
    }
}
