package com.sl.ms.web.customer.vo.oms;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.math.BigDecimal;

@Data
public class MailingSaveVO {
    @ApiModelProperty("发件方地址簿id")
    private Long sendAddress;

    @ApiModelProperty("收件方地址簿id")
    private Long receiptAddress;

    @ApiModelProperty("取件时间")
    private String pickUpTime;

    @ApiModelProperty("取件方式")
    private Integer pickupType;

    @ApiModelProperty("付款方式,1.预结2到付")
    private Integer payMethod;

    @ApiModelProperty("物品类型")
    private String goodsType;

    @ApiModelProperty("物品名称")
    private String goodsName;

    @ApiModelProperty("物品数量")
    private Integer goodNum;

    /**
     * 货品总体积 m^3
     */
    @ApiModelProperty("货品总体积")
    private BigDecimal totalVolume;

    /**
     * 货品总重量 kg
     */
    @ApiModelProperty("货品总重量")
    private BigDecimal totalWeight;

    /**
     * 长，单位cm
     */
    @ApiModelProperty(value = "长，单位cm")
    @Min(value = 1, message = "长度最小为1")
    @Max(value = 999, message = "长度最大为999")
    private Integer measureLong;

    /**
     * 宽，单位cm
     */
    @ApiModelProperty(value = "宽，单位cm")
    @Min(value = 1, message = "宽度最小为1")
    @Max(value = 999, message = "宽度最大为999")
    private Integer measureWidth;

    /**
     * 高，单位cm
     */
    @ApiModelProperty(value = "高，单位cm")
    @Min(value = 1, message = "高度最小为1")
    @Max(value = 999, message = "高度最大为999")
    private Integer measureHigh;

    /**
     * 备注
     */
    @ApiModelProperty("备注")
    private String mark;
}
