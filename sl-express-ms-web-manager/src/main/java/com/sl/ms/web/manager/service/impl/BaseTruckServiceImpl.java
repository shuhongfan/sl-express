package com.sl.ms.web.manager.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.ObjectUtil;
import com.itheima.auth.sdk.common.Result;
import com.itheima.auth.sdk.dto.PageDTO;
import com.itheima.auth.sdk.dto.UserDTO;
import com.itheima.auth.sdk.dto.UserPageDTO;
import com.sl.ms.base.api.common.WorkSchedulingFeign;
import com.sl.ms.base.api.trips.TripsFeign;
import com.sl.ms.base.api.truck.TruckFeign;
import com.sl.ms.base.api.truck.TruckLicenseFeign;
import com.sl.ms.base.api.user.DriverFeign;
import com.sl.ms.base.domain.base.WorkSchedulingDTO;
import com.sl.ms.base.domain.constants.TruckConstant;
import com.sl.ms.base.domain.enums.TruckWorkStatusEnum;
import com.sl.ms.base.domain.enums.WorkUserTypeEnum;
import com.sl.ms.base.domain.truck.TransportTripsTruckDriverDto;
import com.sl.ms.base.domain.truck.TruckDto;
import com.sl.ms.base.domain.truck.TruckLicenseDto;
import com.sl.ms.base.domain.truck.TruckTripsDto;
import com.sl.ms.base.domain.user.TruckDriverDto;
import com.sl.ms.base.domain.user.TruckDriverLicenseDto;
import com.sl.ms.transport.api.TransportLineFeign;
import com.sl.ms.web.manager.service.AuthService;
import com.sl.ms.web.manager.service.BaseCommonService;
import com.sl.ms.web.manager.service.BaseTruckService;
import com.sl.ms.web.manager.service.TransportService;
import com.sl.ms.web.manager.vo.auth.SysUserVO;
import com.sl.ms.web.manager.vo.baseTruck.*;
import com.sl.ms.web.manager.vo.transportLine.TransportLineVO;
import com.sl.ms.work.api.TransportTaskFeign;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.util.AuthTemplateThreadLocal;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.domain.TransportLineDTO;
import com.sl.transport.domain.TransportLineSearchDTO;
import io.seata.spring.annotation.GlobalTransactional;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 基础运输模型管理
 * 车辆 车次 司机 行驶证管理
 * 对应 base微服务
 */
@Slf4j
@Service
public class BaseTruckServiceImpl implements BaseTruckService {

    @Resource
    WorkSchedulingFeign workSchedulingFeign;

    @Resource
    private TripsFeign tripsFeign;

    @Resource
    private DriverFeign driverFeign;

    @Resource
    private TruckFeign truckFeign;

    @Resource
    private TruckLicenseFeign truckLicenseFeign;

    @Value("${role.driver}")
    private String roleId;

    @Resource
    private BaseCommonService baseCommonService;

    @Resource
    private AuthService authService;

    @Resource
    private TransportService transportService;

    @Resource
    private TransportTaskFeign transportTaskFeign;

    @Resource
    private TransportLineFeign transportLineFeign;

    /**
     * 司机vo map
     *
     * @return 司机VO MAP
     */
    private Map<Long, DriverVO> driverMap(Set<Long> userSet) {
        List<Long> driverIds = userSet.stream().mapToLong(Long::valueOf).boxed().collect(Collectors.toList());
        List<TruckDriverDto> truckDriverDtos = driverFeign.findAllDriver(driverIds);

        Map<Long, SysUserVO> sysUserVOMap = authService.users(driverIds).parallelStream().collect(Collectors.toMap(SysUserVO::getUserId, v -> v));
        List<DriverVO> driverVOS = batchParseTruckDriverDto2Vo(truckDriverDtos, sysUserVOMap);
        return driverVOS.parallelStream().collect(Collectors.toMap(DriverVO::getUserId, vo -> vo));
    }

    private List<DriverVO> batchParseTruckDriverDto2Vo(List<TruckDriverDto> truckDriverDtos, Map<Long, SysUserVO> sysUserVOMap) {
        return truckDriverDtos.parallelStream().map(dto -> {
            DriverVO vo = BeanUtil.toBean(dto, DriverVO.class);
            if (ObjectUtil.isEmpty(dto.getUserId())) {
                return vo;
            }
            try {
                SysUserVO user = sysUserVOMap.get(dto.getUserId());
                BeanUtil.copyProperties(user, vo);
            } catch (Exception ignored) {

            }
            return vo;
        }).collect(Collectors.toList());
    }

