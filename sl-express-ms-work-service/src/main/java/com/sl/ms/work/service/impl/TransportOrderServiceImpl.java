package com.sl.ms.work.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.date.DateField;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.alibaba.csp.sentinel.datasource.Converter;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.api.common.MQFeign;
import com.sl.ms.oms.api.OrderFeign;
import com.sl.ms.oms.dto.OrderCargoDTO;
import com.sl.ms.oms.dto.OrderDetailDTO;
import com.sl.ms.oms.dto.OrderLocationDTO;
import com.sl.ms.transport.api.OrganFeign;
import com.sl.ms.transport.api.TransportLineFeign;
import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.ms.work.domain.dto.request.TransportOrderQueryDTO;
import com.sl.ms.work.domain.dto.response.TransportOrderStatusCountDTO;
import com.sl.ms.work.domain.enums.WorkExceptionEnum;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskType;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderSchedulingStatus;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderStatus;
import com.sl.ms.work.entity.TransportOrderEntity;
import com.sl.ms.work.entity.TransportOrderTaskEntity;
import com.sl.ms.work.mapper.TransportOrderMapper;
import com.sl.ms.work.mapper.TransportOrderTaskMapper;
import com.sl.ms.work.service.TransportOrderService;
import com.sl.ms.work.service.TransportTaskService;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.enums.IdEnum;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.service.IdService;
import com.sl.transport.common.util.DateUtils;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.OrderMsg;
import com.sl.transport.common.vo.TransportInfoMsg;
import com.sl.transport.common.vo.TransportOrderMsg;
import com.sl.transport.common.vo.TransportOrderStatusMsg;
import com.sl.transport.domain.OrganDTO;
import com.sl.transport.domain.TransportLineNodeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TransportOrderServiceImpl extends
        ServiceImpl<TransportOrderMapper, TransportOrderEntity> implements TransportOrderService {


    @Autowired
    private OrderFeign orderFeign;

    @Autowired
    private TransportLineFeign transportLineFeign;

    @Autowired
    private IdService idService;

    @Autowired
    private MQFeign mqFeign;
    @Autowired
    private OrganFeign organFeign;
    @Autowired
    private TransportOrderTaskMapper transportOrderTaskMapper;

    @Autowired
    private TransportTaskService transportTaskService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public TransportOrderEntity orderToTransportOrder(Long orderId) {
//        幂等性校验
        TransportOrderEntity transportOrderEntity = this.findByOrderId(orderId);
        if (ObjectUtil.isNotEmpty(transportOrderEntity)) {
            return transportOrderEntity;
        }

//        查询订单
        OrderDetailDTO detailByOrderId = this.orderFeign.findDetailByOrderId(orderId);
        if (ObjectUtil.isEmpty(detailByOrderId)) {
            throw new SLException(WorkExceptionEnum.ORDER_NOT_FOUND);
        }

//        校验货物的重量和体积数据
        OrderCargoDTO cargoDTO = detailByOrderId.getOrderDTO().getOrderCargoDto();
        if (ObjectUtil.isEmpty(cargoDTO)) {
            throw new SLException(WorkExceptionEnum.ORDER_CARGO_NOT_FOUND);
        }

//        检验位置信息
        OrderLocationDTO orderLocationDTO = detailByOrderId.getOrderLocationDTO();
        if (ObjectUtil.isEmpty(orderLocationDTO)) {
            throw new SLException(WorkExceptionEnum.ORDER_LOCATION_NOT_FOUND);
        }

//        起始网点ID
        Long sendAgentId = Convert.toLong(orderLocationDTO.getSendAgentId());
//        终点网点ID
        Long receiveAgentId = Convert.toLong(orderLocationDTO.getReceiveAgentId());

//        默认参与调度
        boolean isDispatch = true;
        TransportLineNodeDTO transportLineNodeDTO = null;
        if (ObjectUtil.equal(sendAgentId, receiveAgentId)) {
//            起点终点是同一个网点，不需要规划路线，直接发消息生成派件任务即可
            isDispatch = false;
        } else {
//            根据起点机构规划运输路线
            transportLineNodeDTO = this.transportLineFeign.queryPathByDispatchMethod(sendAgentId, receiveAgentId);
            if (ObjectUtil.isEmpty(transportLineNodeDTO) || CollUtil.isEmpty(transportLineNodeDTO.getNodeList())) {
                throw new SLException(WorkExceptionEnum.TRANSPORT_LINE_NOT_FOUND);
            }
        }

//        创建新的运单对象
        TransportOrderEntity transportOrder = new TransportOrderEntity();
//        设置ID
        transportOrder.setId(idService.getId(IdEnum.TRANSPORT_ORDER));
//        订单ID
        transportOrder.setOrderId(orderId);
//        起始网点ID
        transportOrder.setStartAgencyId(sendAgentId);
//        终点网点ID
        transportOrder.setEndAgencyId(receiveAgentId);
//        当前所在机构ID
        transportOrder.setCurrentAgencyId(sendAgentId);


        if (ObjectUtil.isNotEmpty(transportLineNodeDTO)) {
            //运单状态(1.新建 2.已装车 3.运输中 4.到达终端网点 5.已签收 6.拒收)
            transportOrder.setStatus(TransportOrderStatus.CREATED);
            //调度状态(1.待调度2.未匹配线路3.已调度)
            transportOrder.setSchedulingStatus(TransportOrderSchedulingStatus.TO_BE_SCHEDULED);
            //下一个机构id
            transportOrder.setNextAgencyId(transportLineNodeDTO.getNodeList().get(1).getId());
            //完整的运输路线
            transportOrder.setTransportLine(JSONUtil.toJsonStr(transportLineNodeDTO));
        } else {
//            下个网点就是当前网点
            transportOrder.setNextAgencyId(sendAgentId);
            //运单状态(1.新建 2.已装车 3.运输中 4.到达终端网点 5.已签收 6.拒收)
            transportOrder.setStatus(TransportOrderStatus.ARRIVED_END);
            //调度状态(1.待调度2.未匹配线路3.已调度)
            transportOrder.setSchedulingStatus(TransportOrderSchedulingStatus.SCHEDULED);
        }

        boolean result = super.save(transportOrder);
        if (result) {
            if (result) {
                if (isDispatch) {
//                    发送消息到调度中心，进行调度
                    sendTransportOrderMsgToDispatch(transportOrder);
                } else {
                    // 不需要调度 发送消息更新订单状态
                    this.sendUpdateStatusMsg(ListUtil.toList(transportOrder.getId()), TransportOrderStatus.ARRIVED_END);
                    //不需要调度，发送消息生成派件任务
                    this.sendDispatchTaskMsgToDispatch(transportOrder);
                }

//                发消息通知其他系统，运单已经生成
                String msg = TransportOrderMsg.builder()
                        .id(transportOrder.getId())
                        .orderId(transportOrder.getOrderId())
                        .created(DateUtil.current())
                        .build().toJson();

                mqFeign.sendMsg(Constants.MQ.Exchanges.TRANSPORT_ORDER_DELAYED,
                        Constants.MQ.RoutingKeys.TRANSPORT_ORDER_CREATE,
                        msg,
                        Constants.MQ.NORMAL_DELAY);

                return transportOrder;
            }
        }
        throw new SLException(WorkExceptionEnum.TRANSPORT_ORDER_SAVE_ERROR);
    }

    private void sendUpdateStatusMsg(List<String> ids, TransportOrderStatus transportOrderStatus) {
        String msg = TransportOrderStatusMsg.builder()
                .idList(ids)
                .statusName(transportOrderStatus.name())
                .statusCode(transportOrderStatus.getCode())
                .build()
                .toJson();

//        将状态名称写入到KEY中，方便消费者选择性的接受消息
        String routingKey = Constants.MQ.RoutingKeys.TRANSPORT_ORDER_UPDATE_STATUS_PREFIX + transportOrderStatus.name();
        mqFeign.sendMsg(Constants.MQ.Exchanges.TRANSPORT_ORDER_DELAYED,
                routingKey,
                msg,
                Constants.MQ.LOW_DELAY);
    }

    /**
     * 发送运单消息到调度中，参与调度
     */
    private void sendTransportOrderMsgToDispatch(TransportOrderEntity transportOrder) {
        Map<Object, Object> msg = MapUtil.builder()
                .put("transportOrderId", transportOrder.getId())
                .put("currentAgencyId", transportOrder.getCurrentAgencyId())
                .put("nextAgencyId", transportOrder.getNextAgencyId())
                .put("totalWeight", transportOrder.getTotalWeight())
                .put("totalVolume", transportOrder.getTotalVolume())
                .put("created", System.currentTimeMillis()).build();
        String jsonMsg = JSONUtil.toJsonStr(msg);

//        发送消息，延迟5秒，确保本地事务已经提交，可以查询到数据
        mqFeign.sendMsg(Constants.MQ.Exchanges.TRANSPORT_ORDER_DELAYED,
                Constants.MQ.RoutingKeys.JOIN_DISPATCH,
                jsonMsg,
                Constants.MQ.LOW_DELAY);
    }

    /**
     * 发送生成取派件任务的消息
     *
     * @param transportOrder 运单对象
     */
    private void sendDispatchTaskMsgToDispatch(TransportOrderEntity transportOrder) {
        //预计完成时间，如果是中午12点到的快递，当天22点前，否则，第二天22点前
        int offset = 0;
        if (LocalDateTime.now().getHour() >= 12) {
            offset = 1;
        }
        LocalDateTime estimatedEndTime = DateUtil.offsetDay(new Date(), offset)
                .setField(DateField.HOUR_OF_DAY, 22)
                .setField(DateField.MINUTE, 0)
                .setField(DateField.SECOND, 0)
                .setField(DateField.MILLISECOND, 0)
                .toLocalDateTime();

//        发送分配快递员派件任务的消息
        OrderMsg orderMsg = OrderMsg.builder()
                .agencyId(transportOrder.getCurrentAgencyId())
                .orderId(transportOrder.getOrderId())
                .created(DateUtil.current())
                .taskType(PickupDispatchTaskType.DISPATCH.getCode())
                .mark("系统提示：派件请与收件人电话联系。")
                .estimatedEndTime(estimatedEndTime)
                .build();

//        发送消息
        sendPickupDispatchTaskMsgToDispatch(transportOrder, orderMsg);
    }

    /**
     * 发送消息到调度中心，用于生成取派件任务
     *
     * @param transportOrder 运单
     * @param orderMsg       消息内容
     */
    @Override
    public void sendPickupDispatchTaskMsgToDispatch(TransportOrderEntity transportOrder, OrderMsg orderMsg) {
//        查询订单对应的位置信息
        OrderLocationDTO orderLocationDTO = orderFeign.findOrderLocationByOrderId(orderMsg.getOrderId());

        //(1)运单为空：取件任务取消，取消原因为返回网点；重新调度位置取寄件人位置
        //(2)运单不为空：生成的是派件任务，需要根据拒收状态判断位置是寄件人还是收件人
        // 拒收：寄件人  其他：收件人
        String location;
        if (ObjectUtil.isEmpty(transportOrder)) {
            location = orderLocationDTO.getSendLocation();
        } else {
            location = transportOrder.getIsRejection() ? orderLocationDTO.getSendLocation() : orderLocationDTO.getReceiveLocation();
        }

        Double[] coordinate = Convert.convert(Double[].class, StrUtil.split(location, ","));
        Double longitude = coordinate[0];
        Double latitude = coordinate[1];

//        设置消息中的位置信息
        orderMsg.setLongitude(longitude);
        orderMsg.setLatitude(latitude);

//        发送消息,用于生产取派件任务
        mqFeign.sendMsg(Constants.MQ.Exchanges.ORDER_DELAYED,
                Constants.MQ.RoutingKeys.ORDER_CREATE,
                orderMsg.toJson(),
                Constants.MQ.NORMAL_DELAY);

    }

    /**
     * 获取运单分页数据
     *
     * @return 运单分页数据
     */
    @Override
    public Page<TransportOrderEntity> findByPage(TransportOrderQueryDTO transportOrderQueryDTO) {
        Page<TransportOrderEntity> iPage = new Page<>(transportOrderQueryDTO.getPage(), transportOrderQueryDTO.getPageSize());

        //设置查询条件
        LambdaQueryWrapper<TransportOrderEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(ObjectUtil.isNotEmpty(transportOrderQueryDTO.getId()), TransportOrderEntity::getId, transportOrderQueryDTO.getId());
        lambdaQueryWrapper.like(ObjectUtil.isNotEmpty(transportOrderQueryDTO.getOrderId()), TransportOrderEntity::getOrderId, transportOrderQueryDTO.getOrderId());
        lambdaQueryWrapper.eq(ObjectUtil.isNotEmpty(transportOrderQueryDTO.getStatus()), TransportOrderEntity::getStatus, transportOrderQueryDTO.getStatus());
        lambdaQueryWrapper.eq(ObjectUtil.isNotEmpty(transportOrderQueryDTO.getSchedulingStatus()), TransportOrderEntity::getSchedulingStatus, transportOrderQueryDTO.getSchedulingStatus());

        lambdaQueryWrapper.eq(ObjectUtil.isNotEmpty(transportOrderQueryDTO.getStartAgencyId()), TransportOrderEntity::getStartAgencyId, transportOrderQueryDTO.getStartAgencyId());
        lambdaQueryWrapper.eq(ObjectUtil.isNotEmpty(transportOrderQueryDTO.getEndAgencyId()), TransportOrderEntity::getEndAgencyId, transportOrderQueryDTO.getEndAgencyId());
        lambdaQueryWrapper.eq(ObjectUtil.isNotEmpty(transportOrderQueryDTO.getCurrentAgencyId()), TransportOrderEntity::getCurrentAgencyId, transportOrderQueryDTO.getCurrentAgencyId());
        lambdaQueryWrapper.orderByDesc(TransportOrderEntity::getCreated);

        return super.page(iPage, lambdaQueryWrapper);
    }

    /**
     * 通过订单id获取运单信息
     *
     * @param orderId 订单id
     * @return 运单信息
     */
    @Override
    public TransportOrderEntity findByOrderId(Long orderId) {
        LambdaQueryWrapper<TransportOrderEntity> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(TransportOrderEntity::getOrderId, orderId);
        return super.getOne(queryWrapper);
    }

    /**
     * 通过订单id列表获取运单列表
     *
     * @param orderIds 订单id列表
     * @return 运单列表
     */
    @Override
    public List<TransportOrderEntity> findByOrderIds(Long[] orderIds) {
        LambdaQueryWrapper<TransportOrderEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.in(TransportOrderEntity::getOrderId, orderIds);
        return super.list(lambdaQueryWrapper);
    }

    /**
     * 通过运单id列表获取运单列表
     *
     * @param ids 订单id列表
     * @return 运单列表
     */
    @Override
    public List<TransportOrderEntity> findByIds(String[] ids) {
        LambdaQueryWrapper<TransportOrderEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.in(TransportOrderEntity::getId, ids);
        return super.list(lambdaQueryWrapper);
    }

    /**
     * 根据运单号搜索运单
     *
     * @param id 运单号
     * @return 运单列表
     */
    @Override
    public List<TransportOrderEntity> searchById(String id) {
        LambdaQueryWrapper<TransportOrderEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(TransportOrderEntity::getId, id);
        return super.list(lambdaQueryWrapper);
    }

    /**
     * 修改运单状态
     * ● 如果更新运单为拒收状态，需要将快递退回去，也就是原路返回
     * ● 在更新状态时，需要同步更新物流信息，通过发送消息的方式完成（先TODO，后面实现）
     * ● 更新状态后需要通知其他系统（消息通知）
     *
     * @param ids                  运单id列表
     * @param transportOrderStatus 修改的状态
     * @return 是否成功
     */
    @Override
    public boolean updateStatus(List<String> ids, TransportOrderStatus transportOrderStatus) {
        if (CollUtil.isEmpty(ids)) {
            return false;
        }

        if (TransportOrderStatus.CREATED == transportOrderStatus) {
//            修改订单状态不能为新建状态
            throw new SLException(WorkExceptionEnum.TRANSPORT_ORDER_STATUS_NOT_CREATED);
        }

        List<TransportOrderEntity> transportOrderEntityList;

//        判断是否为拒收状态，如果是拒收状态需要重新查询路线，将包裹逆向回去
        if (TransportOrderStatus.REJECTED == transportOrderStatus) {
//            查询运单列表
            transportOrderEntityList = super.listByIds(ids);
            for (TransportOrderEntity transportOrder : transportOrderEntityList) {
//                设置为拒收状态
                transportOrder.setIsRejection(true);
//                根据起始机构规划运输路线,这里要将起点和终点互换
                Long sendAgentId = transportOrder.getEndAgencyId();
                Long receiveAgentId = transportOrder.getStartAgencyId();

//                默认参与调度
                boolean isDispatch = true;
                if (ObjectUtil.equal(sendAgentId, receiveAgentId)) {
//                    相同节点,无需调度,直接删除派件任务
                    isDispatch = false;
                } else {
                    TransportLineNodeDTO transportLineNodeDTO = transportLineFeign.queryPathByDispatchMethod(sendAgentId, receiveAgentId);
                    if (ObjectUtil.hasEmpty(transportLineNodeDTO, transportLineNodeDTO.getNodeList())) {
                        throw new SLException(WorkExceptionEnum.TRANSPORT_LINE_NOT_FOUND);
                    }

//                    删除掉第一个机构，你想回去第一个节点就是当前所有在节点
                    transportLineNodeDTO.getNodeList().remove(0);
                    transportOrder.setSchedulingStatus(TransportOrderSchedulingStatus.TO_BE_SCHEDULED);
//                    当前所在机构ID
                    transportOrder.setCurrentAgencyId(sendAgentId);
//                    下一个机构ID
                    transportOrder.setNextAgencyId(transportLineNodeDTO.getNodeList().get(0).getId());

//                    获取到原有节点信息
                    TransportLineNodeDTO transportLineNode = JSONUtil.toBean(transportOrder.getTransportLine(), TransportLineNodeDTO.class);
//                    将逆向节点追加到节点列表中
                    transportLineNode.getNodeList().addAll(transportLineNodeDTO.getNodeList());
//                    合并版本
                    transportLineNode.setCost(NumberUtil.add(transportLineNode.getCost(), transportLineNodeDTO.getCost()));
                    transportOrder.setTransportLine(JSONUtil.toJsonStr(transportLineNode));
                }

                transportOrder.setStatus(TransportOrderStatus.REJECTED);

                if (isDispatch) {
//                    发送消息参与调度
                    sendTransportOrderMsgToDispatch(transportOrder);
                } else {
//                    不需要调度，发送消息生成派件任务
                    transportOrder.setStatus(TransportOrderStatus.ARRIVED_END);
                    sendDispatchTaskMsgToDispatch(transportOrder);
                }
            }
        } else {
//            根据ID列表封装成运单对象列表
            transportOrderEntityList = ids.stream().map(id -> {
//                获取将发往目的地的机构
                Long nextAgencyId = getById(id).getNextAgencyId();
                OrganDTO organDTO = organFeign.queryById(nextAgencyId);

//                构建消息实体类
                String info = CharSequenceUtil.format("快件发往【{}】", organDTO.getName());
                String transportInfoMsg = TransportInfoMsg.builder()
                        .transportOrderId(id)//运单id
                        .status("运送中")//消息状态
                        .info(info)//消息详情
                        .created(DateUtil.current())//创建时间
                        .build().toJson();

//                发送运单跟踪消息
                mqFeign.sendMsg(
                        Constants.MQ.Exchanges.TRANSPORT_INFO,
                        Constants.MQ.RoutingKeys.TRANSPORT_INFO_APPEND,
                        transportInfoMsg);

//                封装运单对象
                TransportOrderEntity transportOrderEntity = new TransportOrderEntity();
                transportOrderEntity.setId(id);
                transportOrderEntity.setStatus(transportOrderStatus);
                return transportOrderEntity;
            }).collect(Collectors.toList());
        }

//        批量更新数据
        boolean result = super.updateBatchById(transportOrderEntityList);

//        发消息通知其他系统运单状态的变化
        sendUpdateStatusMsg(ids, transportOrderStatus);

        return result;
    }

    @Override
    public boolean updateByTaskId(Long taskId) {
//        通过运输任务查询运单ID列表
        List<String> transportOrderIdList = transportTaskService.queryTransportOrderIdListById(taskId);
        if (CollUtil.isEmpty(transportOrderIdList)) {
            return false;
        }

//        查询运单列表
        List<TransportOrderEntity> transportOrderList = super.listByIds(transportOrderIdList);
        for (TransportOrderEntity transportOrder : transportOrderList) {
//            获取将发往目的地的机构
            OrganDTO organDTO = organFeign.queryById(transportOrder.getNextAgencyId());

//            构建消息实体类
            String info = CharSequenceUtil.format("快件到达【{}】", organDTO.getName());
            String transportInfoMsg = TransportInfoMsg.builder()
                    .transportOrderId(transportOrder.getId())
                    .status("运送中")
                    .info(info)
                    .created(DateUtil.current())
                    .build().toJson();

//            发送运单跟踪信息
            mqFeign.sendMsg(Constants.MQ.Exchanges.TRANSPORT_INFO,
                    Constants.MQ.RoutingKeys.TRANSPORT_INFO_APPEND,
                    transportInfoMsg);

//            设置当前所在机构ID为下一个机构ID
            transportOrder.setCurrentAgencyId(transportOrder.getNextAgencyId());

//            解析完整的运输链路，找到下一个机构ID
            String transportLine = transportOrder.getTransportLine();
            JSONObject jsonObject = JSONUtil.parseObj(transportLine);
            Long nextAgencyId = 0L;
            JSONArray nodeList = jsonObject.getJSONArray("nodeList");

            //这里反向循环主要是考虑到拒收的情况，路线中会存在相同的节点，始终可以查找到后面的节点
            //正常：A B C D E ，拒收：A B C D E D C B A
            for (int i = nodeList.size() - 1; i >= 0; i--) {
                JSONObject node = (JSONObject) nodeList.get(i);
                Long agencyId = node.getLong("bid");
                if (ObjectUtil.equal(agencyId, transportOrder.getCurrentAgencyId())) {
                    if (i == nodeList.size() - 1) {
//                        已经是最后一个节点了，也就是最后一个机构了
                        nextAgencyId = agencyId;
                        transportOrder.setStatus(TransportOrderStatus.ARRIVED_END);

//                        发送消息更新状态
                        sendUpdateStatusMsg(
                                ListUtil.toList(transportOrder.getId()),
                                TransportOrderStatus.ARRIVED_END
                        );
                    } else {
//                        后面还有节点
                        nextAgencyId = ((JSONObject) nodeList.get(i + 1)).getLong("bid");
//                        设置运单状态为待调度
                        transportOrder.setSchedulingStatus(TransportOrderSchedulingStatus.TO_BE_SCHEDULED);
                    }
                    break;
                }
            }

//            设置下一个节点ID
            transportOrder.setNextAgencyId(nextAgencyId);

//            如果运单没有到达终点，需要发送消息到运单调度的交换机中
//            如果已经到达最终网点,需要发送消息,进行分配快递员作业
            if (ObjectUtil.notEqual(
                    transportOrder.getStatus(),
                    TransportOrderStatus.ARRIVED_END
            )) {
                sendTransportOrderMsgToDispatch(transportOrder);
            } else {
//                发送消息生产派件任务
                sendDispatchTaskMsgToDispatch(transportOrder);
            }
        }

//        批量更新运单
        return updateBatchById(transportOrderList);
    }
    
    /**
     * 统计各个状态的数量
     *
     * @return 状态数量数据
     */
    @Override
    public List<TransportOrderStatusCountDTO> findStatusCount() {
//        将所有的枚举状态放到集合中
        List<TransportOrderStatusCountDTO> statusCountList = Arrays.stream(TransportOrderStatus.values())
                .map(transportOrderStatus -> TransportOrderStatusCountDTO.builder()
                        .status(transportOrderStatus)
                        .statusCode(transportOrderStatus.getCode())
                        .count(0L)
                        .build())
                .collect(Collectors.toList());

//        将数量值放入到集合中,如果没有的数量为0
        List<TransportOrderStatusCountDTO> statusCount = baseMapper.findStatusCount();
        for (TransportOrderStatusCountDTO transportOrderStatusCountDTO : statusCountList) {
            for (TransportOrderStatusCountDTO orderStatusCountDTO : statusCount) {
                if (ObjectUtil.equal(transportOrderStatusCountDTO.getStatusCode(), orderStatusCountDTO.getStatusCode())) {
                    transportOrderStatusCountDTO.setCount(orderStatusCountDTO.getCount());
                    break;
                }
            }
        }
        return statusCount;
    }

    /**
     * 根据运输任务id分页查询运单信息
     *
     * @param page             页码
     * @param pageSize         页面大小
     * @param taskId           运输任务id
     * @param transportOrderId 运单id
     * @return 运单对象分页数据
     */
    @Override
    public PageResponse<TransportOrderDTO> pageQueryByTaskId(Integer page, Integer pageSize, String taskId, String transportOrderId) {
//        构建分页查询条件
        Page<TransportOrderTaskEntity> transportOrderTaskEntityPage = new Page<>(page, pageSize);
        LambdaQueryWrapper<TransportOrderTaskEntity> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(ObjectUtil.isNotEmpty(transportOrderId), TransportOrderTaskEntity::getTransportTaskId, taskId)
                .like(ObjectUtil.isNotEmpty(transportOrderId), TransportOrderTaskEntity::getTransportOrderId, transportOrderId)
                .orderByDesc(TransportOrderTaskEntity::getCreated);

//        根据运输任务ID、运单ID查询运输任务与运单关联关系表
        Page<TransportOrderTaskEntity> pageResult = transportOrderTaskMapper.selectPage(transportOrderTaskEntityPage, queryWrapper);
        if (CollUtil.isEmpty(pageResult.getRecords())) {
            return new PageResponse<>(pageResult);
        }

//        根据运单ID查询运单，并转化为DTO
        List<String> transportOrderIds = pageResult.getRecords().stream().map(TransportOrderTaskEntity::getTransportOrderId).collect(Collectors.toList());
        List<TransportOrderEntity> entities = baseMapper.selectBatchIds(transportOrderIds);

        return PageResponse.of(BeanUtil.copyToList(entities, TransportOrderDTO.class));
    }
}
