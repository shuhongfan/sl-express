package com.sl.ms.oms.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sl.ms.oms.dto.*;
import com.sl.ms.oms.entity.OrderEntity;
import com.sl.ms.oms.entity.OrderLocationEntity;
import com.sl.ms.oms.service.CrudOrderService;
import com.sl.ms.oms.service.OrderCargoService;
import com.sl.ms.oms.service.OrderLocationService;
import com.sl.ms.oms.service.OrderService;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 订单  前端控制器
 */
@Slf4j
@Api(tags = "订单管理")
@RestController
@RequestMapping("order")
public class OrderController {

    @Resource
    private OrderService orderService;
    @Resource
    private OrderLocationService orderLocationService;

    @Resource
    private CrudOrderService crudOrderService;

    @Resource
    private OrderCargoService orderCargoService;


    /**
     * 下单
     *
     * @param mailingSaveDTO 订单信息
     * @return 订单信息
     */
    @ApiOperation(value = "下单")
    @PostMapping
    public OrderDTO mailingSave(@RequestBody MailingSaveDTO mailingSaveDTO) throws Exception {
        log.info("保存订单信息:{}", JSONUtil.toJsonStr(mailingSaveDTO));
        return orderService.mailingSave(mailingSaveDTO);
    }

    /**
     * 预估总价
     *
     * @param mailingSaveDTO 订单信息
     * @return 预估信息
     */
    @ApiOperation("预估总价")
    @PostMapping("totalPrice")
    public OrderCarriageDTO totalPrice(@RequestBody MailingSaveDTO mailingSaveDTO) {
        return orderService.totalPrice(mailingSaveDTO);
    }

    @GetMapping("count")
    @ApiOperation(value = "统计", notes = "统计各个状态的数量")
    public List<OrderStatusCountDTO> count(@RequestParam("memberId") Long memberId) {
        return crudOrderService.groupByStatus(memberId);
    }

    /**
     * 修改订单信息
     *
     * @param id       订单id
     * @param orderDTO 订单信息
     * @return 订单信息
     */
    @PutMapping("/{id}")
    public OrderDTO updateById(@PathVariable(name = "id") Long id, @RequestBody OrderDTO orderDTO) {
        orderDTO.setId(id);
        OrderEntity order = BeanUtil.toBean(orderDTO, OrderEntity.class);
        orderService.updateById(order);
        return orderDTO;
    }

    /**
     * 获取订单分页数据
     *
     * @param orderDTO 查询条件
     * @return 订单分页数据
     */
    @PostMapping("/page")
    public PageResponse<OrderDTO> findByPage(@RequestBody OrderDTO orderDTO) {
        IPage<OrderEntity> orderIPage = crudOrderService.findByPage(orderDTO.getPage(), orderDTO.getPageSize(), orderDTO);
        List<OrderDTO> dtoList = new ArrayList<>();
        orderIPage.getRecords().forEach(order -> dtoList.add(BeanUtil.toBean(order, OrderDTO.class)));

        return PageResponse.<OrderDTO>builder()
                .items(dtoList)
                .pageSize(orderDTO.getPageSize())
                .page(orderDTO.getPage())
                .counts(orderIPage.getTotal())
                .pages(orderIPage.getPages()).build();
    }

    /**
     * 根据id获取订单详情
     *
     * @param id 订单Id
     * @return 订单详情
     */
    @GetMapping("/{id}")
    public OrderDTO findById(@PathVariable(name = "id") Long id) {
        OrderEntity orderEntity = orderService.getById(id);
        if (ObjectUtil.isNotEmpty(orderEntity)) {
            return BeanUtil.toBean(orderEntity, OrderDTO.class);
        }
        return null;
    }

    /**
     * 根据id获取订单详情
     *
     * @param id 订单Id
     * @return 订单详情
     */
    @GetMapping("detail/{id}")
    public OrderDetailDTO findDetailByOrderId(@PathVariable(name = "id") Long id) {
        OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
        OrderEntity orderEntity = orderService.getById(id);
        if (ObjectUtil.isEmpty(orderEntity)) {
           return null;
        }
        OrderDTO orderDTO = BeanUtil.toBean(orderEntity, OrderDTO.class);
        orderDetailDTO.setOrderDTO(orderDTO);
        OrderLocationDTO orderLocationByOrderId = orderLocationService.findOrderLocationByOrderId(id);
        orderDetailDTO.setOrderLocationDTO(orderLocationByOrderId);
        OrderCargoDTO orderCargoDTO = orderCargoService.findByOrderId(id);
        orderDetailDTO.getOrderDTO().setOrderCargoDto(orderCargoDTO);
        return orderDetailDTO;
    }