    /**
     * 司机DTO map
     *
     * @param userSet 用户ID列表
     * @return 司机DTO MAP
     */
    private Map<Long, TruckDriverDto> driverDtoMap(Set<Long> userSet) {
        List<Long> driverIds = userSet.stream().mapToLong(Long::valueOf).boxed().collect(Collectors.toList());
        List<TruckDriverDto> truckDriverDtos = driverFeign.findAllDriver(driverIds);
        return truckDriverDtos.stream().collect(Collectors.toMap(TruckDriverDto::getUserId, vo -> vo));
    }


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
    @Override
    public PageResponse<DriverVO> findDriverByPage(Integer page,
                                                   Integer pageSize,
                                                   String name,
                                                   String account,
                                                   String workStatus, Long agentId, String phone) {
        List<DriverVO> driverVOList = new ArrayList<>();
        // 查询用户表
        UserPageDTO userPageDTO = new UserPageDTO(page, pageSize, account, name, agentId, phone);
        userPageDTO.setRoleId(roleId);
        Result<PageDTO<UserDTO>> result = AuthTemplateThreadLocal.get().opsForUser().getUserByPage(userPageDTO);

        if (result.getCode() != 0) {
            return null;
        }
        PageDTO<UserDTO> data = result.getData();
        long total = data.getTotal();
        long pages = data.getTotal() % data.getSize();
        List<UserDTO> userDTOS = data.getRecords();
        // 根据userID查询司机表
        Set<Long> driverIds = userDTOS.stream().map(UserDTO::getId).collect(Collectors.toSet());
        if (CollUtil.isEmpty(driverIds)) {
            return PageResponse.of(driverVOList, page, pageSize, pages, total);
        }

        Map<Long, TruckDriverDto> driverVOMap = driverDtoMap(driverIds);
        Set<Long> truckIds = driverVOMap.entrySet().parallelStream().map(userDTO -> userDTO.getValue().getTruckId()).collect(Collectors.toSet());
        Map<Long, TruckVO> truckVOMap = truckMap(truckIds);

        // 批量查询排班
        String bidStr = CollUtil.isEmpty(driverIds) ? "" : CharSequenceUtil.join(",", driverIds);
        List<WorkSchedulingDTO> workSchedulingDTOS = workSchedulingFeign.monthSchedule(bidStr, null, WorkUserTypeEnum.DRIVER.getCode(), LocalDateTimeUtil.toEpochMilli(LocalDateTimeUtil.now()));
        Map<Long, Boolean> workMap = new HashMap<>();
        if (CollUtil.isNotEmpty(workSchedulingDTOS)) {
            workMap = workSchedulingDTOS.parallelStream().filter(workSchedulingDTO -> CollUtil.isNotEmpty(workSchedulingDTO.getWorkSchedules())).collect(Collectors.toMap(WorkSchedulingDTO::getUserId, workSchedulingDTO -> workSchedulingDTO.getWorkSchedules().get(0)));
        }
        // 补充数据
        Map<Long, Boolean> finalWorkMap = workMap;
        userDTOS.forEach(userDTO -> {
            DriverVO driverVO = appendDriverInfo(userDTO, driverVOMap, truckVOMap, finalWorkMap);
            driverVOList.add(driverVO);
        });
        return PageResponse.of(driverVOList, page, pageSize, pages, total);
    }

    /**
     * 用户转换司机
     *
     * @param user 用户VO
     * @return 司机VO
     */
    private DriverVO parseUser2DriverVO(SysUserVO user) {
        DriverVO vo = BeanUtil.toBean(user, DriverVO.class);
        TruckDriverDto driverDto = driverFeign.findOneDriver(user.getUserId());
        if (ObjectUtil.isNotEmpty(driverDto)) {
            BeanUtil.copyProperties(driverDto, vo);
        }
        return vo;
    }


    /**
     * 补充司机其他信息
     *
     * @param userDTO     用户信息
     * @param driverVOMap 司机数据
     * @param truckVOMap  车辆信息
     * @param workMap     排班信息
     * @return 组合数据
     */
    private DriverVO appendDriverInfo(UserDTO userDTO, Map<Long, TruckDriverDto> driverVOMap, Map<Long, TruckVO> truckVOMap, Map<Long, Boolean> workMap) {
        // 用户信息
        DriverVO driverVO = BeanUtil.toBean(authService.parseUser2Vo(userDTO), DriverVO.class);

        TruckDriverDto driverDto = driverVOMap.get(userDTO.getId());
        if (ObjectUtil.isNotEmpty(driverDto)) {
            try {
                // 司机信息
                BeanUtil.copyProperties(driverDto, driverVO);

                // 车辆信息
                if (!ObjectUtil.isEmpty(driverDto.getTruckId())) {
                    TruckVO truckById = truckVOMap.get(driverDto.getTruckId());
                    driverVO.setTruck(truckById);
                }
            } catch (Exception ignored) {
                log.info(ignored + "");
            }
        }

        // 上班状态
        Boolean aBoolean = workMap.get(userDTO.getId());
        if (ObjectUtil.isNotEmpty(aBoolean)) {
            driverVO.setWorkStatus(aBoolean ? 1 : 0);
        }
        return driverVO;
    }

