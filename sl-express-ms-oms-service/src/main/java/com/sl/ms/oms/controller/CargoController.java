package com.sl.ms.oms.controller;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.sl.ms.oms.dto.OrderCargoDTO;
import com.sl.ms.oms.entity.OrderCargoEntity;
import com.sl.ms.oms.service.OrderCargoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 货品
 */
@RestController
@RequestMapping("cargo")
@Slf4j
public class CargoController {

    @Resource
    private OrderCargoService orderCargoService;

    /**
     * 获取货物列表
     *
     * @param tranOrderId 运单id
     * @param orderId     订单id
     * @return 货物列表
     */
    @GetMapping
    public List<OrderCargoDTO> findAll(@RequestParam(name = "tranOrderId", required = false) Long tranOrderId,
                                       @RequestParam(name = "orderId", required = false) Long orderId) {
        log.info("oms --- 查询货物列表");
        return orderCargoService.findAll(tranOrderId, orderId).stream().map(orderCargo -> {
            return BeanUtil.toBean(orderCargo, OrderCargoDTO.class);
        }).collect(Collectors.toList());
    }

    @GetMapping("/list")
    public List<OrderCargoDTO> list(@RequestParam(name = "orderIds", required = false) List<String> orderIds) {
        LambdaQueryWrapper<OrderCargoEntity> wrapper = new LambdaQueryWrapper<>();
        wrapper.in(CollUtil.isNotEmpty(orderIds), OrderCargoEntity::getOrderId, orderIds);

        return orderCargoService.list(wrapper).stream()
                .map(orderCargo -> BeanUtil.toBean(orderCargo, OrderCargoDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * 添加货物
     *
     * @param dto 货物信息
     * @return 货物信息
     */
    @PostMapping
    public OrderCargoDTO save(@RequestBody OrderCargoDTO dto) {
        log.info("保存货物信息：{}", dto);
        OrderCargoEntity orderCargo = BeanUtil.toBean(dto, OrderCargoEntity.class);
        orderCargoService.saveOrUpdate(orderCargo);
        log.info("货物信息入库：{}", dto);
        return BeanUtil.toBean(orderCargo, OrderCargoDTO.class);
    }

    /**
     * 更新货物信息
     *
     * @param id  货物id
     * @param dto 货物信息
     * @return 货物信息
     */
    @PutMapping("/{id}")
    public OrderCargoDTO update(@PathVariable(name = "id") Long id, @RequestBody OrderCargoDTO dto) {
        dto.setId(id);
        OrderCargoEntity orderCargo = BeanUtil.toBean(dto, OrderCargoEntity.class);
        orderCargoService.updateById(orderCargo);
        return dto;
    }

    /**
     * 删除货物信息
     *
     * @param id 货物id
     * @return 返回信息
     */
    @DeleteMapping("/{id}")
    public boolean del(@PathVariable(name = "id") Long id) {
        return orderCargoService.removeById(id);
    }


    /**
     * 根据id获取货物详情
     *
     * @param id 货物id
     * @return 货物详情
     */
    @GetMapping("/{id}")
    public OrderCargoDTO findById(@PathVariable(name = "id") Long id) {
        OrderCargoEntity orderCargo = orderCargoService.getById(id);
        return BeanUtil.toBean(orderCargo, OrderCargoDTO.class);
    }

    /**
     * 根据订单id获取货物详情
     *
     * @param id 订单id
     * @return 货物详情
     */
    @GetMapping("/findByOrderId/{id}")
    public OrderCargoDTO findByOrderId(@PathVariable(name = "id") Long id) {
        return orderCargoService.findByOrderId(id);
    }

    /**
     * 批量查询货物信息表
     *
     * @param name 热门货品名称
     * @return 货物信息表
     */
    @GetMapping("/hot")
    List<OrderCargoDTO> list(@RequestParam(name = "name", required = false) String name, Long memberId) {
        return orderCargoService.listRecent(name, memberId);
    }

}
