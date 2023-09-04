package com.sl.ms.base.controller.base;

import com.sl.ms.base.domain.base.LatestMessageDTO;
import com.sl.ms.base.domain.base.MessageAddDTO;
import com.sl.ms.base.domain.base.MessageDTO;
import com.sl.ms.base.domain.base.MessageQueryDTO;
import com.sl.ms.base.service.base.MessageService;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping("/messages")
@Api(value = "Message", tags = "消息相关接口")
public class MessageController {
    @Resource
    private MessageService messageService;

    @ApiOperation(value = "新增消息")
    @PostMapping
    public void add(@RequestBody MessageAddDTO messageAddDTO) {
        messageService.add(messageAddDTO);
    }

    @ApiOperation(value = "标记已读")
    @PutMapping("/{id}")
    public void update2Read(@PathVariable("id") Long id) {
        messageService.update2Read(id);
    }

    @ApiOperation(value = "批量已读")
    @PutMapping("/batchRead")
    public void batchRead(@RequestBody List<Long> ids) {
        messageService.batchRead(ids);
    }

    @ApiOperation(value = "全部已读")
    @PutMapping("readAll/{userId}/{contentType}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "用户id", required = true, dataTypeClass = Long.class),
            @ApiImplicitParam(name = "contentType", value = "消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，304派件消息", required = true, dataTypeClass = Integer.class)
    })
    public void readAll(@PathVariable("userId") Long userId,
                        @PathVariable("contentType") Integer contentType) {
        messageService.readAll(userId, contentType);
    }

    @ApiOperation(value = "查询消息列表")
    @GetMapping
    public List<MessageDTO> list(@SpringQueryMap MessageQueryDTO messageQueryDTO) {
        return messageService.queryList(messageQueryDTO);
    }

    @ApiOperation(value = "根据类型查询消息数量")
    @GetMapping("/countType")
    public Integer countType(@SpringQueryMap MessageQueryDTO messageQueryDTO) {
        return messageService.countType(messageQueryDTO);
    }

    @ApiOperation(value = "最新消息查询")
    @GetMapping("latestMessage")
    public LatestMessageDTO latestMessage(@SpringQueryMap MessageQueryDTO messageQueryDTO) {
        return messageService.latestMessage(messageQueryDTO);
    }

    @ApiOperation(value = "分页查询消息列表")
    @GetMapping("/page")
    public PageResponse<MessageDTO> page(@SpringQueryMap MessageQueryDTO messageQueryDTO) {
        return messageService.pageQuery(messageQueryDTO);
    }
}