    /**
     * 司机详情
     *
     * @param id 司机ID
     * @return 司机
     */
    @Override
    public DriverVO findDriverById(Long id) {
        SysUserVO user = authService.user(id);
        return parseUser2DriverVO(user);
    }

    /**
     * 保存司机
     *
     * @param id 司机ID
     * @param vo 司机信息
     */
    @Override
    public void saveDriver(Long id, DriverUpdateVO vo) {
        TruckDriverDto driverDto = driverFeign.findOneDriver(id);
        if (driverDto == null) {
            driverDto = new TruckDriverDto();
        }
        driverDto.setUserId(id);
        driverDto.setAge(vo.getAge());
        driverFeign.saveDriver(driverDto);
    }

    /**
     * 批量转换车辆DTO
     *
     * @return 车辆VO集合
     */
    private List<TruckVO> batchParseTruckDto2Vo(List<TruckDto> truckDtoList) {
        if (CollUtil.isEmpty(truckDtoList)) {
            return new ArrayList<>();
        }
        return truckDtoList.stream().map(dto -> BeanUtil.toBean(dto, TruckVO.class)).collect(Collectors.toList());
    }

    /**
     * 保存驾驶证
     *
     * @param vo 驾驶证信息
     */
    @Override
    public void saveDriverLicense(DriverLicenseVO vo) {
        TruckDriverLicenseDto dto = BeanUtil.toBean(vo, TruckDriverLicenseDto.class);
        if (StringUtils.isNotEmpty(vo.getInitialCertificateDate())) {
            dto.setInitialCertificateDate(LocalDate.parse(vo.getInitialCertificateDate(), DateTimeFormatter.ISO_LOCAL_DATE));
        }
        driverFeign.saveDriverLicense(dto);
        BeanUtil.copyProperties(dto, vo);
    }

    /**
     * 驾驶证详情
     *
     * @param id 司机id
     * @return 驾驶证信息
     */
    @Override
    public DriverLicenseVO findDriverLicenseById(Long id) {
        TruckDriverLicenseDto dto = driverFeign.findOneDriverLicense(id);
        DriverLicenseVO vo = new DriverLicenseVO();
        if (ObjectUtil.isNotEmpty(dto)) {
            BeanUtil.copyProperties(dto, vo);
            if (ObjectUtil.isNotEmpty(dto.getInitialCertificateDate())) {
                vo.setInitialCertificateDate(dto.getInitialCertificateDate().format(DateTimeFormatter.ISO_LOCAL_DATE));
            }
        }
        if (ObjectUtil.isEmpty(vo.getUserId())) {
            vo.setUserId(id);
        }
        return vo;
    }

    /**
     * 新增司机安排车辆 【司机：车辆 = n:1】
     * 调整司机安排车辆
     * 删除司机安排车辆
     * base服务会统一判断原有绑定关系是否能够删除
     *
     * @param bindingDriversVO 绑定关系
     */
    @Override
    @GlobalTransactional
    public void bindingTrucks(BindingDriversVO bindingDriversVO) {

        if (CollUtil.isEmpty(bindingDriversVO.getDriverIds())) {
            throw new SLWebException("配置失败，司机列表为空");
        }

        // 车辆为空则解除这个司机的车辆
        if (ObjectUtil.isEmpty(bindingDriversVO.getTruckId())) {
            bindingDriversVO.setTruckId(0L);
        }

        // 前置校验
        checkBingDriverVO(bindingDriversVO);

        // 循环绑定
        bindingDriversVO.getDriverIds().forEach(driverId -> {
            TruckDriverDto driverDto = driverFeign.findOneDriver(driverId);
            if (driverDto == null) {
                driverDto = new TruckDriverDto();
            }
            driverDto.setUserId(driverId);

            driverDto.setTruckId(bindingDriversVO.getTruckId());
            driverFeign.saveDriver(driverDto);
        });
    }

    /**
     * 绑定前置校验
     *
     * @param bindingDriversVO 绑定的司机信息
     */
    private void checkBingDriverVO(BindingDriversVO bindingDriversVO) {
        // 绑定前置校验
        TruckVO truckSimple = findTruckSimple(bindingDriversVO.getTruckId());
        if (ObjectUtil.isEmpty(truckSimple) || ObjectUtil.isEmpty(truckSimple.getTruckLicenseId())) {
            throw new SLWebException("配置失败，请先完善车辆信息");
        }
        TruckLicenseDto truckLicenseDto = truckLicenseFeign.fineById(truckSimple.getTruckLicenseId());
        if (ObjectUtil.isEmpty(truckLicenseDto) || ObjectUtil.isEmpty(truckLicenseDto.getPicture())) {
            throw new SLWebException("配置失败，请上传行驶证照片");
        }

        // 司机
        if (CollUtil.isNotEmpty(bindingDriversVO.getDriverIds())) {
            // 最多2个
            if (bindingDriversVO.getDriverIds().size() > 2) {
                throw new SLWebException("配置失败，最多绑定俩个司机");
            }
            bindingDriversVO.getDriverIds().forEach(driverId -> {
                // 司机信息完善
                TruckDriverDto oneDriver = driverFeign.findOneDriver(driverId);
                if (ObjectUtil.isEmpty(oneDriver)) {
                    throw new SLWebException("配置失败，请先完善司机信息");
                }
                TruckDriverLicenseDto oneDriverLicense = driverFeign.findOneDriverLicense(driverId);
                if (ObjectUtil.isEmpty(oneDriverLicense) || ObjectUtil.isEmpty(oneDriverLicense.getPicture())) {
                    throw new SLWebException("配置失败，请上传驾驶证照片");
                }
            });

        }

    }

