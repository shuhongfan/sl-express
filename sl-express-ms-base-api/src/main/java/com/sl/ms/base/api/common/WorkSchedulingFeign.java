package com.sl.ms.base.api.common;

import com.sl.ms.base.domain.base.WorkSchedulingAddDTO;
import com.sl.ms.base.domain.base.WorkSchedulingDTO;
import com.sl.ms.base.domain.base.WorkSchedulingQueryDTO;
import com.sl.ms.base.domain.base.WorkSchedulingUpdateDTO;
import com.sl.transport.common.util.PageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 排班API
 */
@FeignClient(name = "sl-express-ms-base", contextId = "workScheduling", path = "work-schedulings")
@ApiIgnore
public interface WorkSchedulingFeign {


    /**
     * 分页查询排班信息
     *
     * @param workSchedulingQueryDTO 查询排班的条件和分页信息
     * @return 排班
     */
    @GetMapping
    PageResponse<WorkSchedulingDTO> list(@SpringQueryMap WorkSchedulingQueryDTO workSchedulingQueryDTO);

    /**
     * 批量新增排班
     *
     * @param workSchedulingAddDTOList 排班列表
     */
    @PostMapping("batch")
    void batch(@RequestBody List<WorkSchedulingAddDTO> workSchedulingAddDTOList);

    /**
     * 根据排班id删除排班信息
     *
     * @param id       排班信息id
     * @param operator 操作人
     */
    @DeleteMapping("{id}/{operator}")
    void delete(@PathVariable("id") Long id, @PathVariable("operator") Long operator);

    /**
     * 根据排班信息id，更新排班
     *
     * @param workSchedulingUpdateDTO 排班信息
     */
    @PutMapping("")
    void update(@RequestBody WorkSchedulingUpdateDTO workSchedulingUpdateDTO);

    /**
     * 根据用户id查询用户的当日到当月的排班计划
     *
     * @param userId 用户id
     * @return 这个月排班计划
     */
    @GetMapping("currentSchedule/{userId}")
    WorkSchedulingDTO currentSchedule(@PathVariable("userId") Long userId);

    /**
     * 根据网点id查询该网点所有员工的排班信息
     *
     * @param agencyId 网点id
     * @return 该网点所有员工的排班信息
     */
    @GetMapping("todayScheduleByAgencyId/{agencyId}")
    List<WorkSchedulingDTO> monthScheduleByAgencyId(@PathVariable("agencyId") Long agencyId);

    /**
     * 根据员工id列表或者网点id，查询员工 某一天的的排班情况
     *
     * @param userIds  用户IDs
     * @param agencyId 机构ID
     * @param type     用户类型
     * @param time     时间
     * @return 今日到这月末的排班
     */
    @GetMapping("todaySchedule/{userType}")
    List<WorkSchedulingDTO> monthSchedule(@RequestParam(value = "userIdList", required = false) String userIds,
                                          @RequestParam(value = "agencyId", required = false) Long agencyId,
                                          @PathVariable("userType") Byte type,
                                          @RequestParam("time") Long time);
}
