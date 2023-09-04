package com.sl.transport.common.util;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.LineCaptcha;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;

/**
 * 直线干扰验证码单元测试
 *
 * @author looly
 */
@Slf4j
public class CaptchaTest {

	/**
	 * 生成验证码
	 */
	@Test
	public void lineCaptchaTest1() {
		// 定义图形验证码的长和宽
		LineCaptcha lineCaptcha = CaptchaUtil.createLineCaptcha(200, 100);
		Assert.assertNotNull(lineCaptcha.getCode());
		log.info("直线干扰验证码: {}", lineCaptcha.getCode());
		log.info("直线干扰验证码验证结果: {}",lineCaptcha.verify(lineCaptcha.getCode()));
	}
}
