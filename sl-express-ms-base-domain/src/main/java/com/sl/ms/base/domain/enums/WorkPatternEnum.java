package com.sl.ms.base.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum WorkPatternEnum {
    Weeks((byte) 1, "礼拜制"),Continuitys((byte) 2,"连续制");
    private byte type;
    private String desc;

    public static String desc(byte type){
        for (WorkPatternEnum workPatternEnum : values()){
            if(workPatternEnum.getType() == type){
                return workPatternEnum.getDesc();
            }
        }
        return null;
    }
}
