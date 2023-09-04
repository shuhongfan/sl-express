package com.sl.ms.base.service.base;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.domain.base.WorkSchedulingAddDTO;
import com.sl.ms.base.domain.base.WorkSchedulingDTO;
import com.sl.ms.base.domain.base.WorkSchedulingQueryDTO;
import com.sl.ms.base.domain.base.WorkSchedulingUpdateDTO;
import com.sl.ms.base.entity.base.WorkSchedulingEntity;
import com.sl.transport.common.util.PageResponse;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 排班服务
 */
public interface WorkSchedulingService extends IService<WorkSchedulingEntity> {

    /**
     * 分页查询排班
     * @param workSchedulingQueryDTO 查询条件
     * @return 排班
     */
    PageResponse<WorkSchedulingDTO> queryForPage(WorkSchedulingQueryDTO workSchedulingQueryDTO);

    /**
     * 新增排班
     * @param workSchedulingAddDTO 排班
     */
    void add(WorkSchedulingAddDTO workSchedulingAddDTO);

    /**
     * 删除排班
     * @param id 排班ID
     * @param operator 操作人
     */
    void delete(Long id, Long operator);

    /**
     * 批量新增排班
     * @param workSchedulingAddDTOList 排班列表
     */
    void batchAdd(List<WorkSchedulingAddDTO> workSchedulingAddDTOList);

    /**
     * 更新排班
     * @param workSchedulingUpdateDTO 排班
     */
    void update(WorkSchedulingUpdateDTO workSchedulingUpdateDTO);

    /**
     * 根据用户id查询这个月排班计划
     * @param userId 用户ID
     * @return 这个月排班计划
     */
    WorkSchedulingDTO currentSchedule(Long userId);

    /**
     * 根据用户id查询
     * @param userId 用户ID
     * @return 排班数据
     */
    WorkSchedulingEntity getByUserId(Long userId);

    /**
     * 根据网点id查询该网点所有员工的排班信息
     * @param agencyId 机构ID
     * @return 该网点所有员工的排班信息
     */
    List<WorkSchedulingDTO> monthScheduleByAgencyId(Long agencyId);

    /**
     * 根据快递员/司机id列表或网点id查询当前工作排班
     * @param userIds 用户ID
     * @param agencyId 机构ID
     * @param type 用户类型：1:员工，2：快递员，3：司机
     * @param time 时间
     * @return 当前工作排班
     */
    List<WorkSchedulingDTO> monthSchedule(List<Long> userIds, Long agencyId, Byte type, LocalDateTime time);

    /**
     * 获取整个计划（运输任务）期间每一天都上班的司机
     * @param driverIds 司机ID列表
     * @param planDepartureTime 计划发车时间
     * @param planArrivalTime 计划到达时间
     * @return 正常上班的司机ID列表
     */
    List<Long> getWorkingDrivers(List<Long> driverIds, LocalDateTime planDepartureTime, LocalDateTime planArrivalTime);
}
