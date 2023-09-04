package com.sl.ms.web.customer.controller;

import com.sl.ms.web.customer.service.OmsService;
import com.sl.ms.web.customer.vo.oms.*;
import com.sl.ms.web.customer.vo.oms.pay.TradeLaunchVO;
import com.sl.ms.web.customer.vo.oms.pay.TradeResponseVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Map;

/**
 * 订单管理
 */
@RestController
@Api(tags = "订单管理")
@RequestMapping("order-manager/order")
@Slf4j
public class OrderController {

    @Resource
    private OmsService omsService;

    @ApiOperation(value = "获取订单分页数据")
    @PostMapping("/page")
    public R<PageResponse<OrderVO>> findByPage(@RequestBody OrderQueryVO vo) {
        return R.success(omsService.findByPage(vo));
    }

    @ApiOperation(value = "获取订单详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "订单id", required = true, example = "1")
    })
    @GetMapping("/{id}")
    public R<OrderVO> findOrderById(@PathVariable(name = "id") Long id) {
        return R.success(omsService.findOrderDetail(id));
    }

    @ApiOperation(value = "更新订单")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "订单id", required = true, example = "1")
    })
    @PostMapping("/{id}")
    public R<OrderVO> updateOrder(@PathVariable(name = "id") Long id, @RequestBody OrderVO vo) {
        omsService.updateOrder(id, vo);
        return R.success();
    }

    /**
     * 预估总价
     *
     * @param vo 订单信息
     * @return 订单总价
     */
    @ApiOperation("预估总价")
    @PostMapping("totalPrice")
    public R<OrderCarriageVO> totalPrice(@RequestBody MailingSaveVO vo) {
        OrderCarriageVO orderCarriageVO = omsService.totalPrice(vo);
        return R.success(orderCarriageVO);
    }

    /**
     * 下单
     *
     * @param vo 订单信息
     * @return 下单成功信息
     */
    @ApiOperation("下单")
    @PostMapping
    public R<OrderVO> mailingSave(@RequestBody MailingSaveVO vo) {
        log.info("下单：{}", vo);
        OrderVO orderVO = omsService.mailingSave(vo);
        return R.success(orderVO);
    }

    /**
     * 修改 下单
     *
     * @param vo 订单信息
     * @return 结果类
     */
    @ApiOperation("修改订单")
    @PutMapping("/{id}")
    public R<Void> update(@PathVariable("id") Long id, @RequestBody OrderVO vo) {
        log.info("修改订单 id:{} params：{}", id, vo);
        omsService.updateOrder(id, vo);
        return R.success();
    }

    /**
     * 支付 下单
     *
     * @return 结果
     */
    @ApiOperation("支付")
    @PutMapping("/pay")
    public R<TradeResponseVO> pay(@RequestBody TradeLaunchVO tradeLaunchVO) {
        TradeResponseVO pay = omsService.pay(tradeLaunchVO);
        return R.success(pay);
    }


    /**
     * 取消 下单
     *
     * @return 结果
     */
    @ApiOperation("取消")
    @PutMapping("/cancel/{id}")
    public R<Void> cancel(@PathVariable("id") Long id) {
        log.info("客户取消订单：{}", id);
        omsService.cancel(id);
        return R.success();
    }

    /**
     * 删除 下单
     *
     * @return 结果
     */
    @ApiOperation("删除")
    @PutMapping("/del/{id}")
    public R<Void> del(@PathVariable("id") Long id) {
        log.info("客户删除订单：{}", id);
        omsService.delOrder(id);
        return R.success();
    }


    @ApiOperation("数量统计")
    @GetMapping("/count")
    public R<Map<Integer, Long>> count() {
        Map<Integer, Long> count = omsService.count();
        return R.success(count);
    }

    @ApiOperation(value = "获取运单轨迹详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运单id", required = true, example = "1")
    })
    @GetMapping("/track/{id}")
    public R<TrackVO> findTrackById(@PathVariable(name = "id") String id) {
        TrackVO track = omsService.findTrackById(id);
        return R.success(track);
    }
}
