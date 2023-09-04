package com.sl.ms.web.customer.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.img.ImgUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.extra.qrcode.QrCodeUtil;
import com.alibaba.cloud.commons.lang.StringUtils;
import com.google.zxing.BarcodeFormat;
import com.sl.ms.base.api.common.AreaFeign;
import com.sl.ms.base.domain.base.AreaDto;
import com.sl.ms.oms.api.CargoFeign;
import com.sl.ms.oms.api.GoodFeign;
import com.sl.ms.oms.api.OrderFeign;
import com.sl.ms.oms.dto.*;
import com.sl.ms.oms.enums.MailType;
import com.sl.ms.oms.enums.OrderPaymentStatus;
import com.sl.ms.oms.enums.OrderStatus;
import com.sl.ms.track.api.TrackFeign;
import com.sl.ms.track.domain.dto.TrackDTO;
import com.sl.ms.track.domain.enums.TrackStatusEnum;
import com.sl.ms.trade.api.JsapiPayFeign;
import com.sl.ms.trade.domain.request.JsapiPayDTO;
import com.sl.ms.trade.domain.response.JsapiPayResponseDTO;
import com.sl.ms.trade.enums.PayChannelEnum;
import com.sl.ms.user.api.MemberFeign;
import com.sl.ms.user.domain.dto.MemberDTO;
import com.sl.ms.web.customer.service.BaseService;
import com.sl.ms.web.customer.service.MemberService;
import com.sl.ms.web.customer.service.OmsService;
import com.sl.ms.web.customer.vo.base.GoodsTypeVO;
import com.sl.ms.web.customer.vo.oms.*;
import com.sl.ms.web.customer.vo.oms.pay.TradeLaunchVO;
import com.sl.ms.web.customer.vo.oms.pay.TradeResponseVO;
import com.sl.ms.web.customer.vo.user.MemberVO;
import com.sl.ms.work.api.PickupDispatchTaskFeign;
import com.sl.ms.work.api.TransportOrderFeign;
import com.sl.ms.work.domain.dto.PickupDispatchTaskDTO;
import com.sl.ms.work.domain.dto.TransportOrderDTO;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskCancelReason;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskStatus;
import com.sl.ms.work.domain.enums.pickupDispatchtask.PickupDispatchTaskType;
import com.sl.transport.common.exception.SLWebException;
import com.sl.transport.common.util.PageResponse;
import com.sl.transport.common.util.UserThreadLocal;
import com.sl.transport.info.api.TransportInfoFeign;
import com.sl.transport.info.domain.TransportInfoDTO;
import io.seata.spring.annotation.GlobalTransactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.awt.image.BufferedImage;
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
    private AreaFeign areaFeign;

    @Resource
    private CargoFeign cargoFeign;

    @Resource
    private GoodFeign goodFeign;

    @Resource
    private BaseService baseService;

    @Resource
    private TransportInfoFeign transportInfoFeign;

    @Resource
    private MemberService memberService;

    @Resource
    private PickupDispatchTaskFeign pickupDispatchTaskFeign;

    @Resource
    private JsapiPayFeign jsapiPayFeign;

    @Resource
    private MemberFeign memberFeign;

    @Resource
    private TransportOrderFeign transportOrderFeign;

    @Value("${sl.wechat.enterpriseId}")
    private Long enterpriseId;

    @Resource
    private TrackFeign trackFeign;

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
            return null;
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
        // 电子存根
        String barcodeBase64 = getBarcodeBase64(vo.getTransportOrderId());
        vo.setBarCode(barcodeBase64);
        return vo;
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
                vo.setTransportOrderId(transportOrderDTO.getId());
            }
        } catch (Exception e) {
            log.info("没有运单信息 vo {}", vo);
        }
    }

    /**
     * 电子存根条形码
     *
     * @param contents 内容
     * @return 条形码图片地址
     */
    private String getBarcodeBase64(String contents) {
        if (ObjectUtil.isEmpty(contents)) {
            return null;
        }
        BufferedImage image = QrCodeUtil.generate(contents, BarcodeFormat.CODE_39, 900, 150);
        return ImgUtil.toBase64DataUri(image, ImgUtil.IMAGE_TYPE_PNG);
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
     * 分页查询
     *
     * @param vo 订单查询VO
     * @return 订单VO
     */
    @Override
    public PageResponse<OrderVO> findByPage(OrderQueryVO vo) {
        log.info("获取订单分页数据：{}", vo);
        OrderDTO dto = BeanUtil.toBean(vo, OrderDTO.class);
        //获取userid
        Long userId = UserThreadLocal.getUserId();

        if (MailType.SEND.getCode().equals(vo.getMailType())) {
            // 我寄的
            dto.setMemberId(userId);
        } else if (MailType.RECEIVE.getCode().equals(vo.getMailType())) {
            // 我收的 通过收件人手机号查询
            MemberVO member = memberService.detail(userId);
            if (member == null || StringUtils.isEmpty(member.getPhone())) {
                throw new SLWebException("暂无收件订单");
            }
            String phone = member.getPhone();
            dto.setReceiverPhone(phone);
        } else {
            // 所有
            dto.setMailType(MailType.ALL.getCode());
            dto.setMemberId(userId);
            MemberVO member = memberService.detail(userId);
            if (ObjectUtil.isNotEmpty(member) && StringUtils.isNotEmpty(member.getPhone())) {
                String phone = member.getPhone();
                dto.setReceiverPhone(phone);
            }
        }

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
        OrderDTO orderDTO = parseOrderVo2DTO(vo);
        orderDTO.setMemberId(UserThreadLocal.getUserId());
        orderFeign.updateById(id, orderDTO);
    }

    @Override
    public void delOrder(Long id) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setStatus(OrderStatus.DEL.getCode());
        orderFeign.updateById(id, orderDTO);
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
     * 常用货物
     *
     * @param name 货物名称
     * @return 常用货物
     */
    @Override
    public List<OrderCargoVO> hotGood(String name) {
        List<OrderCargoDTO> cargoDtoList = goodFeign.list(name);
        return parseCarGoDTO2VO(cargoDtoList);
    }

    /**
     * 统计
     */
    @Override
    public Map<Integer, Long> count() {
        Long userId = UserThreadLocal.getUserId();
        return orderFeign.count(userId).stream().collect(Collectors.toMap(OrderStatusCountDTO::getStatusCode, OrderStatusCountDTO::getCount));
    }

    /**
     * 下单
     *
     * @param mailingSaveVO 下单信息
     * @return 下单结果
     */
    @Override
    public OrderVO mailingSave(MailingSaveVO mailingSaveVO) {
        //获取userid
        Long userId = UserThreadLocal.getUserId();
        // 寄件人收件人 地址 电话 名称 有一个不同则可以寄件
        if (ObjectUtil.equal(mailingSaveVO.getSendAddress(), mailingSaveVO.getReceiptAddress())) {
            throw new SLWebException("您的寄件人收件人地址相同，请重新填写");
        }
        MailingSaveDTO mailingSaveDTO = BeanUtil.toBean(mailingSaveVO, MailingSaveDTO.class);
        mailingSaveDTO.setMemberId(userId);
        OrderDTO orderDTO = orderFeign.mailingSave(mailingSaveDTO);
        return parseOrderDTO2Vo(orderDTO);
    }

    /**
     * 支付
     *
     * @param tradeLaunchVO 订单号
     * @return 预支付编号 签名数据
     */
    @Override
    public TradeResponseVO pay(TradeLaunchVO tradeLaunchVO) {
        try {
            // 1.判断是否已支付，已支付则不能获取支付二维码
            OrderDTO orderDTO = orderFeign.findById(Long.valueOf(tradeLaunchVO.getProductOrderNo()));
            if (ObjectUtil.equal(orderDTO.getPaymentStatus(), OrderPaymentStatus.PAID.getStatus())) {
                throw new SLWebException("订单已完成支付");
            }

            //2.未支付则查询是否有和订单绑定的未支付交易单（同支付渠道）
            PayChannelEnum payChannelEnum = PayChannelEnum.codeOf(tradeLaunchVO.getPayMethod());

            JsapiPayDTO jsapiPayDTO = BeanUtil.toBean(tradeLaunchVO, JsapiPayDTO.class);
            jsapiPayDTO.setTradingChannel(payChannelEnum);
            Long userId = UserThreadLocal.getUserId();
            MemberDTO detail = memberFeign.detail(userId);
            jsapiPayDTO.setOpenId(detail.getOpenId());
            jsapiPayDTO.setEnterpriseId(enterpriseId);
            jsapiPayDTO.setMemo("神领物流订单");
            //3.2.2.调用feign
            JsapiPayResponseDTO jsapiTrading = jsapiPayFeign.createJsapiTrading(jsapiPayDTO);

            //3.2.3.将交易单号和支付渠道更新到订单表
            orderDTO.setTradingOrderNo(jsapiTrading.getTradingOrderNo());
            orderDTO.setTradingChannel(jsapiTrading.getTradingChannel());
            orderFeign.updateById(orderDTO.getId(), orderDTO);

            //3.2.4.将dto转为vo响应
            return BeanUtil.toBean(jsapiTrading, TradeResponseVO.class);
        } catch (Exception e) {
            throw new SLWebException("支付失败");
        }
    }

    /**
     * 取消订单
     *
     * @param id 订单号
     */
    @GlobalTransactional
    @Override
    public void cancel(Long id) {
        // 更新订单
        orderFeign.updateStatus(ListUtil.of(id), OrderStatus.CANCELLED.getCode());

        //查询取派件任务
        List<PickupDispatchTaskDTO> pickupDispatchTaskDTOS = pickupDispatchTaskFeign.findByOrderId(id, PickupDispatchTaskType.PICKUP);
        if (CollUtil.isEmpty(pickupDispatchTaskDTOS)) {
            // 暂未生成取件任务
            log.info("{}订单暂无取派件任务", id);
            return;
        }

        //更新取件任务
        PickupDispatchTaskDTO taskDTO = pickupDispatchTaskDTOS.get(0);
        taskDTO.setStatus(PickupDispatchTaskStatus.CANCELLED);//取消状态
        taskDTO.setCancelReason(PickupDispatchTaskCancelReason.CANCEL_BY_USER);//取消原因
        pickupDispatchTaskFeign.updateStatus(taskDTO);
    }

    /**
     * 预估总价
     *
     * @param mailingSaveVO 订单信息
     * @return 预估信息
     */
    @Override
    public OrderCarriageVO totalPrice(MailingSaveVO mailingSaveVO) {
        log.info("预估总价：{}", mailingSaveVO);
        MailingSaveDTO mailingSaveDTO = BeanUtil.toBean(mailingSaveVO, MailingSaveDTO.class);
        OrderCarriageDTO orderCarriageDTO = orderFeign.totalPrice(mailingSaveDTO);
        log.info("返回结果：{}", orderCarriageDTO);
        return BeanUtil.toBean(orderCarriageDTO, OrderCarriageVO.class);
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
                GoodsTypeVO goodsTypeVO = baseService.fineGoodsTypeById(orderCargoDto.getGoodsTypeId());
                log.info("Manager --- goodsTypeFeign.fineById  result:{}", goodsTypeVO);
                vo.setGoodsType(goodsTypeVO);
            }
            return vo;
        }).collect(Collectors.toList());
    }

    /**
     * 最近寄递
     *
     * @param name 名称
     * @return 订单货品信息
     */
    @Override
    public List<OrderCargoVO> lastGood(String name) {
        Long userId = UserThreadLocal.getUserId();
        List<OrderCargoDTO> list = cargoFeign.list(name, userId);
        return parseCarGoDTO2VO(list);
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
        if (dto.getId() != null) {
            List<OrderCargoDTO> cargos = cargoFeign.findAll(null, dto.getId());
            log.info("货品信息：{}", cargos);
            List<OrderCargoVO> orderCargoVOS = parseCarGoDTO2VO(cargos);
            vo.setOrderCargoVOS(orderCargoVOS);
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

            vo.setSenderProvince(baseService.parseArea2Vo(result));

        }
        if (ObjectUtil.isNotEmpty(dto.getSenderCityId())) {
            AreaDto result = areaMap.get(dto.getSenderCityId());
            vo.setSenderCity(baseService.parseArea2Vo(result));
        }
        if (ObjectUtil.isNotEmpty(dto.getSenderCountyId())) {
            AreaDto result = areaMap.get(dto.getSenderCountyId());
            vo.setSenderCounty(baseService.parseArea2Vo(result));
        }
        if (ObjectUtil.isNotEmpty(dto.getReceiverProvinceId())) {
            AreaDto result = areaMap.get(dto.getReceiverProvinceId());
            vo.setReceiverProvince(baseService.parseArea2Vo(result));
        }
        if (ObjectUtil.isNotEmpty(dto.getReceiverCityId())) {
            AreaDto result = areaMap.get(dto.getReceiverCityId());
            vo.setReceiverCity(baseService.parseArea2Vo(result));
        }
        if (ObjectUtil.isNotEmpty(dto.getReceiverCountyId())) {
            AreaDto result = areaMap.get(dto.getReceiverCountyId());
            vo.setReceiverCounty(baseService.parseArea2Vo(result));
        }

        // 运单ID
        appendTransportOrder(vo);

        // 运单信息流
        List<TransportOrderPointVO> tracks = tracks(vo.getTransportOrderId());
        vo.setTransportOrderPointVOS(tracks);
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

                vo.setSenderProvince(baseService.parseArea2Vo(result));

            }
            if (ObjectUtil.isNotEmpty(dto.getSenderCityId())) {
                AreaDto result = areaMap.get(dto.getSenderCityId());
                vo.setSenderCity(baseService.parseArea2Vo(result));
            }
            if (ObjectUtil.isNotEmpty(dto.getSenderCountyId())) {
                AreaDto result = areaMap.get(dto.getSenderCountyId());
                vo.setSenderCounty(baseService.parseArea2Vo(result));
            }
            if (ObjectUtil.isNotEmpty(dto.getReceiverProvinceId())) {
                AreaDto result = areaMap.get(dto.getReceiverProvinceId());
                vo.setReceiverProvince(baseService.parseArea2Vo(result));
            }
            if (ObjectUtil.isNotEmpty(dto.getReceiverCityId())) {
                AreaDto result = areaMap.get(dto.getReceiverCityId());
                vo.setReceiverCity(baseService.parseArea2Vo(result));
            }
            if (ObjectUtil.isNotEmpty(dto.getReceiverCountyId())) {
                AreaDto result = areaMap.get(dto.getReceiverCountyId());
                vo.setReceiverCounty(baseService.parseArea2Vo(result));
            }
            // 运单ID
            vo.setTransportOrderId(transportOrderIdMap.get(vo.getId()));
            return vo;
        }).collect(Collectors.toList());
    }

    /**
     * 运单轨迹
     *
     * @param id 运单ID
     * @return 轨迹
     */
    @Override
    public TrackVO findTrackById(String id) {
        TrackDTO trackDTO = trackFeign.queryByTransportOrderId(id);
        TrackVO trackVO = BeanUtil.toBean(trackDTO, TrackVO.class);
        trackVO.setStatus(trackDTO.getStatus().getCode());
        if (ObjectUtil.isNotEmpty(trackDTO.getType()) && trackDTO.getStatus().equals(TrackStatusEnum.NEW)) {
            trackVO.setStatus(trackDTO.getType().getCode());
        }
        return trackVO;
    }
}
