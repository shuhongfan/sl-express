package com.sl.ms.web.driver.service;

import com.sl.ms.web.driver.vo.response.MessageVO;
import com.sl.transport.common.util.PageResponse;

public interface MessageService {

    /**
     * 分页查询消息列表
     *
     * @param contentType 消息类型，200：司机端公告，201：司机端系统通知
     * @param page        页码
     * @param pageSize    页面大小
     * @return 分页数据
     */
    PageResponse<MessageVO> page(Integer contentType, Integer page, Integer pageSize);

    /**
     * 标记已读
     *
     * @param id 消息id
     */
    void update2Read(Long id);

    /**
     * 根据类型查询未读消息数量
     *
     * @param contentType 消息类型，200：司机端公告，201：司机端系统通知;特别的，0代表查询全部未读
     * @return 未读消息条数
     */
    Integer countType(Integer contentType);
}