    /**
     * 保存车辆
     *
     * @param vo 车辆
     */
    @Override
    public void saveTruck(TruckVO vo) {
        TruckDto dto = BeanUtil.toBean(vo, TruckDto.class);
        dto.setId(null);
        try {
            truckFeign.saveTruck(dto);
        } catch (Exception e) {
            throw new SLWebException("新增失败");
        }
    }

    /**
     * 更新车辆
     *
     * @param id 车辆ID
     * @param vo 车辆
     */
    @Override
    public void updateTruck(Long id, TruckVO vo) {
        vo.setId(id);
        TruckDto truckDto = BeanUtil.toBean(vo, TruckDto.class);
        try {
            truckFeign.update(id, truckDto);
        } catch (Exception e) {
            throw new SLWebException("更新失败");
        }

    }

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
    @Override
    public PageResponse<TruckVO> findTruckByPage(Integer page,
                                                 Integer pageSize,
                                                 Long truckTypeId,
                                                 Integer status,
                                                 String licensePlate) {
        PageResponse<TruckDto> truckDtoPage = truckFeign.findByPage(page, pageSize, truckTypeId, status, licensePlate);
        log.info("truckDtoPage:{}", truckDtoPage);
        //加工数据
        return PageResponse.of(truckDtoPage, TruckVO.class);
    }

    /**
     * 车辆简要信息
     *
     * @param id 车辆ID
     * @return 车辆简要信息
     */
    @Override
    public TruckVO findTruckSimple(Long id) {
        TruckDto dto = truckFeign.fineById(id);
        return BeanUtil.toBean(dto, TruckVO.class);
    }

    /**
     * 车辆详情
     *
     * @param id 车辆ID
     * @return 车辆详情
     */
    @Override
    public TruckVO findTruckDetail(Long id) {
        TruckDto dto = truckFeign.fineById(id);
        return parseTruckDto2Vo(dto);
    }

    /**
     * 转换车辆
     *
     * @param dto 车辆DTO
     * @return 车辆VO
     */
    private TruckVO parseTruckDto2Vo(TruckDto dto) {
        TruckVO truckVo = BeanUtil.toBean(dto, TruckVO.class);
        if (ObjectUtil.isNotEmpty(dto.getTruckTypeId())) {
            TruckTypeVO truckTypeVo = baseCommonService.findTruckTypeById(dto.getTruckTypeId());
            truckVo.setTruckTypeName(truckTypeVo.getName());
        }
        List<DriverVO> driverVOS = bindingTrucks(dto.getId());
        truckVo.setDriverNum(driverVOS.size());
        String names = driverVOS.stream().map(DriverVO::getName).collect(Collectors.joining(","));
        truckVo.setDriverName(names);

        List<TransportTripsTruckDriverDto> allTruckDriverTransportTrips = tripsFeign.findAllTruckDriverTransportTrips(null, dto.getId(), null);
        if (CollUtil.isEmpty(allTruckDriverTransportTrips)) {
            return truckVo;
        }
        List<Long> tripsIds = allTruckDriverTransportTrips.stream().map(TransportTripsTruckDriverDto::getTransportTripsId).distinct().collect(Collectors.toList());
        List<TruckTripsDto> truckTripsDtos = tripsFeign.findAll(null, tripsIds);
        if (CollUtil.isEmpty(truckTripsDtos)) {
            return truckVo;
        }
        List<TransportLineVO> transportLineByIds = transportService.findTransportLineByIds(truckTripsDtos.stream().map(TruckTripsDto::getTransportLineId).distinct().collect(Collectors.toList()));
        if (CollUtil.isEmpty(transportLineByIds)) {
            return truckVo;
        }
        String lineNames = transportLineByIds.stream().map(TransportLineVO::getName).collect(Collectors.joining(","));
        truckVo.setTransportLineName(lineNames);
        return truckVo;
    }

    /**
     * 统计车辆
     *
     * @return 各状态个数
     */
    @Override
    public Map<Integer, Long> countTruck() {
        return truckFeign.count();
    }

    /**
     * 禁用车辆
     *
     * @param id 车辆ID
     */
    @Override
    public void disableTruck(Long id) {
        // 未完成运输任务存在 不能解除
        Long count = transportTaskFeign.countByTruckId(id);
        if (count > 0) {
            throw new SLWebException("存在未完成运输任务 不能解除");
        }
        truckFeign.disable(id);
    }

