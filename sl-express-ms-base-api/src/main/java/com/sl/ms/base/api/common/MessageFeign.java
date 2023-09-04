package com.sl.ms.base.api.common;

import com.sl.ms.base.domain.base.LatestMessageDTO;
import com.sl.ms.base.domain.base.MessageAddDTO;
import com.sl.ms.base.domain.base.MessageDTO;
import com.sl.ms.base.domain.base.MessageQueryDTO;
import com.sl.transport.common.util.PageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 消息API
 */
@FeignClient(name = "sl-express-ms-base", contextId = "Message", path = "messages")
@ApiIgnore
public interface MessageFeign {
    /**
     * 新增消息
     *
     * @param messageAddDTO 消息新增对象
     */
    @PostMapping
    void add(@RequestBody MessageAddDTO messageAddDTO);

    /**
     * 标记已读
     *
     * @param id 消息id
     */
    @PutMapping("/{id}")
    void update2Read(@PathVariable("id") Long id);

    /**
     * 批量已读
     *
     * @param ids 消息id列表
     */
    @PutMapping("/batchRead")
    void batchRead(@RequestBody List<Long> ids);

    /**
     * 全部已读
     *
     * @param userId      用户id
     * @param contentType 消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，304派件消息，200：司机端公告，201：司机端系统通知
     */
    @PutMapping("readAll/{userId}/{contentType}")
    void readAll(@PathVariable("userId") Long userId,
                 @PathVariable("contentType") Integer contentType);

    /**
     * 查询消息列表
     *
     * @param messageQueryDTO 消息查询对象
     * @return 消息列表
     */
    @GetMapping
    List<MessageDTO> list(@SpringQueryMap MessageQueryDTO messageQueryDTO);

    /**
     * 根据类型查询消息数量
     *
     * @param messageQueryDTO 消息查询对象
     * @return 消息条数
     */
    @GetMapping("/countType")
    Integer countType(@SpringQueryMap MessageQueryDTO messageQueryDTO);

    /**
     * 最新消息查询
     *
     * @param messageQueryDTO 消息查询对象
     * @return 最新消息对象
     */
    @GetMapping("latestMessage")
    LatestMessageDTO latestMessage(@SpringQueryMap MessageQueryDTO messageQueryDTO);

    /**
     * 分页查询消息列表
     *
     * @param messageQueryDTO 消息查询对象
     * @return 分页数据
     */
    @GetMapping("/page")
    PageResponse<MessageDTO> page(@SpringQueryMap MessageQueryDTO messageQueryDTO);
}
