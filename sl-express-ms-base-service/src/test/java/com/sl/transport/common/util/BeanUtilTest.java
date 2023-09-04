package com.sl.transport.common.util;

import cn.hutool.core.annotation.Alias;
import cn.hutool.core.bean.copier.CopyOptions;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.map.MapUtil;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Bean工具单元测试
 *
 * @author Looly
 */
@Slf4j
public class BeanUtilTest {

	/**
	 * 对象转Bean
	 */
	@Test
	public void toBeanTest() {
		SubPerson person = new SubPerson();
		person.setAge(14);
		person.setOpenid("11213232");
		person.setName("测试A11");
		person.setSubName("sub名字");

		Map<?, ?> map = BeanUtil.toBean(person, Map.class);
		Assert.assertEquals("测试A11", map.get("name"));
		Assert.assertEquals(14, map.get("age"));
		Assert.assertEquals("11213232", map.get("openid"));
		// static属性应被忽略
		log.info("map是否包含名为SUBNAME的key {}", map.containsKey("SUBNAME"));
	}

	/**
	 * Map转bean
	 */
	@Test
	public void mapToBeanTest() {
		final HashMap<String, Object> map = MapUtil.newHashMap();
		map.put("a_name", "Joe");
		map.put("b_age", 12);

		// 别名，用于对应bean的字段名
		final HashMap<String, String> mapping = MapUtil.newHashMap();
		mapping.put("a_name", "name");
		mapping.put("b_age", "age");

		final Person person = BeanUtil.toBean(map, Person.class, CopyOptions.create().setFieldMapping(mapping));
		Assert.assertEquals("Joe", person.getName());
		Assert.assertEquals(12, person.getAge());
	}

	/**
	 * bean转map
	 */
	@Test
	public void beanToMapTest() {
		final SubPerson person = new SubPerson();
		person.setAge(14);
		person.setOpenid("11213232");
		person.setName("测试A11");
		person.setSubName("sub名字");

		final Map<String, Object> map = BeanUtil.beanToMap(person);

		Assert.assertEquals("测试A11", map.get("name"));
		Assert.assertEquals(14, map.get("age"));
		Assert.assertEquals("11213232", map.get("openid"));
		// static属性应被忽略
		Assert.assertFalse(map.containsKey("SUBNAME"));
	}

	/**
	 * bean转map
	 */
	@Test
	public void beanToMapTest2() {
		final SubPerson person = new SubPerson();
		person.setAge(14);
		person.setOpenid("11213232");
		person.setName("测试A11");
		person.setSubName("sub名字");

		final Map<String, Object> map = BeanUtil.beanToMap(person, true, true);
		Assert.assertEquals("sub名字", map.get("sub_name"));
	}

	// -----------------------------------------------------------------------------------------------------------------
	@Getter
	@Setter
	public static class SubPerson extends Person {

		public static final String SUBNAME = "TEST";

		private UUID id;
		private String subName;
		private Boolean slow;
		private LocalDateTime date;
		private LocalDate date2;
	}

	@Getter
	@Setter
	public static class Person {
		private String name;
		private int age;
		private String openid;
	}

	/**
	 * 复制Bean对象属性
	 */
	@Test
	public void copyBeanToBeanTest() {
		// 测试在copyProperties方法中alias是否有效
		final Food info = new Food();
		info.setBookID("0");
		info.setCode("123");
		final HllFoodEntity entity = new HllFoodEntity();
		BeanUtil.copyProperties(info, entity);
		Assert.assertEquals(info.getBookID(), entity.getBookId());
		Assert.assertEquals(info.getCode(), entity.getCode2());
	}

	/**
	 * 按照Bean对象属性创建对应的Class对象
	 */
	@Test
	public void copyBeanTest() {
		final Food info = new Food();
		info.setBookID("0");
		info.setCode("123");
		final Food newFood = BeanUtil.copyProperties(info, Food.class, "code");
		Assert.assertEquals(info.getBookID(), newFood.getBookID());
		Assert.assertNull(newFood.getCode());
	}

	@Data
	public static class Food {
		@Alias("bookId")
		private String bookID;
		private String code;
	}

	@Data
	public static class HllFoodEntity implements Serializable {
		private static final long serialVersionUID = 1L;

		private String bookId;
		@Alias("code")
		private String code2;
	}

	/**
	 * 解析Bean中的属性值
	 */
	@Test
	public void setPropertiesTest() {
		final Map<String, Object> resultMap = MapUtil.newHashMap();
		BeanUtil.setProperty(resultMap, "codeList[0].name", "张三");
		Assert.assertEquals("{codeList=[{name=张三}]}", resultMap.toString());
	}

	/**
	 * 复制集合中的Bean属性
	 */
	@Test
	public void copyListTest() {
		final Student student = new Student();
		student.setName("张三");
		student.setAge(123);
		student.setNo(3158L);

		final Student student2 = new Student();
		student.setName("李四");
		student.setAge(125);
		student.setNo(8848L);

		final List<Student> studentList = ListUtil.of(student, student2);
		final List<Person> people = BeanUtil.copyToList(studentList, Person.class);

		Assert.assertEquals(studentList.size(), people.size());
		for (int i = 0; i < studentList.size(); i++) {
			Assert.assertEquals(studentList.get(i).getName(), people.get(i).getName());
			Assert.assertEquals(studentList.get(i).getAge(), people.get(i).getAge());
		}

	}


	@Data
	public static class Student implements Serializable{
		private static final long serialVersionUID = 1L;

		String name;
		int age;
		Long no;
	}

}