    /**
     * 启用车辆
     *
     * @param id 车辆ID
     */
    @Override
    public void enableTruck(Long id) {
        truckFeign.enable(id);
    }

    /**
     * 删除车辆
     *
     * @param id 车辆ID
     */
    @Override
    public void delTruck(Long id) {
        List<DriverVO> driverVOS = bindingTrucks(id);
        if (CollUtil.isNotEmpty(driverVOS)) {
            throw new SLWebException("请先解除车辆下的司机");
        }
        truckFeign.del(id);
    }

    /**
     * 保存行驶证
     *
     * @param id 车辆ID
     * @param vo 行驶证信息
     */
    @Override
    public void saveTruckLicense(Long id, TruckLicenseVO vo) {
        TruckLicenseDto dto = BeanUtil.toBean(vo, TruckLicenseDto.class);
        dto.setTruckId(id);
        TruckVO truckById = findTruckSimple(id);
        dto.setId(truckById.getTruckLicenseId());
        //加工数据
        if (StringUtils.isNotEmpty(vo.getExpirationDate())) {
            dto.setExpirationDate(LocalDate.parse(vo.getExpirationDate(), DateTimeFormatter.ISO_LOCAL_DATE));
        }
        if (StringUtils.isNotEmpty(vo.getMandatoryScrap())) {
            dto.setMandatoryScrap(LocalDate.parse(vo.getMandatoryScrap(), DateTimeFormatter.ISO_LOCAL_DATE));
        }
        if (StringUtils.isNotEmpty(vo.getRegistrationDate())) {
            dto.setRegistrationDate(LocalDate.parse(vo.getRegistrationDate(), DateTimeFormatter.ISO_LOCAL_DATE));
        }
        if (StringUtils.isNotEmpty(vo.getValidityPeriod())) {
            dto.setValidityPeriod(LocalDate.parse(vo.getValidityPeriod(), DateTimeFormatter.ISO_LOCAL_DATE));
        }
        TruckLicenseDto resultDto = truckLicenseFeign.saveTruckLicense(dto);
        BeanUtil.copyProperties(resultDto, vo);
    }

    /**
     * 获取行驶证
     *
     * @param id 车辆ID
     * @return 行驶证
     */
    @Override
    public TruckLicenseVO findTruckLicenseById(Long id) {
        TruckVO truckById = findTruckSimple(id);
        TruckLicenseDto truckLicenseDto = null;
        if (ObjectUtil.isNotEmpty(truckById.getTruckLicenseId())) {
            truckLicenseDto = truckLicenseFeign.fineById(truckById.getTruckLicenseId());
        }
        TruckLicenseVO vo = new TruckLicenseVO();
        if (ObjectUtil.isNotEmpty(truckLicenseDto)) {
            BeanUtil.copyProperties(truckLicenseDto, vo);
            if (ObjectUtil.isNotEmpty(truckLicenseDto.getRegistrationDate())) {
                vo.setRegistrationDate(truckLicenseDto.getRegistrationDate().format(DateTimeFormatter.ISO_LOCAL_DATE));
            }
            if (ObjectUtil.isNotEmpty(truckLicenseDto.getExpirationDate())) {
                vo.setExpirationDate(truckLicenseDto.getExpirationDate().format(DateTimeFormatter.ISO_LOCAL_DATE));
            }
            if (ObjectUtil.isNotEmpty(truckLicenseDto.getMandatoryScrap())) {
                vo.setMandatoryScrap(truckLicenseDto.getMandatoryScrap().format(DateTimeFormatter.ISO_LOCAL_DATE));
            }
            if (ObjectUtil.isNotEmpty(truckLicenseDto.getValidityPeriod())) {
                vo.setValidityPeriod(truckLicenseDto.getValidityPeriod().format(DateTimeFormatter.ISO_LOCAL_DATE));
            }
        }
        return vo;
    }

    /**
     * 获取车辆车次信息
     *
     * @param truckId 车辆ID
     * @return 车次信息
     */
    @Override
    public List<TruckDriverTripsVO> findTruckTrips(Long truckId) {
        List<TruckDriverTripsVO> voList = new ArrayList<>();
        // 车次列表
        tripsFeign.findAllTruckDriverTransportTrips(null, truckId, null).forEach(transportTripsTruckDriverDto -> {
            TruckDriverTripsVO vo = new TruckDriverTripsVO();
            TransportTripsVO transportLineTripsById = findTripsSimple(transportTripsTruckDriverDto.getTransportTripsId());
            if (ObjectUtil.isNotEmpty(transportLineTripsById)) {
                vo.setTransportTrips(transportLineTripsById);
                TransportLineVO lineById = transportService.findTransportLineById(transportLineTripsById.getTransportLine().getId());
                vo.setTransportLine(lineById);
            }
            voList.add(vo);
        });
        return voList;
    }

