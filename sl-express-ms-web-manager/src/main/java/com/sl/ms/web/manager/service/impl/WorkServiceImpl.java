package com.sl.ms.web.manager.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.itheima.auth.sdk.common.Result;
import com.itheima.auth.sdk.dto.UserDTO;
import com.sl.ms.base.api.trips.TripsFeign;
import com.sl.ms.base.api.truck.TruckFeign;
import com.sl.ms.base.api.truck.TruckPlanFeign;
import com.sl.ms.base.api.user.DriverFeign;
import com.sl.ms.base.domain.enums.StatusEnum;
import com.sl.ms.base.domain.truck.TruckDto;
import com.sl.ms.base.domain.truck.TruckTripsDto;
import com.sl.ms.base.domain.user.TruckDriverDto;
import com.sl.ms.driver.api.DriverJobFeign;
import com.sl.ms.driver.domain.dto.request.DriverJobPageQueryDTO;
import com.sl.ms.driver.domain.dto.response.DriverJobDTO;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import com.sl.ms.oms.api.OrderFeign;
import com.sl.ms.oms.dto.OrderDTO;
import com.sl.ms.track.api.TrackFeign;
import com.sl.ms.track.domain.dto.TrackDTO;
import com.sl.ms.track.domain.enums.TrackStatusEnum;
import com.sl.ms.transport.api.OrganFeign;
import com.sl.ms.web.manager.service.*;
import com.sl.ms.web.manager.vo.agency.AgencySimpleVO;
import com.sl.ms.web.manager.vo.agency.AgencyVO;
import com.sl.ms.web.manager.vo.auth.SysUserVO;
import com.sl.ms.web.manager.vo.baseTruck.TransportTripsVO;
import com.sl.ms.web.manager.vo.baseTruck.TruckVO;
import com.sl.ms.web.manager.vo.oms.OrderVO;
import com.sl.ms.web.manager.vo.transportLine.TransportLineVO;
import com.sl.ms.web.manager.vo.work.*;
import com.sl.ms.work.api.PickupDispatchTaskFeign;
import com.sl.ms.work.api.TransportOrderFeign;
import com.sl.ms.work.api.TransportTaskFeign;
import com.sl.ms.work.domain.dto.PickupDispatchTaskDTO;
import com.sl.ms.work.domain.dto.TaskTransportUpdateDTO;
import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.ms.work.domain.dto.TransportTaskDTO;
import com.sl.ms.work.domain.dto.request.PickupDispatchTaskPageQueryDTO;
import com.sl.ms.work.domain.dto.request.TransportOrderQueryDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskPageQueryDTO;
import com.sl.ms.work.domain.dto.response.TransportOrderStatusCountDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskStatusCountDTO;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskLoadingStatus;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskStatus;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.util.AuthTemplateThreadLocal;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.domain.OrganDTO;
import io.seata.spring.annotation.GlobalTransactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 调度管理
 * 运单，运输任务管理
 * 对应 work微服务
 *
 * @author itcast
 */
@Slf4j
@Service
public class WorkServiceImpl implements WorkService {

    @Resource
    private PickupDispatchTaskFeign pickupDispatchTaskFeign;

    @Resource
    private TransportOrderFeign transportOrderFeign;

    @Resource
    private TransportTaskFeign transportTaskFeign;

    @Resource
    private OmsService omsService;

    @Resource
    private AgencyService agencyService;

    @Resource
    private BaseTruckService baseTruckService;

    @Resource
    private AuthService authService;

    @Resource
    private OrganFeign organFeign;

    @Resource
    private OrderFeign orderFeign;

    @Resource
    private DriverJobFeign driverJobFeign;

    @Resource
    private DriverFeign driverFeign;

    @Resource
    private TruckFeign truckFeign;

    @Resource
    private TripsFeign tripsFeign;

    @Resource
    private TransportService transportService;

    @Resource
    private TrackFeign trackFeign;

    @Resource
    private TruckPlanFeign truckPlanFeign;

    /**
     * 运单分页
     *
     * @param vo 运单查询条件
     * @return 运单分页
     */
    @Override
    public PageResponse<TransportOrderVO> findTransportOrderByPage(TransportOrderQueryVO vo) {
        TransportOrderQueryDTO transportOrderDTO = BeanUtil.toBean(vo, TransportOrderQueryDTO.class);
        PageResponse<TransportOrderDTO> dtoPageResponse = transportOrderFeign.findByPage(transportOrderDTO);
        return PageResponse.of(dtoPageResponse, this::batchParseTransportOrderDTO2Vo);
    }

