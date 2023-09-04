package com.sl.ms.trade.service;

import com.sl.ms.trade.enums.PayChannelEnum;

/**
 * @author zzj
 * @version 1.0
 */
public interface QRCodeService {

    /**
     * 生成二维码
     *
     * @param content 二维码中的内容
     * @return 图片base64数据
     */
    String generate(String content);

    /**
     * 生成二维码，带logo
     *
     * @param content    二维码中的内容
     * @param payChannel 付款渠道
     * @return 图片base64数据
     */
    String generate(String content, PayChannelEnum payChannel);

}
