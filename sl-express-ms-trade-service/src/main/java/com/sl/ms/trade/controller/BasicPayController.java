package com.sl.ms.trade.controller;

import com.sl.ms.trade.domain.RefundRecordDTO;
import com.sl.ms.trade.domain.TradingDTO;
import com.sl.ms.trade.enums.TradingEnum;
import com.sl.ms.trade.service.BasicPayService;
import com.sl.transport.common.exception.SLException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.math.BigDecimal;

/**
 * 基础支付控制器
 */
@RequestMapping("basic")
@RestController
@Api(tags = "Basic支付")
public class BasicPayController {

    @Resource
    private BasicPayService basicPayService;

    /***
     * 统一收单线下交易查询
     * 该接口提供所有支付订单的查询，商户可以通过该接口主动查询订单状态，完成下一步的业务逻辑。
     *
     * @param tradingOrderNo 交易单号
     * @return 交易单
     */
    @PostMapping("query/{tradingOrderNo}")
    @ApiOperation(value = "查询统一收单线下交易", notes = "查询统一收单线下交易")
    @ApiImplicitParam(name = "tradingOrderNo", value = "交易单", required = true)
    public TradingDTO queryTrading(@PathVariable("tradingOrderNo") Long tradingOrderNo) {
        return this.basicPayService.queryTrading(tradingOrderNo);
    }

    /***
     * 统一收单交易退款接口
     * 当交易发生之后一段时间内，由于买家或者卖家的原因需要退款时，卖家可以通过退款接口将支付款退还给买家，
     * 将在收到退款请求并且验证成功之后，按照退款规则将支付款按原路退到买家帐号上。
     * @param tradingOrderNo 交易单号
     * @param refundAmount 退款金额
     * @return
     */
    @PostMapping("refund")
    @ApiOperation(value = "统一收单交易退款", notes = "统一收单交易退款")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "tradingOrderNo", value = "交易单号", required = true),
            @ApiImplicitParam(name = "refundAmount", value = "退款金额", required = true)
    })
    public void refundTrading(@RequestParam("tradingOrderNo") Long tradingOrderNo,
                              @RequestParam("refundAmount") BigDecimal refundAmount) {
        Boolean result = this.basicPayService.refundTrading(tradingOrderNo, refundAmount);
        if (!result) {
            throw new SLException(TradingEnum.BASIC_REFUND_COUNT_OUT_FAIL);
        }
    }


    /***
     * 统一收单交易退款查询接口
     * @param refundNo 退款交易单号
     * @return 退款记录
     */
    @PostMapping("refund/{refundNo}")
    @ApiOperation(value = "查询统一收单交易退款", notes = "查询统一收单交易退款")
    @ApiImplicitParam(name = "refundNo", value = "退款交易单", required = true)
    public RefundRecordDTO queryRefundDownLineTrading(@PathVariable("refundNo") Long refundNo) {
        return this.basicPayService.queryRefundTrading(refundNo);
    }

}