    /**
     * 运单批量转换
     *
     * @param dtoList 运单DTO
     * @return 运单VO
     */
    private List<TransportOrderVO> batchParseTransportOrderDTO2Vo(List<TransportOrderDTO> dtoList) {
        if (CollUtil.isEmpty(dtoList)) {
            return new ArrayList<>();
        }
        // 机构
        List<Long> agentIds = dtoList.parallelStream().map(TransportOrderDTO::getStartAgencyId).distinct().collect(Collectors.toList());
        List<Long> endAgentIds = dtoList.parallelStream().map(TransportOrderDTO::getEndAgencyId).distinct().collect(Collectors.toList());
        agentIds.addAll(endAgentIds);
        List<Long> currentAgentIds = dtoList.parallelStream().map(TransportOrderDTO::getCurrentAgencyId).distinct().collect(Collectors.toList());
        agentIds.addAll(currentAgentIds);
        List<Long> nextAgencyIds = dtoList.parallelStream().map(TransportOrderDTO::getNextAgencyId).distinct().collect(Collectors.toList());
        agentIds.addAll(nextAgencyIds);
        Map<Long, AgencySimpleVO> agencySimpleVOMap = agencyService.batchAgencySimple(agentIds).stream().collect(Collectors.toMap(AgencySimpleVO::getId, v -> v));

        return dtoList.stream().map(dto -> {
            TransportOrderVO vo = BeanUtil.toBean(dto, TransportOrderVO.class);
            vo.setStatus(dto.getStatus().getCode());
            vo.setSchedulingStatus(dto.getSchedulingStatus().getCode());
            if (ObjectUtil.isEmpty(dto.getOrderId())) {
                return vo;
            }

            if (ObjectUtil.isEmpty(dto.getCurrentAgencyId())) {
                return vo;
            }
            AgencySimpleVO agency = agencySimpleVOMap.get(dto.getCurrentAgencyId());
            if (ObjectUtil.isEmpty(agency)) {
                return vo;
            }
            vo.setCurrentAgencyName(agency.getName());
            AgencySimpleVO startAgent = agencySimpleVOMap.get(dto.getStartAgencyId());
            if (ObjectUtil.isEmpty(startAgent)) {
                return vo;
            }
            vo.setStartAgencyName(startAgent.getName());

            AgencySimpleVO endAgent = agencySimpleVOMap.get(dto.getEndAgencyId());
            if (ObjectUtil.isEmpty(endAgent)) {
                return vo;
            }
            vo.setEndAgencyName(endAgent.getName());

            AgencySimpleVO nextAgent = agencySimpleVOMap.get(dto.getNextAgencyId());
            if (ObjectUtil.isEmpty(nextAgent)) {
                return vo;
            }
            vo.setNextAgencyName(nextAgent.getName());
            return vo;
        }).collect(Collectors.toList());
    }

