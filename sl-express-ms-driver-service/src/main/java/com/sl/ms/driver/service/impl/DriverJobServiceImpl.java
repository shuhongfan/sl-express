package com.sl.ms.driver.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.text.CharSequenceUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.base.api.common.MessageFeign;
import com.sl.ms.base.api.truck.TruckFeign;
import com.sl.ms.base.api.truck.TruckPlanFeign;
import com.sl.ms.base.api.truck.TruckReturnRegisterFeign;
import com.sl.ms.base.domain.base.MessageAddDTO;
import com.sl.ms.base.domain.enums.MessageBussinessTypeEnum;
import com.sl.ms.base.domain.enums.MessageContentTypeEnum;
import com.sl.ms.base.domain.enums.StatusEnum;
import com.sl.ms.base.domain.enums.TruckRunStatusEnum;
import com.sl.ms.base.domain.truck.TruckDto;
import com.sl.ms.base.domain.truck.TruckPlanDto;
import com.sl.ms.base.domain.truck.TruckReturnRegisterDTO;
import com.sl.ms.driver.domain.dto.request.*;
import com.sl.ms.driver.domain.dto.response.DailyMileageDTO;
import com.sl.ms.driver.domain.dto.response.DriverJobDTO;
import com.sl.ms.driver.domain.dto.response.DriverJobStatisticsDTO;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import com.sl.ms.driver.entity.DriverJobEntity;
import com.sl.ms.driver.enums.DriverExceptionEnum;
import com.sl.ms.driver.mapper.DriverJobMapper;
import com.sl.ms.driver.service.DriverJobService;
import com.sl.ms.transport.api.OrganFeign;
import com.sl.ms.work.api.TransportOrderFeign;
import com.sl.ms.work.api.TransportTaskFeign;
import com.sl.ms.work.domain.dto.TransportTaskDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskCompleteDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskDelayDeliveryDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskStartDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskMonthlyDistanceDTO;
import com.sl.ms.work.domain.enums.transportorder.TransportOrderStatus;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskStatus;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.ObjectUtil;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.domain.OrganDTO;
import io.seata.spring.annotation.GlobalTransactional;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DriverJobServiceImpl extends ServiceImpl<DriverJobMapper, DriverJobEntity> implements DriverJobService {

    @Resource
    private TransportOrderFeign transportOrderFeign;
    @Resource
    private TransportTaskFeign transportTaskFeign;
    @Resource
    private TruckPlanFeign truckPlanFeign;
    @Resource
    private TruckFeign truckFeign;
    @Resource
    private RedissonClient redissonClient;
    @Resource
    private TruckReturnRegisterFeign truckReturnRegisterFeign;
    @Resource
    private MessageFeign messageFeign;
    @Resource
    private OrganFeign organFeign;

    @Override
    @Transactional
    public Long createDriverJob(Long transportTaskId, Long driverId) {
        //查询运输任务
        TransportTaskDTO transportTaskDTO = this.transportTaskFeign.findById(transportTaskId);
        if (ObjectUtil.isEmpty(transportTaskDTO)) {
            throw new SLException(DriverExceptionEnum.TRANSPORT_TASK_NOT_FOUND);
        }

        DriverJobEntity driverJobEntity = new DriverJobEntity();
        driverJobEntity.setDriverId(driverId);
        driverJobEntity.setStartAgencyId(transportTaskDTO.getStartAgencyId());
        driverJobEntity.setEndAgencyId(transportTaskDTO.getEndAgencyId());
        driverJobEntity.setStatus(DriverJobStatus.PENDING);
        driverJobEntity.setTransportTaskId(transportTaskId);

        //根据车辆计划id查询预计发车时间和预计到达时间
        TruckPlanDto truckPlanDto = this.truckPlanFeign.findById(transportTaskDTO.getTruckPlanId());
        driverJobEntity.setPlanDepartureTime(truckPlanDto.getPlanDepartureTime()); //计划发车时间
        driverJobEntity.setPlanArrivalTime(truckPlanDto.getPlanArrivalTime()); //实际到达时间

        boolean result = super.save(driverJobEntity);
        if (result) {
            //构建消息内容
            TruckDto truckDto = truckFeign.fineById(transportTaskDTO.getTruckId());
            OrganDTO startOrgan = organFeign.queryById(transportTaskDTO.getStartAgencyId());
            OrganDTO endOrgan = organFeign.queryById(transportTaskDTO.getEndAgencyId());
            String content = CharSequenceUtil.format("运输车辆：{}\n运输路线：{}——{}", truckDto.getLicensePlate(), startOrgan.getName(), endOrgan.getName());

            //构建消息对象
            MessageAddDTO messageAddDTO = new MessageAddDTO();
            messageAddDTO.setTitle("您有新的运输任务！");
            messageAddDTO.setContent(content);
            messageAddDTO.setBussinessType(MessageBussinessTypeEnum.DRIVER.getCode());
            messageAddDTO.setUserId(driverId);
            messageAddDTO.setContentType(MessageContentTypeEnum.DRIVER_SYSTEM_NOTICE.getCode());
            messageAddDTO.setRelevantId(driverJobEntity.getId());
            messageFeign.add(messageAddDTO);

            return driverJobEntity.getId();
        }
        throw new SLException(DriverExceptionEnum.DRIVER_JOB_SAVE_ERROR);
    }

    @Override
    @GlobalTransactional
    public boolean updateStatus(Long id, DriverJobStatus status) {
        DriverJobEntity driverJobEntity = new DriverJobEntity();
        driverJobEntity.setId(id);
        switch (status) {
            case PENDING: {
                throw new SLException(DriverExceptionEnum.DRIVER_JOB_STATUS_NOT_PENDING);
            }
            case PROCESSING: {
                //司机出库
                DriverPickUpDTO driverPickUpDTO = new DriverPickUpDTO();
                driverPickUpDTO.setId(String.valueOf(id));
                this.outStorage(driverPickUpDTO);
                break;
            }
            case CONFIRM: {
                //改派，暂时只做状态修改处理
                driverJobEntity.setStatus(DriverJobStatus.CONFIRM);
                break;
            }
            case DELIVERED: {
                //司机入库
                DriverDeliverDTO driverDeliverDTO = new DriverDeliverDTO();
                driverDeliverDTO.setId(String.valueOf(id));
                this.intoStorage(driverDeliverDTO);
                break;
            }
            case CANCELLED: {
                //已作废，暂时只做状态修改处理
                driverJobEntity.setStatus(DriverJobStatus.CANCELLED);
                break;
            }
            default: {
                break;
            }
        }

        if (ObjectUtil.isNotEmpty(driverJobEntity.getStatus())) {
            //更新状态
            return super.updateById(driverJobEntity);
        }

        return true;
    }

    /**
     * 司机入库，修改运单的当前节点和下个节点 以及 修改运单为待调度状态，结束运输任务
     *
     * @param driverDeliverDTO 司机作业单id
     */
    @Override
    @GlobalTransactional
    public void intoStorage(DriverDeliverDTO driverDeliverDTO) {
        //1.司机作业单，获取运输任务id
        DriverJobEntity driverJob = super.getById(driverDeliverDTO.getId());
        if (ObjectUtil.isEmpty(driverJob)) {
            throw new SLException(DriverExceptionEnum.DRIVER_JOB_NOT_FOUND);
        }
        if (ObjectUtil.notEqual(driverJob.getStatus(), DriverJobStatus.PROCESSING)) {
            throw new SLException(DriverExceptionEnum.DRIVER_JOB_STATUS_UNKNOWN);
        }

        //运输任务id
        Long transportTaskId = driverJob.getTransportTaskId();

        //2.更新运输任务状态为完成
        //加锁，只能有一个司机操作，任务已经完成的话，就不需要进行流程流转，只要完成司机自己的作业单即可
        String lockRedisKey = Constants.LOCKS.DRIVER_JOB_LOCK_PREFIX + transportTaskId;
        //2.1获取锁
        RLock lock = this.redissonClient.getFairLock(lockRedisKey);
        if (lock.tryLock()) {
            //2.2获取到锁
            try {
                //2.3查询运输任务
                TransportTaskDTO transportTask = this.transportTaskFeign.findById(transportTaskId);
                //2.4判断任务是否已结束，不能再修改流转
                if (ObjectUtil.equalsAny(transportTask.getStatus(), TransportTaskStatus.CANCELLED, TransportTaskStatus.COMPLETED)) {
                    return;
                }

                //2.5修改运单流转节点，修改当前节点和下一个节点
                this.transportOrderFeign.updateByTaskId(String.valueOf(transportTaskId));

                //2.6结束运输任务
                TransportTaskCompleteDTO transportTaskCompleteDTO = BeanUtil.toBean(driverDeliverDTO, TransportTaskCompleteDTO.class);
                transportTaskCompleteDTO.setTransportTaskId(String.valueOf(transportTaskId));
                this.transportTaskFeign.completeTransportTask(transportTaskCompleteDTO);
            } finally {
                lock.unlock();
            }
        } else {
            throw new SLException(DriverExceptionEnum.DRIVER_JOB_INTO_STORAGE_ERROR);
        }

        //3.修改所有与运输任务id相关联的司机作业单状态和实际到达时间
        LambdaUpdateWrapper<DriverJobEntity> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(ObjectUtil.isNotEmpty(transportTaskId), DriverJobEntity::getTransportTaskId, transportTaskId)
                .set(DriverJobEntity::getStatus, DriverJobStatus.DELIVERED)
                .set(DriverJobEntity::getActualArrivalTime, LocalDateTime.now());
        this.update(updateWrapper);
    }

    /**
     * 司机出库，修改运单为运输中状态，开始运输任务
     *
     * @param driverPickUpDTO 司机作业单id
     */
    @Override
    @GlobalTransactional
    public void outStorage(DriverPickUpDTO driverPickUpDTO) {
        //1.司机作业单，获取运输任务id
        DriverJobEntity driverJob = super.getById(driverPickUpDTO.getId());
        if (ObjectUtil.isEmpty(driverJob)) {
            throw new SLException(DriverExceptionEnum.DRIVER_JOB_NOT_FOUND);
        }
        if (ObjectUtil.notEqual(driverJob.getStatus(), DriverJobStatus.PENDING)) {
            throw new SLException(DriverExceptionEnum.DRIVER_JOB_STATUS_UNKNOWN);
        }

        //查询当前司机是否有在途或交付任务，如有则不可提货
        long count = this.getCount4Processing(driverJob.getDriverId());
        if (count > 0) {
            throw new SLException(DriverExceptionEnum.PROCESSING_DRIVER_JOB_NOT_EMPTY);
        }

        //运输任务id
        Long transportTaskId = driverJob.getTransportTaskId();

        //2.更新运输任务和运输运单
        //加锁，只能有一个司机操作，任务已经为在途的话，就不需要进行流程流转，只要完成司机自己的作业单即可
        String lockRedisKey = Constants.LOCKS.DRIVER_JOB_LOCK_PREFIX + transportTaskId;
        //2.1获取锁
        RLock lock = this.redissonClient.getFairLock(lockRedisKey);
        if (lock.tryLock()) {
            //2.2锁定
            try {
                //2.3查询运输任务
                TransportTaskDTO transportTask = this.transportTaskFeign.findById(transportTaskId);
                //2.4判断任务是否正在进行，不能再修改流转
                if (ObjectUtil.equalsAny(transportTask.getStatus(), TransportTaskStatus.PROCESSING, TransportTaskStatus.CONFIRM)) {
                    return;
                }

                //2.5修改运单状态为 运输中
                List<String> transportOrderIdList = this.transportTaskFeign.queryTransportOrderIdListById(transportTaskId);
                this.transportOrderFeign.updateStatus(transportOrderIdList, TransportOrderStatus.PROCESSING);

                //2.6开始运输任务
                TransportTaskStartDTO transportTaskStartDTO = BeanUtil.toBean(driverPickUpDTO, TransportTaskStartDTO.class);
                transportTaskStartDTO.setTransportTaskId(String.valueOf(transportTaskId));
                this.transportTaskFeign.startTransportTask(transportTaskStartDTO);
            } finally {
                lock.unlock();
            }
        } else {
            throw new SLException(DriverExceptionEnum.DRIVER_JOB_OUT_STORAGE_ERROR);
        }

        //3.修改所有与运输任务id相关联的司机作业单状态和实际出发时间
        LambdaUpdateWrapper<DriverJobEntity> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(ObjectUtil.isNotEmpty(transportTaskId), DriverJobEntity::getTransportTaskId, transportTaskId)
                .set(DriverJobEntity::getStatus, DriverJobStatus.PROCESSING)
                .set(DriverJobEntity::getActualDepartureTime, LocalDateTime.now());
        this.update(updateWrapper);

        //4.修改车辆状态为运输中,调用base服务，需要注意事务问题
        TransportTaskDTO transportTask = this.transportTaskFeign.findById(transportTaskId);
        this.truckFeign.updateRunStatus(transportTask.getTruckId(), TruckRunStatusEnum.RUNNING);
    }

    @Override
    public boolean removeByTransportTaskId(Long transportTaskId) {
        LambdaQueryWrapper<DriverJobEntity> queryWrapper = Wrappers.<DriverJobEntity>lambdaQuery()
                .eq(DriverJobEntity::getTransportTaskId, transportTaskId);
        return super.remove(queryWrapper);
    }

    /**
     * 查询当前司机的在途和交付任务数量
     *
     * @param driverId 司机id
     * @return 数量
     */
    private long getCount4Processing(Long driverId) {
        LambdaQueryWrapper<DriverJobEntity> countQueryWrapper = Wrappers.<DriverJobEntity>lambdaQuery()
                .eq(ObjectUtil.isNotEmpty(driverId), DriverJobEntity::getDriverId, driverId)
                .in(DriverJobEntity::getStatus, ListUtil.of(DriverJobStatus.PROCESSING, DriverJobStatus.DELIVERED));
        return this.count(countQueryWrapper);
    }

    /**
     * 延迟提货
     *
     * @param driverDelayDeliveryDTO 延迟提货对象
     */
    @Override
    @GlobalTransactional
    public void delayedDelivery(DriverDelayDeliveryDTO driverDelayDeliveryDTO) {
        //1.根据id查询司机作业单，得到运输任务id
        DriverJobEntity driverJobEntity = this.getById(driverDelayDeliveryDTO.getId());
        Long transportTaskId = driverJobEntity.getTransportTaskId();

        //2.更改同一运输任务的所有司机作业单计划发车时间
        LocalDateTime delayTime = LocalDateTimeUtil.parse(driverDelayDeliveryDTO.getDelayTime(), DatePattern.NORM_DATETIME_PATTERN);
        LambdaUpdateWrapper<DriverJobEntity> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(ObjectUtil.isNotEmpty(transportTaskId), DriverJobEntity::getTransportTaskId, transportTaskId)
                .set(ObjectUtil.isNotEmpty(delayTime), DriverJobEntity::getPlanDepartureTime, delayTime);
        this.update(updateWrapper);

        //3.更改运输任务计划发车时间和备注
        TransportTaskDelayDeliveryDTO transportTaskDelayDeliveryDTO = BeanUtil.toBean(driverDelayDeliveryDTO, TransportTaskDelayDeliveryDTO.class);
        transportTaskDelayDeliveryDTO.setTransportTaskId(String.valueOf(transportTaskId));
        transportTaskFeign.delayedDelivery(transportTaskDelayDeliveryDTO);
    }

    /**
     * 回车登记
     *
     * @param driverReturnRegisterDTO 回车登记对象
     */
    @Override
    @GlobalTransactional
    public void returnRegister(DriverReturnRegisterDTO driverReturnRegisterDTO) {
        //更新关联运输任务id的司机作业单状态为已完成
        LambdaUpdateWrapper<DriverJobEntity> updateWrapper = Wrappers.<DriverJobEntity>lambdaUpdate()
                .eq(DriverJobEntity::getTransportTaskId, driverReturnRegisterDTO.getId())
                .set(DriverJobEntity::getStatus, DriverJobStatus.COMPLETED);
        this.update(updateWrapper);

        //根据id查询运输任务
        TransportTaskDTO transportTaskDTO = transportTaskFeign.findById(Long.valueOf(driverReturnRegisterDTO.getId()));

        //构建回车登记对象
        TruckReturnRegisterDTO truckReturnRegisterDTO = BeanUtil.toBean(driverReturnRegisterDTO, TruckReturnRegisterDTO.class);
        truckReturnRegisterDTO.setTransportTaskId(Long.valueOf(driverReturnRegisterDTO.getId()));
        truckReturnRegisterDTO.setTruckId(transportTaskDTO.getTruckId());
        truckReturnRegisterFeign.save(truckReturnRegisterDTO);

        //司机回车登记不修改车辆状态，由后台操作
        truckPlanFeign.finished(transportTaskDTO.getStartAgencyId(), transportTaskDTO.getTruckPlanId(), transportTaskDTO.getTruckId(), StatusEnum.NORMAL);
    }

    /**
     * 司机作业单月度统计
     *
     * @param driverId 司机id
     * @param month    月份
     * @return 统计数据
     */
    @Override
    public DriverJobStatisticsDTO jobMonthlyStatistics(String driverId, String month) {
        //起止时间
        DateTime dateTime = DateUtil.parse(month, DatePattern.NORM_MONTH_PATTERN);
        LocalDateTime startTime = LocalDateTimeUtil.of(dateTime);
        LocalDateTime endTime = LocalDateTimeUtil.of(DateUtil.endOfMonth(dateTime));

        //根据计划到达时间统计当前司机月度任务总数
        LambdaQueryWrapper<DriverJobEntity> totalQueryWrapper = new LambdaQueryWrapper<>();
        totalQueryWrapper
                .eq(ObjectUtil.isNotEmpty(driverId), DriverJobEntity::getDriverId, driverId)
                .between(DriverJobEntity::getPlanArrivalTime, startTime, endTime);
        long taskAmounts = this.count(totalQueryWrapper);

        //根据实际到达时间查询当前司机月度任务列表
        LambdaQueryWrapper<DriverJobEntity> completedQueryWrapper = new LambdaQueryWrapper<>();
        completedQueryWrapper
                .eq(ObjectUtil.isNotEmpty(driverId), DriverJobEntity::getDriverId, driverId)
                .between(DriverJobEntity::getActualArrivalTime, startTime, endTime);
        List<DriverJobEntity> completedList = this.list(completedQueryWrapper);

        //从司机作业单中获取运输任务id列表
        List<String> transportTaskIds = completedList.stream().map(x -> String.valueOf(x.getTransportTaskId())).collect(Collectors.toList());

        //根据实际到达时间查询运输任务每日距离
        List<DailyMileageDTO> dailyMileageDTOS = new ArrayList<>();
        long transportMileage = 0L;
        if (ObjectUtil.isNotEmpty(transportTaskIds)) {
            List<TransportTaskMonthlyDistanceDTO> transportTaskMonthlyDistanceDTOS = transportTaskFeign.monthlyDistanceStatistics(transportTaskIds, month);
            dailyMileageDTOS = transportTaskMonthlyDistanceDTOS.stream().map(x -> {
                DailyMileageDTO dailyMileageDTO = BeanUtil.toBean(x, DailyMileageDTO.class);

                //原始单位米，转换成公里四舍五入取整
                long mileage = Math.round(x.getMileage() / 1000);
                dailyMileageDTO.setMileage(mileage);
                return dailyMileageDTO;
            }).collect(Collectors.toList());

            //统计月度总距离
            transportMileage = dailyMileageDTOS.stream().mapToLong(DailyMileageDTO::getMileage).sum();
        }

        //封装数据并返回
        DriverJobStatisticsDTO driverJobStatisticsDTO = new DriverJobStatisticsDTO();
        driverJobStatisticsDTO.setTaskAmounts(Math.toIntExact(taskAmounts));
        driverJobStatisticsDTO.setCompletedAmounts(completedList.size());
        driverJobStatisticsDTO.setTransportMileage(transportMileage);
        driverJobStatisticsDTO.setDailyMileage(dailyMileageDTOS);
        return driverJobStatisticsDTO;
    }

    /**
     * 分页查询
     *
     * @param dto 查询条件
     * @return 司机作业单分页结果
     */
    @Override
    public PageResponse<DriverJobDTO> pageQuery(DriverJobPageQueryDTO dto) {
        //1.构造查询条件
        Page<DriverJobEntity> page = new Page<>(dto.getPage(), dto.getPageSize());
        LambdaQueryWrapper<DriverJobEntity> queryWrapper = Wrappers.<DriverJobEntity>lambdaQuery()
                .eq(ObjectUtil.isNotEmpty(dto.getId()), DriverJobEntity::getId, dto.getId())
                .eq(ObjectUtil.isNotEmpty(dto.getDriverId()), DriverJobEntity::getDriverId, dto.getDriverId())
                .eq(ObjectUtil.isNotEmpty(dto.getTransportTaskId()), DriverJobEntity::getTransportTaskId, dto.getTransportTaskId())
                .in(ObjectUtil.isNotEmpty(dto.getStatusList()), DriverJobEntity::getStatus, dto.getStatusList());

        //2.不同的状态查询不同的时间，待提货筛选的是预计发车时间，在途筛选的是计划到达时间，已完成筛选的是实际到达时间
        if (CollUtil.isNotEmpty(dto.getStatusList()) && dto.getStatusList().contains(DriverJobStatus.PENDING)) {
            queryWrapper
                    .between(ObjectUtil.isNotEmpty(dto.getMinTaskTime()), DriverJobEntity::getPlanDepartureTime, dto.getMinTaskTime(), dto.getMaxTaskTime())
                    .orderByAsc(DriverJobEntity::getPlanDepartureTime);
        } else if (CollUtil.isNotEmpty(dto.getStatusList()) && dto.getStatusList().contains(DriverJobStatus.COMPLETED)) {
            queryWrapper
                    .between(ObjectUtil.isNotEmpty(dto.getMinTaskTime()), DriverJobEntity::getActualArrivalTime, dto.getMinTaskTime(), dto.getMaxTaskTime())
                    .orderByDesc(DriverJobEntity::getActualArrivalTime);
        } else if (CollUtil.isNotEmpty(dto.getStatusList()) && dto.getStatusList().contains(DriverJobStatus.PROCESSING)) {
            queryWrapper
                    .between(ObjectUtil.isNotEmpty(dto.getMinTaskTime()), DriverJobEntity::getPlanArrivalTime, dto.getMinTaskTime(), dto.getMaxTaskTime())
                    .orderByAsc(DriverJobEntity::getPlanArrivalTime);
        } else {
            queryWrapper
                    .between(ObjectUtil.isNotEmpty(dto.getMinTaskTime()), DriverJobEntity::getCreated, dto.getMinTaskTime(), dto.getMaxTaskTime())
                    .orderByAsc(DriverJobEntity::getCreated);
        }

        //3.分页查询
        Page<DriverJobEntity> pageResult = this.page(page, queryWrapper);
        if (CollUtil.isEmpty(pageResult.getRecords())) {
            return new PageResponse<>(pageResult);
        }

        //4.实体类转dto
        List<DriverJobDTO> list = BeanUtil.copyToList(pageResult.getRecords(), DriverJobDTO.class);

        //5.查询提货任务时，需要判断任务是否可提
        if (dto.getPage().equals(1) && CollUtil.isNotEmpty(dto.getStatusList()) && dto.getStatusList().contains(DriverJobStatus.PENDING)) {
            long count = getCount4Processing(dto.getDriverId());

            //如果不存在在途或已交付任务，设置最早的任务可以提货
            if (count == 0L) {
                list.get(0).setEnablePickUp(true);
            }
        }

        //6.封装分页结果
        PageResponse<DriverJobDTO> pageResponse = PageResponse.of(pageResult);
        pageResponse.setItems(list);
        return pageResponse;
    }
}
