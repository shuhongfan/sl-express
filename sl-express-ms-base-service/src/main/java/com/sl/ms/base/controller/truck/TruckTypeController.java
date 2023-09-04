package com.sl.ms.base.controller.truck;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.sl.ms.base.domain.truck.TruckTypeDto;
import com.sl.ms.base.entity.truck.TruckTypeEntity;
import com.sl.ms.base.entity.truck.TruckTypeGoodsTypeEntity;
import com.sl.ms.base.service.truck.TruckService;
import com.sl.ms.base.service.truck.TruckTypeGoodsTypeService;
import com.sl.ms.base.service.truck.TruckTypeService;
import com.sl.transport.common.util.PageResponse;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 车辆类型 业务
 */
@RestController
@RequestMapping("base/truck/type")
public class TruckTypeController {

    @Resource
    private TruckTypeService truckTypeService;

    @Resource
    private TruckTypeGoodsTypeService truckTypeGoodsTypeService;

    @Resource
    private TruckService truckService;

    /**
     * 添加车辆类型
     *
     * @param dto 车辆类型信息
     * @return 车辆类型信息
     */
    @PostMapping
    public TruckTypeDto saveTruckType(@RequestBody TruckTypeDto dto) {
        TruckTypeEntity truckTypeEntity = BeanUtil.toBean(dto, TruckTypeEntity.class);
        truckTypeService.save(truckTypeEntity);
        Long truckTypeId = truckTypeEntity.getId();
        //处理与货物类型的关联
        if (ObjectUtil.isNotEmpty(dto.getGoodsTypeIds())) {
            List<TruckTypeGoodsTypeEntity> list = dto.getGoodsTypeIds()
                    .stream()
                    .map(id -> TruckTypeGoodsTypeEntity.builder().goodsTypeId(id).truckTypeId(truckTypeId).build())
                    .collect(Collectors.toList());
            truckTypeGoodsTypeService.saveBatch(list);
        }
        BeanUtil.copyProperties(truckTypeEntity, dto);
        return dto;
    }

    /**
     * 根据id获取车辆类型详情
     *
     * @param id 车辆类型id
     * @return 车辆类型信息
     */
    @GetMapping("/{id}")
    public TruckTypeDto fineById(@PathVariable(name = "id") String id) {
        TruckTypeEntity truckTypeEntity = truckTypeService.getById(id);
        TruckTypeDto dto = BeanUtil.toBean(truckTypeEntity, TruckTypeDto.class);
        List<Long> list = truckTypeGoodsTypeService.findAll(dto.getId(), null)
                .stream()
                .map(TruckTypeGoodsTypeEntity::getGoodsTypeId)
                .collect(Collectors.toList());
        dto.setGoodsTypeIds(list);
        return dto;
    }

    /**
     * 获取车辆类型分页数据
     *
     * @param page               页码
     * @param pageSize           页尺寸
     * @param name               车辆类型名称
     * @param minAllowableLoad   车辆载重最小值（闭区间）
     * @param maxAllowableLoad   车辆载重最大值（开区间）
     * @param minAllowableVolume 车辆体积最小值（闭区间）
     * @param maxAllowableVolume 车辆体积最小值（开区间）
     * @param id                 车型id
     * @return 车辆类型分页数据
     */
    @GetMapping("/page")
    public PageResponse<TruckTypeDto> findByPage(@RequestParam(name = "page") Integer page,
                                                 @RequestParam(name = "pageSize") Integer pageSize,
                                                 @RequestParam(name = "name", required = false) String name,
                                                 @RequestParam(name = "minAllowableLoad", required = false) BigDecimal minAllowableLoad,
                                                 @RequestParam(name = "maxAllowableLoad", required = false) BigDecimal maxAllowableLoad,
                                                 @RequestParam(name = "minAllowableVolume", required = false) BigDecimal minAllowableVolume,
                                                 @RequestParam(name = "maxAllowableVolume", required = false) BigDecimal maxAllowableVolume,
                                                 @RequestParam(name = "id", required = false) Long id) {
        IPage<TruckTypeEntity> pdTruckTypePage = truckTypeService.findByPage(page, pageSize, name, minAllowableLoad, maxAllowableLoad, minAllowableVolume, maxAllowableVolume, id);
        List<TruckTypeDto> dtoList = new ArrayList<>();
        pdTruckTypePage.getRecords().forEach(truckType -> {
            TruckTypeDto dto = BeanUtil.toBean(truckType, TruckTypeDto.class);
            List<Long> list = truckTypeGoodsTypeService.findAll(dto.getId(), null).stream().map(TruckTypeGoodsTypeEntity::getGoodsTypeId).collect(Collectors.toList());
            dto.setGoodsTypeIds(list);
            int size = truckService.countByType(truckType.getId());
            dto.setNum(size);
            dtoList.add(dto);
        });
        return PageResponse.<TruckTypeDto>builder().items(dtoList).pageSize(pageSize).page(page).counts(pdTruckTypePage.getTotal()).pages(pdTruckTypePage.getPages()).build();
    }

    /**
     * 获取车辆类型列表
     *
     * @param ids 车辆类型id
     * @return 车辆类型列表
     */
    @GetMapping
    public List<TruckTypeDto> findAll(@RequestParam(name = "ids", required = false) List<Long> ids) {
        return truckTypeService.findAll(ids).stream().map(truckType -> {
            TruckTypeDto dto = BeanUtil.toBean(truckType, TruckTypeDto.class);
            List<Long> list = truckTypeGoodsTypeService.findAll(dto.getId(), null).stream().map(TruckTypeGoodsTypeEntity::getGoodsTypeId).collect(Collectors.toList());
            dto.setGoodsTypeIds(list);
            return dto;
        }).collect(Collectors.toList());
    }

    /**
     * 更新车辆类型信息
     *
     * @param id  车辆类型id
     * @param dto 车辆类型信息
     * @return 车辆类型信息
     */
    @PutMapping("/{id}")
    public TruckTypeDto update(@PathVariable(name = "id") Long id, @RequestBody TruckTypeDto dto) {
        dto.setId(id);
        truckTypeService.updateById(BeanUtil.toBean(dto, TruckTypeEntity.class));
        //处理与货物类型的关联
        if (ObjectUtil.isNotEmpty(dto.getGoodsTypeIds())) {
            truckTypeGoodsTypeService.delete(id, null);
            //绑定新的关系
            truckTypeGoodsTypeService.saveBatch(dto.getGoodsTypeIds().stream().map(goodsTypeId -> TruckTypeGoodsTypeEntity.builder().goodsTypeId(goodsTypeId).truckTypeId(id).build()).collect(Collectors.toList()));
        }
        return dto;
    }

    /**
     * 删除车辆类型
     *
     * @param id 车辆类型Id
     */
    @PutMapping("/{id}/disable")
    public void disable(@PathVariable(name = "id") Long id) {
        truckTypeService.disable(id);
    }

}