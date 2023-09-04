package com.sl.ms.web.manager.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.ObjectUtil;
import com.sl.ms.base.api.common.AreaFeign;
import com.sl.ms.base.api.common.GoodsTypeFeign;
import com.sl.ms.base.domain.base.AreaDto;
import com.sl.ms.base.domain.base.GoodsTypeDto;
import com.sl.ms.oms.api.CargoFeign;
import com.sl.ms.oms.api.OrderFeign;
import com.sl.ms.oms.dto.OrderCargoDTO;
import com.sl.ms.oms.dto.OrderDTO;
import com.sl.ms.web.manager.service.BaseCommonService;
import com.sl.ms.web.manager.service.OmsService;
import com.sl.ms.web.manager.service.WorkService;
import com.sl.ms.web.manager.vo.baseCommon.GoodsTypeVO;
import com.sl.ms.web.manager.vo.oms.OrderCargoUpdateVO;
import com.sl.ms.web.manager.vo.oms.OrderCargoVO;
import com.sl.ms.web.manager.vo.oms.OrderQueryVO;
import com.sl.ms.web.manager.vo.oms.OrderVO;
import com.sl.ms.web.manager.vo.work.TransportOrderPointVO;
import com.sl.ms.web.manager.vo.work.TransportOrderVO;
import com.sl.ms.work.api.PickupDispatchTaskFeign;
import com.sl.ms.work.api.TransportOrderFeign;
import com.sl.ms.work.domain.dto.PickupDispatchTaskDTO;
import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskType;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.info.api.TransportInfoFeign;
import com.sl.transport.info.domain.TransportInfoDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 订单服务
 * 对应 订单微服务
 */
@Slf4j
@Service
public class OmsServiceImpl implements OmsService {

    @Resource
    private OrderFeign orderFeign;

    @Resource
    private PickupDispatchTaskFeign pickupDispatchTaskFeign;

    @Resource
    private AreaFeign areaFeign;

    @Resource
    private TransportOrderFeign transportOrderFeign;

    @Resource
    private CargoFeign cargoFeign;

    @Resource
    private BaseCommonService baseCommonService;

    @Resource
    private WorkService workService;

    @Resource
    private GoodsTypeFeign goodsTypeFeign;

    @Resource
    private TransportInfoFeign transportInfoFeign;

    /**
     * 根据ID查询
     * 简要订单信息
     *
     * @param id 订单ID
     * @return 订单VO
     */
    @Override
    public OrderVO findOrderSimple(Long id) {
        OrderDTO orderDTO = orderFeign.findById(id);
        if (ObjectUtil.isEmpty(orderDTO)) {
            return new OrderVO();
        }
        return parseOrderDTO2Vo(orderDTO);
    }

    /**
     * 根据ID查询详情
     * 后台详情页面
     *
     * @param id 订单ID
     * @return 订单VO
     */
    @Override
    public OrderVO findOrderDetail(Long id) {
        OrderVO vo = findOrderSimple(id);

        //查询取派件任务信息
        List<PickupDispatchTaskDTO> pickupTaskDTOS = pickupDispatchTaskFeign.findByOrderId(vo.getId(), PickupDispatchTaskType.PICKUP);
        //取件信息
        vo.setTaskPickup(CollUtil.isNotEmpty(pickupTaskDTOS) ? workService.parsePickupDispatchTaskDTO2Vo(pickupTaskDTOS.get(0)) : null);

        List<PickupDispatchTaskDTO> dispatchTaskDTOS = pickupDispatchTaskFeign.findByOrderId(vo.getId(), PickupDispatchTaskType.DISPATCH);
        //派件信息
        vo.setTaskDispatch(CollUtil.isNotEmpty(dispatchTaskDTOS) ? workService.parsePickupDispatchTaskDTO2Vo(dispatchTaskDTOS.get(0)) : null);
        //拒收派件信息
        vo.setTaskRejectionDispatch(dispatchTaskDTOS.size() > 1 ? workService.parsePickupDispatchTaskDTO2Vo(dispatchTaskDTOS.get(1)) : null);

        if (ObjectUtil.isEmpty(vo.getTransportOrder())) {
            return vo;
        }
        // 运单信息流
        List<TransportOrderPointVO> tracks = tracks(vo.getTransportOrder().getId());
        vo.setTransportOrderPointVOS(tracks);
        return vo;
    }

