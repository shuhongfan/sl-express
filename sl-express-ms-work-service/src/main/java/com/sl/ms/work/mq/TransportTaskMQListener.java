package com.sl.ms.work.mq;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.sl.ms.base.api.truck.TruckPlanFeign;
import com.sl.ms.base.domain.truck.TruckPlanDto;
import com.sl.ms.driver.api.DriverJobFeign;
import com.sl.ms.transport.api.TransportLineFeign;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderSchedulingStatus;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskAssignedStatus;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskLoadingStatus;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskStatus;
import com.sl.ms.work.entity.TransportOrderEntity;
import com.sl.ms.work.entity.TransportOrderTaskEntity;
import com.sl.ms.work.entity.TransportTaskEntity;
import com.sl.ms.work.service.TransportOrderService;
import com.sl.ms.work.service.TransportOrderTaskService;
import com.sl.ms.work.service.TransportTaskService;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.domain.TransportLineDTO;
import com.sl.transport.domain.TransportLineSearchDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class TransportTaskMQListener {

    @Autowired
    private DriverJobFeign driverJobFeign;

    @Autowired
    private TruckPlanFeign truckPlanFeign;

    @Autowired
    private TransportLineFeign transportLineFeign;

    @Autowired
    private TransportTaskService transportTaskService;

    @Autowired
    private TransportOrderTaskService transportOrderTaskService;

    @Autowired
    private TransportOrderService transportOrderService;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = Constants.MQ.Queues.WORK_TRANSPORT_TASK_CREATE),
            exchange = @Exchange(name = Constants.MQ.Exchanges.TRANSPORT_TASK, type = ExchangeTypes.TOPIC),
            key = Constants.MQ.RoutingKeys.TRANSPORT_TASK_CREATE
    ))
    public void listenTransportTaskMsg(String msg) {
        //解析消息 {"driverIds":[123,345], "truckPlanId":456, "truckId":1210114964812075008,"totalVolume":4.2,"endOrganId":90001,"totalWeight":7,"transportOrderIdList":[320733749248,420733749248],"startOrganId":100280}
        JSONObject jsonObject = JSONUtil.parseObj(msg);

//        获取到司机ID列表
        List<Long> driverIds = CollUtil.getFieldValues(jsonObject, "driverIds", Long.class);

//        分配状态
        TransportTaskAssignedStatus assignedStatus = CollUtil.isEmpty(driverIds) ? TransportTaskAssignedStatus.MANUAL_DISTRIBUTED : TransportTaskAssignedStatus.DISTRIBUTED;

//        创建运输任务
        Long transportTaskId = createTransportTask(jsonObject, assignedStatus);

        if (CollUtil.isEmpty(driverIds)) {
            log.info("生成司机作业单，司机列表为空，需要手动设置司机作业单->msg={}", msg);
            return;
        }

//        生成司机作业单
        driverIds.forEach(driverId -> driverJobFeign.createDriverJob(transportTaskId, driverId));
    }

    /**
     * 生成运输任务
     *
     * @param jsonObject
     * @param assignedStatus
     * @return
     */
    @Transactional
    public Long createTransportTask(JSONObject jsonObject, TransportTaskAssignedStatus assignedStatus) {
        //根据车辆计划id查询预计发车时间和预计到达时间
        Long truckPlanId = jsonObject.getLong("truckPlanId");
        TruckPlanDto truckPlanDto = truckPlanFeign.findById(truckPlanId);

//        创建运输任务
        TransportTaskEntity transportTaskEntity = TransportTaskEntity.builder()
                .truckPlanId(jsonObject.getLong("truckPlanId"))
                .truckId(jsonObject.getLong("truckId"))
                .startAgencyId(jsonObject.getLong("startOrganId"))
                .endAgencyId(jsonObject.getLong("endOrganId"))
                .transportTripsId(jsonObject.getLong("transportTripsId"))
                .assignedStatus(assignedStatus)
                .planDepartureTime(truckPlanDto.getPlanDepartureTime())
                .planArrivalTime(truckPlanDto.getPlanArrivalTime())
                .status(TransportTaskStatus.PENDING)
                .build();

        if (CollUtil.isEmpty(jsonObject.getJSONArray("transportOrderIdList"))) {
            transportTaskEntity.setLoadingStatus(TransportTaskLoadingStatus.EMPTY);
        } else {
            transportTaskEntity.setLoadingStatus(TransportTaskLoadingStatus.FULL);
        }

//        查询线路距离
        TransportLineSearchDTO transportLineSearchDTO = new TransportLineSearchDTO();
        transportLineSearchDTO.setPage(1);
        transportLineSearchDTO.setPageSize(1);
        transportLineSearchDTO.setStartOrganId(transportTaskEntity.getStartAgencyId());
        transportLineSearchDTO.setEndOrganId(transportTaskEntity.getEndAgencyId());

        PageResponse<TransportLineDTO> transportLineDTOPageResponse = transportLineFeign.queryPageList(transportLineSearchDTO);
        TransportLineDTO transportLineDTO = CollUtil.getFirst(transportLineDTOPageResponse.getItems());
        if (ObjectUtil.isNotEmpty(transportLineDTO)) {
//            设置距离
            transportTaskEntity.setDistance(transportLineDTO.getDistance());
        }

//        保存数据
        transportTaskService.save(transportTaskEntity);

//        创建运输任务与运单之间的关系
        createTransportOrderTask(transportTaskEntity.getId(), jsonObject);
        return transportTaskEntity.getId();
    }

    /**
     * 创建运输任务与运单之间的关系
     *
     * @param transportTaskId
     * @param jsonObject
     */
    private void createTransportOrderTask(final Long transportTaskId, final JSONObject jsonObject) {
        JSONArray transportOrderIdList = jsonObject.getJSONArray("transportOrderIdList");
        if (CollUtil.isEmpty(transportOrderIdList)) {
            return;
        }

//        将运单ID列表转成运单实体列表
        List<TransportOrderTaskEntity> resultList = transportOrderIdList.stream()
                .map(orderId -> {
                    TransportOrderTaskEntity transportOrderTaskEntity = new TransportOrderTaskEntity();
                    transportOrderTaskEntity.setTransportTaskId(transportTaskId);
                    transportOrderTaskEntity.setTransportOrderId(Convert.toStr(orderId));
                    return transportOrderTaskEntity;
                })
                .collect(Collectors.toList());

//        批量保存运输任务与运单的关联表
        transportOrderTaskService.batchSaveTransportOrder(resultList);

//        批量标记运单为以调度状态
        List<TransportOrderEntity> list = transportOrderIdList.stream().map(orderId -> {
            TransportOrderEntity transportOrderEntity = new TransportOrderEntity();
            transportOrderEntity.setId(Convert.toStr(orderId));
//            状态设置为已调度
            transportOrderEntity.setSchedulingStatus(TransportOrderSchedulingStatus.SCHEDULED);
            return transportOrderEntity;
        }).collect(Collectors.toList());

        transportOrderService.updateBatchById(list);
    }
}