package com.sl.ms.trade.controller;

import cn.hutool.core.bean.BeanUtil;
import com.sl.ms.trade.domain.request.NativePayDTO;
import com.sl.ms.trade.domain.response.NativePayResponseDTO;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.ms.trade.service.NativePayService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * Native支付方式Face接口：商户生成二维码，用户扫描支付
 */
@Validated
@RestController
@Api(tags = "Native支付")
@RequestMapping("native")
public class NativePayController {

    @Resource
    private NativePayService nativePayService;

    /***
     * 扫码支付，收银员通过收银台或商户后台调用此接口，生成二维码后，展示给用户，由用户扫描二维码完成订单支付。
     *
     * @param nativePayDTO 扫码支付提交参数
     * @return 扫码支付响应数据，其中包含二维码路径
     */
    @PostMapping
    @ApiOperation(value = "统一收单线下交易", notes = "统一收单线下交易")
    @ApiImplicitParam(name = "nativePayDTO", value = "扫码支付提交参数", required = true)
    public NativePayResponseDTO createDownLineTrading(@RequestBody NativePayDTO nativePayDTO) {
        TradingEntity tradingEntity = BeanUtil.toBean(nativePayDTO, TradingEntity.class);
        TradingEntity trading = this.nativePayService.createDownLineTrading(tradingEntity);
        return BeanUtil.toBean(trading, NativePayResponseDTO.class);
    }

    /**
     * 查看二维码
     *
     * @param tradingOrderNo 交易单号
     * @return 二维码图片 base64格式
     */
    @GetMapping("qrcode/{tradingOrderNo}")
    @ApiOperation(value = "查看二维码", notes = "查看二维码")
    @ApiImplicitParam(name = "tradingOrderNo", value = "查看二维码")
    public String queryQrCode(@PathVariable("tradingOrderNo") Long tradingOrderNo) {
        return this.nativePayService.queryQrCodeUrl(tradingOrderNo);
    }

}
