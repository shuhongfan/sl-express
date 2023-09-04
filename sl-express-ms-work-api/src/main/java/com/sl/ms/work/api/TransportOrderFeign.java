package com.sl.ms.work.api;

import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.ms.work.domain.dto.request.TransportOrderQueryDTO;
import com.sl.ms.work.domain.dto.response.OrderToTransportOrderDTO;
import com.sl.ms.work.domain.dto.response.TransportOrderStatusCountDTO;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderStatus;
import com.sl.transport.common.util.PageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 运单相关Api
 *
 * @author jpfss
 */
@FeignClient(name = "sl-express-ms-work", contextId = "TransportOrder", path = "transport-order")
public interface TransportOrderFeign {

    /**
     * 新增运单（订单转运单）
     *
     * @param orderId 订单id
     * @return 运单信息
     */
    @PostMapping
    OrderToTransportOrderDTO orderToTransportOrder(@RequestParam("orderId") Long orderId);

    /**
     * 更新状态，不允许 CREATED 状态
     *
     * @param id     运单id
     * @param status 订单状态
     * @return 是否成功
     */
    @PutMapping
    Boolean updateStatus(@RequestParam("id") String id,
                         @RequestParam("status") TransportOrderStatus status);

    /**
     * 获取运单分页数据
     * @return 运单分页数据
     */
    @PostMapping("page")
    PageResponse<TransportOrderDTO> findByPage(@RequestBody TransportOrderQueryDTO transportOrderQueryDTO);

    /**
     * 根据id获取运单信息
     *
     * @param id 运单id
     * @return 运单信息
     */
    @GetMapping("/{id}")
    TransportOrderDTO findById(@PathVariable("id") String id);

    /**
     * 根据id获取运单信息
     *
     * @param id 运单id
     * @return 运单信息
     */
    @GetMapping("/batch")
    List<TransportOrderDTO> findByIds(@RequestParam("ids") String[] id);

    /**
     * 根据订单id获取运单信息
     *
     * @param orderId 订单id
     * @return 运单信息
     */
    @GetMapping("/orderId/{orderId}")
    TransportOrderDTO findByOrderId(@PathVariable("orderId") Long orderId);

    /**
     * 根据多个订单id查询运单信息
     *
     * @param orderIds 订单id列表
     * @return 运单列表
     */
    @PostMapping("list")
    List<TransportOrderDTO> findByOrderIds(@RequestParam(name = "orderIds") Long... orderIds);

    /**
     * 根据运单号搜索运单
     *
     * @param id 运单号
     * @return 运单列表
     */
    @GetMapping("search")
    List<TransportOrderDTO> searchById(@RequestParam("id") String id);

    /**
     * 统计各个状态的数量
     *
     * @return 状态数量数据
     */
    @GetMapping("count")
    List<TransportOrderStatusCountDTO> findStatusCount();

    /**
     * 根据运输任务id修改运单
     *
     * @param taskId 运输任务id
     * @return 是否成功
     */
    @PutMapping("updateByTaskId/{taskId}")
    boolean updateByTaskId(@PathVariable("taskId") String taskId);

    /**
     * 批量更新状态
     *
     * @param ids    运单id列表
     * @param status 订单状态
     * @return 是否成功
     */
    @PutMapping("batchUpdate")
    Boolean updateStatus(@RequestParam("ids") List<String> ids,
                         @RequestParam("status") TransportOrderStatus status);

    /**
     * 根据运输任务id分页查询运单信息
     *
     * @param page             页码
     * @param pageSize         页面大小
     * @param taskId           运输任务id
     * @param transportOrderId 运单id
     * @return 运单对象分页数据
     */
    @GetMapping("pageQueryByTaskId")
    PageResponse<TransportOrderDTO> pageQueryByTaskId(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                                      @RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
                                                      @RequestParam(name = "taskId") String taskId,
                                                      @RequestParam(name = "transportOrderId", required = false) String transportOrderId);
}
