package com.sl.ms.base.controller.truck;

import cn.hutool.core.bean.BeanUtil;
import com.sl.ms.base.domain.enums.StatusEnum;
import com.sl.ms.base.domain.truck.TruckPlanDto;
import com.sl.ms.base.entity.truck.TruckPlanEntity;
import com.sl.ms.base.service.truck.TruckPlanService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 车辆计划
 */
@Slf4j
@RestController
@RequestMapping("base/plan/")
public class TruckPlanController {

    @Resource
    private TruckPlanService truckPlanService;

    /**
     * 获取未分配运输任务的车次计划列表
     * @return 未分配运输任务的车次计划列表
     */
    @GetMapping("/unassignedPlan/{shardTotal}/{shardIndex}")
    public List<TruckPlanDto> pullUnassignedPlan(@PathVariable(name = "shardTotal") Integer shardTotal, @PathVariable(name = "shardIndex") Integer shardIndex) {
        // 查询计划
        return truckPlanService.pullUnassignedPlan(shardTotal, shardIndex);
    }

    /**
     * 根据ID获取
     * @param id 数据库ID
     * @return 返回信息
     */
    @GetMapping("{id}")
    public TruckPlanDto findOne(@PathVariable("id") Long id) {
        TruckPlanEntity truckPlanEntity = truckPlanService.getById(id);
        return BeanUtil.toBean(truckPlanEntity, TruckPlanDto.class);
    }

    /**
     * 计划完成
     * @param currentOrganId 结束机构id
     * @param planId          计划ID
     * @param truckId 车辆ID
     * @param statusEnum 车辆状态枚举
     */
    @PutMapping("finished")
    void finished(@RequestParam("currentOrganId") Long currentOrganId, @RequestParam("planId") Long planId, @RequestParam("truckId") Long truckId, @RequestParam("statusEnum") StatusEnum statusEnum) {
        truckPlanService.finishedPlan(currentOrganId, planId, truckId, statusEnum);
    }

}