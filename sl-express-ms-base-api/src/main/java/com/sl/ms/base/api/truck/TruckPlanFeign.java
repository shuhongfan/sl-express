package com.sl.ms.base.api.truck;

import com.sl.ms.base.domain.enums.StatusEnum;
import com.sl.ms.base.domain.truck.TruckPlanDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@FeignClient(name = "sl-express-ms-base", contextId = "TruckPlan", path = "base/plan")
@ApiIgnore
public interface TruckPlanFeign {
    /**
     * 获取未分配运输任务的车次计划列表
     * @return 未分配运输任务的车次计划列表
     */
    @GetMapping("/unassignedPlan/{shardTotal}/{shardIndex}")
    List<TruckPlanDto> pullUnassignedPlan(@PathVariable(name = "shardTotal") Integer shardTotal, @PathVariable(name = "shardIndex") Integer shardIndex);


    /**
     * 根据ID获取
     * @param id 数据库ID
     * @return 返回信息
     */
    @GetMapping("/{id}")
    TruckPlanDto findById(@PathVariable("id") Long id);

    /**
     * 计划完成
     * @param currentOrganId 结束机构id
     * @param planId          计划ID
     * @param truckId 车辆ID
     * @param statusEnum 车辆状态枚举
     * @return 车次与车辆和司机关联关系列表
     */
    @PutMapping("finished")
    void finished(@RequestParam("currentOrganId") Long currentOrganId, @RequestParam("planId") Long planId, @RequestParam("truckId") Long truckId, @RequestParam("statusEnum") StatusEnum statusEnum);

}
