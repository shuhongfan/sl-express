package com.sl.ms.web.manager.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.ObjectUtil;
import com.itheima.auth.sdk.common.Result;
import com.itheima.auth.sdk.dto.UserDTO;
import com.sl.ms.base.api.truck.TruckFeign;
import com.sl.ms.base.api.truck.TruckReturnRegisterFeign;
import com.sl.ms.base.domain.truck.TruckDto;
import com.sl.ms.base.domain.truck.TruckReturnRegisterDTO;
import com.sl.ms.base.domain.truck.TruckReturnRegisterListDTO;
import com.sl.ms.base.domain.truck.TruckReturnRegisterPageQueryDTO;
import com.sl.ms.driver.api.DriverJobFeign;
import com.sl.ms.driver.domain.dto.request.DriverJobPageQueryDTO;
import com.sl.ms.driver.domain.dto.response.DriverJobDTO;
import com.sl.ms.transport.api.OrganFeign;
import com.sl.ms.web.manager.service.TruckReturnRegisterService;
import com.sl.ms.web.manager.vo.baseTruck.TruckReturnRegisterListVO;
import com.sl.ms.web.manager.vo.baseTruck.TruckReturnRegisterPageQueryVO;
import com.sl.ms.web.manager.vo.baseTruck.TruckReturnRegisterVO;
import com.sl.ms.work.api.TransportTaskFeign;
import com.sl.ms.work.domain.dto.TransportTaskDTO;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.util.AuthTemplateThreadLocal;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.domain.OrganDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TruckReturnRegisterServiceImpl implements TruckReturnRegisterService {
    @Resource
    private TransportTaskFeign transportTaskFeign;
    @Resource
    private TruckReturnRegisterFeign truckReturnRegisterFeign;
    @Resource
    private OrganFeign organFeign;
    @Resource
    private TruckFeign truckFeign;
    @Resource
    private DriverJobFeign driverJobFeign;

    /**
     * 分页查询回车登记列表
     *
     * @param vo 回车登记分页查询条件
     * @return 回车登记分页结果
     */
    @Override
    public PageResponse<TruckReturnRegisterListVO> pageQuery(TruckReturnRegisterPageQueryVO vo) {
        // 1.根据起止机构id查询运输任务
        List<Long> transportTaskIds = null;
        if (!ObjectUtil.isAllEmpty(vo.getStartAgencyId(), vo.getEndAgencyId())) {
            transportTaskIds = transportTaskFeign.findByAgencyId(vo.getStartAgencyId(), vo.getEndAgencyId());

            //进入到根据机构查询，并且查询结果为空，最终结果即为空
            if (CollUtil.isEmpty(transportTaskIds)) {
                return new PageResponse<>();
            }
        }

        // 2.构造查询条件
        TruckReturnRegisterPageQueryDTO truckReturnRegisterPageQueryDTO = BeanUtil.toBean(vo, TruckReturnRegisterPageQueryDTO.class);
        truckReturnRegisterPageQueryDTO.setTransportTaskIds(transportTaskIds);

        // 3.分页查询
        PageResponse<TruckReturnRegisterListDTO> pageResponse = truckReturnRegisterFeign.pageQuery(truckReturnRegisterPageQueryDTO);
        if (ObjectUtil.isEmpty(pageResponse.getItems())) {
            return new PageResponse<>();
        }

        // 4.封装结果（补充起止机构信息）
        List<TruckReturnRegisterListVO> list = convertListDto2ListVo(pageResponse.getItems());

        // 5.返回分页结果
        return PageResponse.<TruckReturnRegisterListVO>builder()
                .page(pageResponse.getPage())
                .pageSize(pageResponse.getPageSize())
                .pages(pageResponse.getPages())
                .counts(pageResponse.getCounts())
                .items(list)
                .build();
    }

    /**
     * 分页列表dto转为vo（补充起止机构信息）
     *
     * @param dtoList 分页列表dto
     * @return 分页列表vo
     */
    private List<TruckReturnRegisterListVO> convertListDto2ListVo(List<TruckReturnRegisterListDTO> dtoList) {
        return dtoList.stream().map(dto -> {
            TruckReturnRegisterListVO truckReturnRegisterListVO = BeanUtil.toBean(dto, TruckReturnRegisterListVO.class);

            //根据id查询运输任务
            TransportTaskDTO transportTaskDTO;
            try {
                transportTaskDTO = transportTaskFeign.findById(truckReturnRegisterListVO.getTransportTaskId());
            } catch (Exception e) {
                throw new SLWebException("id为" + truckReturnRegisterListVO.getTransportTaskId() + "的运输任务查询失败！");
            }

            //根据id查询机构
            OrganDTO startAgency = organFeign.queryById(transportTaskDTO.getStartAgencyId());
            OrganDTO endAgency = organFeign.queryById(transportTaskDTO.getEndAgencyId());

            // 封装机构和运单数量数据
            truckReturnRegisterListVO.setStartAgencyId(transportTaskDTO.getStartAgencyId());
            truckReturnRegisterListVO.setStartAgencyName(startAgency.getName());
            truckReturnRegisterListVO.setEndAgencyId(transportTaskDTO.getEndAgencyId());
            truckReturnRegisterListVO.setEndAgencyName(endAgency.getName());
            truckReturnRegisterListVO.setTransportOrderNumber(transportTaskDTO.getTransportOrderCount());
            return truckReturnRegisterListVO;
        }).collect(Collectors.toList());
    }

    /**
     * 回车登记详情
     *
     * @param id 回车登记id
     * @return 回车登记详情
     */
    @Override
    public TruckReturnRegisterVO detail(Long id) {
        //回车登记信息
        TruckReturnRegisterDTO truckReturnRegisterDTO = truckReturnRegisterFeign.findById(id);
        //车辆信息
        TruckDto truckDto = truckFeign.fineById(truckReturnRegisterDTO.getTruckId());
        //运输任务信息
        TransportTaskDTO transportTaskDTO = transportTaskFeign.findById(truckReturnRegisterDTO.getTransportTaskId());
        //起止机构信息
        OrganDTO startAgency = organFeign.queryById(transportTaskDTO.getStartAgencyId());
        OrganDTO endAgency = organFeign.queryById(transportTaskDTO.getEndAgencyId());

        //根据运输任务id查询关联的司机作业单
        DriverJobPageQueryDTO driverJobPageQueryDTO = DriverJobPageQueryDTO.builder().page(1).pageSize(10).transportTaskId(transportTaskDTO.getId()).build();
        PageResponse<DriverJobDTO> driverJobPage = driverJobFeign.pageQuery(driverJobPageQueryDTO);
        List<Long> driverIds = CollUtil.getFieldValues(driverJobPage.getItems(), "driverId", Long.class);

        //根据司机id获取司机姓名
        List<String> driverNameList = driverIds.stream().map(driverId -> {
            Result<UserDTO> result = AuthTemplateThreadLocal.get().opsForUser().getUserById(driverId);
            return result.getData().getName();
        }).collect(Collectors.toList());
        String driverNameStr = CharSequenceUtil.join("、", driverNameList);

        //组装回车登记详情
        TruckReturnRegisterVO truckReturnRegisterVO = BeanUtil.toBean(truckReturnRegisterDTO, TruckReturnRegisterVO.class);
        truckReturnRegisterVO.setId(id);
        truckReturnRegisterVO.setLicensePlate(truckDto.getLicensePlate());
        truckReturnRegisterVO.setStartAgencyId(transportTaskDTO.getStartAgencyId());
        truckReturnRegisterVO.setStartAgencyName(startAgency.getName());
        truckReturnRegisterVO.setEndAgencyId(transportTaskDTO.getEndAgencyId());
        truckReturnRegisterVO.setEndAgencyName(endAgency.getName());
        truckReturnRegisterVO.setDriverIds(driverIds);
        truckReturnRegisterVO.setDriverName(driverNameStr);
        return truckReturnRegisterVO;
    }
}
