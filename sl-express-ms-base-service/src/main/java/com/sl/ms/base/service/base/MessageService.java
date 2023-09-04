package com.sl.ms.base.service.base;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.domain.base.LatestMessageDTO;
import com.sl.ms.base.domain.base.MessageAddDTO;
import com.sl.ms.base.domain.base.MessageDTO;
import com.sl.ms.base.domain.base.MessageQueryDTO;
import com.sl.ms.base.entity.base.MessageEntity;
import com.sl.transport.common.util.PageResponse;

import java.util.List;

/**
 * 消息表  服务类
 */
public interface MessageService extends IService<MessageEntity> {
    /**
     * 新增消息
     *
     * @param messageAddDTO 消息新增对象
     */
    void add(MessageAddDTO messageAddDTO);

    /**
     * 标记已读
     *
     * @param id 消息id
     */
    void update2Read(Long id);

    /**
     * 批量已读
     *
     * @param ids 消息id列表
     */
    void batchRead(List<Long> ids);

    /**
     * 全部已读
     *
     * @param userId      用户id
     * @param contentType 消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，200：司机端公告，201：司机端系统通知
     */
    void readAll(Long userId, Integer contentType);

    /**
     * 查询消息列表
     *
     * @param messageQueryDTO 消息查询对象
     * @return 消息列表
     */
    List<MessageDTO> queryList(MessageQueryDTO messageQueryDTO);

    /**
     * 根据类型查询消息数量
     *
     * @param messageQueryDTO 消息查询对象
     * @return 消息条数
     */
    Integer countType(MessageQueryDTO messageQueryDTO);

    /**
     * 最新消息查询
     *
     * @param messageQueryDTO 消息查询对象
     * @return 最新消息对象
     */
    LatestMessageDTO latestMessage(MessageQueryDTO messageQueryDTO);

    /**
     * 分页查询消息列表
     *
     * @param messageQueryDTO 消息查询对象
     * @return 分页数据
     */
    PageResponse<MessageDTO> pageQuery(MessageQueryDTO messageQueryDTO);
}
