package com.sl.ms.base.controller.truck;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sl.ms.base.domain.enums.TruckRunStatusEnum;
import com.sl.ms.base.domain.truck.TruckDto;
import com.sl.ms.base.entity.truck.TruckEntity;
import com.sl.ms.base.entity.truck.TruckTypeEntity;
import com.sl.ms.base.entity.user.TruckDriverEntity;
import com.sl.ms.base.service.truck.TruckService;
import com.sl.ms.base.service.truck.TruckTypeService;
import com.sl.ms.base.service.user.TruckDriverService;
import com.sl.transport.common.util.PageResponse;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 车辆业务
 */
@RestController
@RequestMapping("base/truck")
public class TruckController {

    @Resource
    private TruckService truckService;

    @Resource
    private TruckDriverService truckDriverService;

    @Resource
    private TruckTypeService truckTypeService;

    /**
     * 添加车辆
     *
     * @param dto 车辆信息
     * @return 车辆信息
     */
    @PostMapping
    public TruckDto saveTruck(@RequestBody TruckDto dto) {
        TruckEntity truckEntity = BeanUtil.toBean(dto, TruckEntity.class);
        // 車型計算
        List<TruckTypeEntity> all = truckTypeService.findAll(Collections.singletonList(dto.getTruckTypeId()));
        if (CollUtil.isNotEmpty(all)) {
            TruckTypeEntity truckTypeEntity = all.get(0);
            if (ObjectUtil.isNotEmpty(truckTypeEntity)) {
                truckEntity.setAllowableLoad(truckTypeEntity.getAllowableLoad());
                truckEntity.setAllowableVolume(truckTypeEntity.getAllowableVolume());
            }

        }
        truckService.save(truckEntity);
        BeanUtil.copyProperties(truckEntity, dto);
        return dto;
    }

    /**
     * 根据id获取车辆详情
     *
     * @param id 车辆id
     * @return 车辆信息
     */
    @GetMapping("/{id}")
    public TruckDto fineById(@PathVariable(name = "id") Long id) {
        TruckEntity truckEntity = truckService.getById(id);
        if (ObjectUtil.isEmpty(truckEntity)) {
            return null;
        }
        return BeanUtil.toBean(truckEntity, TruckDto.class);
    }

    /**
     * 获取车辆分页数据
     *
     * @param page         页码
     * @param pageSize     页尺寸
     * @param truckTypeId  车辆类型id
     * @param licensePlate 车牌号码
     * @return 车辆分页数据
     */
    @GetMapping("/page")
    public PageResponse<TruckDto> findByPage(@RequestParam(name = "page") Integer page,
                                             @RequestParam(name = "pageSize") Integer pageSize,
                                             @RequestParam(name = "truckTypeId", required = false) Long truckTypeId,
                                             @RequestParam(name = "status", required = false) Integer status,
                                             @RequestParam(name = "licensePlate", required = false) String licensePlate) {
        IPage<TruckEntity> truckPage = truckService.findByPage(page, pageSize, truckTypeId, status, licensePlate);
        List<TruckDto> dtoList = new ArrayList<>();

        // 车型
        Set<Long> truckTypeSet = new HashSet<>();
        truckPage.getRecords().forEach(truckDto -> {
            if (ObjectUtil.isNotEmpty(truckDto.getTruckTypeId())) {
                truckTypeSet.add(truckDto.getTruckTypeId());
            }
        });
        Map<Long, TruckTypeEntity> truckTypeVOMap = truckTypeService.truckTypeMap(truckTypeSet);

        truckPage.getRecords().forEach(pdTruck -> {
            TruckDto dto = BeanUtil.toBean(pdTruck, TruckDto.class);

            LambdaQueryWrapper<TruckDriverEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
            lambdaQueryWrapper.eq(TruckDriverEntity::getTruckId, dto.getId());
            long count = truckDriverService.count(lambdaQueryWrapper);
            dto.setDriverNum((int) count);

            if (ObjectUtil.isNotEmpty(dto.getTruckTypeId())) {
                TruckTypeEntity truckTypeVo = truckTypeVOMap.get(dto.getTruckTypeId());
                dto.setTruckTypeName(truckTypeVo.getName());
            }

            dtoList.add(dto);
        });
        return PageResponse.<TruckDto>builder().items(dtoList).pageSize(pageSize).page(page).counts(truckPage.getTotal())
                .pages(truckPage.getPages()).build();
    }

    /**
     * 获取车辆列表
     *
     * @param ids 车辆id列表
     * @return 车辆列表
     */
    @GetMapping
    public List<TruckDto> findAll(@RequestParam(name = "ids", required = false) List<Long> ids) {
        return truckService.findAll(ids).stream().map(truckEntity -> {
            TruckDto dto = BeanUtil.toBean(truckEntity, TruckDto.class);
            LambdaQueryWrapper<TruckDriverEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
            lambdaQueryWrapper.eq(TruckDriverEntity::getTruckId, dto.getId());
            long count = truckDriverService.count(lambdaQueryWrapper);
            dto.setDriverNum((int) count);
            return dto;
        }).collect(Collectors.toList());
    }

    /**
     * 更新车辆信息
     *
     * @param id  车辆id
     * @param dto 车辆信息
     * @return 车辆信息
     */
    @PutMapping("/{id}")
    public TruckDto update(@PathVariable(name = "id") Long id, @RequestBody TruckDto dto) {
        dto.setId(id);
        TruckEntity truckEntity = BeanUtil.toBean(dto, TruckEntity.class);
        truckService.updateById(truckEntity);
        return dto;
    }

    /**
     * 统计车辆数量
     *
     * @return 车辆数量
     */
    @GetMapping("/count")
    public Map<Integer, Long> count() {
        return truckService.groupByStatus();
    }

    /**
     * 禁用车辆
     *
     * @param id 车辆id
     */
    @PutMapping("/{id}/disable")
    public void disable(@PathVariable(name = "id") Long id) {
        truckService.stopById(id);
    }

    /**
     * 启用车辆
     *
     * @param id 车辆id
     */
    @PutMapping("/{id}/enable")
    public void enable(@PathVariable(name = "id") Long id) {
        truckService.workedById(id);
    }

    /**
     * 删除车辆
     *
     * @param id 车辆id
     */
    @PutMapping("/{id}/del")
    public void del(@PathVariable(name = "id") Long id) {
        truckService.del(id);
    }

    /**
     * 更新车辆状态
     * 调用时机 车辆出库
     * @param id 车辆id
     * @param status 车辆状态枚举
     */
    @PutMapping("/updateRunStatus")
    public void updateRunStatus(@RequestParam(name = "id") Long id, @RequestParam("status") TruckRunStatusEnum status) {
        truckService.updateRunStatus(id, status);
    }
}