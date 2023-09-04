package com.sl.ms.web.driver.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import com.itheima.auth.sdk.AuthTemplate;
import com.itheima.auth.sdk.common.Result;
import com.itheima.auth.sdk.dto.PageDTO;
import com.itheima.auth.sdk.dto.UserDTO;
import com.itheima.auth.sdk.dto.UserPageDTO;
import com.sl.ms.base.api.truck.TruckFeign;
import com.sl.ms.base.domain.truck.TruckDto;
import com.sl.ms.driver.api.DriverJobFeign;
import com.sl.ms.driver.domain.dto.request.*;
import com.sl.ms.driver.domain.dto.response.DriverJobDTO;
import com.sl.ms.driver.domain.enums.DriverJobStatus;
import com.sl.ms.transport.api.OrganFeign;
import com.sl.ms.web.driver.service.TaskService;
import com.sl.ms.web.driver.vo.AreaVO;
import com.sl.ms.web.driver.vo.request.DriverDelayDeliveryVO;
import com.sl.ms.web.driver.vo.request.DriverDeliverVO;
import com.sl.ms.web.driver.vo.request.DriverPickUpVO;
import com.sl.ms.web.driver.vo.request.DriverReturnRegisterVO;
import com.sl.ms.web.driver.vo.response.DriverJobDetailVO;
import com.sl.ms.web.driver.vo.response.DriverJobVO;
import com.sl.ms.web.driver.vo.response.TransportOrderVO;
import com.sl.ms.work.api.TransportOrderFeign;
import com.sl.ms.work.api.TransportTaskFeign;
import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.ms.work.domain.dto.TransportTaskDTO;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.util.AuthTemplateThreadLocal;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.util.UserThreadLocal;
import com.sl.transport.domain.OrganDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {
    @Resource
    private DriverJobFeign driverJobFeign;
    @Resource
    private OrganFeign organFeign;
    @Resource
    private TransportOrderFeign transportOrderFeign;
    @Resource
    private TransportTaskFeign transportTaskFeign;
    @Resource
    private TruckFeign truckFeign;
    @Value("${role.dispatcher}")
    private String dispatcherRoleId;

    /**
     * 入参为2，前端tab的在途任务列表，对应数据库死记作业单状态为：在途和已交付
     */
    private static final Integer PROCESSING_STATUS_TAB = 2;

    /**
     * 分页查询任务列表
     *
     * @param page            页码
     * @param pageSize        页面大小
     * @param status          作业状态，1为待提货、2为（在途和已交付）、3为改派、4为已交付）、5为已作废、6为已完成（已回车登记）
     * @param startTime       开始时间
     * @param endTime         结束时间
     * @param transportTaskId 运输任务id
     * @return 分页数据
     */
    @Override
    public PageResponse<DriverJobVO> pageQuery(Integer page, Integer pageSize, Integer status, String startTime, String endTime, String transportTaskId) {
        //当前司机id
        Long userId = UserThreadLocal.getUserId();
        //开始时间，可以传null。标准入参格式：2022-07-13，此处转换为：2022-07-13 00:00:00
        LocalDateTime taskStartTime = LocalDateTimeUtil.parse(startTime, DatePattern.NORM_DATE_PATTERN);
        //结束时间，同开始时间格式
        LocalDateTime taskEndTime = CharSequenceUtil.isBlank(endTime) ? null : LocalDateTimeUtil.endOfDay(LocalDateTimeUtil.parse(endTime, DatePattern.NORM_DATE_PATTERN));

        //状态为2需要查询在途和已交付两种状态
        List<DriverJobStatus> statusList = new ArrayList<>();
        if (status.equals(PROCESSING_STATUS_TAB)) {
            statusList.add(DriverJobStatus.PROCESSING);
            statusList.add(DriverJobStatus.DELIVERED);
        } else {
            statusList.add(DriverJobStatus.codeOf(status));
        }

        //构造查询条件
        DriverJobPageQueryDTO driverJobPageQueryDTO = DriverJobPageQueryDTO.builder()
                .page(page)
                .pageSize(pageSize)
                .statusList(statusList)
                .driverId(userId)
                .minTaskTime(taskStartTime)
                .maxTaskTime(taskEndTime)
                .transportTaskId(CharSequenceUtil.isBlank(transportTaskId) ? null : Long.valueOf(transportTaskId))
                .build();

        //条件分页查询
        PageResponse<DriverJobDTO> pageResponse = driverJobFeign.pageQuery(driverJobPageQueryDTO);
        if (ObjectUtil.isEmpty(pageResponse.getItems())) {
            return PageResponse.of(pageResponse, DriverJobVO.class);
        }

        //批量查询出分页结果中涉及的起止机构信息
        List<Long> agencyIds = new ArrayList<>();
        pageResponse.getItems().forEach(dto -> {
            agencyIds.add(dto.getStartAgencyId());
            agencyIds.add(dto.getEndAgencyId());
        });
        List<OrganDTO> organDTOS = organFeign.queryByIds(agencyIds);
        Map<Long, OrganDTO> organMap = organDTOS.stream().collect(Collectors.toMap(OrganDTO::getId, dto -> dto));

        //dto转换为vo(组装起止机构详细地址)
        return PageResponse.of(pageResponse, DriverJobVO.class, (dto, vo) -> {
            //通过机构id获取详细地址
            String startAddress = parse2AreaVO(dto.getStartAgencyId(), organMap);
            String endAddress = parse2AreaVO(dto.getEndAgencyId(), organMap);

            vo.setStartAddress(startAddress);
            vo.setEndAddress(endAddress);
        });
    }

    /**
     * 通过机构id获取详细地址
     *
     * @param agencyId 机构id
     * @return 机构地址
     */
    private String parse2AreaVO(Long agencyId, Map<Long, OrganDTO> organMap) {
        OrganDTO organDTO = organMap.get(agencyId);
        AreaVO areaVO = JSONUtil.toBean(organDTO.getAddress(), AreaVO.class);
        return CharSequenceUtil.strBuilder(areaVO.getProvince().getName(), areaVO.getCity().getName(), areaVO.getCounty().getName(), areaVO.getAddress()).toString();
    }

    /**
     * 获取任务详情
     *
     * @param jobId 作业id
     * @return 任务详情
     */
    @Override
    public DriverJobDetailVO details(String jobId) {
        //司机作业单相关
        DriverJobDTO driverJobDTO = driverJobFeign.findById(Long.valueOf(jobId));
        DriverJobDetailVO driverJobDetailVO = BeanUtil.toBean(driverJobDTO, DriverJobDetailVO.class);

        //异步任务编排：
        //任务1：获取起止机构信息-->起始机构数据提取、目的机构数据提取
        //任务2：获取运输任务信息-->提取提货交货图片、获取车辆相关信息
        //任务3：关联运输任务的司机
        //3项任务全部完成，返回结果

        //任务1：获取起止机构信息
        CompletableFuture<List<OrganDTO>> organFuture =
                CompletableFuture.supplyAsync(() -> organFeign.queryByIds(List.of(driverJobDTO.getStartAgencyId(), driverJobDTO.getEndAgencyId())));

        //任务1.1：起始机构数据提取
        CompletableFuture<Void> startOrganFuture =
                organFuture.thenAcceptAsync(organDTOS -> assembleStartOrgan(driverJobDTO.getStartAgencyId(), driverJobDetailVO, organDTOS));

        //任务1.2：目的机构数据提取
        CompletableFuture<Void> endOrganFuture =
                organFuture.thenAccept(organDTOS -> assembleEndOrgan(driverJobDTO.getEndAgencyId(), driverJobDetailVO, organDTOS));

        //任务2：获取运输任务信息
        CompletableFuture<TransportTaskDTO> transportTaskFuture =
                CompletableFuture.supplyAsync(() -> transportTaskFeign.findById(driverJobDTO.getTransportTaskId()));

        //任务2.1：提取提货交货图片
        CompletableFuture<Void> pictureFuture =
                transportTaskFuture.thenAcceptAsync(transportTaskDTO -> assemblePicture(driverJobDetailVO, transportTaskDTO));

        //任务2.2：获取车辆相关信息
        CompletableFuture<Void> truckFuture = transportTaskFuture.thenAcceptAsync(transportTaskDTO -> {
            //车辆相关
            TruckDto truckDto = truckFeign.fineById(transportTaskDTO.getTruckId());
            driverJobDetailVO.setLicensePlate(truckDto.getLicensePlate());
        });

        //任务3：关联运输任务的司机
        AuthTemplate authTemplate = AuthTemplateThreadLocal.get();
        CompletableFuture<Void> driverNameFuture =
                CompletableFuture.runAsync(() -> assembleDriverName(driverJobDTO.getTransportTaskId(), driverJobDetailVO, authTemplate));

        //等待所有任务完成
        CompletableFuture.allOf(startOrganFuture, endOrganFuture, pictureFuture, truckFuture, driverNameFuture).join();
        return driverJobDetailVO;
    }

    /**
     * 运输任务的司机信息封装到司机作业单详情
     *
     * @param transportTaskId   运输任务id
     * @param driverJobDetailVO 司机作业单详情
     * @param authTemplate      权限系统client
     */
    private void assembleDriverName(Long transportTaskId, DriverJobDetailVO driverJobDetailVO, AuthTemplate authTemplate) {
        //关联运输任务的司机作业单
        DriverJobPageQueryDTO driverJobPageQueryDTO = DriverJobPageQueryDTO.builder().page(1).pageSize(999).transportTaskId(transportTaskId).build();
        PageResponse<DriverJobDTO> pageResponse = driverJobFeign.pageQuery(driverJobPageQueryDTO);
        //关联车辆的司机id列表
        List<Long> driverIds = pageResponse.getItems().stream().map(DriverJobDTO::getDriverId).collect(Collectors.toList());
        //关联车辆的司机姓名列表
        List<String> driverNameList = driverIds.stream().map(x -> authTemplate.opsForUser().getUserById(x).getData().getName()).collect(Collectors.toList());
        //司机姓名列表转换为逗号隔开的字符串
        String driverNamesStr = CollUtil.join(driverNameList, ",");
        driverJobDetailVO.setDriverName(driverNamesStr);
    }

    /**
     * 提货、交付图片信息封装到司机作业单详情
     *
     * @param driverJobDetailVO 司机作业单详情
     * @param transportTaskDTO  运输任务
     */
    private static void assemblePicture(DriverJobDetailVO driverJobDetailVO, TransportTaskDTO transportTaskDTO) {
        //提货凭证
        List<String> cargoPickUpPicture = CharSequenceUtil.split(transportTaskDTO.getCargoPickUpPicture(), ",");
        //提货图片
        List<String> cargoPicture = CharSequenceUtil.split(transportTaskDTO.getCargoPicture(), ",");
        //回单凭证
        List<String> transportCertificate = CharSequenceUtil.split(transportTaskDTO.getTransportCertificate(), ",");
        //回单图片
        List<String> deliverPicture = CharSequenceUtil.split(transportTaskDTO.getDeliverPicture(), ",");

        driverJobDetailVO.setCargoPickUpPicture(cargoPickUpPicture);
        driverJobDetailVO.setCargoPicture(cargoPicture);
        driverJobDetailVO.setTransportCertificate(transportCertificate);
        driverJobDetailVO.setDeliverPicture(deliverPicture);
    }

    /**
     * 目的机构信息封装到司机作业单详情
     *
     * @param endAgencyId       目的机构id
     * @param driverJobDetailVO 司机作业单详情
     * @param organDTOS         起止机构
     */
    private static void assembleEndOrgan(Long endAgencyId, DriverJobDetailVO driverJobDetailVO, List<OrganDTO> organDTOS) {
        //目的机构相关
        OrganDTO endOrganDTO = organDTOS.stream().filter(dto -> dto.getId().equals(endAgencyId)).findFirst().orElse(null);
        //目的机构地址对象
        AreaVO endAreaVO = JSONUtil.toBean(endOrganDTO.getAddress(), AreaVO.class);
        //目的机构详细地址
        String endAddress = CharSequenceUtil.builder(endAreaVO.getProvince().getName(), endAreaVO.getCity().getName(), endAreaVO.getCounty().getName(), endAreaVO.getAddress()).toString();
        driverJobDetailVO.setEndProvince(endAreaVO.getProvince().getName());
        driverJobDetailVO.setEndCity(endAreaVO.getCity().getName());
        driverJobDetailVO.setEndAddress(endAddress);
        driverJobDetailVO.setFinishHandover(endOrganDTO.getManagerName());
        driverJobDetailVO.setFinishHandoverPhone(endOrganDTO.getPhone());
    }

    /**
     * 起始机构信息封装到司机作业单详情
     *
     * @param startAgencyId     起始机构id
     * @param driverJobDetailVO 司机作业单详情
     * @param organDTOS         起止机构
     */
    private static void assembleStartOrgan(Long startAgencyId, DriverJobDetailVO driverJobDetailVO, List<OrganDTO> organDTOS) {
        //起始机构相关
        OrganDTO startOrganDTO = organDTOS.stream().filter(dto -> dto.getId().equals(startAgencyId)).findFirst().orElse(null);
        //起始机构地址对象
        AreaVO startAreaVO = JSONUtil.toBean(startOrganDTO.getAddress(), AreaVO.class);
        //起始机构详细地址
        String startAddress = CharSequenceUtil.builder(startAreaVO.getProvince().getName(), startAreaVO.getCity().getName(), startAreaVO.getCounty().getName(), startAreaVO.getAddress()).toString();
        driverJobDetailVO.setStartProvince(startAreaVO.getProvince().getName());
        driverJobDetailVO.setStartCity(startAreaVO.getCity().getName());
        driverJobDetailVO.setStartAddress(startAddress);
        driverJobDetailVO.setStartHandover(startOrganDTO.getManagerName());
        driverJobDetailVO.setStartHandoverPhone(startOrganDTO.getPhone());
    }

    /**
     * 根据运输任务id分页查询运单信息
     *
     * @param page             页码
     * @param pageSize         页面大小
     * @param taskId           运输任务id
     * @param transportOrderId 运单id
     * @return 运单对象分页数据
     */
    @Override
    public PageResponse<TransportOrderVO> pageQueryTransportOrder(Integer page, Integer pageSize, String taskId, String transportOrderId) {
        //根据运输任务id分页查询运单信息,并模糊查询运单id
        PageResponse<TransportOrderDTO> pageResponse = transportOrderFeign.pageQueryByTaskId(page, pageSize, taskId, transportOrderId);

        //将dto转为vo
        return PageResponse.of(pageResponse, TransportOrderVO.class);
    }

    /**
     * 提货
     *
     * @param driverPickUpVO 提货对象（作业id、提货凭证、提货图片）
     */
    @Override
    public void takeDelivery(DriverPickUpVO driverPickUpVO) {
        DriverPickUpDTO driverPickUpDTO = BeanUtil.toBean(driverPickUpVO, DriverPickUpDTO.class);
        driverJobFeign.outStorage(driverPickUpDTO);
    }

    /**
     * 延迟提货
     *
     * @param driverDelayDeliveryVO 延迟提货对象
     */
    @Override
    public void delayedDelivery(DriverDelayDeliveryVO driverDelayDeliveryVO) {
        DriverDelayDeliveryDTO driverDelayDeliveryDTO = BeanUtil.toBean(driverDelayDeliveryVO, DriverDelayDeliveryDTO.class);
        driverJobFeign.delayedDelivery(driverDelayDeliveryDTO);
    }

    /**
     * 交付
     *
     * @param driverDeliverVO 提货对象（作业id、交付凭证、交付图片）
     */
    @Override
    public void deliver(DriverDeliverVO driverDeliverVO) {
        DriverDeliverDTO driverDeliverDTO = BeanUtil.toBean(driverDeliverVO, DriverDeliverDTO.class);
        driverJobFeign.intoStorage(driverDeliverDTO);
    }

    /**
     * 回车登记
     *
     * @param driverReturnRegisterVO 回车登记信息
     */
    @Override
    public void truckRegistration(DriverReturnRegisterVO driverReturnRegisterVO) {
        //构建回车登记对象
        DriverReturnRegisterDTO driverReturnRegisterDTO = BeanUtil.toBean(driverReturnRegisterVO, DriverReturnRegisterDTO.class);
        driverReturnRegisterDTO.setOutStorageTime(driverReturnRegisterVO.getStartTime());
        driverReturnRegisterDTO.setIntoStorageTime(driverReturnRegisterVO.getEndTime());

        //车辆没有违章，则没有违章类型、不罚款、不扣分
        if (driverReturnRegisterVO.getIsBreakRules().equals(false)) {
            driverReturnRegisterDTO.setBreakRulesType(null);
            driverReturnRegisterDTO.setPenaltyAmount(null);
            driverReturnRegisterDTO.setDeductPoints(null);
        }

        //车辆没有故障，则没有故障类型
        if (driverReturnRegisterVO.getIsFault().equals(false)) {
            driverReturnRegisterDTO.setFaultType(null);
        }

        //车辆没有发生事故，则没有事故类型
        if (driverReturnRegisterVO.getIsAccident().equals(false)) {
            driverReturnRegisterDTO.setAccidentType(null);
        }

        //回车登记
        driverJobFeign.returnRegister(driverReturnRegisterDTO);
    }

    /**
     * 联系调度中心
     *
     * @return 调度中心电话
     */
    @Override
    public String dispatchCenterPhone() {
        //从权限系统查询调度员
        UserPageDTO userPageDTO = new UserPageDTO(1, 1, null, null, null, null);
        userPageDTO.setRoleId(dispatcherRoleId);
        Result<PageDTO<UserDTO>> result = AuthTemplateThreadLocal.get().opsForUser().getUserByPage(userPageDTO);

        PageDTO<UserDTO> pageDTO = result.getData();
        if (CollUtil.isEmpty(pageDTO.getRecords())) {
            throw new SLWebException("系统中没有调度员！");
        }
        return pageDTO.getRecords().get(0).getMobile();
    }
}