    /**
     * 根据ids获取集合
     *
     * @param ids 订单Ids
     * @return 订单详情
     */
    @GetMapping("ids")
    public List<OrderDTO> findByIds(@RequestParam(name = "ids") List<Long> ids) {
        List<OrderEntity> orders = orderService.listByIds(ids);
        return orders.stream().map(item -> BeanUtil.toBean(item, OrderDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * 列表查询
     * @param orderSearchDTO 条件
     * @return 订单列表
     */
    @ResponseBody
    @PostMapping("list")
    public List<OrderDTO> list(@RequestBody OrderSearchDTO orderSearchDTO) {
        LambdaQueryWrapper<OrderEntity> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ObjectUtil.isNotEmpty(orderSearchDTO.getStatus()), OrderEntity::getStatus, orderSearchDTO.getStatus());
        wrapper.in(CollUtil.isNotEmpty(orderSearchDTO.getReceiverCountyIds()), OrderEntity::getReceiverCountyId, orderSearchDTO.getReceiverCountyIds());
        wrapper.in(CollUtil.isNotEmpty(orderSearchDTO.getSenderCountyIds()), OrderEntity::getSenderCountyId, orderSearchDTO.getSenderCountyIds());
        wrapper.eq(ObjectUtil.isNotEmpty(orderSearchDTO.getCurrentAgencyId()), OrderEntity::getCurrentAgencyId, orderSearchDTO.getCurrentAgencyId());

        //快递员端进行条件查询取派件任务时，会传入关键词，作为订单id或姓名或手机号查询条件
        if (StringUtils.isNotBlank(orderSearchDTO.getKeyword())) {
            wrapper.like(ObjectUtil.isNotEmpty(orderSearchDTO.getOrderId()), OrderEntity::getId, orderSearchDTO.getKeyword())
                    .or().like(ObjectUtil.isNotEmpty(orderSearchDTO.getSenderName()), OrderEntity::getSenderName, orderSearchDTO.getSenderName())
                    .or().like(ObjectUtil.isNotEmpty(orderSearchDTO.getSenderPhone()), OrderEntity::getSenderPhone, orderSearchDTO.getSenderPhone())
                    .or().like(ObjectUtil.isNotEmpty(orderSearchDTO.getReceiverName()), OrderEntity::getReceiverName, orderSearchDTO.getReceiverName())
                    .or().like(ObjectUtil.isNotEmpty(orderSearchDTO.getReceiverPhone()), OrderEntity::getReceiverPhone, orderSearchDTO.getReceiverPhone());
        }
        return orderService.list(wrapper).stream().map(order -> BeanUtil.toBean(order, OrderDTO.class)).collect(Collectors.toList());
    }


    /**
     * 查询订单位置
     * @param orderId 订单ID
     * @return 位置
     */
    @GetMapping("location/{orderId}")
    public OrderLocationDTO findOrderLocationByOrderId(@PathVariable(name = "orderId") Long orderId) {
        return orderLocationService.findOrderLocationByOrderId(orderId);
    }

    /**
     * 根据orderId列表查询订单的location信息
     *
     * @param orderIds 订单id列表
     * @return 位置
     */
    @GetMapping("locations")
    public List<OrderLocationDTO> findOrderLocationByOrderIds(@RequestParam("orderIds") List<Long> orderIds) {
        QueryWrapper<OrderLocationEntity> queryWrapper = new QueryWrapper<OrderLocationEntity>()
                .in("order_id", orderIds);
        List<OrderLocationEntity> locationList = orderLocationService.list(queryWrapper);
        if (CollUtil.isNotEmpty(locationList)) {
            return locationList.stream().map(location -> {
                OrderLocationDTO locationDTO = new OrderLocationDTO();
                BeanUtil.copyProperties(location, locationDTO);
                return locationDTO;
            }).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    /**
     * 取件更新
     * @param orderPickupDTO 取件更新信息
     */
    @PutMapping("orderPickup")
    void orderPickup(@RequestBody OrderPickupDTO orderPickupDTO) {
        crudOrderService.orderPickup(orderPickupDTO);
    }

    /**
     * 状态更新
     * @param orderId 订单ID
     * @param code 状态码
     */
    @PutMapping("updateStatus")
    void updateStatus(@RequestParam("orderId") List<Long> orderId, @RequestParam("code") Integer code) {
        crudOrderService.updateStatus(orderId, code);
    }
}
