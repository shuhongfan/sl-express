package com.sl.ms.work.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.driver.api.DriverJobFeign;
import com.sl.ms.driver.domain.dto.request.DriverJobPageQueryDTO;
import com.sl.ms.driver.domain.dto.response.DriverJobDTO;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import com.sl.ms.work.domain.dto.TaskTransportUpdateDTO;
import com.sl.ms.work.domain.dto.TransportTaskDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskCompleteDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskDelayDeliveryDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskPageQueryDTO;
import com.sl.ms.work.domain.dto.request.TransportTaskStartDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskMonthlyDistanceDTO;
import com.sl.ms.work.domain.dto.response.TransportTaskStatusCountDTO;
import com.sl.ms.work.domain.enums.WorkExceptionEnum;
import com.sl.ms.work.domain.enums.transporttask.TransportTaskStatus;
import com.sl.ms.work.entity.TransportOrderTaskEntity;
import com.sl.ms.work.entity.TransportTaskEntity;
import com.sl.ms.work.mapper.TransportTaskMapper;
import com.sl.ms.work.service.TransportOrderTaskService;
import com.sl.ms.work.service.TransportTaskService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.PageResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.sl.ms.work.domain.enums.WorkExceptionEnum.TRANSPORT_TASK_CANCEL_FAILED;

/**
 * 运输任务表 服务实现类
 */
