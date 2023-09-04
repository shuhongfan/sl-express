package com.sl.ms.web.driver.controller;

import com.sl.ms.web.driver.service.MessageService;
import com.sl.ms.web.driver.vo.response.MessageVO;
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

    @GetMapping("/page")
    @ApiOperation(value = "分页查询消息列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "contentType", value = "消息类型，200：司机端公告，201：司机端系统通知", required = true, dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "page", value = "页码", example = "1", required = true, dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "pageSize", value = "页面大小", example = "10", required = true, dataTypeClass = Integer.class)
    })
    public R<PageResponse<MessageVO>> page(@RequestParam("contentType") Integer contentType,
                                           @RequestParam(name = "page", defaultValue = "1") Integer page,
                                           @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize) {
        return R.success(messageService.page(contentType, page, pageSize));
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "标记已读")
    public R<Void> update2Read(@PathVariable("id") Long id) {
        messageService.update2Read(id);
        return R.success();
    }

    @GetMapping("/countType/{contentType}")
    @ApiOperation(value = "根据类型查询未读消息数量")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "contentType", value = "消息类型，200：司机端公告，201：司机端系统通知;特别的，0代表查询全部未读", defaultValue = "0", required = true, dataTypeClass = Integer.class)
    })
    public R<Integer> countType(@PathVariable("contentType") Integer contentType) {
        return R.success(messageService.countType(contentType));
    }

}
