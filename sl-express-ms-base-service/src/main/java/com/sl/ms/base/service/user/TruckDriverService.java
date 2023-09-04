package com.sl.ms.base.service.user;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.base.domain.user.TruckDriverDto;
import com.sl.ms.base.entity.user.TruckDriverEntity;

import java.util.List;

/**
 * 司机表 服务类
 */
public interface TruckDriverService extends IService<TruckDriverEntity> {

    /**
     * 获取司机基本信息列表
     *
     * @param userIds 司机id列表
     * @return 司机基本信息列表
     */
    List<TruckDriverEntity> findAll(List<Long> userIds);

    /**
     * 获取司机基本信息
     *
     * @param userId 司机id
     * @return 司机基本信息
     */
    TruckDriverEntity findOne(Long userId);


    /**
     * 绑定司机列表
     *
     * @param truckId 车辆id
     * @return 司机数量
     */
    List<TruckDriverEntity> findByTruckId(Long truckId);

    /**
     * 获取司机分页数据
     *
     * @param page     页码
     * @param pageSize 页尺寸
     * @return 司机分页数据
     */
    IPage<TruckDriverEntity> findByPage(Integer page, Integer pageSize);

    /**
     * 解除车辆和司机的绑定关系
     *
     * @param truckId 车辆ID
     */
    void disableTruckId(Long truckId);

    /**
     * 保存
     *
     * @param dto 司机
     * @return 司机
     */
    TruckDriverDto saveDriver(TruckDriverDto dto);
}
