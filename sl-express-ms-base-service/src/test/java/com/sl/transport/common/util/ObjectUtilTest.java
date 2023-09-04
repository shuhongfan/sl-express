package com.sl.transport.common.util;

import cn.hutool.core.clone.CloneSupport;
import cn.hutool.core.collection.CollUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class ObjectUtilTest {

	/**
	 * 比较两个对象是否相等
	 */
	@Test
	public void equalsTest() {
		Object a = null;
		Object b = null;
		log.info("是否相等：{}" , ObjectUtil.equals(a, b));
	}

	/**
	 * 计算对象长度，如果是字符串调用其length函数，集合类调用其size函数，数组调用其length属性，其他可遍历对象遍历计算长度
	 */
	@Test
	public void lengthTest() {
		int[] array = new int[]{1, 2, 3, 4, 5};
		int length = ObjectUtil.length(array);
		Assert.assertEquals(5, length);

		Map<String, String> map = new HashMap<>();
		map.put("a", "a1");
		map.put("b", "b1");
		map.put("c", "c1");
		length = ObjectUtil.length(map);
		Assert.assertEquals(3, length);
	}

	/**
	 * 对象中是否包含元素
	 */
	@Test
	public void containsTest() {
		int[] array = new int[]{1, 2, 3, 4, 5};

		final boolean contains = ObjectUtil.contains(array, 1);
		Assert.assertTrue(contains);
	}

	/**
	 * 克隆对象
	 */
	@Test
	public void cloneTest() {
		Obj obj = new Obj();
		Obj obj2 = ObjectUtil.clone(obj);
		Assert.assertEquals("OK", obj2.doSomeThing());
	}

	static class Obj extends CloneSupport<Obj> {
		public String doSomeThing() {
			return "OK";
		}
	}

	/**
	 * 将Object转为String
	 */
	@Test
	public void toStringTest() {
		ArrayList<String> strings = CollUtil.newArrayList("1", "2");
		String result = ObjectUtil.toString(strings);
		Assert.assertEquals("[1, 2]", result);
	}

	/**
	 * 是否为基本类型，包括包装类型和非包装类型
	 */
	@Test
	public void isBasicTypeTest() {
		int a = 1;
		final boolean basicType = ObjectUtil.isBasicType(a);
		Assert.assertTrue(basicType);
	}
}
