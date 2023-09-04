package com.sl.ms.trade.api;

import com.sl.ms.trade.api.fallback.NativePayFeignFallbackFactory;
import com.sl.ms.trade.domain.request.NativePayDTO;
import com.sl.ms.trade.domain.response.NativePayResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "sl-express-ms-trade", contextId = "NativePay", path = "native", fallbackFactory = NativePayFeignFallbackFactory.class)
public interface NativePayFeign {

    /***
     * 扫码支付，收银员通过收银台或商户后台调用此接口，生成二维码后，展示给用户，由用户扫描二维码完成订单支付。
     *
     * @param nativePayDTO 扫码支付提交参数
     * @return 扫码支付响应数据，其中包含二维码路径
     */
    @PostMapping
    NativePayResponseDTO createDownLineTrading(@RequestBody NativePayDTO nativePayDTO);

    /**
     * 查看二维码
     *
     * @param tradingOrderNo 交易单号
     * @return 二维码图片 base64格式
     */
    @GetMapping("qrcode/{tradingOrderNo}")
    String queryQrCode(@PathVariable("tradingOrderNo") Long tradingOrderNo);
}
