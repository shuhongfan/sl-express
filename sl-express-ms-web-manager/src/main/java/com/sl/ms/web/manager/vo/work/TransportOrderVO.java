package com.sl.ms.web.manager.vo.work;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sl.ms.web.manager.vo.oms.OrderVO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@ApiModel(value = "运单信息")
public class TransportOrderVO {
    @ApiModelProperty(value = "id")
    private String id;
    //订单ID
    @ApiModelProperty(value = "订单ID")
    private Long orderId;
    @ApiModelProperty(value = "订单信息")
    private OrderVO order;
    @ApiModelProperty(value = "当前机构")
    private String currentAgencyName;

    @ApiModelProperty(value = "开始机构")
    private String startAgencyName;

    @ApiModelProperty(value = "结束机构")
    private String endAgencyName;

    @ApiModelProperty(value = "下一个机构")
    private String nextAgencyName;

    @ApiModelProperty(value = "运单状态")
    private String statusText;
    @ApiModelProperty(value = "运单状态(1.新建 2.已装车，发往x转运中心 3.到达 4.到达终端网点)")
    private Integer status;
    @ApiModelProperty(value = "调度状态调度状态(1.待调度2.未匹配线路3.已调度)")
    private Integer schedulingStatus;
    /**
     * 任务创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created;
    /**
     * 任务更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updated;
    @ApiModelProperty(value = "取件信息")
    private TaskPickupDispatchVO taskPickup;
    @ApiModelProperty(value = "派件信息")
    private TaskPickupDispatchVO taskDispatch;
    @ApiModelProperty(value = "拒收派件信息")
    private TaskPickupDispatchVO taskRejectionDispatch;
    @ApiModelProperty(value = "运输信息")
    private List<TaskTransportVO> taskTransports;
    @ApiModelProperty(value = "起始网点id")
    private Long startAgencyId;
    @ApiModelProperty(value = "终点网点id")
    private Long endAgencyId;
    @ApiModelProperty(value = "当前所在机构id")
    private Long currentAgencyId;
    @ApiModelProperty(value = "下一个机构id")
    private Long nextAgencyId;
    @ApiModelProperty(value = "完整的运输路线")
    private String transportLine;
    @ApiModelProperty(value = "货品总体积")
    private BigDecimal totalVolume;
    @ApiModelProperty(value = "货品总重量")
    private BigDecimal totalWeight;
}
