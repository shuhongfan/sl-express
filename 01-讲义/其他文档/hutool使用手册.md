测试代码在`sl-express-ms-base-service`的测试用例中，[点击查看](http://git.sl-express.com/sl/sl-express-ms-base-service/src/master/src/test/java/com/sl/transport/common/util)。
# 1、[树结构工具-TreeUtil](https://hutool.cn/docs/#/core/%E8%AF%AD%E8%A8%80%E7%89%B9%E6%80%A7/%E6%A0%91%E7%BB%93%E6%9E%84/%E6%A0%91%E7%BB%93%E6%9E%84%E5%B7%A5%E5%85%B7-TreeUtil?id=%e6%a0%91%e7%bb%93%e6%9e%84%e5%b7%a5%e5%85%b7-treeutil)
### 构建Tree示例
```java
package com.sl.transport.common.util;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.lang.tree.Tree;
import cn.hutool.core.lang.tree.TreeNode;
import cn.hutool.core.lang.tree.TreeNodeConfig;
import cn.hutool.core.lang.tree.TreeUtil;
import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

import java.util.List;

@Slf4j
class TreeUtilTest {

    @Test
    void treeTest() {
        // 构建node列表
        List<TreeNode<String>> nodeList = CollUtil.newArrayList();

        nodeList.add(new TreeNode<>("1", "0", "系统管理", 5));
        nodeList.add(new TreeNode<>("11", "1", "用户管理", 222222));
        nodeList.add(new TreeNode<>("111", "11", "用户添加", 0));
        nodeList.add(new TreeNode<>("2", "0", "店铺管理", 1));
        nodeList.add(new TreeNode<>("21", "2", "商品管理", 44));
        nodeList.add(new TreeNode<>("221", "2", "添加商品", 2));

        //配置
        TreeNodeConfig treeNodeConfig = new TreeNodeConfig();
        // 自定义属性名 都要默认值的
        treeNodeConfig.setWeightKey("weight");
        treeNodeConfig.setIdKey("id");
        // 最大递归深度
        treeNodeConfig.setDeep(3);
        //构造树结构
        List<Tree<String>> treeNodes = TreeUtil.build(nodeList, "0",
                (treeNode, tree) -> {
                    tree.setId(treeNode.getId());
                    tree.setParentId(treeNode.getParentId());
                    tree.putAll(BeanUtil.beanToMap(treeNode));
                    tree.remove("bid");
                });
        
        log.info("treeNodes {}", JSONUtil.toJsonStr(treeNodes));
    }
}
```
### 输出结果
```json
[{
	"id": "2",
	"parentId": "0",
	"name": "店铺管理",
	"weight": 1,
	"children": [{
		"id": "221",
		"parentId": "2",
		"name": "添加商品",
		"weight": 2
	}, {
		"id": "21",
		"parentId": "2",
		"name": "商品管理",
		"weight": 44
	}]
}, {
	"id": "1",
	"parentId": "0",
	"name": "系统管理",
	"weight": 5,
	"children": [{
		"id": "11",
		"parentId": "1",
		"name": "用户管理",
		"weight": 222222,
		"children": [{
			"id": "111",
			"parentId": "11",
			"name": "用户添加",
			"weight": 0
		}]
	}]
}]
```

# 2、[Bean工具-BeanUtil](https://hutool.cn/docs/#/core/JavaBean/Bean%E5%B7%A5%E5%85%B7-BeanUtil?id=bean%e5%b7%a5%e5%85%b7-beanutil)
### 对象转Bean
```java
@Slf4j
public class BeanUtilTest {
    
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
}
```
### 输出结果
```
map是否包含名为SUBNAME的key false
```
# 3、[验证码工具-CaptchaUtil](https://hutool.cn/docs/#/captcha/%E6%A6%82%E8%BF%B0)
### 生成验证码
```java
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
```
### 输出结果
```
直线干扰验证码: 5ku0o
直线干扰验证码验证结果: true
```
# 4、[类型转换工具类-Convert](https://hutool.cn/docs/#/core/%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2/%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2%E5%B7%A5%E5%85%B7%E7%B1%BB-Convert?id=%e7%b1%bb%e5%9e%8b%e8%bd%ac%e6%8d%a2%e5%b7%a5%e5%85%b7%e7%b1%bb-convert)
### 转换值为指定类型
```java
/**
* 转换值为指定类型
*/
@Test
public void toObjectTest() {
    final Object result = Convert.convert(Object.class, "aaaa");
    log.info(result + "");
}
```
### 输出结果
```
aaaa
```
# 5、[对象工具-ObjectUtil](https://hutool.cn/docs/#/core/%E5%B7%A5%E5%85%B7%E7%B1%BB/%E5%AF%B9%E8%B1%A1%E5%B7%A5%E5%85%B7-ObjectUtil?id=%e5%af%b9%e8%b1%a1%e5%b7%a5%e5%85%b7-objectutil)
### 对象相等
```java
/**
* 比较两个对象是否相等
*/
@Test
public void equalsTest() {
    Object a = null;
    Object b = null;
    log.info("是否相等：{}" , ObjectUtil.equals(a, b));
}

```
### 输出结果
```
是否相等：true
```
# 6、[数字工具-NumberUtil](https://hutool.cn/docs/#/core/%E5%B7%A5%E5%85%B7%E7%B1%BB/%E6%95%B0%E5%AD%97%E5%B7%A5%E5%85%B7-NumberUtil?id=%e6%95%b0%e5%ad%97%e5%b7%a5%e5%85%b7-numberutil)
### 加法运算
```java
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
```
### 输出结果
```
7.37
```
# 7、[日期时间工具-DateUtil](https://hutool.cn/docs/#/core/%E6%97%A5%E6%9C%9F%E6%97%B6%E9%97%B4/%E6%97%A5%E6%9C%9F%E6%97%B6%E9%97%B4%E5%B7%A5%E5%85%B7-DateUtil?id=%e6%97%a5%e6%9c%9f%e6%97%b6%e9%97%b4%e5%b7%a5%e5%85%b7-dateutil)
### 当前时间
```java
/**
* 当前时间
*/
@Test
public void nowTest() {
    // 当前时间
    final Date date = DateUtil.date();
    Assert.assertNotNull(date);
    // 当前时间
    final Date date2 = DateUtil.date(Calendar.getInstance());
    Assert.assertNotNull(date2);
    // 当前时间
    final Date date3 = DateUtil.date(System.currentTimeMillis());
    Assert.assertNotNull(date3);

    // 当前日期字符串，格式：yyyy-MM-dd HH:mm:ss
    final String now = DateUtil.now();
    Assert.assertNotNull(now);
    // 当前日期字符串，格式：yyyy-MM-dd
    final String today = DateUtil.today();
    log.info(today);
}
```
### 输出结果
```
2023-03-10
```
# 8、[集合工具-CollUtil](https://hutool.cn/docs/#/core/%E9%9B%86%E5%90%88%E7%B1%BB/%E9%9B%86%E5%90%88%E5%B7%A5%E5%85%B7-CollUtil?id=%e9%9b%86%e5%90%88%e5%b7%a5%e5%85%b7-collutil)
### 自定义函数判断集合是否包含某类值
```java
/**
* 自定义函数判断集合是否包含某类值
*/
@Test
public void testPredicateContains() {
    final ArrayList<String> list = CollUtil.newArrayList("bbbbb", "aaaaa", "ccccc");
    log.info( "" + CollUtil.contains(list, s -> s.startsWith("a")));
    log.info( "" + CollUtil.contains(list, s -> s.startsWith("d")));
}
```
### 输出结果
```
true
false
```
# 9、[集合串行流工具-CollStreamUtil](https://hutool.cn/docs/#/core/%E9%9B%86%E5%90%88%E7%B1%BB/%E9%9B%86%E5%90%88%E4%B8%B2%E8%A1%8C%E6%B5%81%E5%B7%A5%E5%85%B7-CollStreamUtil?id=%e9%9b%86%e5%90%88%e4%b8%b2%e8%a1%8c%e6%b5%81%e5%b7%a5%e5%85%b7-collstreamutil)
### 将Collection转化为map
```java
/**
* 将Collection转化为map(value类型与collection的泛型不同)
*/
@Test
public void testToMap() {
    Map<Long, String> map = CollStreamUtil.toMap(null, Student::getStudentId, Student::getName);
    Assert.assertEquals(map, Collections.EMPTY_MAP);
    List<Student> list = new ArrayList<>();
    map = CollStreamUtil.toMap(list, Student::getStudentId, Student::getName);
    Assert.assertEquals(map, Collections.EMPTY_MAP);
    list.add(new Student(1, 1, 1, "张三"));
    list.add(new Student(1, 1, 2, "李四"));
    list.add(new Student(1, 1, 3, "王五"));
    map = CollStreamUtil.toMap(list, Student::getStudentId, Student::getName);
    Assert.assertEquals(map.get(1L), "张三");
    Assert.assertEquals(map.get(2L), "李四");
    Assert.assertEquals(map.get(3L), "王五");
    Assert.assertNull(map.get(4L));

    // 测试value为空时
    list.add(new Student(1, 1, 4, null));
    map = CollStreamUtil.toMap(list, Student::getStudentId, Student::getName);
    log.info(map.get(4L));
}
```
### 输出结果
```
null
```
# 10、[JSON工具-JSONUtil](https://hutool.cn/docs/#/json/JSONUtil?id=json%e5%b7%a5%e5%85%b7-jsonutil)
###  JSON字符串转JSONObject对象
```java
/**
* JSON字符串转JSONObject对象
*/
@Test
public void toJsonStrTest2() {
    final Map<String, Object> model = new HashMap<>();
    model.put("mobile", "17610836523");
    model.put("type", 1);

    final Map<String, Object> data = new HashMap<>();
    data.put("model", model);
    data.put("model2", model);

    final JSONObject jsonObject = JSONUtil.parseObj(data);

    log.info("是否相等{}", ObjectUtil.equals( "17610836523", jsonObject.getJSONObject("model").getStr("mobile")));
}
```
### 输出结果
```
是否相等true
```
# 11、[唯一ID工具-IdUtil](https://hutool.cn/docs/#/core/%E5%B7%A5%E5%85%B7%E7%B1%BB/%E5%94%AF%E4%B8%80ID%E5%B7%A5%E5%85%B7-IdUtil?id=%e5%94%af%e4%b8%80id%e5%b7%a5%e5%85%b7-idutil)
### 获取随机UUID
```java
/**
*获取随机UUID
*/
@Test
public void randomUUIDTest() {
    String randomUUID = IdUtil.randomUUID();
    log.info(randomUUID);
}
```
### 输出结果
```
e514518b-21d7-4918-9b34-792b21b0b64f
```
# 12、[枚举工具-EnumUtil](https://hutool.cn/docs/#/core/%E5%B7%A5%E5%85%B7%E7%B1%BB/%E6%9E%9A%E4%B8%BE%E5%B7%A5%E5%85%B7-EnumUtil?id=%e6%9e%9a%e4%b8%be%e5%b7%a5%e5%85%b7-enumutil)
### 枚举类中所有枚举对象的name列表
```java
public enum TestEnum{
    TEST1("type1"), TEST2("type2"), TEST3("type3");

    TestEnum(String type) {
        this.type = type;
    }

    private final String type;
    @SuppressWarnings("unused")
    private String name;

    public String getType() {
        return this.type;
    }

    public String getName() {
        return this.name;
    }
}

/**
* 枚举类中所有枚举对象的name列表
*/
@Test
public void getNamesTest() {
    List<String> names = EnumUtil.getNames(TestEnum.class);
    boolean equalList = CollUtil.isEqualList(CollUtil.newArrayList("TEST1", "TEST2", "TEST3"), names);
    log.info(equalList + "");
}
```
### 输出结果
```
true
```
