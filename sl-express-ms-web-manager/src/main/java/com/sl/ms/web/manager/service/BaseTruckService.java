package com.sl.ms.web.manager.service;

import com.sl.ms.web.manager.vo.baseTruck.*;
import com.sl.transport.common.util.PageResponse;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * 基础运输模型管理
 * 车辆 车次 司机 管理
 */
public interface BaseTruckService {
    /**
     * 获取司机分页数据
     *
     * @param page       页数
     * @param pageSize   页大小
     * @param name       名称
     * @param account    账号
     * @param workStatus 工作状态
     * @param agentId    机构ID
     * @param phone      手机号
     * @return 司机列表
     */
    PageResponse<DriverVO> findDriverByPage(Integer page,
                                            Integer pageSize,
                                            String name,
                                            String account,
                                            String workStatus, Long agentId, String phone);

    /**
     * 司机详情
     *
     * @param id 司机ID
     * @return 司机
     */
    DriverVO findDriverById(Long id);


    /**
     * 保存司机
     *
     * @param id 司机ID
     * @param vo 司机信息
     */
    void saveDriver(Long id, DriverUpdateVO vo);


    /**
     * 保存驾驶证
     *
     * @param vo 驾驶证信息
     */
    void saveDriverLicense(DriverLicenseVO vo);

    /**
     * 驾驶证详情
     *
     * @param id 司机id
     * @return 驾驶证信息
     */
    DriverLicenseVO findDriverLicenseById(Long id);


    /**
     * 新增司机安排车辆 【司机：车辆 = n:1】
     * 调整司机安排车辆
     * 删除司机安排车辆
     * base服务会统一判断原有绑定关系是否能够删除
     *
     * @param bindingDriversVO 绑定关系
     */
    void bindingTrucks(BindingDriversVO bindingDriversVO);

    /**
     * 保存车辆
     *
     * @param vo 车辆
     */
    void saveTruck(TruckVO vo);


    /**
     * 更新车辆
     *
     * @param id 车辆ID
     * @param vo 车辆
     */
    void updateTruck(Long id, TruckVO vo);


    /**
     * 车辆列表
     *
     * @param page         页数
     * @param pageSize     页大小
     * @param truckTypeId  车型ID
     * @param status       状态
     * @param licensePlate 车牌号
     * @return 车辆列表
     */
    PageResponse<TruckVO> findTruckByPage(Integer page,
                                          Integer pageSize,
                                          Long truckTypeId,
                                          Integer status,
                                          String licensePlate);


    /**
     * 车辆简要信息
     *
     * @param id 车辆ID
     * @return 车辆简要信息
     */
    TruckVO findTruckSimple(Long id);

    /**
     * 车辆详情
     *
     * @param id 车辆ID
     * @return 车辆信息
     */
    TruckVO findTruckDetail(Long id);


    /**
     * 统计车辆
     *
     * @return 各状态个数
     */
    Map<Integer, Long> countTruck();


    /**
     * 禁用车辆
     *
     * @param id 车辆ID
     */
    void disableTruck(Long id);


    /**
     * 启用车辆
     *
     * @param id 车辆ID
     */
    void enableTruck(Long id);


    /**
     * 删除车辆
     *
     * @param id 车辆ID
     */
    void delTruck(Long id);

    /**
     * 保存行驶证
     *
     * @param id 车辆ID
     * @param vo 行驶证信息
     */
    void saveTruckLicense(Long id, TruckLicenseVO vo);


    /**
     * 获取行驶证
     *
     * @param id 车辆ID
     * @return 行驶证
     */
    TruckLicenseVO findTruckLicenseById(Long id);


    /**
     * 获取车辆车次信息
     *
     * @param id 车辆ID
     * @return 车次信息
     */
    List<TruckDriverTripsVO> findTruckTrips(Long id);


    /**
     * 获取map类型车辆数据集合
     *
     * @param truckSet 车辆id列表
     * @return 执行结果
     */
    Map<Long, TruckVO> truckMap(Set<Long> truckSet);

    /**
     * 绑定司机列表
     *
     * @param truckId 车辆ID
     * @return 司机列表
     */
    List<DriverVO> bindingTrucks(Long truckId);

    /**
     * 未绑定车辆的司机列表
     *
     * @return 司机列表
     */
    List<DriverVO> unBindingDrivers();

    /**
     * 新增车次
     *
     * @param vo 车次信息
     */
    void saveTrips(TransportTripsUpdateVO vo);


    /**
     * 更新车次
     *
     * @param id 车次ID
     * @param vo 车次信息
     */
    void updateTrips(Long id, TransportTripsUpdateVO vo);


    /**
     * 根据线路ID获取车次
     *
     * @param transportLineId 线路ID
     * @return 车次列表
     */
    List<TransportTripsVO> findAllTrips(Long transportLineId);


    /**
     * 根据车次ID获取车次简要信息
     *
     * @param id 车次ID
     * @return 车次信息
     */
    TransportTripsVO findTripsSimple(Long id);

    /**
     * 根据车次ID获取车次
     *
     * @param id 车次ID
     * @return 车次信息
     */
    TransportTripsVO findTripsDetail(Long id);

    /**
     * 删除车次
     *
     * @param id 车次ID
     */
    void deleteTransportLineTrips(Long id);


    /**
     * 新增车次-安排车辆 不涉及司机的安排 司机会根据【司机车辆绑定关系】和排班情况调度决定
     * 修改车次-安排车辆
     * 解除车次安排 车辆ID列表为空 标识解除所有车次绑定关系
     *
     * @param id              车次ID
     * @param bindingTrucksVO 车次车辆绑定关系
     */
    void bindingTrucks(Long id, BindingTrucksVO bindingTrucksVO);

    /**
     * 获取车次-车辆绑定关系
     *
     * @param transportTripsId 查询条件
     * @return 车次-车辆绑定关系
     */
    List<TruckVO> getTransportTripsTruck(Long transportTripsId);

    /**
     * 获取已经启用的车辆
     *
     * @return 车辆
     */
    List<TruckVO> workingTrucks(Long startAgentId, Long endAgentId);

    /**
     * 新增车辆绑定司机 【司机：车辆 = n:1】
     * 调整车辆绑定司机
     * 解除车辆绑定司机
     * 保证事务性
     * base服务会统一判断原有绑定关系是否能够删除
     *
     * @param bindingDriversVO 绑定关系
     */
    void bindingDrivers(BindingDriversVO bindingDriversVO);

    /**
     * 获取已经停用的车辆
     * 没有绑定2个司机的车辆
     *
     * @return 车辆
     */
    List<TruckVO> unWorkingTrucks();

}
