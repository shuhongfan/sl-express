package com.sl.ms.web.courier.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.ObjectUtil;
import com.sl.ms.oms.api.OrderFeign;
import com.sl.ms.oms.dto.OrderDTO;
import com.sl.ms.oms.enums.OrderPaymentStatus;
import com.sl.ms.trade.api.NativePayFeign;
import com.sl.ms.trade.api.TradingFeign;
import com.sl.ms.trade.domain.TradingDTO;
import com.sl.ms.trade.domain.request.NativePayDTO;
import com.sl.ms.trade.domain.response.NativePayResponseDTO;
import com.sl.ms.trade.enums.PayChannelEnum;
import com.sl.ms.trade.enums.TradingStateEnum;
import com.sl.ms.web.courier.service.PayService;
import com.sl.ms.web.courier.vo.pay.TradeLaunchVO;
import com.sl.ms.web.courier.vo.pay.TradeResponseVO;
import com.sl.transport.common.exception.SLWebException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class PayServiceImpl implements PayService {
    @Resource
    private NativePayFeign nativePayFeign;
    @Resource
    private TradingFeign tradingFeign;
    @Resource
    private OrderFeign orderFeign;
    @Value("${sl.wechat.enterpriseId}")
    private Long wechatEnterpriseId;
    @Value("${sl.ali.enterpriseId}")
    private Long aliEnterpriseId;

    /**
     * 获取支付qrcode
     *
     * @param tradeLaunchVO 支付发起对象
     * @return 支付二维码相关数据
     */
    @Override
    public TradeResponseVO getQrCode(TradeLaunchVO tradeLaunchVO) {
        // 1.判断是否已支付，已支付则不能获取支付二维码
        OrderDTO orderDTO = orderFeign.findById(Long.valueOf(tradeLaunchVO.getProductOrderNo()));
        if (ObjectUtil.equal(orderDTO.getPaymentStatus(), OrderPaymentStatus.PAID.getStatus())) {
            throw new SLWebException("订单已完成支付");
        }

        //2.未支付则查询是否有和订单绑定的未支付交易单（同支付渠道）
        PayChannelEnum payChannelEnum = PayChannelEnum.codeOf(tradeLaunchVO.getPayMethod());
        String payChannel = payChannelEnum.toString();
        Long enterpriseId = ObjectUtil.equal(payChannelEnum, PayChannelEnum.ALI_PAY) ? aliEnterpriseId : wechatEnterpriseId;

        //3.如果已有，则对比数据库中和入参中的支付渠道是否相同
        //3.1.如果相同，则使用已有交易号获取支付二维码
        TradeResponseVO tradeResponseVO = new TradeResponseVO();
        if (ObjectUtil.isNotEmpty(orderDTO.getTradingOrderNo()) && ObjectUtil.equal(payChannel, orderDTO.getTradingChannel())) {
            String qrCode = nativePayFeign.queryQrCode(orderDTO.getTradingOrderNo());
            tradeResponseVO.setQrCode(qrCode);
            tradeResponseVO.setTradingOrderNo(orderDTO.getTradingOrderNo());
            return tradeResponseVO;
        }

        //3.2.如果不同，则重新生成支付二维码
        //3.2.1.类型转换
        NativePayDTO nativePayDTO = BeanUtil.toBean(tradeLaunchVO, NativePayDTO.class);
        nativePayDTO.setTradingChannel(payChannelEnum);
        nativePayDTO.setEnterpriseId(enterpriseId);

        //3.2.2.调用feign获取支付二维码
        NativePayResponseDTO nativePayResponseDTO = nativePayFeign.createDownLineTrading(nativePayDTO);

        //3.2.3.将交易单号和支付渠道更新到订单表
        orderDTO.setTradingOrderNo(nativePayResponseDTO.getTradingOrderNo());
        orderDTO.setTradingChannel(payChannel);
        orderFeign.updateById(orderDTO.getId(), orderDTO);

        //3.2.4.将dto转为vo响应
        return BeanUtil.toBean(nativePayResponseDTO, TradeResponseVO.class);
    }

    /**
     * 获取支付状态
     *
     * @param productOrderNo 订单号
     * @return 是否支付成功
     */
    @Override
    public boolean getStatus(String productOrderNo) {
        //1.根据订单id查询交易数据
        TradingDTO tradingDTO = tradingFeign.queryTrading(Long.valueOf(productOrderNo), null);

        //2.判断是否已结算
        //2.1如果已经结算，则修改订单支付状态
        if (ObjectUtil.equal(tradingDTO.getTradingState(), TradingStateEnum.YJS)) {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setId(tradingDTO.getProductOrderNo());
            orderDTO.setPaymentStatus(OrderPaymentStatus.PAID.getStatus());
            orderFeign.updateById(tradingDTO.getProductOrderNo(), orderDTO);
        }

        //2.2如果未结算直接返回支付结果
        return ObjectUtil.equal(tradingDTO.getTradingState(), TradingStateEnum.YJS);
    }
}
