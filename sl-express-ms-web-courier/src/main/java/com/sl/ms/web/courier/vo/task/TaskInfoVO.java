package com.sl.ms.web.courier.vo.task;

import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskAssignedStatus;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskSignStatus;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskStatus;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskType;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
@ApiModel("任务详细新消息")
public class TaskInfoVO {
    @ApiModelProperty("任务id")
    private String id;

    @ApiModelProperty("订单号")
    private String orderId;

    @ApiModelProperty("运单id")
    private String transportOrderId;

    @ApiModelProperty(value = "任务类型，1为取件任务，2为派件任务")
    private PickupDispatchTaskType taskType;

    @ApiModelProperty("任务状态，1为新任务、2为已完成、3为已取消")
    private PickupDispatchTaskStatus status;

    @ApiModelProperty("任务分配状态(2已分配，3待人工分配)")
    private PickupDispatchTaskAssignedStatus assignedStatus;

    @ApiModelProperty(value = "签收状态(1为已签收，2为拒收)")
    private PickupDispatchTaskSignStatus signStatus;

    @ApiModelProperty("寄件人姓名")
    private String senderName;

    @ApiModelProperty("寄件人手机号")
    private String senderPhone;

    @ApiModelProperty("寄件人详细地址")
    private String senderAddress;

    @ApiModelProperty("收件人姓名")
    private String receiverName;

    @ApiModelProperty("收件人手机号")
    private String receiverPhone;

    @ApiModelProperty("收件人地址")
    private String receiverAddress;

    @ApiModelProperty("物品类型")
    private String goodsType;

    @ApiModelProperty("重量，单位：kg")
    private BigDecimal weight;

    @ApiModelProperty("体积，单位：立方米")
    private BigDecimal volume;

    @ApiModelProperty("运费合计")
    private String freight;

    @ApiModelProperty("备注")
    private String remark;

    @ApiModelProperty("付款方式,1寄付，2到付")
    private Integer paymentMethod;

    @ApiModelProperty("付款状态,1未付，2已付")
    private Integer paymentStatus;

    @ApiModelProperty("签收人，1本人，2代收")
    private Integer signRecipient;

    @ApiModelProperty(value = "寄件地址id，这里指的是区/县的地址ID")
    private Long senderCountyId;

    @ApiModelProperty(value = "收件地址id，这里指的是区/县的地址ID")
    private Long receiverCountyId;

    @ApiModelProperty(value = "身份证号是否验证0：未验证 1：验证通过 2：验证未通过")
    private Integer idCardNoVerify;

    @ApiModelProperty(value = "身份证号")
    private String idCardNo;
}
