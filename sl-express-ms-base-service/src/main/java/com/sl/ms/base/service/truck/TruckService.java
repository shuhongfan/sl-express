package com.sl.ms.base.service.truck;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.domain.enums.StatusEnum;
import com.sl.ms.base.domain.enums.TruckRunStatusEnum;
import com.sl.ms.base.entity.truck.TruckEntity;

import java.util.List;
import java.util.Map;

/**
 * 车辆信息表 服务类
 */
public interface TruckService extends IService<TruckEntity> {

    /**
     * 获取车辆分页数据
     *
     * @param page         页码
     * @param pageSize     页尺寸
     * @param truckTypeId  车辆类型id
     * @param status       状态
     * @param licensePlate 车辆号牌
     * @return 线路类型分页数据
     */
    IPage<TruckEntity> findByPage(Integer page, Integer pageSize, Long truckTypeId, Integer status, String licensePlate);

    /**
     * 获取车辆列表
     *
     * @param ids 车辆id列表
     * @return 车辆列表
     */
    List<TruckEntity> findAll(List<Long> ids);

    /**
     * 禁用车辆
     *
     * @param id 车辆id
     */
    void stopById(Long id);

    /**
     * 更新车辆状态
     *
     * @param id     车辆ID
     * @param status 车辆状态
     */
    void updateRunStatus(Long id, TruckRunStatusEnum status);

    /**
     * 更新当前位置
     *
     * @param truckId        车辆ID
     * @param currentOrganId 当前机构ID
     * @param statusEnum     {@link StatusEnum}
     * @return 是否成功
     */
    Boolean updateCurrentOrganId(Long truckId, Long currentOrganId, StatusEnum statusEnum);

    /**
     * 启用车辆
     *
     * @param id 车辆ID
     */
    void workedById(Long id);

    /**
     * 状态分组统计
     *
     * @return 统计车辆信息
     */
    Map<Integer, Long> groupByStatus();

    /**
     * 车型数量
     *
     * @param typeId 车辆类型ID
     * @return 该车型下的车辆数量
     */
    Integer countByType(Long typeId);

    /**
     * 删除
     *
     * @param id 车辆ID
     */
    void del(Long id);
}
