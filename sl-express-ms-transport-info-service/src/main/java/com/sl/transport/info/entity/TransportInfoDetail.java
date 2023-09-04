package com.sl.transport.info.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 物流信息详情
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransportInfoDetail{

    private Long created; //创建时间，时间戳
    private String info; //详细信息，例如：您的快件已到达【北京通州分拣中心】
    private String status; //状态，例如：运输中
}
