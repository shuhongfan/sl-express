package com.sl.ms.work.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.oms.api.OrderFeign;
import com.sl.ms.oms.enums.OrderStatus;
import com.sl.ms.work.domain.dto.CourierTaskCountDTO;
import com.sl.ms.work.domain.dto.PickupDispatchTaskDTO;
import com.sl.ms.work.domain.dto.request.PickupDispatchTaskPageQueryDTO;
import com.sl.ms.work.domain.dto.response.PickupDispatchTaskStatisticsDTO;
import com.sl.ms.work.domain.enums.WorkExceptionEnum;
import com.sl.ms.work.domain.enums.pickupDispatchtask.*;
import com.sl.ms.work.entity.PickupDispatchTaskEntity;
import com.sl.ms.work.mapper.TaskPickupDispatchMapper;
import com.sl.ms.work.service.PickupDispatchTaskService;
import com.sl.ms.work.service.TransportOrderService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.BeanUtil;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.vo.OrderMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PickupDispatchTaskServiceImpl extends ServiceImpl<TaskPickupDispatchMapper, PickupDispatchTaskEntity> implements PickupDispatchTaskService {

    @Autowired
    private TaskPickupDispatchMapper taskPickupDispatchMapper;

    @Autowired
    private TransportOrderService transportOrderService;

    @Autowired
    private OrderFeign orderFeign;

    /**
     * 更新取派件状态，不允许 NEW 状态
     *
     * @param pickupDispatchTaskDTO 修改的数据
     * @return 是否成功
     */
    @Override
    @Transactional
    public Boolean updateStatus(PickupDispatchTaskDTO pickupDispatchTaskDTO) {
        WorkExceptionEnum paramError = WorkExceptionEnum.PICKUP_DISPATCH_TASK_PARAM_ERROR;
        if (ObjectUtil.hasEmpty(pickupDispatchTaskDTO.getId(), pickupDispatchTaskDTO.getStatus())) {
            throw new SLException("更新取派件任务状态，id或status不能为空", paramError.getCode());
        }

        PickupDispatchTaskEntity pickupDispatchTask = getById(pickupDispatchTaskDTO.getId());

        switch (pickupDispatchTask.getStatus()) {
            case NEW:
                throw new SLException(WorkExceptionEnum.PICKUP_DISPATCH_TASK_STATUS_NOT_NEW);
            case COMPLETED:
//                任务完成
                pickupDispatchTask.setStatus(PickupDispatchTaskStatus.COMPLETED);
//                设置完成时间
                pickupDispatchTask.setActualEndTime(LocalDateTime.now());

                if (PickupDispatchTaskType.DISPATCH == pickupDispatchTask.getTaskType()) {
//                    如果是派件任务的完成，已签收需要设置签收状态和签收人，拒收只需要设置签收状态
                    if (ObjectUtil.isEmpty(pickupDispatchTaskDTO.getSignStatus())) {
                        throw new SLException("完成派件任务，签收状态不能为空", paramError.getCode());
                    }
                    pickupDispatchTask.setSignStatus(pickupDispatchTaskDTO.getSignStatus());

                    if (PickupDispatchTaskSignStatus.RECEIVED == pickupDispatchTaskDTO.getSignStatus()) {
                        if (ObjectUtil.isEmpty(pickupDispatchTaskDTO.getSignRecipient())) {
                            throw new SLException("完成派件任务，签收人不能为空", paramError.getCode());
                        }
                        pickupDispatchTask.setSignRecipient(pickupDispatchTaskDTO.getSignRecipient());
                    }
                }
                break;
            case CANCELLED:
                if (ObjectUtil.isEmpty(pickupDispatchTaskDTO.getCancelReason())) {
                    throw new SLException("取消任务，原因不能为空", paramError.getCode());
                }
                pickupDispatchTask.setStatus(PickupDispatchTaskStatus.CANCELLED);
                pickupDispatchTask.setCancelReason(pickupDispatchTaskDTO.getCancelReason());
                pickupDispatchTask.setCancelReasonDescription(pickupDispatchTaskDTO.getCancelReasonDescription());
                pickupDispatchTask.setCancelTime(LocalDateTime.now());

                if (pickupDispatchTaskDTO.getCancelReason() == PickupDispatchTaskCancelReason.RETURN_TO_AGENCY) {
                    //发送分配快递员派件任务的消息
                    OrderMsg orderMsg = OrderMsg.builder()
                            .agencyId(pickupDispatchTask.getAgencyId())
                            .orderId(pickupDispatchTask.getOrderId())
                            .created(DateUtil.current())
                            .taskType(PickupDispatchTaskType.PICKUP.getCode()) //取件任务
                            .mark(pickupDispatchTask.getMark())
                            .estimatedEndTime(pickupDispatchTask.getEstimatedEndTime()).build();
                    //发送消息（取消任务发生在取件之前，没有运单，参数直接填入null）
                    transportOrderService.sendPickupDispatchTaskMsgToDispatch(null, orderMsg);
                } else if (pickupDispatchTaskDTO.getCancelReason() == PickupDispatchTaskCancelReason.CANCEL_BY_USER) {
                    //原因是用户取消，则订单状态改为取消
                    orderFeign.updateStatus(ListUtil.of(pickupDispatchTask.getOrderId()), OrderStatus.CANCELLED.getCode());
                } else {
                    //其他原因则关闭订单
                    orderFeign.updateStatus(ListUtil.of(pickupDispatchTask.getOrderId()), OrderStatus.CLOSE.getCode());
                }
                break;
            default:
                throw new SLException("其他未知状态，不能完成更新操作", paramError.getCode());
        }

        return updateById(pickupDispatchTask);
    }

    /**
     * 改派快递员
     *
     * @param ids               任务id列表
     * @param originalCourierId 原快递员id
     * @param targetCourierId   目标快递员id
     * @return 是否成功
     */
    @Override
    public Boolean updateCourierId(List<Long> ids, Long originalCourierId, Long targetCourierId) {
        if (ObjectUtil.hasEmpty(ids, targetCourierId, originalCourierId)) {
            throw new SLException(WorkExceptionEnum.UPDATE_COURIER_PARAM_ERROR);
        }

        if (ObjectUtil.equal(originalCourierId, targetCourierId)) {
            throw new SLException(WorkExceptionEnum.UPDATE_COURIER_EQUAL_PARAM_ERROR);
        }

        List<PickupDispatchTaskEntity> pickupDispatchTaskEntities = listByIds(ids);
        if (CollUtil.isEmpty(pickupDispatchTaskEntities)) {
            throw new SLException(WorkExceptionEnum.PICKUP_DISPATCH_TASK_NOT_FOUND);
        }

        pickupDispatchTaskEntities.forEach(pickupDispatchTaskEntity -> {
//            校验原快递id是否正确（本来无快递员ID的情况除外）
            if (ObjectUtil.isNotEmpty(pickupDispatchTaskEntity.getCourierId())
                    && ObjectUtil.notEqual(pickupDispatchTaskEntity.getCourierId(), originalCourierId)) {
                throw new SLException(WorkExceptionEnum.UPDATE_COURIER_ID_PARAM_ERROR);
            }

//            更新快递员ID
            pickupDispatchTaskEntity.setCourierId(targetCourierId);

//            标识已分配状态
            pickupDispatchTaskEntity.setAssignedStatus(PickupDispatchTaskAssignedStatus.DISTRIBUTED);
        });

//        批量更新
        List<Long> taskIds = pickupDispatchTaskEntities.stream().map(PickupDispatchTaskEntity::getId).collect(Collectors.toList());

        LambdaUpdateWrapper<PickupDispatchTaskEntity> updateWrapper = Wrappers.<PickupDispatchTaskEntity>lambdaUpdate()
                .in(PickupDispatchTaskEntity::getId, taskIds)
                .set(PickupDispatchTaskEntity::getCourierId, targetCourierId)
                .set(PickupDispatchTaskEntity::getAssignedStatus, PickupDispatchTaskAssignedStatus.DISTRIBUTED);

        boolean result = update(updateWrapper);
        if (result) {

        }

        return result;
    }

    /**
     * 新增取派件任务
     *
     * @param taskPickupDispatch 取派件任务信息
     * @return 取派件任务信息
     */
    @Override
    public PickupDispatchTaskEntity saveTaskPickupDispatch(PickupDispatchTaskEntity taskPickupDispatch) {
//        设置任务状态为新任务
        taskPickupDispatch.setStatus(PickupDispatchTaskStatus.NEW);
        boolean result = super.save(taskPickupDispatch);

        if (result) {

            return taskPickupDispatch;
        }
        throw new SLException(WorkExceptionEnum.PICKUP_DISPATCH_TASK_SAVE_ERROR);
    }

    /**
     * 分页查询取派件任务
     *
     * @param dto 查询条件
     * @return 分页结果
     */
    @Override
    public PageResponse<PickupDispatchTaskDTO> findByPage(PickupDispatchTaskPageQueryDTO dto) {
//        1.构造条件
        Page<PickupDispatchTaskEntity> iPage = new Page<>(dto.getPage(), dto.getPageSize());
        LambdaQueryWrapper<PickupDispatchTaskEntity> queryWrapper = Wrappers.<PickupDispatchTaskEntity>lambdaQuery()
                .like(ObjectUtil.isNotEmpty(dto.getId()), PickupDispatchTaskEntity::getId, dto.getId())
                .like(ObjectUtil.isNotEmpty(dto.getOrderId()), PickupDispatchTaskEntity::getOrderId, dto.getOrderId())
                .eq(ObjectUtil.isNotEmpty(dto.getAgencyId()), PickupDispatchTaskEntity::getAgencyId, dto.getAgencyId())
                .eq(ObjectUtil.isNotEmpty(dto.getCourierId()), PickupDispatchTaskEntity::getCourierId, dto.getCourierId())
                .eq(ObjectUtil.isNotEmpty(dto.getTaskType()), PickupDispatchTaskEntity::getTaskType, dto.getTaskType())
                .eq(ObjectUtil.isNotEmpty(dto.getStatus()), PickupDispatchTaskEntity::getStatus, dto.getStatus())
                .eq(ObjectUtil.isNotEmpty(dto.getAssignedStatus()), PickupDispatchTaskEntity::getAssignedStatus, dto.getAssignedStatus())
                .eq(ObjectUtil.isNotEmpty(dto.getSignStatus()), PickupDispatchTaskEntity::getSignStatus, dto.getSignStatus())
                .eq(ObjectUtil.isNotEmpty(dto.getIsDeleted()), PickupDispatchTaskEntity::getIsDeleted, dto.getIsDeleted())
                .between(ObjectUtil.isNotEmpty(dto.getMinEstimatedEndTime()), PickupDispatchTaskEntity::getEstimatedEndTime, dto.getMinEstimatedEndTime(), dto.getMaxEstimatedEndTime())
                .between(ObjectUtil.isNotEmpty(dto.getMinActualEndTime()), PickupDispatchTaskEntity::getActualEndTime, dto.getMinActualEndTime(), dto.getMaxActualEndTime())
                .orderByDesc(PickupDispatchTaskEntity::getUpdated);

//        2. 分页查询
        Page<PickupDispatchTaskEntity> result = super.page(iPage, queryWrapper);

//        3.实体类转dto
        return PageResponse.of(result, PickupDispatchTaskDTO.class);
    }

    /**
     * 按照当日快递员id列表查询每个快递员的取派件任务数
     *
     * @param courierIds             快递员id列表
     * @param pickupDispatchTaskType 任务类型
     * @param date                   日期，格式：yyyy-MM-dd 或 yyyyMMdd
     * @return 任务数
     */
    @Override
    public List<CourierTaskCountDTO> findCountByCourierIds(List<Long> courierIds, PickupDispatchTaskType pickupDispatchTaskType, String date) {
        DateTime dateTime = DateUtil.parse(date);
        LocalDateTime startDateTime = DateUtil.beginOfDay(dateTime).toLocalDateTime();
        LocalDateTime endDateTime = DateUtil.endOfDay(dateTime).toLocalDateTime();
        return taskPickupDispatchMapper.findCountByCourierIds(courierIds,
                pickupDispatchTaskType.getCode(),
                startDateTime,
                endDateTime);
    }

    /**
     * 根据订单id查询取派件任务
     *
     * @param orderId  订单id
     * @param taskType 任务类型
     * @return 任务
     */
    @Override
    public List<PickupDispatchTaskEntity> findByOrderId(Long orderId, PickupDispatchTaskType taskType) {
        LambdaQueryWrapper<PickupDispatchTaskEntity> wrapper = Wrappers.<PickupDispatchTaskEntity>lambdaQuery()
                .eq(PickupDispatchTaskEntity::getOrderId, orderId)
                .eq(PickupDispatchTaskEntity::getTaskType, taskType)
                .orderByAsc(PickupDispatchTaskEntity::getCreated);
        return list(wrapper);
    }

    @Override
    public boolean deleteByIds(List<Long> ids) {
        if (CollUtil.isEmpty(ids)) {
            return false;
        }

//        通过Id列表构造对象列表
        List<PickupDispatchTaskEntity> list = ids.stream().map(id -> {
            PickupDispatchTaskEntity pickupDispatchTaskEntity = new PickupDispatchTaskEntity();
            pickupDispatchTaskEntity.setId(id);
            pickupDispatchTaskEntity.setIsDeleted(PickupDispatchTaskIsDeleted.IS_DELETED);

            return pickupDispatchTaskEntity;
        }).collect(Collectors.toList());

        return updateBatchById(list);
    }

    /**
     * 今日任务分类计数
     *
     * @param courierId 快递员id
     * @param taskType  任务类型，1为取件任务，2为派件任务
     * @param status    任务状态,1新任务，2已完成，3已取消
     * @param isDeleted 是否逻辑删除
     * @return 任务数量
     */
    @Override
    public Integer todayTasksCount(Long courierId, PickupDispatchTaskType taskType, PickupDispatchTaskStatus status, PickupDispatchTaskIsDeleted isDeleted) {
//        构建查询条件
        LambdaQueryWrapper<PickupDispatchTaskEntity> queryWrapper = Wrappers.<PickupDispatchTaskEntity>lambdaQuery()
                .eq(ObjectUtil.isNotEmpty(courierId), PickupDispatchTaskEntity::getCourierId, courierId)
                .eq(ObjectUtil.isNotEmpty(taskType), PickupDispatchTaskEntity::getTaskType, taskType)
                .eq(ObjectUtil.isNotEmpty(status), PickupDispatchTaskEntity::getStatus, status)
                .eq(ObjectUtil.isNotEmpty(isDeleted), PickupDispatchTaskEntity::getIsDeleted, isDeleted);

//        根据任务状态限定查询的日期条件
        LocalDateTime startTime = LocalDateTimeUtil.of(DateUtil.beginOfDay(new Date()));
        LocalDateTime endTime = LocalDateTimeUtil.of(DateUtil.endOfDay(new Date()));
        if (status == null) {
//            没有任务状态，查询任务创建时间
            queryWrapper.between(PickupDispatchTaskEntity::getCreated, startTime, endTime);
        } else if (status == PickupDispatchTaskStatus.NEW) {
//            新任务状态，查询预计结束时间
            queryWrapper.between(PickupDispatchTaskEntity::getEstimatedEndTime, startTime, endTime);
        } else if (status == PickupDispatchTaskStatus.COMPLETED) {
//            完成状态，查询实际完成时间
            queryWrapper.between(PickupDispatchTaskEntity::getActualEndTime, startTime, endTime);
        } else if (status == PickupDispatchTaskStatus.CANCELLED) {
//            取消状态，查询取消时间
            queryWrapper.between(PickupDispatchTaskEntity::getCancelTime, startTime, endTime);
        }


        return Convert.toInt(count(queryWrapper));
    }

    /**
     * 条件查询所有
     *
     * @param courierId  快递员id
     * @param taskType   任务类型，1为取件任务，2为派件任务
     * @param taskStatus 任务状态,1新任务，2已完成，3已取消
     * @param isDeleted  是否逻辑删除
     * @return 取派件任务列表
     */
    @Override
    public List<PickupDispatchTaskDTO> findAll(Long courierId, PickupDispatchTaskType taskType, PickupDispatchTaskStatus taskStatus, PickupDispatchTaskIsDeleted isDeleted) {
//        构建查询条件
        LambdaQueryWrapper<PickupDispatchTaskEntity> queryWrapper = Wrappers.<PickupDispatchTaskEntity>lambdaQuery()
                .eq(ObjectUtil.isNotEmpty(courierId), PickupDispatchTaskEntity::getCourierId, courierId)
                .eq(ObjectUtil.isNotEmpty(taskType), PickupDispatchTaskEntity::getTaskType, taskType)
                .eq(ObjectUtil.isNotEmpty(taskStatus), PickupDispatchTaskEntity::getStatus, taskStatus)
                .eq(ObjectUtil.isNotEmpty(isDeleted), PickupDispatchTaskEntity::getIsDeleted, isDeleted);

        List<PickupDispatchTaskEntity> taskEntities = list(queryWrapper);
        return BeanUtil.copyToList(taskEntities, PickupDispatchTaskDTO.class);
    }

    /**
     * 今日任务分类统计
     *
     * @param courierId 快递员id
     * @return 统计结果
     */
    @Override
    public PickupDispatchTaskStatisticsDTO todayTaskStatistics(Long courierId) {
        PickupDispatchTaskStatisticsDTO taskStatisticsDTO = new PickupDispatchTaskStatisticsDTO();

//        今日取件任务数量
        taskStatisticsDTO.setPickupNum(todayTasksCount(courierId, PickupDispatchTaskType.PICKUP, null, PickupDispatchTaskIsDeleted.NOT_DELETED));

        //今日待取件任务数量
        taskStatisticsDTO.setNewPickUpNum(todayTasksCount(courierId, PickupDispatchTaskType.PICKUP, PickupDispatchTaskStatus.NEW, PickupDispatchTaskIsDeleted.NOT_DELETED));

        //今日已取件任务数量
        taskStatisticsDTO.setCompletePickUpNum(todayTasksCount(courierId, PickupDispatchTaskType.PICKUP, PickupDispatchTaskStatus.COMPLETED, PickupDispatchTaskIsDeleted.NOT_DELETED));

        //今日已取消取件任务数量
        taskStatisticsDTO.setCancelPickUpNum(todayTasksCount(courierId, PickupDispatchTaskType.PICKUP, PickupDispatchTaskStatus.CANCELLED, PickupDispatchTaskIsDeleted.NOT_DELETED));

        //今日派件任务数量
        taskStatisticsDTO.setDispatchNum(todayTasksCount(courierId, PickupDispatchTaskType.DISPATCH, null, PickupDispatchTaskIsDeleted.NOT_DELETED));

        //今日待派件任务数量
        taskStatisticsDTO.setNewDispatchNum(todayTasksCount(courierId, PickupDispatchTaskType.DISPATCH, PickupDispatchTaskStatus.NEW, PickupDispatchTaskIsDeleted.NOT_DELETED));

        //今日已签收任务数量
        taskStatisticsDTO.setSignedNum(todayTasksCount(courierId, PickupDispatchTaskType.DISPATCH, PickupDispatchTaskStatus.COMPLETED, PickupDispatchTaskIsDeleted.NOT_DELETED));

        //今日已取消派件任务数量
        taskStatisticsDTO.setCancelDispatchNum(todayTasksCount(courierId, PickupDispatchTaskType.DISPATCH, PickupDispatchTaskStatus.CANCELLED, PickupDispatchTaskIsDeleted.NOT_DELETED));
        return taskStatisticsDTO;
    }
}