    /**
     * 运输任务批量转换
     *
     * @param dtoList 运输任务DTO
     * @return 运维任务VO
     */
    private List<TaskTransportVO> batchParseTransportTaskDTO2Vo(List<TransportTaskDTO> dtoList) {
        if (CollUtil.isEmpty(dtoList)) {
            return new ArrayList<>();
        }

        // 车次map
        List<Long> tripsIds = dtoList.parallelStream().map(TransportTaskDTO::getTransportTripsId).distinct().collect(Collectors.toList());
        List<TruckTripsDto> tripsDtoList = tripsFeign.findAll(null, tripsIds);
        Map<Long, TruckTripsDto> transportTripsDTOMap = tripsDtoList.parallelStream().collect(Collectors.toMap(TruckTripsDto::getId, v -> v));

        // 线路map
        List<Long> lineIds = tripsDtoList.parallelStream().distinct().map(TruckTripsDto::getTransportLineId).distinct().collect(Collectors.toList());
        Map<Long, TransportLineVO> transportLineVOMap = new HashMap<>();


        if (CollUtil.isNotEmpty(lineIds)) {
            transportLineVOMap = transportService.findTransportLineByIds(lineIds).parallelStream().collect(Collectors.toMap(TransportLineVO::getId, v -> v));
        }

        // 机构
        List<Long> startAgentIds = dtoList.parallelStream().map(TransportTaskDTO::getStartAgencyId).distinct().collect(Collectors.toList());
        List<Long> endAgentIds = dtoList.parallelStream().map(TransportTaskDTO::getEndAgencyId).distinct().collect(Collectors.toList());
        startAgentIds.addAll(endAgentIds);
        Map<Long, AgencySimpleVO> agencySimpleVOMap = agencyService.batchAgencySimple(startAgentIds).stream().collect(Collectors.toMap(AgencySimpleVO::getId, v -> v));

        // 车辆
        Set<Long> truckIds = dtoList.parallelStream().map(TransportTaskDTO::getTruckId).collect(Collectors.toSet());
        Map<Long, TruckVO> truckVOMap = baseTruckService.truckMap(truckIds);

        Map<Long, TransportLineVO> finalTransportLineVOMap = transportLineVOMap;
        return dtoList.stream().map(dto -> {
            TaskTransportVO vo = BeanUtil.toBean(dto, TaskTransportVO.class);
            vo.setStatus(dto.getStatus().getCode());
            vo.setAssignedStatus(dto.getAssignedStatus().getCode());
            vo.setLoadingStatus(dto.getLoadingStatus().getCode());
            // 车次 线路
            if (ObjectUtil.isNotEmpty(dto.getTransportTripsId())) {
                TruckTripsDto tripsById = transportTripsDTOMap.get(dto.getTransportTripsId());
                if (ObjectUtil.isNotEmpty(tripsById)) {
                    TransportTripsVO transportTripsVO = BeanUtil.toBean(tripsById, TransportTripsVO.class);
                    vo.setTransportTrips(transportTripsVO);

                    // 线路
                    TransportLineVO transportLineVO = finalTransportLineVOMap.get(tripsById.getTransportLineId());
                    if (ObjectUtil.isNotEmpty(transportLineVO)) {
                        vo.setTransportLineName(transportLineVO.getName());
                        vo.setTransportLineId(transportLineVO.getId());
                    }

                }

            }


            // 机构
            if (ObjectUtil.isNotEmpty(dto.getStartAgencyId())) {
                AgencySimpleVO agencySimpleVO = agencySimpleVOMap.get(dto.getStartAgencyId());
                vo.setStartAgency(agencySimpleVO);
            }
            if (ObjectUtil.isNotEmpty(dto.getEndAgencyId())) {
                AgencySimpleVO agencySimpleVO = agencySimpleVOMap.get(dto.getEndAgencyId());
                vo.setEndAgency(agencySimpleVO);
            }

            // 车辆
            if (ObjectUtil.isNotEmpty(dto.getTruckId())) {
                TruckVO truckById = truckVOMap.get(dto.getTruckId());
                if (ObjectUtil.isNotEmpty(truckById)) {
                    vo.setTruck(truckById);
                }
            }
            return vo;
        }).collect(Collectors.toList());
    }

    /**
     * 批量查询运单
     *
     * @param transportOrderIds 运单IDs
     * @return 运单列表
     */
    private List<TransportOrderVO> batchGetTransportOrder(List<String> transportOrderIds) {
        List<TransportOrderDTO> transportOrderVOList = transportOrderFeign.findByIds(transportOrderIds.toArray(String[]::new));
        List<OrderDTO> orderDTOS = orderFeign.findByIds(transportOrderVOList.stream().map(v -> v.getOrderId().toString()).distinct().collect(Collectors.toList()));
        List<OrderVO> orderVOS = omsService.batchParseOrderDTO2Vo(orderDTOS);
        Map<Long, OrderVO> orderVOMap = orderVOS.stream().collect(Collectors.toMap(OrderVO::getId, v -> v));
        return transportOrderVOList.parallelStream().map(v -> {
            TransportOrderVO vo = BeanUtil.toBean(v, TransportOrderVO.class);
            vo.setOrder(orderVOMap.get(v.getOrderId()));
            return vo;
        }).collect(Collectors.toList());
    }

    /**
     * 运单简要信息
     *
     * @param id 运单ID
     * @return 运单详情
     */
    @Override
    public TransportOrderVO findTransportOrderSimple(String id) {
        TransportOrderDTO dto = transportOrderFeign.findById(id);
        if (ObjectUtil.isEmpty(dto)) {
            return null;
        }
        return parseTransportOrderDTO2Vo(dto);
    }

    /**
     * 运单详情页面
     *
     * @param id 运单ID
     * @return 运单详情
     */
    @Override
    public TransportOrderVO findTransportOrderDetail(String id) {
        TransportOrderVO vo = findTransportOrderSimple(id);
        appendTransportOrderVO(vo);
        return vo;
    }


