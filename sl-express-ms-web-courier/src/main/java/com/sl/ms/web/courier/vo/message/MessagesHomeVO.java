package com.sl.ms.web.courier.vo.message;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel("首页消息相关模型")
@Data
public class MessagesHomeVO {
    @ApiModelProperty("多少分钟前的订单")
    private Integer minutes;

    @ApiModelProperty("当前是否有未读消息")
    private Boolean unRead;

    @ApiModelProperty("新消息")
    private int newsNum;

    @ApiModelProperty("最新信息")
    private String recentMsg;

    @ApiModelProperty("消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息")
    private Integer contentType;
}
