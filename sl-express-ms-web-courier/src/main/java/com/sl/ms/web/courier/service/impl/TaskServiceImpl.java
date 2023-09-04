package com.sl.ms.web.courier.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.DesensitizedUtil;
import cn.hutool.core.util.IdcardUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import com.itheima.auth.sdk.dto.UserDTO;
import com.sl.ms.base.api.common.AreaFeign;
import com.sl.ms.base.api.common.MQFeign;
import com.sl.ms.base.api.common.MessageFeign;
import com.sl.ms.base.domain.base.AreaDto;
import com.sl.ms.base.domain.base.MessageAddDTO;
import com.sl.ms.base.domain.constants.MessageConstants;
import com.sl.ms.base.domain.enums.MessageBussinessTypeEnum;
import com.sl.ms.base.domain.enums.MessageContentTypeEnum;
import com.sl.ms.carriage.appi.CarriageFeign;
import com.sl.ms.carriage.domain.dto.CarriageDTO;
import com.sl.ms.carriage.domain.dto.WaybillDTO;
import com.sl.ms.oms.api.CargoFeign;
import com.sl.ms.oms.api.OrderFeign;
import com.sl.ms.oms.dto.OrderCargoDTO;
import com.sl.ms.oms.dto.OrderDTO;
import com.sl.ms.oms.dto.OrderPickupDTO;
import com.sl.ms.oms.enums.OrderStatus;
import com.sl.ms.search.api.CourierTaskFeign;
import com.sl.ms.search.domain.dto.CourierTaskDTO;
import com.sl.ms.search.domain.dto.CourierTaskPageQueryDTO;
import com.sl.ms.user.api.MemberFeign;
import com.sl.ms.user.domain.dto.MemberDTO;
import com.sl.ms.user.domain.enums.MemberIdCardVerifyStatus;
import com.sl.ms.web.courier.constants.CourierConstants;
import com.sl.ms.web.courier.enums.SortOrderEnum;
import com.sl.ms.web.courier.enums.TaskInformationEnum;
import com.sl.ms.web.courier.enums.TaskStatus;
import com.sl.ms.web.courier.service.TaskService;
import com.sl.ms.web.courier.vo.task.*;
import com.sl.ms.work.api.PickupDispatchTaskFeign;
import com.sl.ms.work.api.TransportOrderFeign;
import com.sl.ms.work.domain.dto.PickupDispatchTaskDTO;
import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.ms.work.domain.dto.request.PickupDispatchTaskPageQueryDTO;
import com.sl.ms.work.domain.dto.response.PickupDispatchTaskStatisticsDTO;
import com.sl.ms.work.domain.enums.pickupDispatchtask.*;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderStatus;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.service.RealNameVerifyService;
import com.sl.transport.common.util.*;
import com.sl.transport.common.vo.CourierMsg;
import com.sl.transport.common.vo.TransportInfoMsg;
import com.sl.transport.common.vo.TransportOrderStatusMsg;
import com.sl.transport.info.api.TransportInfoFeign;
import com.sl.transport.info.domain.TransportInfoDTO;
import io.seata.spring.annotation.GlobalTransactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TaskServiceImpl implements TaskService {

    @Resource
    private PickupDispatchTaskFeign pickupDispatchTaskFeign;
    @Resource
    private CarriageFeign carriageFeign;
    @Resource
    private AreaFeign areaFeign;
    @Resource
    private OrderFeign orderFeign;
    @Resource
    private CargoFeign cargoFeign;
    @Resource
    private TransportOrderFeign transportOrderFeign;
    @Resource
    private MemberFeign memberFeign;
    @Resource
    private MessageFeign messageFeign;
    @Resource
    private TransportInfoFeign transportInfoFeign;
    @Resource
    private StringRedisTemplate stringRedisTemplate;
    @Resource
    private RealNameVerifyService realNameVerifyService;
    @Resource
    private MQFeign mqFeign;
    @Resource
    private CourierTaskFeign courierTaskFeign;

    /**
     * 实名认证开关，默认关闭
     */
    @Value("${real-name-registration.enable}")
    private String realNameVerify;

    /**
     * 计算运费
     *
     * @param calculateVO 运费计算对象
     * @return 运费 体积 重量
     */
    @Override
    public CarriageVO calculate(CarriageCalculateVO calculateVO) {
        //1.根据县级id获取市级地址id
        List<AreaDto> areaDtos = areaFeign.findBatch(Arrays.asList(calculateVO.getReceiverCountyId(), calculateVO.getSenderCountyId()));
        if (CollUtil.isEmpty(areaDtos)) {
            throw new SLWebException("地址未找到");
        }
        Map<Long, Long> areaCountyIdAndCityIdMap = areaDtos.stream().collect(Collectors.toMap(AreaDto::getId, AreaDto::getParentId));

        //2.将市级id作为运费计算条件
        WaybillDTO waybillDTO = BeanUtil.toBean(calculateVO, WaybillDTO.class, (calculate, waybill) -> {
            waybill.setReceiverCityId(areaCountyIdAndCityIdMap.get(calculate.getReceiverCountyId()));
            waybill.setSenderCityId(areaCountyIdAndCityIdMap.get(calculate.getSenderCountyId()));
        });

        //3.调用接口，计算运费
        CarriageDTO carriageDTO = carriageFeign.compute(waybillDTO);
        log.info("计算结果:{}", carriageDTO);
        return BeanUtil.toBean(carriageDTO, CarriageVO.class, (carriage, carriageVO) -> {
            carriageVO.setFreight(String.valueOf(carriage.getExpense()));
            carriageVO.setWeight(BigDecimal.valueOf(carriage.getComputeWeight()));
            carriageVO.setFirstWeight(carriage.getFirstWeight());
            carriageVO.setContinuousWeight(carriage.getContinuousWeight());
        });
    }

    /**
     * 将取派件任务封装为VO
     *
     * @param taskDTO 取派件任务
     * @return 任务返回结果
     */
    private TaskVO getTaskVO(PickupDispatchTaskDTO taskDTO, Map<Long, OrderDTO> orderMap) {
        TaskVO taskVO = BeanUtil.toBean(taskDTO, TaskVO.class);
        taskVO.setCancelReason(ObjectUtil.isEmpty(taskDTO.getCancelReason()) ? null : taskDTO.getCancelReason().getValue());

        //为taskVO封装订单和运单数据
        this.assembleTaskVO(taskVO, orderMap);
        return taskVO;
    }

    /**
     * 为taskVO封装订单和运单数据
     *
     * @param taskVO 取派件任务
     */
    private void assembleTaskVO(TaskVO taskVO, Map<Long, OrderDTO> orderMap) {
        //根据订单id查询订单
        OrderDTO orderDTO = orderMap.get(taskVO.getOrderId());
        if (orderDTO == null) {
            String msg = CharSequenceUtil.format("id为{}的取派件任务查不到订单信息", taskVO.getId());
            throw new SLWebException(msg);
        }

        taskVO.setAmount(orderDTO.getAmount().doubleValue());//运费
        taskVO.setPaymentStatus(orderDTO.getPaymentStatus());
        taskVO.setPaymentMethod(orderDTO.getPaymentMethod());

        //判断取派件任务需要获取的是寄件人信息还是收件人信息
        //拒签情况下，同一个订单会产生两个派件任务。正常派件任务是派给收件人，拒签后的派件任务是派给寄件人
        //通过TaskInformationEnum设置取寄件人信息还是收件人信息。只有是正常的派件任务是目标是收件人，其余均是寄件人
        TaskInformationEnum flag = TaskInformationEnum.SEND;
        if (PickupDispatchTaskType.DISPATCH.equals(taskVO.getTaskType())) {
            List<PickupDispatchTaskDTO> pickupDispatchTaskDTOS = pickupDispatchTaskFeign.findByOrderId(taskVO.getOrderId(), taskVO.getTaskType());
            //pickupDispatchTaskDTOS是按创建时间正序排序的，第一条数据是正常的派件任务
            if (pickupDispatchTaskDTOS.get(0).getId().equals(taskVO.getId())) {
                flag = TaskInformationEnum.RECEIVE;
            }
        }

        //vo设置姓名、电话、地址、坐标
        Map<String, String> taskInformation = this.getNameAndPhoneAndAddress(flag, orderDTO);
        taskVO.setName(taskInformation.get(CourierConstants.OrderInfo.NAME));
        taskVO.setPhone(taskInformation.get(CourierConstants.OrderInfo.PHONE));
        taskVO.setAddress(taskInformation.get(CourierConstants.OrderInfo.ADDRESS));
        taskVO.setLocation(taskInformation.get(CourierConstants.OrderInfo.LOCATION));

        //获取运单信息:取件任务新任务状态和已取消状态不查运单
        if (ObjectUtil.equal(PickupDispatchTaskType.DISPATCH, taskVO.getTaskType()) || ObjectUtil.equal(PickupDispatchTaskStatus.COMPLETED, taskVO.getStatus())) {
            TransportOrderDTO transportOrderDTO = transportOrderFeign.findByOrderId(taskVO.getOrderId());
            taskVO.setTransportOrderId(transportOrderDTO.getId());//运单id
        }
    }

    /**
     * 根据任务类型，筛选出姓名、电话、地址、坐标
     *
     * @param taskInformationEnum 任务信息相关
     * @param orderDTO            订单信息
     * @return 姓名、电话、地址、坐标
     */
    private Map<String, String> getNameAndPhoneAndAddress(TaskInformationEnum taskInformationEnum, OrderDTO orderDTO) {
        String address;
        String location;
        Map<String, String> taskInformation = new HashMap<>();
        switch (taskInformationEnum) {
            case SEND: //任务关联寄件人信息
                //寄/收件人姓名
                taskInformation.put(CourierConstants.OrderInfo.NAME, orderDTO.getSenderName());
                //寄/收件人电话
                taskInformation.put(CourierConstants.OrderInfo.PHONE, orderDTO.getSenderPhone());

                //根据id查询省、市、区名称并拼接为完整地址
                address = getDetailAddress(orderDTO.getSenderProvinceId(), orderDTO.getSenderCityId(), orderDTO.getSenderCountyId(), orderDTO.getSenderAddress());

                //获取寄/收件人坐标
                location = orderFeign.findOrderLocationByOrderId(orderDTO.getId()).getSendLocation();
                break;
            case RECEIVE://2任务关联收件人信息
                //寄/收件人姓名
                taskInformation.put(CourierConstants.OrderInfo.NAME, orderDTO.getReceiverName());
                //寄/收件人电话
                taskInformation.put(CourierConstants.OrderInfo.PHONE, orderDTO.getReceiverPhone());

                //根据id查询省、市、区名称并拼接为完整地址
                address = getDetailAddress(orderDTO.getReceiverProvinceId(), orderDTO.getReceiverCityId(), orderDTO.getReceiverCountyId(), orderDTO.getReceiverAddress());

                //获取寄件人坐标
                location = orderFeign.findOrderLocationByOrderId(orderDTO.getId()).getReceiveLocation();
                break;
            default:
                throw new SLWebException("Unexpected taskType:" + taskInformationEnum);
        }

        //寄/收件人地址、坐标
        taskInformation.put(CourierConstants.OrderInfo.ADDRESS, address);
        taskInformation.put(CourierConstants.OrderInfo.LOCATION, location);
        return taskInformation;
    }

    /**
     * 根据省市县id和具体地址，拼接为完整地址
     *
     * @param provinceId 省id
     * @param cityId     市id
     * @param countyId   区/县id
     * @param address    具体地址
     * @return 完整地址
     */
    private String getDetailAddress(Long provinceId, Long cityId, Long countyId, String address) {
        List<AreaDto> areaList = areaFeign.findBatch(List.of(provinceId, cityId, countyId));
        Map<Long, String> areaMap = areaList.stream().collect(Collectors.toMap(AreaDto::getId, AreaDto::getName, (key, value) -> value));
        return CharSequenceUtil.strBuilder(areaMap.get(provinceId), areaMap.get(cityId), areaMap.get(countyId), address).toString();
    }

    /**
     * 条件查询取派件任务列表
     *
     * @param vo 查询条件
     * @return 取派件任务列表
     */
    private List<PickupDispatchTaskDTO> getPickupDispatchTaskList(TaskQueryVO vo) {
        //构造查询条件
        PickupDispatchTaskPageQueryDTO taskDTO = new PickupDispatchTaskPageQueryDTO();
        taskDTO.setPage(1);
        taskDTO.setPageSize(999);
        taskDTO.setCourierId(UserThreadLocal.getUserId()); //快递员ID

        if (ObjectUtil.isNotEmpty(vo.getTaskStatus())) {
            this.setTskTypeAndStatus(vo);//根据页面tap设置任务类型和状态
        }

        taskDTO.setTaskType(PickupDispatchTaskType.codeOf(vo.getTaskType()));
        taskDTO.setStatus(vo.getStatus() == null ? null : PickupDispatchTaskStatus.codeOf(vo.getStatus()));
        taskDTO.setIsDeleted(PickupDispatchTaskIsDeleted.NOT_DELETED);

        //根据类型、状态、快递员ID查询任务列表
        return pickupDispatchTaskFeign.findByPage(taskDTO).getItems();
    }

    /**
     * 根据页面tap设置任务类型和状态
     *
     * @param vo 任务查询对象
     */
    private void setTskTypeAndStatus(TaskQueryVO vo) {
        switch (TaskStatus.lookup(vo.getTaskStatus())) {
            case WAITING_PICKUP: //1待取件
                vo.setTaskType(PickupDispatchTaskType.PICKUP.getCode());//任务类型，1为取件任务，2为派件任务
                vo.setStatus(PickupDispatchTaskStatus.NEW.getCode());//任务状态，1为待执行、2为进行中、3为待确认、4为已完成、5为已取消
                break;
            case COMPLETE_PICKUP: //2已取件
                vo.setTaskType(PickupDispatchTaskType.PICKUP.getCode());//任务类型，1为取件任务，2为派件任务
                vo.setStatus(PickupDispatchTaskStatus.COMPLETED.getCode());//任务状态，1为待执行、2为进行中、3为待确认、4为已完成、5为已取消
                break;
            case CANCELED: //3已取消
                vo.setTaskType(PickupDispatchTaskType.PICKUP.getCode());//任务类型，1为取件任务，2为派件任务
                vo.setStatus(PickupDispatchTaskStatus.CANCELLED.getCode());//任务状态，1为待执行、2为进行中、3为待确认、4为已完成、5为已取消
                break;
            case WAITING_DISPATCH://4待派件
                vo.setTaskType(PickupDispatchTaskType.DISPATCH.getCode());//任务类型，1为取件任务，2为派件任务
                vo.setStatus(PickupDispatchTaskStatus.NEW.getCode());//任务状态，1为待执行、2为进行中、3为待确认、4为已完成、5为已取消
                break;
            case COMPLETE_DISPATCH://5已签收
                vo.setTaskType(PickupDispatchTaskType.DISPATCH.getCode());//任务类型，1为取件任务，2为派件任务
                vo.setStatus(PickupDispatchTaskStatus.COMPLETED.getCode());//任务状态，1为待执行、2为进行中、3为待确认、4为已完成、5为已取消
                break;
            default:
                throw new SLWebException("Unexpected taskStatus:" + vo);
        }
    }

    /**
     * 分页查询任务列表
     *
     * @param vo 取/派件查询模型
     * @return 任务列表
     */
    @Override
    public PageResponse<TaskVO> pageQuery(TaskQueryVO vo) {
        //1.条件查询取派件任务列表
        List<PickupDispatchTaskDTO> taskDTOList = this.getPickupDispatchTaskList(vo);
        if (CollUtil.isEmpty(taskDTOList)) {
            return new PageResponse<>();
        }

        //dto转换为vo
        List<TaskVO> taskList = taskDTOList.stream().map(taskDTO -> {
            TaskVO taskVO = BeanUtil.toBean(taskDTO, TaskVO.class);
            taskVO.setCancelReason(ObjectUtil.isEmpty(taskDTO.getCancelReason()) ? null : taskDTO.getCancelReason().getValue());
            return taskVO;
        }).collect(Collectors.toList());

        //2.设置任务时间
        this.setTaskTime(vo.getStatus(), taskList);

        //3.按日期过滤任务
        taskList = taskList.stream().filter(task -> task.getTaskTime().isAfter(vo.getDateTime()) && task.getTaskTime().isBefore(vo.getDateTime().plusDays(1))).collect(Collectors.toList());
        if (CollUtil.isEmpty(taskList)) {
            return new PageResponse<>();
        }

        //4.全部取派中不展示已取消的任务，即入参任务状态为null的情况,过滤掉已取消任务
        if (ObjectUtil.isEmpty(vo.getStatus())) {
            taskList = taskList.stream().filter(task -> ObjectUtil.notEqual(task.getStatus(), PickupDispatchTaskStatus.CANCELLED)).collect(Collectors.toList());
        }

        //5.过滤超时任务
        if (Boolean.TRUE.equals(vo.getFilterOverTime())) {
            taskList = filterTaskList(taskList);

            if (CollUtil.isEmpty(taskList)) {
                return new PageResponse<>();
            }
        }

        //6.为taskVO封装订单和运单数据
        List<String> orderIds = taskList.stream().map(task -> task.getOrderId().toString()).collect(Collectors.toList());
        List<OrderDTO> orderDTOS = orderFeign.findByIds(orderIds);
        Map<Long, OrderDTO> orderMap = orderDTOS.stream().collect(Collectors.toMap(OrderDTO::getId, order -> order));
        taskList.forEach(taskVO -> assembleTaskVO(taskVO, orderMap));

        //7.计算距离:待取件和待派件需要计算距离
        this.computeDistance(vo.getLongitude(), vo.getLatitude(), taskList);

        //8.排序
        taskList = sortTaskList(vo, taskList);

        //9.分页
        int startPosition = (vo.getPage() - 1) * vo.getPageSize();//起始位置
        long pageCounts = taskList.size();//总条目数
        long pages = (long) Math.ceil(pageCounts * 1.0 / vo.getPageSize());//总页数
        //根据起始位置和页面大小取当前页面数据列表
        taskList = taskList.stream().skip(startPosition).limit(vo.getPageSize()).collect(Collectors.toList());

        //10.是否超时：待取件和待派件需要标记超时
        if (ObjectUtil.equal(vo.getStatus(), 1)) {
            taskList.forEach(x -> x.setIsDelay(LocalDateTime.now().isAfter(x.getEstimatedEndTime())));
        }

        //11.分页结果封装
        return PageResponse.of(taskList, vo.getPage(), vo.getPageSize(), pages, pageCounts);
    }

    /**
     * 设置任务时间
     *
     * @param status   取派件任务状态
     * @param taskList 任务列表
     */
    private void setTaskTime(Integer status, List<TaskVO> taskList) {
        if (ObjectUtil.isEmpty(status)) {
            taskList.forEach(x -> x.setTaskTime(x.getCreated()));
        } else {
            switch (PickupDispatchTaskStatus.codeOf(status)) {
                //新任务
                case NEW:
                    taskList.forEach(x -> x.setTaskTime(x.getEstimatedStartTime()));
                    break;
                //已完成
                case COMPLETED:
                    taskList.forEach(x -> x.setTaskTime(x.getActualEndTime()));
                    break;
                //已取消
                case CANCELLED:
                    taskList.forEach(x -> x.setTaskTime(x.getCancelTime()));
                    break;
                default:
                    throw new SLWebException("Unexpected taskStatus:" + status);
            }
        }
    }

    /**
     * 计算距离
     *
     * @param longitude 经度
     * @param latitude  纬度
     * @param taskList  任务列表
     */
    private void computeDistance(Double longitude, Double latitude, List<TaskVO> taskList) {
        taskList.forEach(x -> {
            if (x.getStatus().equals(PickupDispatchTaskStatus.NEW)) {
                //获取快递员与收件人之间的距离单位km,保留1位小数
                double distance = LocationUtils.getDistance(longitude, latitude, x.getLocation());
                distance = NumberUtil.round(distance / 1000, 1).doubleValue();
                x.setDistance(distance);
            }
        });
    }

    /**
     * 过滤即将超时任务
     *
     * @param taskList 任务列表
     * @return 过滤后任务列表
     */
    private List<TaskVO> filterTaskList(List<TaskVO> taskList) {
        taskList = taskList.stream().filter(taskVO -> {
            LocalDateTime deadlineTime = taskVO.getEstimatedEndTime();//截止时间
            return LocalDateTime.now().isAfter(deadlineTime);
        }).collect(Collectors.toList());
        return taskList;
    }

    /**
     * 根据距离或时间对列表排序
     *
     * @param vo       排序字段
     * @param taskList 未排序列表
     * @return 已排序列表
     */
    private List<TaskVO> sortTaskList(TaskQueryVO vo, List<TaskVO> taskList) {
        if (ObjectUtil.isNotEmpty(vo.getOrderDistance()) && vo.getOrderDistance().equals(SortOrderEnum.POSITIVE_SEQUENCE.getCode())) {
            //按距离正序
            return CollUtil.sort(taskList, Comparator.comparing(TaskVO::getDistance));
        } else if (ObjectUtil.isNotEmpty(vo.getOrderDistance()) && vo.getOrderDistance().equals(SortOrderEnum.REVERSE_ORDER.getCode())) {
            //按距离倒序
            return CollUtil.sort(taskList, Comparator.comparing(TaskVO::getDistance).reversed());
        } else if (ObjectUtil.isNotEmpty(vo.getOrderTime()) && vo.getOrderTime().equals(SortOrderEnum.POSITIVE_SEQUENCE.getCode())) {
            //按时间正序
            return CollUtil.sort(taskList, Comparator.comparing(TaskVO::getTaskTime));
        } else {
            //默认按时间倒序
            return CollUtil.sort(taskList, Comparator.comparing(TaskVO::getTaskTime).reversed());
        }
    }

    /**
     * 任务详情
     *
     * @param id 任务id
     * @return 任务详情
     */
    @Override
    public TaskInfoVO detail(String id) {
        //查询取派件任务相关联信息
        PickupDispatchTaskDTO taskDTO = pickupDispatchTaskFeign.findById(Long.valueOf(id));//取派件任务信息
        log.info("取派件任务为：{}", taskDTO);
        OrderDTO orderDTO = orderFeign.findById(taskDTO.getOrderId());//订单信息
        OrderCargoDTO orderCargoDto = cargoFeign.findByOrderId(orderDTO.getId());//货物信息
        MemberDTO memberDto = memberFeign.detail(orderDTO.getMemberId());//用户信息

        //组装响应数据
        TaskInfoVO vo = BeanUtil.toBean(taskDTO, TaskInfoVO.class);
        vo.setId(id);//任务id
        vo.setOrderId(String.valueOf(taskDTO.getOrderId()));//订单id
        vo.setSenderName(orderDTO.getSenderName());//寄件人姓名
        vo.setReceiverName(orderDTO.getReceiverName());//收件人姓名
        vo.setSenderPhone(orderDTO.getSenderPhone());//寄件人电话
        vo.setReceiverPhone(orderDTO.getReceiverPhone());//收件人电话
        vo.setGoodsType(orderCargoDto.getName());//物品类型名称
        vo.setWeight(orderCargoDto.getWeight());//重量
        vo.setVolume(orderCargoDto.getVolume());//体积
        vo.setFreight(String.valueOf(orderDTO.getAmount()));//金额
        vo.setRemark(taskDTO.getMark());//备注
        vo.setPaymentMethod(orderDTO.getPaymentMethod());//付款方式,1寄付，2到付
        vo.setPaymentStatus(orderDTO.getPaymentStatus());//付款状态,1未付，2已付
        vo.setSignRecipient(ObjectUtil.isEmpty(taskDTO.getSignRecipient()) ? null : taskDTO.getSignRecipient().getCode());//签收人，1-本人，2-代收
        vo.setIdCardNoVerify(memberDto.getIdCardNoVerify());//身份证号是否验证0：未验证 1：验证通过 2：验证未通过
        vo.setIdCardNo(DesensitizedUtil.idCardNum(memberDto.getIdCardNo(), 6, 4));//身份证号脱敏

        //获取运单信息:取件任务新任务状态和已取消状态不查运单,只查派件任务和完成状态的运单
        if (ObjectUtil.equal(PickupDispatchTaskType.DISPATCH, taskDTO.getTaskType()) || ObjectUtil.equal(PickupDispatchTaskStatus.COMPLETED, taskDTO.getStatus())) {
            TransportOrderDTO transportOrderDTO = transportOrderFeign.findByOrderId(orderDTO.getId());
            vo.setTransportOrderId(transportOrderDTO.getId());//运单id
        }

        //根据id查询省、市、区名称并拼接为完整地址
        String senderAddress = getDetailAddress(orderDTO.getSenderProvinceId(), orderDTO.getSenderCityId(), orderDTO.getSenderCountyId(), orderDTO.getSenderAddress());
        String receiverAddress = getDetailAddress(orderDTO.getReceiverProvinceId(), orderDTO.getReceiverCityId(), orderDTO.getReceiverCountyId(), orderDTO.getReceiverAddress());

        vo.setSenderAddress(senderAddress);//寄件人地址
        vo.setReceiverAddress(receiverAddress);//收件人地址
        vo.setSenderCountyId(orderDTO.getSenderCountyId());//寄件地址id，这里指的是区/县的地址ID
        vo.setReceiverCountyId(orderDTO.getReceiverCountyId());//收件地址id，这里指的是区/县的地址ID
        return vo;
    }

    /**
     * 身份验证
     *
     * @param vo 身份信息
     * @return 是否通过验证
     */
    @Override
    public RealNameVerifyVO idCardCheck(TaskIdCardCheckVO vo) {
        RealNameVerifyVO realNameVerifyVO = new RealNameVerifyVO();
        realNameVerifyVO.setName(DesensitizedUtil.chineseName(vo.getName()));
        realNameVerifyVO.setIdCard(DesensitizedUtil.idCardNum(vo.getIdCard(), 6, 4));
        realNameVerifyVO.setSex(IdcardUtil.getGenderByIdCard(vo.getIdCard()));
        realNameVerifyVO.setFlag(false);

        //1.校验身份证号规则
        if (!IdcardUtil.isValidCard(vo.getIdCard())) {
            return realNameVerifyVO;
        }

        //2.实名认证（校验身份证号和姓名的一致性）
        //实名认证收费，免费次数有限，请慎重使用
        if (Boolean.parseBoolean(realNameVerify)) {
            log.info("用户开始进行实名认证，姓名：{}，身份证号：{}", vo.getName(), vo.getIdCard());
            try {
                if (!realNameVerifyService.realNameVerify(vo.getName(), vo.getIdCard())) {
                    return realNameVerifyVO;
                }
            } catch (IOException e) {
                throw new SLWebException("实名认证方法执行失败");
            }
        }

        realNameVerifyVO.setFlag(true);
        return realNameVerifyVO;
    }

    /**
     * 取件
     *
     * @param vo 取件对象
     * @return 是否成功
     */
    @Override
    @GlobalTransactional
    public boolean pickup(TaskPickupVO vo) {
        log.info("取件信息:{}", vo);
        //1.根据任务id查询取派件任务
        PickupDispatchTaskDTO taskDTO = pickupDispatchTaskFeign.findById(Long.valueOf(vo.getId()));
        if (ObjectUtil.notEqual(taskDTO.getStatus(), PickupDispatchTaskStatus.NEW)) {
            throw new SLWebException("快递必须是未取状态！");
        }
        Long orderId = taskDTO.getOrderId();

        //2.根据订单id查询订单
        OrderDTO orderDB = orderFeign.findById(orderId);

        //3.身份校验:先查询用户信息，若已实名认证直接放行；未实名认证必须进行认证
        MemberDTO memberDto = memberFeign.detail(orderDB.getMemberId());//用户信息
        if (!memberDto.getIdCardNoVerify().equals(MemberIdCardVerifyStatus.SUCCESS.getCode())) {
            if (CharSequenceUtil.hasBlank(vo.getIdCard(), vo.getName())) {
                throw new SLWebException("用户未实名认证，必须输入身份证号和姓名！");
            }
            TaskIdCardCheckVO taskIdCardCheckVO = BeanUtil.toBean(vo, TaskIdCardCheckVO.class);
            RealNameVerifyVO realNameVerifyVO = idCardCheck(taskIdCardCheckVO);
            if (Boolean.FALSE.equals(realNameVerifyVO.getFlag())) {
                return false;
            }
        }
        log.info("取件动作-身份校验通过");

        //4.更新取派件任务
        PickupDispatchTaskDTO pickupDispatchTaskDTO = pickupDispatchTaskFeign.findById(Long.valueOf(vo.getId()));
        pickupDispatchTaskDTO.setStatus(PickupDispatchTaskStatus.COMPLETED);//任务状态
        pickupDispatchTaskFeign.updateStatus(pickupDispatchTaskDTO);

        //5.获取快递员信息
        UserDTO userDTO = AuthTemplateThreadLocal.get().opsForUser().getUserById(UserThreadLocal.getUserId()).getData();

        //6.构建更新订单消息数据
        OrderPickupDTO orderPickupDTO = BeanUtil.toBean(vo, OrderPickupDTO.class);
        orderPickupDTO.setId(orderId);
        String orderPickupJson = JSONUtil.toJsonStr(orderPickupDTO);

        //6.1更新订单相关信息
        orderFeign.orderPickup(orderPickupDTO);

        //7.发送取件成功的消息
        String msg = CourierMsg.builder().orderId(orderId).courierId(userDTO.getId()).courierName(userDTO.getName()).courierMobile(userDTO.getMobile()).created(System.currentTimeMillis())
                //更新订单消息放到扩展信息中，需要的业务再处理，不需要的忽略即可
                .info(orderPickupJson).build().toJson();
        this.mqFeign.sendMsg(Constants.MQ.Exchanges.COURIER, Constants.MQ.RoutingKeys.COURIER_PICKUP, msg);

        return true;
    }

    /**
     * 批量转单
     *
     * @param dto 转单对象
     */
    @Override
    public void batchTransfer(TaskBatchTransferVO dto) {
        //1.获取当前用户id
        Long userId = UserThreadLocal.getUserId();

        //2.根据任务ids查询任务列表
        List<Long> idList = dto.getIdList().stream().map(Long::valueOf).collect(Collectors.toList());

        //3.批量修改取派件任务快递员id
        pickupDispatchTaskFeign.updateCourierId(idList, userId, Long.valueOf(dto.getAnotherCourierId()));
    }

    /**
     * 取消任务
     *
     * @param vo 取消任务对象
     */
    @Override
    @GlobalTransactional
    public void cancel(TasksCancelVO vo) {
        //1.更新任务
        PickupDispatchTaskDTO taskDTO = pickupDispatchTaskFeign.findById(Long.valueOf(vo.getId()));
        taskDTO.setStatus(PickupDispatchTaskStatus.CANCELLED);//取消状态
        taskDTO.setCancelReason(vo.getReason());//取消原因
        taskDTO.setCancelReasonDescription(vo.getReasonDesc());//取消原因具体描述
        pickupDispatchTaskFeign.updateStatus(taskDTO);

        //2.存储签收消息
        //2.1查询订单详情
        OrderDTO orderDTO = orderFeign.findById(taskDTO.getOrderId());

        //2.2组装消息内容
        Map<String, String> stringMap = this.getNameAndPhoneAndAddress(TaskInformationEnum.codeOf(taskDTO.getTaskType().getCode()), orderDTO);
        String content = CharSequenceUtil.format("地址：{}，寄件人：{}，电话：{}", stringMap.get(CourierConstants.OrderInfo.ADDRESS), stringMap.get(CourierConstants.OrderInfo.NAME), stringMap.get(CourierConstants.OrderInfo.ADDRESS));

        //2.2构建消息对象
        MessageAddDTO messageAddDTO = MessageAddDTO.builder()
                .title(MessageConstants.MessageTitle.CANCEL)
                .content(content)
                .bussinessType(MessageBussinessTypeEnum.COURIER.getCode())
                .userId(taskDTO.getCourierId())
                .contentType(MessageContentTypeEnum.COURIER_CANCEL.getCode())
                .relevantId(taskDTO.getId())
                .createUser(UserThreadLocal.getUserId())
                .updateUser(UserThreadLocal.getUserId())
                .build();
        messageFeign.add(messageAddDTO);
    }

    /**
     * 删除任务(逻辑删除)
     *
     * @param id 任务id
     */
    @Override
    public void delete(String id) {
        //1.逻辑删除
        pickupDispatchTaskFeign.deleteByIds(Collections.singletonList(Long.valueOf(id)));
    }

    /**
     * 批量删除任务
     *
     * @param taskBatchVO 任务id列表
     */
    @Override
    public void batchDelete(TaskBatchVO taskBatchVO) {
        //1.将id转换为long类型，形成列表
        List<Long> ids = taskBatchVO.getIdList().stream().map(Long::valueOf).collect(Collectors.toList());

        //2.批量逻辑删除
        pickupDispatchTaskFeign.deleteByIds(ids);
    }

    /**
     * 签收任务
     *
     * @param vo 签收对象
     */
    @Override
    public void sign(TaskSignVO vo) {
        //1.更新任务
        PickupDispatchTaskDTO taskDTO = pickupDispatchTaskFeign.findById(Long.valueOf(vo.getId()));
        if (ObjectUtil.notEqual(taskDTO.getSignStatus(), PickupDispatchTaskSignStatus.NOT_SIGNED)) {
            throw new SLWebException("快递已签收/拒收");
        }

        taskDTO.setStatus(PickupDispatchTaskStatus.COMPLETED);//任务状态
        taskDTO.setSignStatus(PickupDispatchTaskSignStatus.RECEIVED);//签收状态(1为已签收，2为拒收)
        taskDTO.setSignRecipient(SignRecipientEnum.codeOf(vo.getSignRecipient()));//签收人，1-本人，2-代收
        pickupDispatchTaskFeign.updateStatus(taskDTO);

        //2.更新订单
        OrderDTO orderDTO = orderFeign.findById(taskDTO.getOrderId());
        orderDTO.setStatus(OrderStatus.RECEIVED.getCode());
        orderFeign.updateById(taskDTO.getOrderId(), orderDTO);

        //3.存储签收消息
        //判断派件任务需要获取的是寄件人信息还是收件人信息
        //拒签情况下，同一个订单会产生两个派件任务。正常派件任务是派给收件人，拒签后的派件任务是派给寄件人
        //通过TaskInformationEnum设置取寄件人信息还是收件人信息。只有是正常的派件任务是目标是收件人，其余均是寄件人
        TaskInformationEnum flag = TaskInformationEnum.SEND;
        List<PickupDispatchTaskDTO> pickupDispatchTaskDTOS = pickupDispatchTaskFeign.findByOrderId(taskDTO.getOrderId(), PickupDispatchTaskType.DISPATCH);
        //pickupDispatchTaskDTOS是按创建时间正序排序的，第一条数据是正常的派件任务
        if (pickupDispatchTaskDTOS.get(0).getId().equals(taskDTO.getId())) {
            flag = TaskInformationEnum.RECEIVE;
        }

        //3.1组装消息内容
        Map<String, String> stringMap = this.getNameAndPhoneAndAddress(flag, orderDTO);
        String content = CharSequenceUtil.format("地址：{}，收件人：{}，电话：{}", stringMap.get(CourierConstants.OrderInfo.ADDRESS), stringMap.get(CourierConstants.OrderInfo.NAME), stringMap.get(CourierConstants.OrderInfo.PHONE));

        //3.2构建消息对象
        MessageAddDTO messageAddDTO = MessageAddDTO.builder()
                .title(MessageConstants.MessageTitle.SIGN)
                .content(content)
                .bussinessType(MessageBussinessTypeEnum.COURIER.getCode())
                .userId(taskDTO.getCourierId())
                .contentType(MessageContentTypeEnum.COURIER_SIGN.getCode())
                .relevantId(taskDTO.getId())
                .createUser(UserThreadLocal.getUserId())
                .updateUser(UserThreadLocal.getUserId())
                .build();
        messageFeign.add(messageAddDTO);

        //4.发送运单跟踪消息
        //4.1获取快递员信息
        UserDTO userDTO = AuthTemplateThreadLocal.get().opsForUser().getUserById(UserThreadLocal.getUserId()).getData();
        String info = CharSequenceUtil.format("您的快递已签收，如有疑问请联系快递员【{}，电话{}】，感谢您使用神领快递，期待再次为您服务", userDTO.getName(), userDTO.getMobile());

        //4.2查询运单
        TransportOrderDTO transportOrderDTO = transportOrderFeign.findByOrderId(orderDTO.getId());

        //4.3构建消息实体类
        TransportInfoMsg transportInfoMsg = TransportInfoMsg.builder().transportOrderId(transportOrderDTO.getId())//运单id
                .status("已签收")//消息状态
                .info(info)//消息详情
                .created(DateUtil.current())//创建时间
                .build();

        //4.4发送消息
        this.mqFeign.sendMsg(Constants.MQ.Exchanges.TRANSPORT_INFO, Constants.MQ.RoutingKeys.TRANSPORT_INFO_APPEND, transportInfoMsg.toJson());

        //5.发送完成轨迹消息
        TransportOrderStatusMsg transportOrderStatusMsg = TransportOrderStatusMsg.builder()
                .idList(List.of(transportOrderDTO.getId()))
                .build();
        this.mqFeign.sendMsg(Constants.MQ.Exchanges.TRANSPORT_ORDER_DELAYED, Constants.MQ.RoutingKeys.TRANSPORT_ORDER_UPDATE_STATUS_PREFIX + "RECEIVED", transportOrderStatusMsg.toJson());
    }

    /**
     * 拒收任务
     *
     * @param id 任务id
     */
    @Override
    public void reject(String id) {
        //1.状态校验
        PickupDispatchTaskDTO taskDTO = pickupDispatchTaskFeign.findById(Long.valueOf(id));
        if (ObjectUtil.notEqual(taskDTO.getSignStatus(), PickupDispatchTaskSignStatus.NOT_SIGNED)) {
            throw new SLWebException("快递已签收/拒收");
        }

        TransportOrderDTO transportOrderDTO = transportOrderFeign.findByOrderId(taskDTO.getOrderId());
        if (ObjectUtil.equal(transportOrderDTO.getIsRejection(), true)) {
            throw new SLWebException("快递已被收件人拒收，不能再次拒收！");
        }

        //2.更新任务
        taskDTO.setStatus(PickupDispatchTaskStatus.COMPLETED);//任务状态
        taskDTO.setSignStatus(PickupDispatchTaskSignStatus.REJECTION);//签收状态(1为已签收，2为拒收)
        taskDTO.setActualEndTime(LocalDateTime.now());//实际完成时间
        pickupDispatchTaskFeign.updateStatus(taskDTO);

        //3.更新订单
        OrderDTO orderDTO = orderFeign.findById(taskDTO.getOrderId());
        orderDTO.setStatus(OrderStatus.REJECTION.getCode());
        orderFeign.updateById(taskDTO.getOrderId(), orderDTO);

        //4.更新运单状态为 拒收
        transportOrderFeign.updateStatus(transportOrderDTO.getId(), TransportOrderStatus.REJECTED);

        //5.发送运单跟踪消息
        //5.1获取快递员信息
        UserDTO userDTO = AuthTemplateThreadLocal.get().opsForUser().getUserById(UserThreadLocal.getUserId()).getData();
        String info = CharSequenceUtil.format("您的快递已拒收，快递将返回到网点，如有疑问请电联快递员【联系人{}，电话：{}】", userDTO.getName(), userDTO.getMobile());

        //5.2构建消息实体类
        TransportInfoMsg transportInfoMsg = TransportInfoMsg.builder().transportOrderId(transportOrderDTO.getId()).status("已拒收").info(info).created(DateUtil.current()).build();

        //5.3发送消息
        this.mqFeign.sendMsg(Constants.MQ.Exchanges.TRANSPORT_INFO, Constants.MQ.RoutingKeys.TRANSPORT_INFO_APPEND, transportInfoMsg.toJson());
    }

    /**
     * 运单跟踪
     *
     * @param id 运单id
     * @return 运单跟踪信息
     */
    @Override
    public List<TransportOrderPointVO> tracks(String id) {
        //1.调用transport-info接口，获取相关运单的追踪信息
        TransportInfoDTO transportInfoDTO = transportInfoFeign.queryByTransportOrderId(id);
        if (ObjectUtil.hasEmpty(transportInfoDTO, transportInfoDTO.getInfoList())) {
            return Collections.emptyList();
        }

        //2.解析运单追踪信息，封装到vo
        return transportInfoDTO.getInfoList().stream().map(x -> {
            TransportOrderPointVO vo = BeanUtil.toBean(x, TransportOrderPointVO.class);
            vo.setCreated(LocalDateTimeUtil.of(x.getCreated()));
            return vo;
        }).collect(Collectors.toList());
    }

    /**
     * 今日任务数据统计
     *
     * @return 今日任务统计数据
     */
    @Override
    public TaskStatisticsVO taskStatistics() {
        //1.当前用户id
        Long userId = UserThreadLocal.getUserId();

        //2.当前用户任务统计
        PickupDispatchTaskStatisticsDTO taskStatisticsDTO = pickupDispatchTaskFeign.todayTasksStatistics(userId);
        return BeanUtil.toBean(taskStatisticsDTO, TaskStatisticsVO.class);
    }

    /**
     * 最近查找redis存取前缀
     */
    private static final String RECENT_SEARCH_PREFIX = "RECENT_SEARCH:";

    /**
     * 展示最近查找运单号
     *
     * @return 最近查找运单号
     */
    @Override
    public List<String> recentSearch() {
        //1.构建redisKey
        Long userId = UserThreadLocal.get().getUserId();
        String redisKey = RECENT_SEARCH_PREFIX + userId;

        //2.查找所有
        List<String> jsonList = stringRedisTemplate.opsForList().range(redisKey, 0, -1);
        if (jsonList == null) {
            return new ArrayList<>();
        }

        //3.json转为对象
        List<RecentSearchVO> list = jsonList.stream().map(json -> JSONUtil.toBean(json, RecentSearchVO.class)).collect(Collectors.toList());

        //4.过滤1个月以内的运单号并返回
        return list.stream().filter(vo -> vo.getCreated().plusMonths(1).isAfter(LocalDateTime.now())).map(RecentSearchVO::getTransportOrderId).collect(Collectors.toList());
    }

    /**
     * 标记为最近查找
     *
     * @param transportOrderId 运单号
     */
    @Override
    public void markRecent(String transportOrderId) {
        //1.构建redisKey
        Long userId = UserThreadLocal.get().getUserId();
        String redisKey = RECENT_SEARCH_PREFIX + userId;

        //2.构建新增对象
        RecentSearchVO recentSearchVO = RecentSearchVO.builder().transportOrderId(transportOrderId).created(LocalDateTime.now()).build();

        //3.查询当前运单id在redis中存储位置
        List<String> jsonList = stringRedisTemplate.opsForList().range(redisKey, 0, -1);

        //4.1如果redis为空，直接新增
        if (jsonList == null) {
            //新增一条元素
            stringRedisTemplate.opsForList().leftPush(redisKey, JSONUtil.toJsonStr(recentSearchVO));
        } else {
            //4.2如果redis不为空，需要判断运单号是否已经存储到redis
            List<RecentSearchVO> recentSearchList = jsonList.stream().map(json -> JSONUtil.toBean(json, RecentSearchVO.class)).collect(Collectors.toList());
            List<String> transportOrderIds = recentSearchList.stream().map(RecentSearchVO::getTransportOrderId).collect(Collectors.toList());

            //匹配运单号，匹配不到返回-1，匹配到返回索引位置
            int index = transportOrderIds.indexOf(transportOrderId);

            if (ObjectUtil.equal(index, -1) && ObjectUtil.equal(jsonList.size(), 10)) {
                //4.2.1如果redis中不存在该运单id，且数据已满10条，需要先删除最后一条
                stringRedisTemplate.opsForList().rightPop(redisKey);
            } else if (ObjectUtil.notEqual(index, -1)) {
                //4.2.2如果redis中存在该运单id，则先删除该项数据
                String jsonStr = JSONUtil.toJsonStr(recentSearchList.get(index));
                stringRedisTemplate.opsForList().remove(redisKey, 0, jsonStr);
            }

            //新增一条元素
            stringRedisTemplate.opsForList().leftPush(redisKey, JSONUtil.toJsonStr(recentSearchVO));
        }
    }

    /**
     * 清空最近查找
     */
    @Override
    public void recentSearchDeleteAll() {
        //1.构建redisKey
        Long userId = UserThreadLocal.get().getUserId();
        String redisKey = RECENT_SEARCH_PREFIX + userId;

        //2.清空所有
        stringRedisTemplate.delete(redisKey);
    }

    /**
     * 搜索任务
     *
     * @param taskSearchVO 搜索条件
     * @return 分页结果
     */
    @Override
    public PageResponse<TaskVO> search(TaskSearchVO taskSearchVO) {
        //1.构建查询对象
        Long userId = UserThreadLocal.get().getUserId();
        CourierTaskPageQueryDTO courierTaskPageQueryDTO = BeanUtil.toBean(taskSearchVO, CourierTaskPageQueryDTO.class);
        courierTaskPageQueryDTO.setCourierId(userId);

        //2.搜索微服务查询
        PageResponse<CourierTaskDTO> pageResponse = courierTaskFeign.pageQuery(courierTaskPageQueryDTO);
        if (ObjectUtil.isEmpty(pageResponse.getItems())) {
            return new PageResponse<>();
        }

        //3.根据取派件id列表查询取派件任务
        List<Long> courierTaskIds = pageResponse.getItems().stream().map(CourierTaskDTO::getId).collect(Collectors.toList());
        List<PickupDispatchTaskDTO> pickupDispatchTaskDTOS = pickupDispatchTaskFeign.findByIds(courierTaskIds);

        //4.将订单、运单相关数据封装
        List<String> orderIds = pickupDispatchTaskDTOS.stream().map(task -> task.getOrderId().toString()).collect(Collectors.toList());
        List<OrderDTO> orderDTOS = orderFeign.findByIds(orderIds);
        Map<Long, OrderDTO> orderMap = orderDTOS.stream().collect(Collectors.toMap(OrderDTO::getId, order -> order));
        List<TaskVO> taskVOList = pickupDispatchTaskDTOS.stream().map(task -> getTaskVO(task, orderMap)).collect(Collectors.toList());

        //5.设置任务时间
        this.setTaskTime(taskSearchVO.getStatus(), taskVOList);

        //6.计算距离:待取件和待派件需要计算距离
        this.computeDistance(taskSearchVO.getLongitude(), taskSearchVO.getLatitude(), taskVOList);

        //7.按照任务时间排序
        CollUtil.sort(taskVOList, Comparator.comparing(TaskVO::getTaskTime));

        //8.分页结果封装
        return PageResponse.of(taskVOList, pageResponse.getPage(), pageResponse.getPageSize(), pageResponse.getPages(), pageResponse.getCounts());
    }
}