    @Override
    public Map<Integer, Long> countTransportOrder() {
        return transportOrderFeign.findStatusCount().stream().collect(Collectors.toMap(TransportOrderStatusCountDTO::getStatusCode, TransportOrderStatusCountDTO::getCount));
    }

    /**
     * 转换运单
     * 运单列表页面 和 详情页面
     *
     * @param dto 运单DTO
     * @return 运单VO
     */
    private TransportOrderVO parseTransportOrderDTO2Vo(TransportOrderDTO dto) {
        TransportOrderVO vo = BeanUtil.toBean(dto, TransportOrderVO.class);
        vo.setStatus(dto.getStatus().getCode());
        vo.setSchedulingStatus(dto.getSchedulingStatus().getCode());
        if (ObjectUtil.isEmpty(dto.getOrderId())) {
            return vo;
        }
        OrderVO orderById = omsService.findOrderSimple(dto.getOrderId());
        vo.setOrder(orderById);

        if (ObjectUtil.isEmpty(dto.getCurrentAgencyId())) {
            return vo;
        }
        AgencySimpleVO agency = agencyService.agencySimple(dto.getCurrentAgencyId());
        if (ObjectUtil.isEmpty(agency)) {
            return vo;
        }
        vo.setCurrentAgencyName(agency.getName());
        return vo;
    }

    /**
     * 补充运单VO详情
     * 后台运单详情页面
     *
     * @param vo 运单VO
     */
    private void appendTransportOrderVO(TransportOrderVO vo) {
        //获取运输信息
        List<TaskTransportVO> taskTransportVOList = new ArrayList<>();
        List<TransportTaskDTO> TransportTaskDTOS = transportTaskFeign.findAllByOrderIdOrTaskId(vo.getId(), null);
        if (CollUtil.isNotEmpty(TransportTaskDTOS)) {
            TransportTaskDTOS.forEach(TransportTaskDTO ->
                    taskTransportVOList.add(parseTransportTaskDTO2Vo(TransportTaskDTO))
            );
            Collections.reverse(taskTransportVOList);
        }
        vo.setTaskTransports(taskTransportVOList);
    }

    /**
     * 运输任务分页
     *
     * @param vo 查询条件
     * @return 运输任务分页
     */
    @Override
    public PageResponse<TaskTransportVO> findTaskByPage(TaskTransportQueryVO vo) {
        TransportTaskPageQueryDTO transportTaskPageQueryDTO = BeanUtil.toBean(vo, TransportTaskPageQueryDTO.class);
        // 查询车辆ID
        PageResponse<TruckDto> truckDtoPage = truckFeign.findByPage(1, 1000, null, null, vo.getLicensePlate());
        List<Long> truckIds = truckDtoPage.getItems().parallelStream().map(TruckDto::getId).collect(Collectors.toList());
        transportTaskPageQueryDTO.setTruckIds(truckIds);
        PageResponse<TransportTaskDTO> dtoPageResponse = transportTaskFeign.findByPage(transportTaskPageQueryDTO);
        return PageResponse.of(dtoPageResponse, this::batchParseTransportTaskDTO2Vo);
    }

    /**
     * 运输任务详情
     *
     * @param id 运输任务ID
     * @return 运输任务详情
     */
    @Override
    public TaskTransportVO findTaskById(Long id) {
        TransportTaskDTO dto = transportTaskFeign.findById(id);
        if (ObjectUtil.isEmpty(dto)) {
            return null;
        }
        return parseTransportTaskDTO2Vo(dto);
    }

    /**
     * 手动调整运输任务
     *
     * @param id 运输任务ID
     * @param vo 司机 车辆 车次等信息
     */
    @Override
    public void adjustTask(Long id, TaskTransportUpdateVO vo) {
        // 根据车辆ID查询司机ID
        if (CollUtil.isEmpty(vo.getDriverId())) {
            List<TruckDriverDto> driverDtos = driverFeign.findByTruckId(vo.getTruckId());
            List<Long> driverIds = driverDtos.parallelStream().map(TruckDriverDto::getUserId).collect(Collectors.toList());
            vo.setDriverId(driverIds);
        }
        TaskTransportUpdateDTO taskTransportUpdateDTO = BeanUtil.toBean(vo, TaskTransportUpdateDTO.class);
        transportTaskFeign.adjust(id, taskTransportUpdateDTO);
    }


