package com.sl.ms.trade.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @ClassName PayChannelVo.java
 * @Description 支付通道
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("支付通道对象")
public class PayChannelDTO {

    @ApiModelProperty(value = "主键")
    private Long id;
    @ApiModelProperty(value = "通道名称")
    private String channelName;
    @ApiModelProperty(value = "通道唯一标记")
    private String channelLabel;
    @ApiModelProperty(value = "域名")
    private String domain;
    @ApiModelProperty(value = "商户appid")
    private String appId;
    @ApiModelProperty(value = "公钥")
    private String publicKey;
    @ApiModelProperty(value = "商户私钥")
    private String merchantPrivateKey;
    @ApiModelProperty(value = "其他配置")
    private String otherConfig;
    @ApiModelProperty(value = "AES混淆密钥")
    private String encryptKey;
    @ApiModelProperty(value = "说明")
    private String remark;
    @ApiModelProperty(value = "选中节点")
    private String[] checkedIds;
    @ApiModelProperty(value = "回调地址")
    private String notifyUrl;
    @ApiModelProperty(value = "是否有效")
    protected String enableFlag;
    @ApiModelProperty(value = "商户号")
    private Long enterpriseId;
    @ApiModelProperty(value = "创建时间")
    protected LocalDateTime createdTime;
    @ApiModelProperty(value = "更新时间")
    protected LocalDateTime updatedTime;
}