    /**
     * 获取map类型车辆数据集合
     *
     * @param truckSet 车辆id列表
     * @return 执行结果
     */
    @Override
    public Map<Long, TruckVO> truckMap(Set<Long> truckSet) {

        List<TruckDto> truckDtoList = truckFeign.findAll(new ArrayList<>(truckSet));
        return truckDtoList.stream()
                .map(dto -> BeanUtil.toBean(dto, TruckVO.class))
                .collect(Collectors.toMap(TruckVO::getId, vo -> vo));

    }

    /**
     * 车次模型转换
     *
     * @param dto 车次DTO
     * @return 车次VO
     */
    private TransportTripsVO parseTransportTripsDto2Vo(TruckTripsDto dto) {
        TransportTripsVO vo = BeanUtil.toBean(dto, TransportTripsVO.class);
        // 增加到达时间
        vo.setArriveTime((vo.getDepartureTime() + vo.getEstimatedTime()) % 1440);
        vo.setPeriodName(TruckConstant.TransportTripsPeriod.getEnumByPeriod(dto.getPeriod()) == null ? null : TruckConstant.TransportTripsPeriod.getEnumByPeriod(dto.getPeriod()).getName());
        //加工数据
        if (ObjectUtil.isNotEmpty(dto.getTransportLineId())) {
            TransportLineVO lineById = transportService.findTransportLineById(dto.getTransportLineId());
            vo.setTransportLine(lineById);

        }
        Set<Long> userSet = new HashSet<>();
        Set<Long> truckSet = new HashSet<>();
        List<TransportTripsTruckDriverDto> transportTripsTruckDriverDtoList = tripsFeign.findAllTruckDriverTransportTrips(dto.getId(), null, null);
        if (CollUtil.isEmpty(transportTripsTruckDriverDtoList)) {
            return vo;
        }

        transportTripsTruckDriverDtoList.forEach(transportTripsTruckDriverDto -> {
            if (ObjectUtil.isNotEmpty(transportTripsTruckDriverDto.getTruckId())) {
                truckSet.add(transportTripsTruckDriverDto.getTruckId());
            }
            if (ObjectUtil.isNotEmpty(transportTripsTruckDriverDto.getDriverId())) {
                userSet.add(transportTripsTruckDriverDto.getDriverId());
            }
        });
        Map<Long, TruckVO> truckDtoMap = truckMap(truckSet);
        Map<Long, DriverVO> driverVOMap = driverMap(userSet);

        List<TruckDriverVO> truckDriverVOList = new ArrayList<>();

        for (TransportTripsTruckDriverDto transportTripsTruckDriverDto : transportTripsTruckDriverDtoList) {
            TruckDriverVO truckDriverVo = new TruckDriverVO();
            truckDriverVo.setTruck(truckDtoMap.get(transportTripsTruckDriverDto.getTruckId()));
            if (ObjectUtil.isNotEmpty(transportTripsTruckDriverDto.getDriverId())) {
                truckDriverVo.setDriver(driverVOMap.get(transportTripsTruckDriverDto.getDriverId()));
            }
            if (ObjectUtil.isNotEmpty(truckDriverVo.getTruck()) || ObjectUtil.isNotEmpty(truckDriverVo.getDriver())) {
                truckDriverVOList.add(truckDriverVo);
            }
        }

        vo.setTruckDrivers(truckDriverVOList);

        return vo;
    }

    /**
     * 车次模型转换
     *
     * @param truckTripsDtoList 车次DTO
     * @return 车次VO
     */
    private List<TransportTripsVO> parseTransportTripsDto2Vo(List<TruckTripsDto> truckTripsDtoList) {
        return truckTripsDtoList.stream().map(this::parseTransportTripsDto2Vo).collect(Collectors.toList());
    }

    /**
     * 绑定司机列表
     *
     * @param truckId 车辆ID
     * @return 司机列表
     */
    @Override
    public List<DriverVO> bindingTrucks(Long truckId) {
        List<TruckDriverDto> byTruckId = driverFeign.findByTruckId(truckId);
        List<Long> driverIds = byTruckId.parallelStream().map(TruckDriverDto::getUserId).collect(Collectors.toList());
        Map<Long, SysUserVO> sysUserVOMap = authService.users(driverIds).parallelStream().collect(Collectors.toMap(SysUserVO::getUserId, v -> v));
        return batchParseTruckDriverDto2Vo(byTruckId, sysUserVOMap);
    }

