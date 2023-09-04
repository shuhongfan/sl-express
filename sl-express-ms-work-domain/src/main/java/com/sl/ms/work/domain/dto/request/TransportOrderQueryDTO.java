package com.sl.ms.work.domain.dto.request;

import com.sl.ms.work.domain.enums.transportorder.TransportOrderSchedulingStatus;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderStatus;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class TransportOrderQueryDTO {
    @ApiModelProperty(value = "id")
    private String id;

    @ApiModelProperty(value = "订单Id")
    private Long orderId;

    @ApiModelProperty(value = "运单状态(1.新建 2.已装车，发往x转运中心 3.到达 4.到达终端网点 5.已签收 6.拒收))")
    private TransportOrderStatus status;

    @ApiModelProperty(value = "调度状态调度状态(1.待调度2.未匹配线路3.已调度)")
    private TransportOrderSchedulingStatus schedulingStatus;

    //起始网点id
    @ApiModelProperty(value = "起始网点id")
    private Long startAgencyId;

    //终点网点id
    @ApiModelProperty(value = "终点网点id")
    private Long endAgencyId;

    //当前所在机构id
    @ApiModelProperty(value = "当前所在机构id")
    private Long currentAgencyId;

    @ApiModelProperty(value = "页码")
    private Integer page;

    @ApiModelProperty(value = "页尺寸")
    private Integer pageSize;

}