    /**
     * 运输任务统计
     *
     * @return 按状态统计
     */
    @Override
    public Map<Integer, Long> countTask() {
        return transportTaskFeign.count().stream().collect(Collectors.toMap(TransportTaskStatusCountDTO::getStatusCode, TransportTaskStatusCountDTO::getCount));
    }

    /**
     * 转换运输任务
     *
     * @param dto 运输任务DTO
     * @return 运输任务VO
     */
    private TaskTransportVO parseTransportTaskDTO2Vo(TransportTaskDTO dto) {
        TaskTransportVO vo = BeanUtil.toBean(dto, TaskTransportVO.class);
        vo.setStatus(dto.getStatus().getCode());
        vo.setAssignedStatus(dto.getAssignedStatus().getCode());
        vo.setLoadingStatus(dto.getLoadingStatus().getCode());
        // 机构
        if (ObjectUtil.isNotEmpty(dto.getStartAgencyId())) {
            AgencySimpleVO agency = agencyService.agencySimple(dto.getStartAgencyId());
            vo.setStartAgency(agency);
        }
        if (ObjectUtil.isNotEmpty(dto.getEndAgencyId())) {
            AgencySimpleVO agency = agencyService.agencySimple(dto.getEndAgencyId());
            vo.setEndAgency(agency);
        }

        // 车辆
        if (ObjectUtil.isNotEmpty(dto.getTruckId())) {
            TruckVO truckById = baseTruckService.findTruckSimple(dto.getTruckId());
            if (ObjectUtil.isNotEmpty(truckById)) {
                vo.setTruck(truckById);
            }
        }

        // 运单
        if (CollUtil.isNotEmpty(dto.getTransportOrderIds())) {
            List<TransportOrderVO> transportOrderVOS = batchGetTransportOrder(dto.getTransportOrderIds());
            vo.setTransportOrders(transportOrderVOS);
        }

        // 司机信息
        DriverJobPageQueryDTO driverJobPageQueryDTO = DriverJobPageQueryDTO.builder().page(1).pageSize(10).transportTaskId(dto.getId()).build();
        PageResponse<DriverJobDTO> driverJobPage = driverJobFeign.pageQuery(driverJobPageQueryDTO);
        if (CollUtil.isNotEmpty(driverJobPage.getItems())) {
            List<Long> driverIds = CollUtil.getFieldValues(driverJobPage.getItems(), "driverId", Long.class);
            List<SysUserVO> drivers = authService.users(driverIds).parallelStream().collect(Collectors.toList());
            vo.setDrivers(drivers);
        }
        return vo;
    }

    /**
     * 获取运输任务坐标
     *
     * @param id 运输任务ID
     * @return 运输任务坐标
     */
    @Override
    public LinkedHashSet<PointVO> findTaskPointById(Long id) {
        LinkedHashSet<PointVO> pointVOS = new LinkedHashSet<>();
        TaskTransportVO taskById = findTaskById(id);
        AgencyVO startOrg = agencyService.agencyDetail(taskById.getStartAgency().getId());
        AgencyVO endOrg = agencyService.agencyDetail(taskById.getEndAgency().getId());

        PointVO pointVO1 = new PointVO();
        pointVO1.setName(startOrg.getName());
        pointVO1.setMarkerPoints(startOrg.getLongitude().toString(), startOrg.getLatitude().toString());
        pointVOS.add(pointVO1);
        PointVO pointVO2 = new PointVO();
        pointVO2.setName(endOrg.getName());
        pointVO2.setMarkerPoints(endOrg.getLongitude().toString(), endOrg.getLatitude().toString());
        pointVOS.add(pointVO2);
        return pointVOS;
    }

    /**
     * 获取取派件任务分页数据
     *
     * @param vo 查询条件
     * @return 取派件分页数据
     */
    @Override
    public PageResponse<PickupDispatchTaskListVO> findTaskPickupDispatchByPage(TaskPickupDispatchQueryVO vo) {
        //1.构建查询条件
        PickupDispatchTaskPageQueryDTO pickupDispatchTaskPageQueryDTO = BeanUtil.toBean(vo, PickupDispatchTaskPageQueryDTO.class);

        //2.分页查询
        PageResponse<PickupDispatchTaskDTO> pageResponse = pickupDispatchTaskFeign.findByPage(pickupDispatchTaskPageQueryDTO);

        //3.dto转为vo
        return PageResponse.of(pageResponse, PickupDispatchTaskListVO.class, (dto, responseVO) -> {
            //机构信息
            OrganDTO organDTO = organFeign.queryById(responseVO.getAgencyId());
            responseVO.setAgencyName(organDTO.getName());

            //快递员信息
            if (ObjectUtil.isNotEmpty(dto.getCourierId())) {
                Result<UserDTO> courier = AuthTemplateThreadLocal.get().opsForUser().getUserById(dto.getCourierId());
                responseVO.setCourierName(courier.getData().getName());
            }

            //取消原因
            if (ObjectUtil.isNotEmpty(dto.getCancelReason())) {
                responseVO.setCancelReason(dto.getCancelReason().getValue());
            }
        });
    }