    /**
     * 未绑定车辆的司机列表
     *
     * @return 司机列表
     */
    @Override
    public List<DriverVO> unBindingDrivers() {
        List<TruckDriverDto> truckDriverDtos = driverFeign.findAll(null).stream().filter(v -> ObjectUtil.isEmpty(v.getTruckId()) || ObjectUtil.equal(v.getTruckId(), 0L)).collect(Collectors.toList());
        List<Long> driverIds = truckDriverDtos.parallelStream().map(TruckDriverDto::getUserId).collect(Collectors.toList());
        Map<Long, SysUserVO> sysUserVOMap = authService.users(driverIds).parallelStream().collect(Collectors.toMap(SysUserVO::getUserId, v -> v));

        return batchParseTruckDriverDto2Vo(truckDriverDtos, sysUserVOMap).parallelStream()
                .filter(driverVO -> ObjectUtil.isNotEmpty(driverVO) && ObjectUtil.isNotEmpty(driverVO.getName())).collect(Collectors.toList());
    }

    /**
     * 新增车次
     *
     * @param vo 车次信息
     */
    @Override
    public void saveTrips(TransportTripsUpdateVO vo) {
        TruckTripsDto dto = BeanUtil.toBean(vo, TruckTripsDto.class);
        //加工数据
        dto.setId(null);
        TruckTripsDto resultDto = tripsFeign.save(dto);
        BeanUtil.copyProperties(resultDto, vo);
    }

    /**
     * 更新车次
     *
     * @param id 车次ID
     * @param vo 车次信息
     */
    @Override
    public void updateTrips(Long id, TransportTripsUpdateVO vo) {
        vo.setId(id);
        TruckTripsDto dto = BeanUtil.toBean(vo, TruckTripsDto.class);
        TruckTripsDto resultDto = tripsFeign.update(id, dto);
        BeanUtil.copyProperties(resultDto, vo);
    }

    /**
     * 根据线路ID获取车次
     *
     * @param transportLineId 线路ID
     * @return 车次列表
     */
    @Override
    public List<TransportTripsVO> findAllTrips(Long transportLineId) {
        List<TruckTripsDto> truckTripsDtoList = tripsFeign.findAll(transportLineId, null);
        if (CollUtil.isEmpty(truckTripsDtoList)) {
            return Collections.emptyList();
        }
        return parseTransportTripsDto2Vo(truckTripsDtoList);
    }

    /**
     * 根据车次ID获取车次简要信息
     *
     * @param id 车次ID
     * @return 车次信息
     */
    @Override
    public TransportTripsVO findTripsSimple(Long id) {
        TruckTripsDto dto = tripsFeign.fineById(id);
        TransportTripsVO vo = BeanUtil.toBean(dto, TransportTripsVO.class);
        if (ObjectUtil.isNotEmpty(dto.getTransportLineId())) {
            TransportLineVO lineById = transportService.findTransportLineById(dto.getTransportLineId());
            vo.setTransportLine(lineById);
        }
        return vo;
    }

    /**
     * 根据车次ID获取车次
     *
     * @param id 车次ID
     * @return 车次信息
     */
    @Override
    public TransportTripsVO findTripsDetail(Long id) {
        TruckTripsDto dto = tripsFeign.fineById(id);
        return parseTransportTripsDto2Vo(dto);
    }

    /**
     * 删除车次
     * base服务会统一判断原有绑定关系是否能够删除
     *
     * @param id 车次ID
     */
    @Override
    public void deleteTransportLineTrips(Long id) {
        tripsFeign.disable(id);
    }

    /**
     * 新增车次-安排车辆 不涉及司机的安排 司机会根据【司机车辆绑定关系】和排班情况调度决定
     * 修改车次-安排车辆
     * 解除车次安排 车辆ID列表为空 标识解除所有车次绑定关系
     *
     * @param id              车次ID
     * @param bindingTrucksVO 车次车辆绑定关系
     */
    @Override
    public void bindingTrucks(Long id, BindingTrucksVO bindingTrucksVO) {
        List<TransportTripsTruckDriverDto> transportTripsTruckDriverDtos = new ArrayList<>();
        if (CollUtil.isNotEmpty(bindingTrucksVO.getTruckIds())) {
            //保存车辆安排信息
            transportTripsTruckDriverDtos = bindingTrucksVO.getTruckIds().stream().map(truckId -> {
                TransportTripsTruckDriverDto dto = new TransportTripsTruckDriverDto();
                dto.setTruckId(truckId);
                dto.setTransportTripsId(id);
                return dto;
            }).collect(Collectors.toList());
        }

        tripsFeign.batchSaveTruckDriver(id, transportTripsTruckDriverDtos);
    }

    /**
     * 获取车次-车辆绑定关系
     *
     * @param transportTripsId 车次ID
     * @return 车次-车辆绑定关系
     */
    @Override
    public List<TruckVO> getTransportTripsTruck(Long transportTripsId) {
        List<TransportTripsTruckDriverDto> allTruckDriverTransportTrips = tripsFeign.findAllTruckDriverTransportTrips(transportTripsId, null, null);
        if (CollUtil.isEmpty(allTruckDriverTransportTrips)) {
            return new ArrayList<>();
        }
        Set<Long> set = allTruckDriverTransportTrips.stream().map(TransportTripsTruckDriverDto::getTruckId).collect(Collectors.toSet());
        if (CollUtil.isEmpty(set)) {
            return new ArrayList<>();
        }
        return batchParseTruckDto2Vo(truckFeign.findAll(new ArrayList<>(set)));
    }

