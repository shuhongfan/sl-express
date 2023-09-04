package com.sl.ms.work.controller;


import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.ms.work.domain.dto.request.TransportOrderQueryDTO;
import com.sl.ms.work.domain.dto.response.OrderToTransportOrderDTO;
import com.sl.ms.work.domain.dto.response.TransportOrderStatusCountDTO;
import com.sl.ms.work.domain.enums.WorkExceptionEnum;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderSchedulingStatus;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderStatus;
import com.sl.ms.work.entity.TransportOrderEntity;
import com.sl.ms.work.service.TransportOrderService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 运单表 前端控制器
 */
@Slf4j
@RestController
@Api(tags = "运单服务")
@RequestMapping("transport-order")
public class TransportOrderController {

    @Resource
    private TransportOrderService transportOrderService;

    @PostMapping
    @ApiOperation(value = "新增运单", notes = "新增运单（订单转运单）")
    @ApiImplicitParam(name = "orderId", value = "订单id", required = true)
    public OrderToTransportOrderDTO orderToTransportOrder(@RequestParam("orderId") Long orderId) {
        TransportOrderEntity transportOrderEntity = this.transportOrderService.orderToTransportOrder(orderId);
        return BeanUtil.toBean(transportOrderEntity, OrderToTransportOrderDTO.class);
    }

    @PutMapping
    @ApiOperation(value = "更新状态", notes = "更新状态，不允许 CREATED 状态")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运单id", required = true),
            @ApiImplicitParam(name = "status", value = "订单状态", required = true),
    })
    public Boolean updateStatus(@RequestParam("id") String id,
                                @RequestParam("status") TransportOrderStatus status) {
        return this.transportOrderService.updateStatus(Arrays.asList(id), status);
    }

    @PostMapping("page")
    @ApiOperation(value = "分页查询", notes = "获取运单分页数据")
    public PageResponse<TransportOrderDTO> findByPage(@RequestBody TransportOrderQueryDTO transportOrderQueryDTO) {
        Page<TransportOrderEntity> pageResult = this.transportOrderService.findByPage(transportOrderQueryDTO);
        return new PageResponse<>(pageResult, TransportOrderDTO.class);
    }

    @GetMapping("{id}")
    @ApiOperation(value = "id查询", notes = "根据id获取运单信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运单号", required = true)
    })
    public TransportOrderDTO findById(@PathVariable("id") String id) {
        TransportOrderEntity transportOrder = this.transportOrderService.getById(id);
        if (ObjectUtil.isEmpty(transportOrder)) {
            throw new SLException(WorkExceptionEnum.TRANSPORT_ORDER_NOT_FOUND);
        }
        return BeanUtil.toBean(transportOrder, TransportOrderDTO.class);
    }


    @ApiOperation(value = "id查询", notes = "根据运单ids批量获取订单id")
    @GetMapping("/batch")
    List<TransportOrderDTO> findByIds(@RequestParam("ids") String[] ids) {
        List<TransportOrderEntity> list = this.transportOrderService.findByIds(ids);
        if (CollUtil.isEmpty(list)) {
            throw new SLException(WorkExceptionEnum.TRANSPORT_ORDER_NOT_FOUND);
        }
        return BeanUtil.copyToList(list, TransportOrderDTO.class);
    }


    @GetMapping("orderId/{orderId}")
    @ApiOperation(value = "订单id查询", notes = "根据订单id获取运单信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "orderId", value = "订单id", required = true)
    })
    public TransportOrderDTO findByOrderId(@PathVariable("orderId") Long orderId) {
        TransportOrderEntity transportOrder = this.transportOrderService.findByOrderId(orderId);
        if (ObjectUtil.isEmpty(transportOrder)) {
            throw new SLException(WorkExceptionEnum.TRANSPORT_ORDER_NOT_FOUND);
        }
        return BeanUtil.toBean(transportOrder, TransportOrderDTO.class);
    }

    @PostMapping("list")
    @ApiOperation(value = "订单id列表查询", notes = "根据多个订单id查询运单信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "orderIds", value = "订单id列表", required = true)
    })
    public List<TransportOrderDTO> findByOrderIds(@RequestParam(name = "orderIds") Long[] orderIds) {
        List<TransportOrderEntity> list = this.transportOrderService.findByOrderIds(orderIds);
        if (CollUtil.isEmpty(list)) {
            return new ArrayList<>();
        }
        return BeanUtil.copyToList(list, TransportOrderDTO.class);
    }

    @GetMapping("search")
    @ApiOperation(value = "搜索运单", notes = "根据运单号搜索运单")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "运单号", required = true)
    })
    public List<TransportOrderDTO> searchById(@RequestParam("id") String id) {
        List<TransportOrderEntity> entityList = this.transportOrderService.searchById(id);
        if (CollUtil.isEmpty(entityList)) {
            return ListUtil.empty();
        }
        return BeanUtil.copyToList(entityList, TransportOrderDTO.class);
    }

    @GetMapping("count")
    @ApiOperation(value = "统计", notes = "统计各个状态的数量")
    public List<TransportOrderStatusCountDTO> findStatusCount() {
        return this.transportOrderService.findStatusCount();
    }

    @PutMapping("updateByTaskId/{taskId}")
    @ApiOperation(value = "根据运输任务id修改运单", notes = "根据运输任务id批量修改运单，其中会涉及到下一个节点的流转，已经发送消息的业务")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "taskId", value = "运输任务id", required = true)
    })
    public boolean updateByTaskId(@PathVariable("taskId") String taskId) {
        return transportOrderService.updateByTaskId(Long.valueOf(taskId));
    }

    @PutMapping("batchUpdate")
    @ApiOperation(value = "批量更新状态", notes = "批量更新状态，不允许 CREATED 状态")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "运单id列表", required = true),
            @ApiImplicitParam(name = "status", value = "订单状态", required = true),
    })
    public Boolean updateStatus(@RequestParam("ids") List<String> ids,
                                @RequestParam("status") TransportOrderStatus status) {
        return this.transportOrderService.updateStatus(ids, status);
    }

    @GetMapping("pageQueryByTaskId")
    @ApiOperation(value = "分页条件查询运单列表", notes = "根据运输任务id分页查询运单列表，并模糊查询运单id")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, example = "1", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "pageSize", value = "页面大小", required = true, example = "10", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "taskId", value = "运输任务id", required = true, dataTypeClass = String.class),
            @ApiImplicitParam(name = "transportOrderId", value = "运单id", dataTypeClass = String.class)
    })
    public PageResponse<TransportOrderDTO> pageQueryByTaskId(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                                             @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
                                                             @RequestParam(name = "taskId") String taskId,
                                                             @RequestParam(name = "transportOrderId", required = false) String transportOrderId) {
        return transportOrderService.pageQueryByTaskId(page, pageSize, taskId, transportOrderId);
    }


}
