package com.sl.ms.web.courier.controller;

import com.sl.ms.web.courier.service.MessageService;
import com.sl.ms.web.courier.vo.message.MessageQueryVO;
import com.sl.ms.web.courier.vo.message.MessageVO;
import com.sl.ms.web.courier.vo.message.MessagesHomeVO;
import com.sl.ms.web.courier.vo.message.NewNoticeInfoVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Api(tags = "消息相关接口")
@RestController
@RequestMapping("/messages")
public class MessageController {

    @Resource
    private MessageService messageService;

    @GetMapping("/home/get")
    @ApiOperation("首页相关消息")
    public R<MessagesHomeVO> homeMessage() {
        return R.success(messageService.homeMessage());
    }

    @GetMapping("/notice/new/get")
    @ApiOperation("获取新系统通知信息")
    public R<NewNoticeInfoVO> notice() {
        return R.success(messageService.notice());
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "标记已读")
    @ApiImplicitParams({@ApiImplicitParam(name = "id", value = "取派件任务id", required = true, dataTypeClass = Long.class)})
    public R<Void> update2Read(@PathVariable("id") Long id) {
        messageService.update2Read(id);
        return R.success();
    }

    @PutMapping("readAll/{contentType}")
    @ApiOperation(value = "全部已读")
    @ApiImplicitParams({@ApiImplicitParam(name = "contentType", value = "消息类型，300：快递员端公告，301：寄件相关消息，302：签收相关消息，303：快件取消消息，304派件消息", required = true, dataTypeClass = Integer.class)})
    public R<Void> readAll(@PathVariable("contentType") Integer contentType) {
        messageService.readAll(contentType);
        return R.success();
    }

    @GetMapping("/page")
    @ApiOperation(value = "分页查询消息列表")
    public R<PageResponse<MessageVO>> page(MessageQueryVO messageQueryVO) {
        return R.success(messageService.page(messageQueryVO));
    }
}
