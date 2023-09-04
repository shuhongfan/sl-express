package com.sl.ms.web.courier.service;

import com.sl.ms.web.courier.vo.message.MessageQueryVO;
import com.sl.ms.web.courier.vo.message.MessageVO;
import com.sl.ms.web.courier.vo.message.MessagesHomeVO;
import com.sl.ms.web.courier.vo.message.NewNoticeInfoVO;
import com.sl.transport.common.util.PageResponse;

public interface MessageService {
    /**
     * 首页相关消息
     *
     * @return 首页消息对象
     */
    MessagesHomeVO homeMessage();

    /**
     * 获取新系统通知信息
     *
     * @return 新系统通知消息
     */
    NewNoticeInfoVO notice();

    /**
     * 标记已读
     *
     * @param id 消息id
     */
    void update2Read(Long id);

    /**
     * 全部已读
     *
     * @param contentType 消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，304派件消息
     */
    void readAll(Integer contentType);

    /**
     * 分页查询消息列表
     *
     * @param messageQueryVO 消息查询对象
     * @return 分页数据
     */
    PageResponse<MessageVO> page(MessageQueryVO messageQueryVO);
}
