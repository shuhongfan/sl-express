package com.sl.ms.base.controller.truck;

import cn.hutool.core.bean.BeanUtil;
import com.sl.ms.base.domain.truck.TransportTripsTruckDriverDto;
import com.sl.ms.base.domain.truck.TruckTripsDto;
import com.sl.ms.base.entity.truck.TransportTripsTruckDriverEntity;
import com.sl.ms.base.entity.truck.TruckTripsEntity;
import com.sl.ms.base.service.truck.TransportTripsTruckDriverService;
import com.sl.ms.base.service.truck.TruckTripsService;
import com.sl.transport.common.util.ObjectUtil;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 车次
 */
@RestController
@RequestMapping("base/trips")
public class TruckTripsController {

    @Resource
    private TruckTripsService truckTripsService;

    @Resource
    private TransportTripsTruckDriverService transportTripsTruckDriverService;
    /**
     * 添加车次
     *
     * @param dto 车次信息
     * @return 车次信息
     */
    @PostMapping
    public TruckTripsDto save(@RequestBody TruckTripsDto dto) {
        TruckTripsEntity truckTripsEntity = BeanUtil.toBean(dto, TruckTripsEntity.class);
        truckTripsService.save(truckTripsEntity);
        return dto;
    }

    /**
     * 根据id获取车次详情
     *
     * @param id 车次id
     * @return 车次信息
     */
    @GetMapping("/{id}")
    public TruckTripsDto fineById(@PathVariable(name = "id") Long id) {
        TruckTripsEntity truckTripsEntity = truckTripsService.getById(id);

        if (ObjectUtil.isNotEmpty(truckTripsEntity)) {
            return BeanUtil.toBean(truckTripsEntity, TruckTripsDto.class);
        }
        return new TruckTripsDto();
    }

    /**
     * 获取车次列表
     *
     * @param transportLineId 线路id
     * @param ids             车次id列表
     * @return 车次列表
     */
    @GetMapping
    public List<TruckTripsDto> findAll(@RequestParam(name = "transportLineId", required = false) Long transportLineId,
                                       @RequestParam(name = "ids", required = false) List<Long> ids) {
        return truckTripsService.findAll(transportLineId, ids)
                .stream()
                .map(truckTrips -> BeanUtil.toBean(truckTrips, TruckTripsDto.class))
                .collect(Collectors.toList());
    }

    /**
     * 更新车次信息
     *
     * @param id  车次id
     * @param dto 车次信息
     * @return 车次信息
     */
    @PutMapping("/{id}")
    public TruckTripsDto update(@PathVariable(name = "id") Long id,
                                @RequestBody TruckTripsDto dto) {
        dto.setId(id);
        TruckTripsEntity truckTripsEntity = BeanUtil.toBean(dto, TruckTripsEntity.class);
        truckTripsService.updateById(truckTripsEntity);
        return dto;
    }

    /**
     * 删除车次信息
     *
     * @param id 车次信息
     */
    @PutMapping("/{id}/disable")
    public void disable(@PathVariable(name = "id") Long id) {
        truckTripsService.disable(id);
    }

    /**
     * 批量保存车次与车辆和司机关联关系
     *
     * @param dtoList 车次与车辆和司机关联关系
     */
    @PostMapping("{id}/truckDriver")
    public void batchSaveTruckDriver(@PathVariable(value = "id", required = false) Long transportTripsId,
                                @RequestBody List<TransportTripsTruckDriverDto> dtoList) {
        transportTripsTruckDriverService.batchSave(transportTripsId, dtoList.stream().map(dto -> {
            dto.setTransportTripsId(transportTripsId);
            return BeanUtil.toBean(dto, TransportTripsTruckDriverEntity.class);
        }).collect(Collectors.toList()));
    }

    /**
     * 获取车次与车辆和司机关联关系列表
     *
     * @param transportTripsId 车次id
     * @param truckId          车辆id
     * @param driverId           司机id
     * @return 车次与车辆和司机关联关系列表
     */
    @GetMapping("truckDriver")
    public List<TransportTripsTruckDriverDto> findAllTruckDriverTransportTrips(@RequestParam(name = "transportTripsId", required = false) Long transportTripsId,
                                          @RequestParam(name = "truckId", required = false) Long truckId,
                                          @RequestParam(name = "driverId", required = false) Long driverId) {
        return transportTripsTruckDriverService.findAll(transportTripsId, truckId, driverId)
                .parallelStream()
                .map(transportTripsTruck -> BeanUtil.toBean(transportTripsTruck, TransportTripsTruckDriverDto.class))
                .collect(Collectors.toList());
    }
}