package com.sl.ms.web.manager.controller.oms;

import com.sl.ms.web.manager.service.OmsService;
import com.sl.ms.web.manager.vo.oms.OrderQueryVO;
import com.sl.ms.web.manager.vo.oms.OrderVO;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

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
    public R<OrderVO> findOrderById(@PathVariable("id") Long id) {
        return R.success(omsService.findOrderDetail(id));
    }

    @ApiOperation(value = "更新订单")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "订单id", required = true, example = "1")
    })
    @PostMapping("/{id}")
    public R<OrderVO> updateOrder(@PathVariable("id") Long id, @RequestBody OrderVO vo) {
        omsService.updateOrder(id, vo);
        return R.success();
    }
}