@Service
public class TransportTaskServiceImpl extends
        ServiceImpl<TransportTaskMapper, TransportTaskEntity> implements TransportTaskService {

    @Resource
    private TransportOrderTaskService transportOrderTaskService;
    @Resource
    private DriverJobFeign driverJobFeign;

    @Override
    @Transactional
    public Boolean updateStatus(Long id, TransportTaskStatus status) {
        if (TransportTaskStatus.PENDING == status) {
            //修改运输任务状态不能为 待执行 状态
            throw new SLException(WorkExceptionEnum.TRANSPORT_TASK_STATUS_NOT_PENDING);
        }

        if (TransportTaskStatus.PROCESSING == status) {
            // 开始任务
            TransportTaskStartDTO transportTaskStartDTO = new TransportTaskStartDTO();
            transportTaskStartDTO.setTransportTaskId(String.valueOf(id));
            this.startTransportTask(transportTaskStartDTO);
            return true;
        } else if (TransportTaskStatus.COMPLETED == status) {
            // 完成任务
            TransportTaskCompleteDTO transportTaskCompleteDTO = new TransportTaskCompleteDTO();
            transportTaskCompleteDTO.setTransportTaskId(String.valueOf(id));
            this.completeTransportTask(transportTaskCompleteDTO);
            return true;
        } else if (TransportTaskStatus.CANCELLED == status) {
            //根据运输任务id查询运单id列表
            List<String> transportOrderIdList = this.queryTransportOrderIdListById(id);

            //如果存在关联运单不可取消
            if (CollUtil.isNotEmpty(transportOrderIdList)) {
                throw new SLException(TRANSPORT_TASK_CANCEL_FAILED);
            }

            // 取消运输任务
            TransportTaskEntity transportTaskEntity = new TransportTaskEntity();
            transportTaskEntity.setId(id);
            transportTaskEntity.setStatus(status);
            this.updateById(transportTaskEntity);

            //取消运输任务关联的司机作业单
            DriverJobPageQueryDTO driverJobPageQueryDTO = DriverJobPageQueryDTO.builder().page(1).pageSize(999).transportTaskId(id).build();
            PageResponse<DriverJobDTO> driverJobPage = driverJobFeign.pageQuery(driverJobPageQueryDTO);
            driverJobPage.getItems().forEach(dto -> driverJobFeign.updateStatus(dto.getId(), DriverJobStatus.CANCELLED));
            return true;
        } else {
            //修改其他状态
            TransportTaskEntity transportTaskEntity = new TransportTaskEntity();
            transportTaskEntity.setId(id);
            transportTaskEntity.setStatus(status);
            return super.updateById(transportTaskEntity);
        }
    }

    @Override
    public PageResponse<TransportTaskDTO> findByPage(TransportTaskPageQueryDTO pageQueryDTO) {
        Page<TransportTaskEntity> pageQuery = new Page<>(pageQueryDTO.getPage(), pageQueryDTO.getPageSize());

        //查询运输任务
        LambdaQueryWrapper<TransportTaskEntity> lambdaQueryWrapper = Wrappers.<TransportTaskEntity>lambdaQuery()
                .like(ObjectUtil.isNotEmpty(pageQueryDTO.getId()), TransportTaskEntity::getId, pageQueryDTO.getId())
                .eq(ObjectUtil.isNotEmpty(pageQueryDTO.getStatus()), TransportTaskEntity::getStatus, pageQueryDTO.getStatus())
                .eq(ObjectUtil.isNotEmpty(pageQueryDTO.getAssignedStatus()), TransportTaskEntity::getAssignedStatus, pageQueryDTO.getAssignedStatus())
                .eq(ObjectUtil.isNotEmpty(pageQueryDTO.getLoadingStatus()), TransportTaskEntity::getLoadingStatus, pageQueryDTO.getLoadingStatus())
                .eq(ObjectUtil.isNotEmpty(pageQueryDTO.getStartAgencyId()), TransportTaskEntity::getStartAgencyId, pageQueryDTO.getStartAgencyId())
                .eq(ObjectUtil.isNotEmpty(pageQueryDTO.getEndAgencyId()), TransportTaskEntity::getEndAgencyId, pageQueryDTO.getEndAgencyId())
                .in(ObjectUtil.isNotEmpty(pageQueryDTO.getTruckIds()), TransportTaskEntity::getTruckId, pageQueryDTO.getTruckIds())
                .eq(ObjectUtil.isNotEmpty(pageQueryDTO.getTruckId()), TransportTaskEntity::getTruckId, pageQueryDTO.getTruckId())
                .orderByDesc(TransportTaskEntity::getPlanDepartureTime);

        Page<TransportTaskEntity> pageResult = super.page(pageQuery, lambdaQueryWrapper);
        if (CollUtil.isEmpty(pageResult.getRecords())) {
            return new PageResponse<>(pageResult);
        }

        PageResponse<TransportTaskDTO> pageResponse = new PageResponse<>(pageResult, TransportTaskDTO.class);
        //补充数据
        pageResponse.getItems().forEach(transportTask -> {
            //查询运输任务中的运单号
            List<TransportOrderTaskEntity> list = this.transportOrderTaskService.findAll(null, transportTask.getId());
            List<String> transportOrderIdList = CollUtil.getFieldValues(list, "transportOrderId", String.class);
            transportTask.setTransportOrderIds(transportOrderIdList);
            transportTask.setTransportOrderCount(CollUtil.size(transportOrderIdList));
        });

        return pageResponse;
    }

    @Override
    public List<TransportTaskEntity> findAll(List<Long> ids, Long id, Integer status, TransportTaskDTO dto) {
        LambdaQueryWrapper<TransportTaskEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();

        lambdaQueryWrapper.in(CollUtil.isNotEmpty(ids), TransportTaskEntity::getId, ids);
        lambdaQueryWrapper.eq(ObjectUtil.isNotEmpty(id), TransportTaskEntity::getId, id);
        lambdaQueryWrapper.eq(ObjectUtil.isNotEmpty(status), TransportTaskEntity::getStatus, status);
        if (ObjectUtil.isNotEmpty(dto)) {
            lambdaQueryWrapper.eq(ObjectUtil.isNotEmpty(dto.getTruckId()), TransportTaskEntity::getTruckId, dto.getTruckId());
        }
        lambdaQueryWrapper.orderByDesc(TransportTaskEntity::getCreated);

        return list(lambdaQueryWrapper);
    }

    /**
     * 完成运输任务
     *
     * @param transportTaskCompleteDTO 交付对象
     */
    @Override
    public void completeTransportTask(TransportTaskCompleteDTO transportTaskCompleteDTO) {
        TransportTaskEntity transportTaskEntity = new TransportTaskEntity();
        transportTaskEntity.setId(Long.valueOf(transportTaskCompleteDTO.getTransportTaskId()));
        // 已完成
        transportTaskEntity.setStatus(TransportTaskStatus.COMPLETED);
        transportTaskEntity.setTransportCertificate(transportTaskCompleteDTO.getTransportCertificate());
        transportTaskEntity.setDeliverPicture(transportTaskCompleteDTO.getDeliverPicture());

        //实际到达时间
        transportTaskEntity.setActualArrivalTime(LocalDateTime.now());
        super.updateById(transportTaskEntity);
    }

    /**
     * 开始运输任务
     *
     * @param transportTaskStartDTO 提货对象
     */
    @Override
    public void startTransportTask(TransportTaskStartDTO transportTaskStartDTO) {
        TransportTaskEntity transportTaskEntity = new TransportTaskEntity();
        transportTaskEntity.setId(Long.valueOf(transportTaskStartDTO.getTransportTaskId()));

        // 进行中
        transportTaskEntity.setStatus(TransportTaskStatus.PROCESSING);
        transportTaskEntity.setCargoPickUpPicture(transportTaskStartDTO.getCargoPickUpPicture());
        transportTaskEntity.setCargoPicture(transportTaskStartDTO.getCargoPicture());

        //实际发车时间
        transportTaskEntity.setActualDepartureTime(LocalDateTime.now());
        super.updateById(transportTaskEntity);
    }

    @Override
    public List<String> queryTransportOrderIdListById(Long id) {
        //通过运输任务找到运单id列表
        LambdaQueryWrapper<TransportOrderTaskEntity> queryWrapper = new LambdaQueryWrapper<TransportOrderTaskEntity>()
                .eq(TransportOrderTaskEntity::getTransportTaskId, id);
        List<TransportOrderTaskEntity> orderList = this.transportOrderTaskService.list(queryWrapper);
        if (CollUtil.isEmpty(orderList)) {
            return Collections.emptyList();
        }
        //运单id列表
        return orderList.stream()
                .map(TransportOrderTaskEntity::getTransportOrderId)
                .collect(Collectors.toList());
    }

    @Override
    public List<TransportTaskDTO> findAllByOrderIdOrTaskId(String transportOrderId, Long transportTaskId) {
        if (ObjectUtil.isAllEmpty(transportOrderId, transportTaskId)) {
            throw new SLException(WorkExceptionEnum.TRANSPORT_TASK_QUERY_PARAM_ERROR);
        }

        if (ObjectUtil.isNotEmpty(transportTaskId)) {
            TransportTaskEntity transportTask = super.getById(transportTaskId);
            if (ObjectUtil.isEmpty(transportTask)) {
                throw new SLException(WorkExceptionEnum.TRANSPORT_TASK_NOT_FOUND);
            }
            return ListUtil.toList(BeanUtil.toBean(transportTask, TransportTaskDTO.class));
        }

        //通过关联表查询出运输任务id列表
        List<TransportOrderTaskEntity> transportOrderTaskList = transportOrderTaskService.findAll(transportOrderId, null);
        if (CollUtil.isEmpty(transportOrderTaskList)) {
            return ListUtil.empty();
        }

        //根据运输任务id列表查询 运输任务数据列表
        List<Long> transportTaskIds = CollUtil.getFieldValues(transportOrderTaskList, "transportTaskId", Long.class);
        List<TransportTaskEntity> transportTasList = super.listByIds(transportTaskIds);
        return BeanUtil.copyToList(transportTasList, TransportTaskDTO.class);
    }

    @Override
    public TransportTaskDTO findById(Long id) {
        TransportTaskEntity transportTask = super.getById(id);
        if (ObjectUtil.isEmpty(transportTask)) {
            throw new SLException(WorkExceptionEnum.TRANSPORT_TASK_NOT_FOUND);
        }

        TransportTaskDTO transportTaskDTO = BeanUtil.toBean(transportTask, TransportTaskDTO.class);
        List<TransportOrderTaskEntity> list = this.transportOrderTaskService.findAll(null, transportTask.getId());

        List<String> transportOrderIdList = CollUtil.getFieldValues(list, "transportOrderId", String.class);
        transportTaskDTO.setTransportOrderIds(transportOrderIdList);
        transportTaskDTO.setTransportOrderCount(CollUtil.size(transportOrderIdList));

        return transportTaskDTO;
    }

    @Override
    public List<TransportTaskStatusCountDTO> groupByStatus() {
        //将所有的枚举状态放到集合中
        List<TransportTaskStatusCountDTO> statusCountList = Arrays.stream(TransportTaskStatus.values())
                .map(status -> TransportTaskStatusCountDTO.builder()
                        .status(status)
                        .statusCode(status.getCode())
                        .count(0L)
                        .build())
                .collect(Collectors.toList());

        //将数量值放入到集合中，如果没有的数量为0
        List<TransportTaskStatusCountDTO> statusCount = super.baseMapper.findStatusCount();
        for (TransportTaskStatusCountDTO statusCountDTO : statusCountList) {
            for (TransportTaskStatusCountDTO countDTO : statusCount) {
                if (ObjectUtil.equal(statusCountDTO.getStatusCode(), countDTO.getStatusCode())) {
                    statusCountDTO.setCount(countDTO.getCount());
                    break;
                }
            }
        }

        return statusCountList;
    }

    @Transactional
    @Override
    public void adjust(TaskTransportUpdateDTO dto) {
        if (ObjectUtil.hasEmpty(dto, dto.getId())
                || ObjectUtil.isAllEmpty(dto.getTransportTripsId(), dto.getTruckId(), dto.getDriverIds())) {
            throw new SLException(WorkExceptionEnum.TRANSPORT_TASK_UPDATE_PARAM_ERROR);
        }

        //修改任务
        TransportTaskEntity transportTaskEntity = BeanUtil.toBean(dto, TransportTaskEntity.class);
        super.updateById(transportTaskEntity);

        // 删除之前对于的司机作业单
        this.driverJobFeign.removeByTransportTaskId(dto.getId());

        // 创建新的司机作业单
        dto.getDriverIds().forEach(driverId -> this.driverJobFeign.createDriverJob(dto.getId(), driverId));
    }

    /**
     * 延迟提货
     *
     * @param transportTaskDelayDeliveryDTO 延迟提货对象
     */
    @Override
    public void delayedDelivery(TransportTaskDelayDeliveryDTO transportTaskDelayDeliveryDTO) {
        //1.将时间字符串转换格式
        LocalDateTime delayTime = LocalDateTimeUtil.parse(transportTaskDelayDeliveryDTO.getDelayTime(), DatePattern.NORM_DATETIME_PATTERN);

        //2.构建更新条件,根据任务id更新计划出发时间和备注
        LambdaUpdateWrapper<TransportTaskEntity> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(ObjectUtil.isNotEmpty(transportTaskDelayDeliveryDTO.getTransportTaskId()), TransportTaskEntity::getId, transportTaskDelayDeliveryDTO.getTransportTaskId())
                .set(ObjectUtil.isNotEmpty(delayTime), TransportTaskEntity::getPlanDepartureTime, delayTime)
                .set(ObjectUtil.isNotEmpty(transportTaskDelayDeliveryDTO.getDelayReason()), TransportTaskEntity::getMark, transportTaskDelayDeliveryDTO.getDelayReason());

        //3.更新运输任务
        this.update(updateWrapper);
    }

    /**
     * 任务里程统计
     *
     * @param transportTaskIds 运输任务id列表
     * @param month            月份，格式：2022-06
     * @return 每日里程数据
     */
    @Override
    public List<TransportTaskMonthlyDistanceDTO> monthlyDistanceStatistics(List<String> transportTaskIds, String month) {
        //月度起止时间
        DateTime dateTime = DateUtil.parse(month, DatePattern.NORM_MONTH_PATTERN);
        LocalDateTime startTime = LocalDateTimeUtil.of(dateTime);
        LocalDateTime endTime = LocalDateTimeUtil.of(DateUtil.endOfMonth(dateTime));

        //根据任务id列表查询
        return this.baseMapper.monthlyDistanceStatistics(transportTaskIds, startTime, endTime);
    }

    /**
     * 根据起始机构查询运输任务id列表
     *
     * @param startAgencyId 起始机构id
     * @param endAgencyId   结束机构id
     * @return 运输任务id列表
     */
    @Override
    public List<Long> findByAgencyId(Long startAgencyId, Long endAgencyId) {
        //1.构造查询条件
        LambdaQueryWrapper<TransportTaskEntity> queryWrapper = Wrappers.<TransportTaskEntity>lambdaQuery()
                .eq(ObjectUtil.isNotEmpty(startAgencyId), TransportTaskEntity::getStartAgencyId, startAgencyId)
                .eq(ObjectUtil.isNotEmpty(endAgencyId), TransportTaskEntity::getEndAgencyId, endAgencyId);

        //2.根据起始机构查询运输任务
        List<TransportTaskEntity> transportTaskEntityList = this.list(queryWrapper);

        //3.从运输任务中抽取id
        return transportTaskEntityList.stream().map(TransportTaskEntity::getId).collect(Collectors.toList());
    }

    /**
     * 根据车辆ID和状态统计
     *
     * @param truckId 车辆ID
     * @return 个数
     */
    @Override
    public Long countByTruckId(Long truckId) {
        return count(Wrappers.<TransportTaskEntity>lambdaQuery()
                .in(TransportTaskEntity::getStatus, TransportTaskStatus.PENDING.getCode(), TransportTaskStatus.PROCESSING.getCode())
                .eq(TransportTaskEntity::getTruckId, truckId)
        );
    }
}
