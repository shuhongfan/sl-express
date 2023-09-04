package com.sl.ms.oms.api;

import com.sl.ms.oms.dto.OrderCargoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@FeignClient(name = "sl-express-ms-oms", path = "cargo", contextId = "cargo")
@ApiIgnore
public interface CargoFeign {

    /**
     * 获取货物列表
     *
     * @param tranOrderId 运单id
     * @param orderId     订单id
     * @return 货物列表
     */
    @GetMapping
    List<OrderCargoDTO> findAll(@RequestParam(name = "tranOrderId", required = false) Long tranOrderId,
                                @RequestParam(name = "orderId", required = false) Long orderId);

    /**
     * 添加货物
     *
     * @param dto 货物信息
     * @return 货物信息
     */
    @PostMapping
    OrderCargoDTO save(@RequestBody OrderCargoDTO dto);

    /**
     * 更新货物信息
     *
     * @param id  货物id
     * @param dto 货物信息
     * @return 货物信息
     */
    @PutMapping("/{id}")
    OrderCargoDTO update(@PathVariable(name = "id") Long id, @RequestBody OrderCargoDTO dto);

    /**
     * 删除货物信息
     *
     * @param id 货物id
     * @return 返回信息
     */
    @DeleteMapping("/{id}")
    boolean del(@PathVariable(name = "id") Long id);

    /**
     * 根据id获取货物详情
     *
     * @param id 货物id
     * @return 货物详情
     */
    @GetMapping("/{id}")
    OrderCargoDTO findById(@PathVariable(name = "id") Long id);

    /**
     * 批量查询货物信息表
     *
     * @param orderIds 订单ids
     * @return 货物信息
     */
    @GetMapping("/list")
    List<OrderCargoDTO> list(@RequestParam(name = "orderIds", required = false) List<Long> orderIds);

    /**
     * 根据订单id获取货物详情
     *
     * @param id 订单id
     * @return 货物详情
     */
    @GetMapping("/findByOrderId/{id}")
    OrderCargoDTO findByOrderId(@PathVariable(name = "id") Long id);

    /**
     * 批量查询货物信息表
     *
     * @param name     热门货品名称
     * @param memberId 用户ID
     * @return 货物详情
     */
    @GetMapping("/hot")
    List<OrderCargoDTO> list(@RequestParam(name = "name", required = false) String name, @RequestParam(name = "memberId", required = false) Long memberId);
}
