package com.sl.ms.base.controller.base;

import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.sl.ms.base.domain.base.WorkSchedulingAddDTO;
import com.sl.ms.base.domain.base.WorkSchedulingDTO;
import com.sl.ms.base.domain.base.WorkSchedulingQueryDTO;
import com.sl.ms.base.domain.base.WorkSchedulingUpdateDTO;
import com.sl.ms.base.service.base.WorkSchedulingService;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("work-schedulings")
@Api(tags = "工作排班相关接口")
@RestController
@Slf4j
public class WorkSchedulingController {

    @Autowired
    private WorkSchedulingService workSchedulingService;

    @GetMapping
    @ApiOperation("分页查询排班")
    public PageResponse<WorkSchedulingDTO> list(WorkSchedulingQueryDTO workSchedulingQueryDTO) {
        return workSchedulingService.queryForPage(workSchedulingQueryDTO);
    }

    @PostMapping("batch")
    @ApiOperation("批量新增排班")
    public ResponseEntity<Void> batch(@RequestBody List<WorkSchedulingAddDTO> workSchedulingAddDTOList) {
        workSchedulingService.batchAdd(workSchedulingAddDTOList);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("{id}/{operator}")
    @ApiOperation("删除")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "排班id"),
            @ApiImplicitParam(name = "operator", value = "操作人")
    })
    public ResponseEntity<Void> delete(@PathVariable("id") Long id, @PathVariable("operator") Long operator) {
        workSchedulingService.delete(id, operator);
        return ResponseEntity.ok(null);
    }

    @ApiOperation("更新排班")
    @PutMapping("")
    public ResponseEntity<Void> update(@RequestBody WorkSchedulingUpdateDTO workSchedulingUpdateDTO) {
        workSchedulingService.update(workSchedulingUpdateDTO);
        return ResponseEntity.ok(null);
    }


    @ApiOperation("根据用户id查询这个月排班计划")
    @GetMapping("currentSchedule/{userId}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userId", value = "用户id"),
    })
    public ResponseEntity<WorkSchedulingDTO> currentSchedule(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(workSchedulingService.currentSchedule(userId));
    }

    @ApiOperation("根据网点id查询该网点所有员工的排班信息")
    @GetMapping("todayScheduleByAgencyId/{agencyId}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "agencyId", value = "网点id")
    })
    public ResponseEntity<List<WorkSchedulingDTO>> monthScheduleByAgencyId(@PathVariable("agencyId") Long agencyId) {
        return ResponseEntity.ok(workSchedulingService.monthScheduleByAgencyId(agencyId));
    }

    @ApiOperation("根据快递员/司机id列表或网点id查询当前工作排班")
    @GetMapping("todaySchedule/{userType}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userIdList", value = "userId列表，可以是快递员id列表也可以是司机id列表"),
            @ApiImplicitParam(name = "agencyId", value = "网点id"),
            @ApiImplicitParam(name = "userType", value = "用户类型：1:员工，2：快递员，3：司机"),
            @ApiImplicitParam(name = "time", value = "日期"),
    })
    public ResponseEntity<List<WorkSchedulingDTO>> monthSchedule(
            @RequestParam(value = "userIdList", required = false) String userIdList,
            @RequestParam(value = "agencyId", required = false) Long agencyId,
            @PathVariable("userType") Byte type,
            @RequestParam("time") Long time){
        List<Long> userIds = ObjectUtil.isNotEmpty(userIdList) ? Arrays.stream(userIdList.split(",")).filter(StrUtil::isNotEmpty).map(Long::parseLong).collect(Collectors.toList()) : new ArrayList<>();
        return ResponseEntity.ok(workSchedulingService.monthSchedule(userIds, agencyId, type, LocalDateTimeUtil.of(time)));
    }

}
