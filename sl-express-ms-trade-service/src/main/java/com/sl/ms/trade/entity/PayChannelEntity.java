package com.sl.ms.trade.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * @Description：交易渠道表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName("sl_pay_channel")
public class PayChannelEntity extends BaseEntity {

    private static final long serialVersionUID = -1452774366739615656L;

    @ApiModelProperty(value = "通道名称")
    private String channelName;

    @ApiModelProperty(value = "通道唯一标记")
    private String channelLabel;

    @ApiModelProperty(value = "域名")
    private String domain;

    @ApiModelProperty(value = "商户appid")
    private String appId;

    @ApiModelProperty(value = "支付公钥")
    private String publicKey;

    @ApiModelProperty(value = "商户私钥")
    private String merchantPrivateKey;

    @ApiModelProperty(value = "其他配置")
    private String otherConfig;

    @ApiModelProperty(value = "AES混淆密钥")
    private String encryptKey;

    @ApiModelProperty(value = "说明")
    private String remark;

    @ApiModelProperty(value = "回调地址")
    private String notifyUrl;

    @ApiModelProperty(value = "是否有效")
    protected String enableFlag;

    @ApiModelProperty(value = "商户号")
    private Long enterpriseId;

}