    /**
     * 获取已经启用的车辆
     * 包含反向线路下的车辆和未分配的车辆
     *
     * @return 车辆
     */
    @Override
    public List<TruckVO> workingTrucks(Long startAgentId, Long endAgentId) {
        List<TransportTripsTruckDriverDto> allTruckDriverTransportTrips = tripsFeign.findAllTruckDriverTransportTrips(null, null, null);
        Set<Long> truckSet = allTruckDriverTransportTrips.parallelStream().map(TransportTripsTruckDriverDto::getTruckId).collect(Collectors.toSet());

        // 增加反向车辆id
        Set<Long> backLineTruckSet = new HashSet<>();
        // 根据开始结束机构id查询反向线路id
        TransportLineSearchDTO transportLineSearchDTO = new TransportLineSearchDTO();
        transportLineSearchDTO.setStartOrganId(endAgentId);
        transportLineSearchDTO.setEndOrganId(startAgentId);
        PageResponse<TransportLineDTO> transportLineDTOPageResponse = transportLineFeign.queryPageList(transportLineSearchDTO);
        List<Long> lineIds = transportLineDTOPageResponse.getItems().stream().map(TransportLineDTO::getId).collect(Collectors.toList());

        // 应该只能查询到1条线路 多了 少了 都不是正常情况
        if (lineIds.size() == 1) {

            // 根据反向线路id查询车次id
            List<TruckTripsDto> all = tripsFeign.findAll(lineIds.get(0), null);
            Set<Long> backLineTripIds = all.parallelStream().map(TruckTripsDto::getId).collect(Collectors.toSet());

            // 从所有已经绑定车次中过滤出反向的车次下的线路id
            backLineTruckSet = allTruckDriverTransportTrips.parallelStream()
                    .filter(v -> backLineTripIds.contains(v.getTransportTripsId()))
                    .map(TransportTripsTruckDriverDto::getTruckId).collect(Collectors.toSet());
        }

        // 从已经绑定的车辆中移除反向线路下的车辆v
        truckSet.removeAll(backLineTruckSet);

        // 过滤掉除反向线路下车辆id以外的已经绑定的车辆id
        List<TruckDto> truckDtos = truckFeign.findAll(null).stream().filter(
                        v -> ObjectUtil.isNotEmpty(v.getWorkStatus())
                                && ObjectUtil.equal(v.getWorkStatus(), TruckWorkStatusEnum.WORKING.getCode())
                                && !truckSet.contains(v.getId()))
                .collect(Collectors.toList());

        return batchParseTruckDto2Vo(truckDtos);
    }

    /**
     * 新增车辆绑定司机 【司机：车辆 = n:1】
     * 调整车辆绑定司机
     * 解除车辆绑定司机
     * 保证事务性
     * base服务会统一判断原有绑定关系是否能够删除
     *
     * @param bindingDriversVO 绑定关系
     */
    @GlobalTransactional
    @Override
    public void bindingDrivers(BindingDriversVO bindingDriversVO) {

        // 车辆为空
        if (ObjectUtil.isEmpty(bindingDriversVO.getTruckId())) {
            throw new SLWebException("配置失败，车辆为空");
        }

        // 前置校验
        checkBingDriverVO(bindingDriversVO);

        // 解除原有绑定关系
        List<DriverVO> driverVOS = bindingTrucks(bindingDriversVO.getTruckId());
        driverVOS.forEach(driverVO -> {
            TruckDriverDto truckDriverDto = BeanUtil.toBean(driverVO, TruckDriverDto.class);
            truckDriverDto.setTruckId(0L);
            driverFeign.saveDriver(truckDriverDto);
        });

        // 循环绑定
        bindingDriversVO.getDriverIds().forEach(driverId -> {
            TruckDriverDto driverDto = driverFeign.findOneDriver(driverId);
            if (driverDto == null) {
                driverDto = new TruckDriverDto();
            }
            driverDto.setUserId(driverId);

            driverDto.setTruckId(bindingDriversVO.getTruckId());
            driverFeign.saveDriver(driverDto);
        });
    }

    /**
     * 获取已经停用的车辆
     * 没有绑定2个司机的车辆
     *
     * @return 车辆
     */
    @Override
    public List<TruckVO> unWorkingTrucks() {
        List<TruckDto> truckDtos = truckFeign.findAll(null).stream().filter(
                        v -> ObjectUtil.isNotEmpty(v.getWorkStatus())
                                && ObjectUtil.equal(v.getWorkStatus(), TruckWorkStatusEnum.STOP.getCode())
                                && v.getDriverNum() < 2
                )
                .collect(Collectors.toList());
        return batchParseTruckDto2Vo(truckDtos);
    }
}
