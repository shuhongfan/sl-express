package com.sl.ms.base.controller.base;

import com.sl.mq.service.MQService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 通用的消息中间件发送接口
 *
 * @author zzj
 * @version 1.0
 */
@Slf4j
@Validated
@RestController
@RequestMapping("mq")
@Api(tags = "通用的消息中间件")
public class MQController {

    @Resource
    private MQService mqService;

    @PostMapping
    @ApiOperation(value = "发送实时消息", notes = "发送实时消息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "exchange", value = "交换机", required = true),
            @ApiImplicitParam(name = "routingKey", value = "路由key，非必须"),
            @ApiImplicitParam(name = "msg", value = "消息对象（json字符串）", required = true)
    })
    public boolean sendMsg(@RequestParam("exchange") String exchange,
                           @RequestParam(value = "routingKey", required = false) String routingKey,
                           @RequestParam("msg") String msg) {
        return this.mqService.sendMsg(exchange, routingKey, msg);
    }

    @PostMapping("delay")
    @ApiOperation(value = "发送延迟消息", notes = "发送延迟消息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "exchange", value = "交换机", required = true),
            @ApiImplicitParam(name = "routingKey", value = "路由key，非必须"),
            @ApiImplicitParam(name = "msg", value = "消息对象（json字符串）", required = true),
            @ApiImplicitParam(name = "delay", value = "延时时间，单位：毫秒", required = true)
    })
    public boolean sendMsg(@RequestParam("exchange") String exchange,
                           @RequestParam(value = "routingKey", required = false) String routingKey,
                           @RequestParam("msg") String msg,
                           @RequestParam("delay") int delay) {
        return this.mqService.sendMsg(exchange, routingKey, msg, delay);
    }

}
