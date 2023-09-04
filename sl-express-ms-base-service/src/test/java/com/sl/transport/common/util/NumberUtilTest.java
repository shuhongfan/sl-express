package com.sl.transport.common.util;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.lang.Console;
import cn.hutool.core.util.NumberUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.util.Set;

/**
 * {@link NumberUtil} 单元测试类
 *
 * @author Looly
 *
 */
@Slf4j
public class NumberUtilTest {

	/**
	 * 提供精确的加法运算
	 */
	@Test
	public void addTest() {
		final Float a = 3.15f;
		final Double b = 4.22;
		final double result = NumberUtil.add(a, b).doubleValue();
		log.info(result + "");
	}

	@Test
	public void addTest2() {
		final double a = 3.15f;//精度丢失
		final double b = 4.22;
		final double result = NumberUtil.add(a, b);
		Assert.assertEquals(7.37, result, 0.01);
	}

	@Test
	public void addTest3() {
		final float a = 3.15f;
		final double b = 4.22;
		final double result = NumberUtil.add(a, b, a, b).doubleValue();
		Assert.assertEquals(14.74, result, 0);
	}

	@Test
	public void addTest4() {
		final BigDecimal result = NumberUtil.add(new BigDecimal("133"), new BigDecimal("331"));
		Assert.assertEquals(new BigDecimal("464"), result);
	}

	@Test
	public void addBlankTest(){
		final BigDecimal result = NumberUtil.add("123", " ");
		Assert.assertEquals(new BigDecimal("123"), result);
	}

	@Test
	public void isIntegerTest() {
		Assert.assertTrue(NumberUtil.isInteger("-12"));
		Assert.assertTrue(NumberUtil.isInteger("256"));
		Assert.assertTrue(NumberUtil.isInteger("0256"));
		Assert.assertTrue(NumberUtil.isInteger("0"));
		Assert.assertFalse(NumberUtil.isInteger("23.4"));
		Assert.assertFalse(NumberUtil.isInteger(null));
		Assert.assertFalse(NumberUtil.isInteger(""));
		Assert.assertFalse(NumberUtil.isInteger(" "));
	}

	@Test
	public void isLongTest() {
		Assert.assertTrue(NumberUtil.isLong("-12"));
		Assert.assertTrue(NumberUtil.isLong("256"));
		Assert.assertTrue(NumberUtil.isLong("0256"));
		Assert.assertTrue(NumberUtil.isLong("0"));
		Assert.assertFalse(NumberUtil.isLong("23.4"));
		Assert.assertFalse(NumberUtil.isLong(null));
		Assert.assertFalse(NumberUtil.isLong(""));
		Assert.assertFalse(NumberUtil.isLong(" "));
	}

	@Test
	public void isNumberTest() {
		Assert.assertTrue(NumberUtil.isNumber("28.55"));
		Assert.assertTrue(NumberUtil.isNumber("0"));
		Assert.assertTrue(NumberUtil.isNumber("+100.10"));
		Assert.assertTrue(NumberUtil.isNumber("-22.022"));
		Assert.assertTrue(NumberUtil.isNumber("0X22"));
	}

	@Test
	public void divTest() {
		final double result = NumberUtil.div(0, 1);
		Assert.assertEquals(0.0, result, 0);
	}

	@Test
	public void divBigDecimalTest() {
		final BigDecimal result = NumberUtil.div(BigDecimal.ZERO, BigDecimal.ONE);
		Assert.assertEquals(BigDecimal.ZERO, result.stripTrailingZeros());
	}

	@Test
	public void equalsTest() {
		Assert.assertTrue(NumberUtil.equals(new BigDecimal("0.00"), BigDecimal.ZERO));
	}

	@Test
	public void toBigDecimalTest() {
		final double a = 3.14;

		BigDecimal bigDecimal = NumberUtil.toBigDecimal(a);
		Assert.assertEquals("3.14", bigDecimal.toString());

		bigDecimal = NumberUtil.toBigDecimal("1,234.55");
		Assert.assertEquals("1234.55", bigDecimal.toString());

		bigDecimal = NumberUtil.toBigDecimal("1,234.56D");
		Assert.assertEquals("1234.56", bigDecimal.toString());
	}

	@Test
	public void maxTest() {
		final int max = NumberUtil.max(5,4,3,6,1);
		Assert.assertEquals(6, max);
	}

	@Test
	public void minTest() {
		final int min = NumberUtil.min(5,4,3,6,1);
		Assert.assertEquals(1, min);
	}

	@Test
	public void parseIntTest2() {
		// from 5.4.8 issue#I23ORQ@Gitee
		// 千位分隔符去掉
		final int v1 = NumberUtil.parseInt("1,482.00");
		Assert.assertEquals(1482, v1);
	}


	@Test
	public void mulTest(){
		final BigDecimal mul = NumberUtil.mul(new BigDecimal("10"), null);
		Assert.assertEquals(BigDecimal.ZERO, mul);
	}


	@Test
	public void toStrTest(){
		Assert.assertEquals("1", NumberUtil.toStr(new BigDecimal("1.0000000000")));
		Assert.assertEquals("0", NumberUtil.toStr(NumberUtil.sub(new BigDecimal("9600.00000"), new BigDecimal("9600.00000"))));
		Assert.assertEquals("0", NumberUtil.toStr(NumberUtil.sub(new BigDecimal("9600.0000000000"), new BigDecimal("9600.000000"))));
		Assert.assertEquals("0", NumberUtil.toStr(new BigDecimal("9600.00000").subtract(new BigDecimal("9600.000000000"))));
	}

	@Test
	public void isDoubleTest(){
		Assert.assertFalse(NumberUtil.isDouble(null));
		Assert.assertFalse(NumberUtil.isDouble(""));
		Assert.assertFalse(NumberUtil.isDouble("  "));
	}
}
