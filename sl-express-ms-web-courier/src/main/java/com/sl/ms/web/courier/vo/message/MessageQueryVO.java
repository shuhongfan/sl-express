package com.sl.ms.web.courier.vo.message;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@ApiModel("消息分页查询")
public class MessageQueryVO {

    @ApiModelProperty("消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息,304:派件相关消息")
    private Integer contentType;

    @ApiModelProperty(value = "页码", example = "1",required = true)
    @NotNull(message = "页码不能为空！")
    private Integer page;

    @ApiModelProperty(value = "页面大小", example = "10",required = true)
    @NotNull(message = "页面大小不能为空")
    private Integer pageSize;
}