    /**
     * 转换取派件任务
     *
     * @param dto 任务DTO
     * @return 任务VO
     */
    @Override
    public TaskPickupDispatchVO parsePickupDispatchTaskDTO2Vo(PickupDispatchTaskDTO dto) {
        TaskPickupDispatchVO vo = BeanUtil.toBean(dto, TaskPickupDispatchVO.class);
        vo.setStatus(dto.getStatus().getCode());
        vo.setAssignedStatus(dto.getAssignedStatus().getCode());
        vo.setSignStatus(dto.getSignStatus().getCode());
        if (ObjectUtil.isNotEmpty(dto.getAgencyId())) {
            AgencySimpleVO agency = agencyService.agencySimple(dto.getAgencyId());
            vo.setAgency(agency);

        }
        if (ObjectUtil.isNotEmpty(dto.getCourierId())) {
            SysUserVO user = authService.user(dto.getCourierId());
            vo.setCourier(user);
        }
        return vo;
    }

    /**
     * 分配快递员
     *
     * @param ids       取派件任务id
     * @param courierId 快递员ID
     */
    @Override
    public void updateTaskPickupDispatchById(List<String> ids, Long courierId) {
        List<Long> taskIds = ids.stream().map(Long::valueOf).collect(Collectors.toList());
        pickupDispatchTaskFeign.updateCourierId(taskIds, 0L, courierId);
    }

    /**
     * 空车取消运输任务
     *
     * @param id 运输任务id
     */
    @Override
    @GlobalTransactional
    public void cancel(Long id) {
        //1.根据id查询运输任务
        TransportTaskDTO transportTaskDTO = transportTaskFeign.findById(id);

        //1.1非空载无法取消
        if (ObjectUtil.notEqual(TransportTaskLoadingStatus.EMPTY, transportTaskDTO.getLoadingStatus())) {
            throw new SLWebException("运输任务不是空载，无法取消！");
        }

        //1.2非待执行状态无法取消
        if (ObjectUtil.notEqual(TransportTaskStatus.PENDING, transportTaskDTO.getStatus())) {
            throw new SLWebException("运输任务不是待执行状态，无法取消！");
        }

        //2.取消运输任务
        transportTaskFeign.updateStatus(id, TransportTaskStatus.CANCELLED);

        //3.取消运输任务关联的司机作业单
        DriverJobPageQueryDTO driverJobPageQueryDTO = DriverJobPageQueryDTO.builder().page(1).pageSize(10).transportTaskId(id).build();
        PageResponse<DriverJobDTO> driverJobPage = driverJobFeign.pageQuery(driverJobPageQueryDTO);
        driverJobPage.getItems().forEach(dto -> driverJobFeign.updateStatus(dto.getId(), DriverJobStatus.CANCELLED));

        //4.取消运输任务后需要完成当前车辆计划，从而能够生成下一次的车辆计划
        truckPlanFeign.finished(transportTaskDTO.getStartAgencyId(), transportTaskDTO.getTruckPlanId(), transportTaskDTO.getTruckId(), StatusEnum.NORMAL);
    }

    /**
     * 运单轨迹
     *
     * @param id 运单ID
     * @return 轨迹
     */
    @Override
    public TrackVO findTrackById(String id) {
        TrackDTO trackDTO = trackFeign.queryByTransportOrderId(id);
        TrackVO trackVO = BeanUtil.toBean(trackDTO, TrackVO.class);
        trackVO.setStatus(trackDTO.getStatus().getCode());
        if (ObjectUtil.isNotEmpty(trackDTO.getType()) && trackDTO.getStatus().equals(TrackStatusEnum.NEW)) {
            trackVO.setStatus(trackDTO.getType().getCode());
        }
        return trackVO;
    }


}
