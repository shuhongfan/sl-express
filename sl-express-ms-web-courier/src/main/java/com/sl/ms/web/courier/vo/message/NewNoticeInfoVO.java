package com.sl.ms.web.courier.vo.message;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@ApiModel("新系统通知信息")
public class NewNoticeInfoVO {
    @ApiModelProperty("是否有新的寄件消息")
    private Boolean haveNewSendNotice;

    @ApiModelProperty("新寄件消息时间")
    private LocalDateTime newSendNoticeTime;

    @ApiModelProperty("是否有新的签收消息")
    private Boolean haveNewReceiveNotice;

    @ApiModelProperty("新签收消息时间")
    private LocalDateTime newReceiveNoticeTime;

    @ApiModelProperty("是否有快件取消消息")
    private Boolean haveNewCancelNotice;

    @ApiModelProperty("新快件取消消息时间")
    private LocalDateTime newCancelNoticeTime;

    @ApiModelProperty("是否有派件消息")
    private Boolean haveNewDispatchNotice;

    @ApiModelProperty("新派件消息时间")
    private LocalDateTime newDispatchNoticeTime;
}
