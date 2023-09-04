package com.sl.ms.base.domain.base;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@ApiModel("最新消息")
public class LatestMessageDTO {

    @ApiModelProperty("主键")
    private Long id;

    @ApiModelProperty("消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，200：司机端公告，201：司机端系统通知")
    private Integer contentType;

    @ApiModelProperty("相关id")
    private Long relevantId;

    @ApiModelProperty("创建时间")
    private LocalDateTime created;

}
