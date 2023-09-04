package com.sl.ms.base.domain.base;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("消息新增")
public class MessageAddDTO {
    /**
     * 消息标题
     */
    @ApiModelProperty("消息标题")
    private String title;

    /**
     * 消息内容
     */
    @ApiModelProperty("消息内容")
    @NotNull(message = "消息内容不能为空")
    private String content;

    /**
     * 1：用户端，2：司机端，3：快递员端，4：后台管理系统
     */
    @ApiModelProperty(value = "1：用户端，2：司机端，3：快递员端，4：后台管理系统", required = true)
    @Max(value = 4, message = "类型值必须是1、2、3、4")
    @Min(value = 1, message = "类型值必须是1、2、3、4")
    @NotNull(message = "业务类型不能为空")
    private Integer bussinessType;

    /**
     * 消息接受者
     */
    @ApiModelProperty("消息接受者")
    private Long userId;

    /**
     * 消息类型，300：司机端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，200：司机端公告，201：司机端系统通知
     */
    @ApiModelProperty("消息类型，300：司机端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，200：司机端公告，201：司机端系统通知")
    @NotNull(message = "消息类型不能为空")
    private Integer contentType;

    /**
     * 相关id
     */
    @ApiModelProperty("相关id")
    private Long relevantId;

    /**
     * 创建者
     */
    @ApiModelProperty("创建者")
    private Long createUser;

    /**
     * 更新者
     */
    @ApiModelProperty("更新者")
    private Long updateUser;
}
