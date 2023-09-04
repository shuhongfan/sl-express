package com.sl.ms.dispatch.dto;

import lombok.Data;

/**
 * 运单调度消息对象
 */
@Data
public class DispatchMsgDTO {

    //运单id
    private String transportOrderId;
    //当前所在机构id
    private Long currentAgencyId;
    //下一个机构id
    private Long nextAgencyId;
    //货品总体积，单位：m³
    private Double totalVolume;
    //货品总重量，单位：kg
    private Double totalWeight;
    //消息发送时间
    private Long created;

}
