package com.sl.ms.web.courier.vo.task;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@ApiModel("取件模型")
public class TaskPickupVO {
    @ApiModelProperty(value = "取件任务id", required = true)
    private String id;

    @ApiModelProperty(value = "物品名称")
    private String goodName;

    @ApiModelProperty(value = "体积，单位m^3", required = true)
    private BigDecimal volume;

    @ApiModelProperty(value = "重量，单位kg", required = true)
    private BigDecimal weight;

    @ApiModelProperty("备注")
    private String remark;

    @ApiModelProperty(value = "付款方式,1.寄付，2到付", required = true)
    @NotNull(message = "付款方式不能为空！")
    @Range(min = 1, max = 2, message = "付款方式只能取1或2！")
    private Integer payMethod;

    @ApiModelProperty(value = "金额", required = true)
    @NotNull(message = "金额不能为空！")
    @DecimalMin(value = "0.01", message = "金额必须>=0.01！")
    private BigDecimal amount;

    @ApiModelProperty("身份证号")
    private String idCard;

    @ApiModelProperty(value = "姓名")
    private String name;
}