    /**
     * 运单跟踪
     *
     * @param id 运单id
     * @return 运单跟踪信息
     */
    public List<TransportOrderPointVO> tracks(String id) {
        if (ObjectUtil.isEmpty(id)) {
            return new ArrayList<>();
        }
        try {
            //1.调用transport-info接口，获取相关运单的追踪信息
            TransportInfoDTO transportInfoDTO = transportInfoFeign.queryByTransportOrderId(id);

            if (ObjectUtil.hasEmpty(transportInfoDTO, transportInfoDTO.getInfoList())) {
                return Collections.emptyList();
            }

            //2.解析运单追踪信息，封装到vo
            return transportInfoDTO.getInfoList().stream().map(x -> {
                TransportOrderPointVO vo = BeanUtil.toBean(x, TransportOrderPointVO.class);
                vo.setCreated(LocalDateTimeUtil.of(x.getCreated()));
                return vo;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            log.info("没有运单信息 vo {}", id);
        }
        return Collections.emptyList();
    }

    /**
     * 补充运单信息
     *
     * @param vo 订单
     */
    private void appendTransportOrder(OrderVO vo) {
        try {
            // 补充运单信息
            TransportOrderDTO transportOrderDTO = transportOrderFeign.findByOrderId(vo.getId());
            if (ObjectUtil.isNotEmpty(transportOrderDTO)) {
                TransportOrderVO transportOrderVo = BeanUtil.toBean(transportOrderDTO, TransportOrderVO.class);
                vo.setTransportOrder(transportOrderVo);
            }
        } catch (Exception e) {
            log.info("没有运单信息 vo {}", vo);
        }
    }

    /**
     * 分页查询
     *
     * @param vo 订单查询VO
     * @return 订单VO
     */
    @Override
    public PageResponse<OrderVO> findByPage(OrderQueryVO vo) {
        log.info("获取订单分页数据：{}", vo);
        OrderDTO dto = BeanUtil.toBean(vo, OrderDTO.class);
        PageResponse<OrderDTO> orderPage = orderFeign.findByPage(dto);
        //加工数据
        return PageResponse.of(orderPage, this::batchParseOrderDTO2Vo);
    }

    /**
     * 更新
     *
     * @param id 订单ID
     * @param vo 订单VO
     */
    @Override
    public void updateOrder(Long id, OrderVO vo) {
        orderFeign.updateById(id, parseOrderVo2DTO(vo));
    }

    /**
     * 获取货物列表
     *
     * @param tranOrderId 运单id
     * @param orderId     订单id
     * @return 货物列表
     */
    @Override
    public List<OrderCargoVO> findAll(Long tranOrderId, Long orderId) {
        log.info("Manager --- 获取货物列表");
        List<OrderCargoDTO> cargoDtoList = cargoFeign.findAll(null, orderId);
        log.info("Manager --- cargoFeign.findAll  result:{}", cargoDtoList);
        return parseCarGoDTO2VO(cargoDtoList);
    }

    /**
     * 添加货物
     *
     * @param vo 货物信息
     */
    @Override
    public void save(OrderCargoUpdateVO vo) {
        OrderCargoDTO orderCargoDto = BeanUtil.toBean(vo, OrderCargoDTO.class);
        orderCargoDto.setId(null);
        cargoFeign.save(orderCargoDto);
    }

    /**
     * 更新货物信息
     *
     * @param id 货物id
     * @param vo 货物信息
     */
    @Override
    public void update(Long id, OrderCargoUpdateVO vo) {
        vo.setId(id);
        cargoFeign.update(id, BeanUtil.toBean(vo, OrderCargoDTO.class));
    }

    /**
     * 删除货物信息
     *
     * @param id 货物id
     */
    @Override
    public void del(Long id) {
        cargoFeign.del(id);
    }

    /**
     * 货品转换
     *
     * @param cargoDtoList 货品DTO
     * @return 货品VO
     */
    private List<OrderCargoVO> parseCarGoDTO2VO(List<OrderCargoDTO> cargoDtoList) {
        return cargoDtoList.stream().map(orderCargoDto -> {
            OrderCargoVO vo = BeanUtil.toBean(orderCargoDto, OrderCargoVO.class);
            if (ObjectUtil.isNotEmpty(orderCargoDto.getGoodsTypeId())) {
                GoodsTypeVO goodsTypeVO = baseCommonService.fineGoodsTypeById(orderCargoDto.getGoodsTypeId());
                log.info("Manager --- goodsTypeFeign.fineById  result:{}", goodsTypeVO);
                vo.setGoodsType(goodsTypeVO);
            }
            return vo;
        }).collect(Collectors.toList());
    }

    /**
     * 更新订单转换
     *
     * @param vo 订单VO
     * @return 订单DTO
     */
    private OrderDTO parseOrderVo2DTO(OrderVO vo) {
        OrderDTO dto = BeanUtil.toBean(vo, OrderDTO.class);
        if (ObjectUtil.isNotEmpty(vo.getSenderProvince())) {
            dto.setSenderProvinceId(vo.getSenderProvince().getId());
        }
        if (ObjectUtil.isNotEmpty(vo.getSenderCity())) {
            dto.setSenderCityId(vo.getSenderCity().getId());
        }
        if (ObjectUtil.isNotEmpty(vo.getSenderCounty())) {
            dto.setSenderCountyId(vo.getSenderCounty().getId());
        }
        if (ObjectUtil.isNotEmpty(vo.getReceiverProvince())) {
            dto.setReceiverProvinceId(vo.getReceiverProvince().getId());
        }
        if (ObjectUtil.isNotEmpty(vo.getReceiverCity())) {
            dto.setReceiverCityId(vo.getReceiverCity().getId());
        }
        if (ObjectUtil.isNotEmpty(vo.getReceiverCounty())) {
            dto.setReceiverCountyId(vo.getReceiverCounty().getId());
        }
        return dto;
    }

    /**
     * 转换订单
     * 包含订单信息和运单信息
     *
     * @param dto 订单DTO
     * @return 订单VO
     */
    private OrderVO parseOrderDTO2Vo(OrderDTO dto) {
        OrderVO vo = BeanUtil.toBean(dto, OrderVO.class);
        if (ObjectUtil.isNotEmpty(vo.getDistance())) {
            vo.setDistance(vo.getDistance() / 1000);
        }
        if (ObjectUtil.isNotEmpty(dto.getId())) {
            List<OrderCargoDTO> cargos = cargoFeign.findAll(null, dto.getId());
            log.info("货品信息：{}", cargos);
            List<OrderCargoVO> cargoVOS = cargos.stream()
                    .map(v -> {
                        //组装订单货品信息
                        OrderCargoVO orderCargoVO = BeanUtil.toBean(v, OrderCargoVO.class);

                        //查询订单货物相关的物品类型
                        if (ObjectUtil.isNotEmpty(v.getGoodsTypeId())) {
                            GoodsTypeDto goodsTypeDto = goodsTypeFeign.fineById(v.getGoodsTypeId());
                            GoodsTypeVO goodsTypeVO = BeanUtil.toBean(goodsTypeDto, GoodsTypeVO.class);
                            orderCargoVO.setGoodsType(goodsTypeVO);
                        }
                        return orderCargoVO;
                    })
                    .collect(Collectors.toList());
            vo.setOrderCargoDTOS(cargoVOS);
        }

        Set<Long> areaIdSet = new HashSet<>();
        areaIdSet.add(dto.getReceiverProvinceId());
        areaIdSet.add(dto.getReceiverCityId());
        areaIdSet.add(dto.getReceiverCountyId());
        areaIdSet.add(dto.getSenderProvinceId());
        areaIdSet.add(dto.getSenderCityId());
        areaIdSet.add(dto.getSenderCountyId());

        List<AreaDto> areaDtoList = areaFeign.findBatch(new ArrayList<>(areaIdSet));
        Map<Long, AreaDto> areaMap = areaDtoList.stream().collect(Collectors.toMap(AreaDto::getId, v -> v));

        if (ObjectUtil.isNotEmpty(dto.getSenderProvinceId())) {
            AreaDto result = areaMap.get(dto.getSenderProvinceId());

            vo.setSenderProvince(baseCommonService.parseArea2Vo(result));

        }
        if (ObjectUtil.isNotEmpty(dto.getSenderCityId())) {
            AreaDto result = areaMap.get(dto.getSenderCityId());
            vo.setSenderCity(baseCommonService.parseArea2Vo(result));
        }
        if (ObjectUtil.isNotEmpty(dto.getSenderCountyId())) {
            AreaDto result = areaMap.get(dto.getSenderCountyId());
            vo.setSenderCounty(baseCommonService.parseArea2Vo(result));
        }
        if (ObjectUtil.isNotEmpty(dto.getReceiverProvinceId())) {
            AreaDto result = areaMap.get(dto.getReceiverProvinceId());
            vo.setReceiverProvince(baseCommonService.parseArea2Vo(result));
        }
        if (ObjectUtil.isNotEmpty(dto.getReceiverCityId())) {
            AreaDto result = areaMap.get(dto.getReceiverCityId());
            vo.setReceiverCity(baseCommonService.parseArea2Vo(result));
        }
        if (ObjectUtil.isNotEmpty(dto.getReceiverCountyId())) {
            AreaDto result = areaMap.get(dto.getReceiverCountyId());
            vo.setReceiverCounty(baseCommonService.parseArea2Vo(result));
        }
        // 运单ID
        appendTransportOrder(vo);
        return vo;
    }

    @Override
    public List<OrderVO> batchParseOrderDTO2Vo(List<OrderDTO> orderDTOList) {
        if (CollUtil.isEmpty(orderDTOList)) {
            return new ArrayList<>();
        }
        Set<Long> areaIdSet = new HashSet<>();
        orderDTOList.parallelStream().forEach(v -> {
            areaIdSet.add(v.getReceiverProvinceId());
            areaIdSet.add(v.getReceiverCityId());
            areaIdSet.add(v.getReceiverCountyId());
            areaIdSet.add(v.getSenderProvinceId());
            areaIdSet.add(v.getSenderCityId());
            areaIdSet.add(v.getSenderCountyId());
        });
        List<AreaDto> areaDtoList = areaFeign.findBatch(new ArrayList<>(areaIdSet));
        Map<Long, AreaDto> areaMap = areaDtoList.stream().collect(Collectors.toMap(AreaDto::getId, vo -> vo));

        Map<Long, String> transportOrderIdMap = transportOrderFeign.findByOrderIds(orderDTOList.parallelStream().map(OrderDTO::getId).collect(Collectors.toList()).toArray(Long[]::new)).parallelStream().collect(Collectors.toMap(TransportOrderDTO::getOrderId, TransportOrderDTO::getId));
        return orderDTOList.parallelStream().map(dto -> {
            OrderVO vo = BeanUtil.toBean(dto, OrderVO.class);
            if (ObjectUtil.isNotEmpty(dto.getSenderProvinceId())) {
                AreaDto result = areaMap.get(dto.getSenderProvinceId());

                vo.setSenderProvince(baseCommonService.parseArea2Vo(result));

            }
            if (ObjectUtil.isNotEmpty(dto.getSenderCityId())) {
                AreaDto result = areaMap.get(dto.getSenderCityId());
                vo.setSenderCity(baseCommonService.parseArea2Vo(result));
            }
            if (ObjectUtil.isNotEmpty(dto.getSenderCountyId())) {
                AreaDto result = areaMap.get(dto.getSenderCountyId());
                vo.setSenderCounty(baseCommonService.parseArea2Vo(result));
            }
            if (ObjectUtil.isNotEmpty(dto.getReceiverProvinceId())) {
                AreaDto result = areaMap.get(dto.getReceiverProvinceId());
                vo.setReceiverProvince(baseCommonService.parseArea2Vo(result));
            }
            if (ObjectUtil.isNotEmpty(dto.getReceiverCityId())) {
                AreaDto result = areaMap.get(dto.getReceiverCityId());
                vo.setReceiverCity(baseCommonService.parseArea2Vo(result));
            }
            if (ObjectUtil.isNotEmpty(dto.getReceiverCountyId())) {
                AreaDto result = areaMap.get(dto.getReceiverCountyId());
                vo.setReceiverCounty(baseCommonService.parseArea2Vo(result));
            }
            // 运单ID
            TransportOrderVO transportOrderVO = new TransportOrderVO();
            transportOrderVO.setId(transportOrderIdMap.get(vo.getId()));
            vo.setTransportOrder(transportOrderVO);
            return vo;
        }).collect(Collectors.toList());
    }
}
