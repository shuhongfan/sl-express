package com.sl.ms.base.entity.base;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 消息表
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@TableName("sl_message")
public class MessageEntity extends BaseEntity{

    private static final long serialVersionUID = 4805339214539835115L;
    /**
     * 消息标题
     */
    private String title;

    /**
     * 消息内容
     */
    private String content;

    /**
     * 1：用户端，2：司机端，3：快递员端，4：后台管理系统
     */
    private Integer bussinessType;

    /**
     * 消息接受者
     */
    private Long userId;

    /**
     * 消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，200：司机端公告，201：司机端系统通知
     */
    private Integer contentType;

    /**
     * 消息是否已读，0：未读，1：已读
     */
    private Integer isRead;

    /**
     * 读时间
     */
    private LocalDateTime readTime;

    /**
     * 相关id
     */
    private Long relevantId;

    /**
     * 创建者
     */
    private Long createUser;

    /**
     * 更新者
     */
    private Long updateUser;

    /**
     * 逻辑删除，0：未删除，1：已删除
     */
    private Integer isDelete;
}
