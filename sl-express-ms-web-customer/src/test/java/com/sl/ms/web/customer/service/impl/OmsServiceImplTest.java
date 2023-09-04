package com.sl.ms.web.customer.service.impl;

import cn.hutool.core.img.ImgUtil;
import cn.hutool.extra.qrcode.QrCodeUtil;
import com.google.zxing.BarcodeFormat;
import com.sl.ms.user.api.MemberFeign;
import com.sl.ms.web.customer.vo.oms.TrackVO;
import com.sl.ms.web.customer.vo.oms.pay.TradeLaunchVO;
import com.sl.ms.web.customer.vo.oms.pay.TradeResponseVO;
import com.sl.transport.common.util.UserThreadLocal;
import com.sl.transport.common.vo.AuthUserInfo;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.awt.image.BufferedImage;
import java.io.File;
import java.math.BigDecimal;

@Slf4j
@SpringBootTest
class OmsServiceImplTest {


    @Test
    void getBarcode() {
        BufferedImage image = QrCodeUtil.generate("SL1000000000610", BarcodeFormat.CODE_39, 900, 150);
        ImgUtil.write(image, new File("d:/qrcode.png"));
        String s = ImgUtil.toBase64DataUri(image, ImgUtil.IMAGE_TYPE_PNG);
        log.info(s);
    }

    @Resource
    private OmsServiceImpl omsService;

    @Mock
    private MemberFeign memberFeign;

    @Test
    void tracks() {
        omsService.tracks(null);
    }

    @Test
    void pay() {
        TradeLaunchVO tradeLaunchVO = TradeLaunchVO.builder()
//                .enterpriseId("1561414331")
                .payMethod(2)
                .productOrderNo("1552194476668968961")
                .tradingAmount(new BigDecimal("0.1"))
                .build();
        AuthUserInfo authUserInfo = new AuthUserInfo();
        authUserInfo.setUserId(1551748948868157442L);
        UserThreadLocal.set(authUserInfo);
        TradeResponseVO pay = omsService.pay(tradeLaunchVO);
        log.info(pay + "");
    }

    @Test
    public void testName() {
        TrackVO sl1000000001164 = omsService.findTrackById("SL1000000001164");
        log.info(sl1000000001164 + "");
    }
}