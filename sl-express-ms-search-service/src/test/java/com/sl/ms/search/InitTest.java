package com.sl.ms.search;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.ObjectUtil;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.BulkRequest;
import com.sl.ms.oms.api.OrderFeign;
import com.sl.ms.oms.dto.OrderDTO;
import com.sl.ms.search.entity.CourierTaskEntity;
import com.sl.ms.work.api.PickupDispatchTaskFeign;
import com.sl.ms.work.api.TransportOrderFeign;
import com.sl.ms.work.domain.dto.PickupDispatchTaskDTO;
import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskStatus;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskType;
import com.sl.transport.common.exception.SLException;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * ES初始化数据
 **/
@Slf4j
@SpringBootTest
class InitTest {
    @Resource
    private ElasticsearchClient client;
    @Resource
    private OrderFeign orderFeign;
    @Resource
    private PickupDispatchTaskFeign pickupDispatchTaskFeign;
    @Resource
    private TransportOrderFeign transportOrderFeign;
    @Value("${sl.es.index_name}")
    private String indexName;

    /**
     * 初始化同步数据到es
     */
    @Test
    void init() throws IOException {
        // 1.删除所有文档（不需要删除的话，注释这部分代码）
        client.deleteByQuery(d -> d
                .index(indexName)
                .query(q -> q
                        .matchAll(m -> m)));

        // 2.查询全部取派件任务
        List<PickupDispatchTaskDTO> items = pickupDispatchTaskFeign.findAll(null, null, null, null);

        // 3.根据订单id列表批量查询订单
        List<String> orderIds = items.stream().map(item -> item.getOrderId().toString()).collect(Collectors.toList());
        List<OrderDTO> orderDTOS = orderFeign.findByIds(orderIds);
        Map<Long, OrderDTO> map = orderDTOS.stream().collect(Collectors.toMap(OrderDTO::getId, dto -> dto));

        // 4.数据封装为entity
        List<CourierTaskEntity> entities = new ArrayList<>();
        for (PickupDispatchTaskDTO item : items) {
            // 封装快递员任务对象
            CourierTaskEntity courierTaskEntity = this.getCourierTaskEntity(item, map);

            // 封装好的对象，添加到快递员任务列表
            entities.add(courierTaskEntity);
        }

        // 5.循环添加新增操作
        BulkRequest.Builder br = new BulkRequest.Builder();
        for (CourierTaskEntity entity : entities) {
            br.operations(op -> op.index(idx -> idx
                    .index(indexName)
                    .id(String.valueOf(entity.getId()))
                    .document(entity)));
        }

        // 6.批量新增
        client.bulk(br.build());
    }

    /**
     * 封装快递员任务对象
     *
     * @param pickupDispatchTaskDTO 取派件任务
     * @return 快递员任务
     */
    private CourierTaskEntity getCourierTaskEntity(PickupDispatchTaskDTO pickupDispatchTaskDTO, Map<Long, OrderDTO> map) {
        // 1.取派件任务字段复制到快递员任务
        CourierTaskEntity courierTaskEntity = BeanUtil.toBean(pickupDispatchTaskDTO, CourierTaskEntity.class);
        courierTaskEntity.setTaskType(pickupDispatchTaskDTO.getTaskType().getCode());
        courierTaskEntity.setStatus(pickupDispatchTaskDTO.getStatus().getCode());
        courierTaskEntity.setIsDeleted(pickupDispatchTaskDTO.getIsDeleted().getCode());


        // 2.根据id查询订单
        OrderDTO orderDTO = map.get(pickupDispatchTaskDTO.getOrderId());
        if (ObjectUtil.isEmpty(orderDTO)) {
            String errorMsg = CharSequenceUtil.format("id为{}的取派件任务的订单不存在！", pickupDispatchTaskDTO.getId());
            throw new SLException(errorMsg);
        }
        // 3.设置快递员任务的姓名、电话、地址字段
        this.setNameAndPhoneAndAddress(pickupDispatchTaskDTO.getTaskType(), orderDTO, courierTaskEntity);

        // 为快递员任务set运单号:取件任务新任务状态和已取消状态不查运单
        if (ObjectUtil.equal(PickupDispatchTaskType.DISPATCH, pickupDispatchTaskDTO.getTaskType()) || ObjectUtil.equal(PickupDispatchTaskStatus.COMPLETED, pickupDispatchTaskDTO.getStatus())) {
            TransportOrderDTO transportOrderDTO = transportOrderFeign.findByOrderId(pickupDispatchTaskDTO.getOrderId());
            courierTaskEntity.setTransportOrderId(transportOrderDTO.getId());// 运单id
        }
        return courierTaskEntity;
    }

    /**
     * 设置快递员任务的姓名、电话、地址字段
     *
     * @param taskType          任务类型
     * @param orderDTO          订单
     * @param courierTaskEntity 快递员任务
     */
    private void setNameAndPhoneAndAddress(PickupDispatchTaskType taskType, OrderDTO orderDTO, CourierTaskEntity courierTaskEntity) {
        String name;
        String phone;
        String address;
        if (taskType.equals(PickupDispatchTaskType.PICKUP)) {
            name = orderDTO.getSenderName();
            phone = orderDTO.getSenderPhone();
            address = orderDTO.getSenderAddress();
        } else {
            name = orderDTO.getReceiverName();
            phone = orderDTO.getReceiverPhone();
            address = orderDTO.getReceiverAddress();
        }
        courierTaskEntity.setAddress(address);
        courierTaskEntity.setName(name);
        courierTaskEntity.setPhone(phone);
    }

    @Test
    void setOrderFeign() throws IOException {
        List<PickupDispatchTaskDTO> items = pickupDispatchTaskFeign.findAll(null, null, null, null);
        System.out.println(items);

    }
}
