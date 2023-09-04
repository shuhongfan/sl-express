package com.sl.ms.oms.api;

import com.sl.ms.oms.dto.*;
import com.sl.transport.common.util.PageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@FeignClient(name = "sl-express-ms-oms", path = "order", contextId = "order")
@ApiIgnore
public interface OrderFeign {
    /**
     * 新增订单
     * 下单 寄件
     *
     * @param mailingSaveDTO 订单信息
     * @return 订单信息
     */
    @PostMapping
    OrderDTO mailingSave(@RequestBody MailingSaveDTO mailingSaveDTO);

    /**
     * 预估总价
     *
     * @param mailingSaveDTO 订单信息
     * @return 预估信息
     */
    @PostMapping("totalPrice")
    OrderCarriageDTO totalPrice(@RequestBody MailingSaveDTO mailingSaveDTO);

    /**
     * 统计各个状态的数量
     *
     * @param memberId 用户ID
     * @return 状态数量数据
     */
    @GetMapping("count")
    List<OrderStatusCountDTO> count(@RequestParam("memberId") Long memberId);

    /**
     * 修改订单信息
     *
     * @param id       订单id
     * @param orderDTO 订单信息
     * @return 订单信息
     */
    @PutMapping("/{id}")
    OrderDTO updateById(@PathVariable(name = "id") Long id, @RequestBody OrderDTO orderDTO);

    /**
     * 获取订单分页数据
     *
     * @param orderDTO 查询条件
     * @return 订单分页数据
     */
    @PostMapping("/page")
    PageResponse<OrderDTO> findByPage(@RequestBody OrderDTO orderDTO);

    /**
     * 根据id获取订单详情
     *
     * @param id 订单Id
     * @return 订单详情
     */
    @GetMapping("/{id}")
    OrderDTO findById(@PathVariable(name = "id") Long id);

    /**
     * 根据id获取集合
     *
     * @param ids 订单Id
     * @return 订单详情
     */
    @GetMapping("ids")
    List<OrderDTO> findByIds(@RequestParam("ids") List<String> ids);

    /**
     * 列表查询
     *
     * @param orderSearchDTO 条件
     * @return 订单列表
     */
    @PostMapping("list")
    List<OrderDTO> list(@RequestBody OrderSearchDTO orderSearchDTO);

    /**
     * 查询订单位置
     *
     * @param orderId 订单ID
     * @return 位置
     */
    @GetMapping("location/{orderId}")
    OrderLocationDTO findOrderLocationByOrderId(@PathVariable(name = "orderId") Long orderId);

    /**
     * 根据orderId列表查询订单的location信息
     *
     * @param orderIds 订单id列表
     * @return 位置
     */
    @GetMapping("locations")
    List<OrderLocationDTO> findOrderLocationByOrderIds(@RequestParam("orderIds") List<String> orderIds);

    /**
     * 取件更新
     *
     * @param orderPickupDTO 取件更新信息
     */
    @PutMapping("orderPickup")
    void orderPickup(@RequestBody OrderPickupDTO orderPickupDTO);

    /**
     * 状态更新
     *
     * @param orderId 订单ID
     * @param code    状态码
     */
    @PutMapping("updateStatus")
    void updateStatus(@RequestParam("orderId") List<Long> orderId, @RequestParam("code") Integer code);

    /**
     * 根据id获取订单详情
     *
     * @param id 订单Id
     * @return 订单详情
     */
    @GetMapping("detail/{id}")
    OrderDetailDTO findDetailByOrderId(@PathVariable(name = "id") Long id);
}
