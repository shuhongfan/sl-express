# 课程安排
- 路线规划需求分析
- 路线规划实现方案分析
- Neo4j的快速入门
- 学习Cypher入门
- 学习Spring Data Neo4j
# 1、背景说明
在实现运费微服务中，介于你出色的表现，现在项目三组承接了一个新的开发任务，需要开发运输路线微服务，这将是一个全新微服务，开发经理决定让你来负责这个微服务的开发。
![w.gif](https://cdn.nlark.com/yuque/0/2022/gif/27683667/1660810019036-a7f8a82f-f14d-4c73-b03a-e959991dbcb9.gif#averageHue=%23ece2cd&clientId=ud24784c6-50cf-4&errorMessage=unknown%20error&from=paste&height=145&id=u78c3c36c&name=w.gif&originHeight=240&originWidth=240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=87315&status=error&style=none&taskId=u5ae7f66c-510a-471b-970e-fe6de009218&title=&width=145.45453704749963)
# 2、需求分析
首先想个问题，用户小王在神领物流用户端下了个订单，是从上海发往北京的包裹，神领物流接收这个单子后，是如何进行运输的呢？是直接开一辆车去送吗？还是需要中转？需要中转多少次呢？怎么样的中转成本是最低的？
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660818375310-17900f1a-aa55-47e5-b38d-835c23ed5841.png#averageHue=%23f7f1f1&clientId=u683acd77-d2bc-4&errorMessage=unknown%20error&from=paste&height=568&id=uad74bda5&name=image.png&originHeight=937&originWidth=621&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49322&status=error&style=shadow&taskId=u14f24222-4e7c-4631-a09a-0dc5894e5eb&title=&width=376.3636146104053)
## 2.1、路线分析
假设神领物流系统有这些运输路线数据：

| **编号** | **名称** | **起点** | **终点** |
| --- | --- | --- | --- |
| 1001 | 迪士尼到浦东转运 | 迪士尼营业部 | 浦东新区转运中心 |
| 1002 | 浦东到上海转运 | 浦东新区转运中心 | 上海转运中心 |
| 1003 | 闵行到上海转运 | 闵行区转运中心 | 上海转运中心 |
| 1004 | 莘庄到闵行转运 | 莘庄营业部 | 闵行区转运中心 |
| 1005 | 京沪线 | 上海转运中心 | 北京转运中心 |
| 1006 | 沪杭线 | 上海转运中心 | 杭州转运中心 |
| 1007 | 北京到昌平 | 北京转运中心 | 昌平区转运中心 |
| 1008 | 昌平到金燕龙 | 昌平区转运中心 | 金燕龙营业部 |
| 1009 | 昌平到回龙观 | 昌平区转运中心 | 回龙观营业部 |
| 1010 | 北京到海淀 | 北京转运中心 | 海淀区转运中心 |
| 1011 | 杭州到北京 | 杭州转运中心 | 北京转运中心 |
| …… | …… | …… | …… |

按照上面的订单，是由【上海浦东迪士尼】发往【北京昌平金燕龙】，有直达的路线吗？其实是没有的，实际上很少会有【网点↔网点】的直达路线的，这样成本太高了，所以完成一次运输都是通过各个【转运】完成的。
如果参考上面的路线数据，可以找出两条转运路线：
:::info
路线1：迪士尼营业部 -> 浦东新区转运中心 -> 上海转运中心 -> 北京转运中心 -> 昌平区转运中心 -> 金燕龙营业部
路线2：迪士尼营业部-> 浦东新区转运中心 -> 上海转运中心 -> 杭州转运中心 -> 北京转运中心 -> 昌平区转运中心 -> 金燕龙营业部
:::
你找的路线结果是这样的吗？你是如何找出的？
## 2.2、问题分析
如果我们基于上面的数据表进行查找路线时，基本上都是一条一条的数据过，看是否能够【链接】起来，直到目的地。
这样的查找有什么问题吗？
想象一下，如果这个表的数据变的很大的时候呢？比如说，有100、1000、10000、……条数据的时候，查找会非常慢，而且我们编写代码也会非常的复杂。
显然，这个并不是好的解决方案。有没有什么好的解决呢？
## 2.3、问题解决
如果将上述的路线数据把表格的形式转化成图的形式，看是否能够解决问题：
![](https://cdn.nlark.com/yuque/0/2022/jpeg/27683667/1660828070275-9d586bb1-9668-476e-8ff1-ef9d4635b1bb.jpeg)
可以看出，如果将表格的数据用图形的方式展现出来的话，就很容易能找到两条运输路线。
:::info
路线1：迪士尼营业部 -> 浦东新区转运中心 -> 上海转运中心 -> 北京转运中心 -> 昌平区转运中心 -> 金燕龙营业部
路线2：迪士尼营业部-> 浦东新区转运中心 -> 上海转运中心 -> 杭州转运中心 -> 北京转运中心 -> 昌平区转运中心 -> 金燕龙营业部
:::
想一想，哪条路线好一些呢？显然，路线1要优于路线2，因为路线1比路线2的转运次数更少一些。
可见，使用图形的方式要比表达的方式展现更清晰一些，就是所谓的“一图胜千言万语”，这就给我们解决问题带来了新的思路，如果数据能够按照图形的方式存储，那么对于运输路线的计算就会更高效一些。
有没有一种技术是以“图”的方式存储数据呢？ 答案是有的，那就是图数据库。
# 3、Neo4j快速入门
## 3.1、什么是Neo4j？
Neo4j是用Java实现的开源NoSQL图数据库。从2003年开始开发，2007年正式发布第一版，其源码托管于GitHtb。Neo4j作为图数据库中的代表产品，已经在众多的行业项目中进行了应用，如：网络管理、软件分析、组织和项目管理、社交项目等方面。
官网：
Neo4j实现了专业数据库级别的图数据模型的存储，提供了完整的数据库特性，包括ACID事务的支持、集群的支持、备份和故障转移等。
Neo4j提供了申明式的查询语言Cypher，它类似于关系型数据库中的SQL语言，其具有表现力丰富、使用简单、查询效率高、高扩展性等特点。
它存储的数据大致是这样的：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660904126024-6f3a7a06-f6ff-4ffe-aaed-3e9afe9623b9.png#averageHue=%23f8fbfe&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=442&id=u7c087b39&name=image.png&originHeight=729&originWidth=1036&originalType=binary&ratio=1&rotation=0&showTitle=false&size=124287&status=error&style=shadow&taskId=u82002fea-fe83-453f-aba4-73d90cb28a5&title=&width=627.8787515883733)
其中，紫色圆圈是【人】数据，橙色圆圈是【电影】数据，表示人与电影之间参演或导演的数据关系。
## 3.2、版本说明
Neo4j有两个不同的版本，分别是：

- 社区版（Community Edition） 
   - 具备了基本功能的版本，功能较为完整，没有提供企业服务。
- 企业版（Experience Edition） 
   - 企业版相对于社区版而言，增加了一些功能，如：集群、高级监控、高级缓存、在线备份等功能。
:::info
建议：开发环境使用社区版，生产环境使用企业版。
说明：企业版从3.2版本开始支持集群，无地理位置限制并且可以做到事务的ACID特性。
:::
Neo4j企业·参考：[http://neo4j.com.cn/topic/59b0a3f59fe13f5e0a2212b2](http://neo4j.com.cn/topic/59b0a3f59fe13f5e0a2212b2)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660905387593-d61a1da0-968f-40b3-aafa-81dc76f8aef9.png#averageHue=%23fcfbfb&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=442&id=u87aa2ca7&name=image.png&originHeight=729&originWidth=828&originalType=binary&ratio=1&rotation=0&showTitle=false&size=136736&status=error&style=shadow&taskId=u71625e53-c080-437c-896d-ec76f71da5c&title=&width=501.8181528138737)
## 3.3、部署安装
Neo4j支持众多平台的部署安装，如：Windows、Mac、Linux等系统。Neo4j是基于Java平台的，所以部署安装前先保证已经安装了Java虚拟机。
在神领物流项目中，我们采用docker的方式进行安装。安装命令如下：
```shell
docker run \
-d \
--restart=always \
--name neo4j \
-p 7474:7474 \
-p 7687:7687 \
-v neo4j:/data \
neo4j:4.4.5

# 7474是web管理工具的端口，7687是neo4j协议端口进行数据通信
```
打开浏览器，输入地址：[http://neo4j.sl-express.com/browser/](http://neo4j.sl-express.com/browser/)
已经将登录密码改成了：neo4j123
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660906873154-d350e020-aa39-4cd4-931b-6dba1866ba30.png#averageHue=%23f5f9fe&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=333&id=uc54878e8&name=image.png&originHeight=550&originWidth=1256&originalType=binary&ratio=1&rotation=0&showTitle=false&size=50119&status=error&style=shadow&taskId=u37b4bf6c-e9ee-4f75-a6f5-f74ac8baaa5&title=&width=761.2120772152481)
如果是第一次登录，默认密码是：neo4j，首次登录需要重置密码：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660906927712-11d47f58-d3b5-4058-bdb7-637bf691625e.png#averageHue=%23fdfdfc&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=216&id=u2ea29301&name=image.png&originHeight=356&originWidth=1159&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51249&status=error&style=shadow&taskId=ud0f8ee48-0978-45e1-b0ee-390686274a6&title=&width=702.424201825217)
登录成功后可以看到如下界面：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660907356412-40d39816-350a-42dd-bf60-af8b29efcb6b.png#averageHue=%239ca6a3&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=554&id=u6a78ea83&name=image.png&originHeight=914&originWidth=1904&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134090&status=error&style=shadow&taskId=ub03e2301-991f-4b34-bd2a-8dc37ad622b&title=&width=1153.939327243497)
## 3.4、Neo4j web 工具介绍
Neo4j提供了web工具，可以对neo4j进行CRUD的操作。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660982870569-fcc0b789-c17e-4edd-bd88-07db70f7a492.png#averageHue=%239aa6a2&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=549&id=ucb0066ea&name=image.png&originHeight=906&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=151022&status=error&style=shadow&taskId=ua7b62584-fcf4-458b-b66e-6504d9b75f5&title=&width=1163.636296379997)
## 3.5、体验Neo4j
下面我们通过官方提供的电影数据体验下Neo4j：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660984116801-7299bd8e-0afa-466c-8ae1-01361663f5f1.png#averageHue=%23f5f5f5&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=245&id=u14b43abf&name=image.png&originHeight=405&originWidth=405&originalType=binary&ratio=1&rotation=0&showTitle=true&size=31769&status=error&style=shadow&taskId=ub958656b-c5dc-4a36-a4af-06b9e6c7f72&title=%E7%82%B9%E5%87%BB%E3%80%90Open%20guide%E3%80%91&width=245.45453126765563 "点击【Open guide】")
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660984488731-3d094f48-6897-4b39-8828-a7777d44ce1b.png#averageHue=%23363841&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=364&id=ud9eb5da4&name=image.png&originHeight=600&originWidth=831&originalType=binary&ratio=1&rotation=0&showTitle=true&size=80388&status=error&style=shadow&taskId=u6ad1e1ac-22b0-4c9e-b5e5-42c259bc9b6&title=%E7%A4%BA%E4%BE%8B%E4%B8%AD%E5%8C%85%E5%90%AB%EF%BC%9A%E5%8A%A0%E8%BD%BD%E6%95%B0%E6%8D%AE%E3%80%81%E5%88%9B%E5%BB%BA%E7%B4%A2%E5%BC%95%E3%80%81%E6%9F%A5%E8%AF%A2%E7%AD%89&width=503.63633452696746 "示例中包含：加载数据、创建索引、查询等")
### 3.5.1、加载数据
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660984595476-9d7508cc-5d95-45aa-aaa0-1b1d5e038793.png#averageHue=%2334373f&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=518&id=u0acdcae3&name=image.png&originHeight=855&originWidth=740&originalType=binary&ratio=1&rotation=0&showTitle=false&size=126242&status=error&style=shadow&taskId=u10bb454e-87d7-41a5-ba0b-df4965dcbb7&title=&width=448.4848225631238)
创建数据语句会自动写入到Cypher语句输入框中，点击运行：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660985034328-ee1b703f-5ffe-4971-98c0-e30b6a64a1fc.png#averageHue=%23cbaf5e&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=269&id=u62c08f65&name=image.png&originHeight=444&originWidth=1074&originalType=binary&ratio=1&rotation=0&showTitle=false&size=95344&status=error&style=shadow&taskId=u9929d522-950e-47ec-bf91-86758fdcb7a&title=&width=650.9090532875608)
创建成功：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660985281324-6e7d0174-a4c3-4773-b41f-ed65a8e908ff.png#averageHue=%23f5f1f2&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=455&id=u3772c97f&name=image.png&originHeight=751&originWidth=1041&originalType=binary&ratio=1&rotation=0&showTitle=false&size=136819&status=error&style=shadow&taskId=uaefb7079-b889-4100-af1c-3893fb4dbe5&title=&width=630.9090544435296)
### 3.5.2、查询数据
查询【Tom Hanks】参演了哪些电影：
```cypher
MATCH (tom:Person {name: "Tom Hanks"})-[:ACTED_IN]->(tomHanksMovies) RETURN tom,tomHanksMovies
```
查询结果：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660988085362-92b10aa3-68d2-483c-8871-7aca9806c582.png#averageHue=%23f7fafd&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=378&id=u015ac530&name=image.png&originHeight=623&originWidth=775&originalType=binary&ratio=1&rotation=0&showTitle=false&size=93051&status=error&style=shadow&taskId=uaebcda68-0507-4a21-833e-59606540532&title=&width=469.69694254921757)
## 3.6、数据结构
Neo4j中采用节点、属性、关系、标签来存储数据。如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660988085362-92b10aa3-68d2-483c-8871-7aca9806c582.png#averageHue=%23f7fafd&clientId=u27f62ad8-c256-4&errorMessage=unknown%20error&from=paste&height=378&id=KFvP4&name=image.png&originHeight=623&originWidth=775&originalType=binary&ratio=1&rotation=0&showTitle=false&size=93051&status=error&style=shadow&taskId=uaebcda68-0507-4a21-833e-59606540532&title=&width=469.69694254921757)

- 节点 
   - 存储实体数据，在上图中，演员、电影都是节点。
   - 可以理解为关系型数据库中的表。
- 关系 
   - 存储节点之间的关系。
   - 关系只能有一个类型，必须有开始节点和结束节点以及指向。
   - 关系可以自我循环引用，但是两头永远不能为空。
- 属性 
   - 节点和关系都可以有属性，它是由键值对组成的。
   - 节点的属性可以理解为关系型数据库中的字段。
   - 关系中的属性进一步的明确了关系。
- 标签 
   - 标签是对节点的分类，这样使得构建Neo4j数据模型更加简单。
   - 在上面的电影案例中，Movie、Person就是标签。
# 4、Cypher入门
Cypher是Neo4j的查询语言，类似与关系型数据库中的SQL，一些关键词来源于SQL，比如：CREATE、WHERE、RETRUN等。下面我们一起学习Cypher的基本语句。
:::info
Cypher语句的关键字对大小写不敏感。
:::
## 4.1、创建数据
在Neo4j中使用CREATE命令来创建节点、关系、属性数据。语法如下：
```cypher
//查询所有数据
MATCH (n) RETURN n
//删除所有节点和关系，慎用！
MATCH (n) DETACH DELETE n

CREATE (n {name: $value}) RETURN n   //创建节点,该节点具备name属性，n为该节点的变量,创建完成后返回该节点
CREATE (n:$Tag {name: $value}) //创建节点，指定标签
CREATE (n)-[r:KNOWS]->(m)  //创建n指向m的关系，并且指定关系类型为：KNOWS
                 
//示例
CREATE (n {name:'迪士尼营业部'})
CREATE (n:AGENCY {name:'航头营业部'})

//创建浦东新区转运中心、上海转运中心节点，并且创建关系为：IN_LINE，创建完成后返回节点和关系
//TLT -> Two Level Transport（二级转运中心）
//OLT -> One Level Transport（一级转运中心）
CREATE (n:TLT {name:'浦东新区转运中心'}) -[r:IN_LINE]-> (m:OLT {name:'上海转运中心'}) RETURN n,r,m

//关系也是可以反向，并且可以为关系中指定属性
CREATE (n:TLT {name:'浦东新区转运中心'}) <-[r:OUT_LINE]- (m:OLT {name:'上海转运中心'}) RETURN n,r,m
```
## 4.2、查询数据
Cypher查询语法如下：
```cypher
[MATCH WHERE]  //条件查询
[WITH [ORDER BY] [SKIP] [LIMIT]] //查询的结果以管道的形式传递给下面的语句，聚合查询必须使用WITH
RETURN [ORDER BY] [SKIP] [LIMIT] //返回、排序、跳过、返回个数
```
### 4.2.1、构造数据
```cypher
CREATE (北京市转运中心:OLT {bid: 8001, name: "北京市转运中心", address: "北京市转运中心", location : point({latitude:39.904179, longitude:116.407387})})
CREATE (上海市转运中心:OLT {bid: 8002, name: "上海市转运中心", address: "上海市转运中心", location : point({latitude:31.230525, longitude:121.473667})})
CREATE (南京市转运中心:OLT {bid: 8003, name: "南京市转运中心", address: "南京市转运中心", location : point({latitude:32.059344, longitude:118.796624})})
CREATE (太原市转运中心:OLT {bid: 8004, name: "太原市转运中心", address: "太原市转运中心", location : point({latitude:37.870451, longitude:112.549656})})
CREATE (郑州市转运中心:OLT {bid: 8005, name: "郑州市转运中心", address: "郑州市转运中心", location : point({latitude:34.745551, longitude:113.624321})})

CREATE
    (北京市转运中心)-[:IN_LINE {cost:10684.9}]->(上海市转运中心),
    (北京市转运中心)<-[:OUT_LINE {cost:10684.9}]-(上海市转运中心),
    (北京市转运中心)-[:IN_LINE {cost:8993.1}]->(南京市转运中心),
    (北京市转运中心)<-[:OUT_LINE {cost:8993.1}]-(南京市转运中心),
    (南京市转运中心)-[:IN_LINE {cost:2699.4}]->(上海市转运中心),
    (南京市转运中心)<-[:OUT_LINE {cost:2699.4}]-(上海市转运中心),
    (太原市转运中心)-[:IN_LINE {cost:3609.7}]->(郑州市转运中心),
    (太原市转运中心)<-[:OUT_LINE {cost:3609.7}]-(郑州市转运中心),
    (郑州市转运中心)-[:IN_LINE {cost:5659.7}]->(南京市转运中心),
    (郑州市转运中心)<-[:OUT_LINE {cost:5659.7}]-(南京市转运中心)

CREATE (昌平区转运中心:TLT {bid: 90001, name: "昌平区转运中心", address: "昌平区转运中心", location : point({latitude:40.220952, longitude:116.231034})})
CREATE (北京市昌平区新龙城:AGENCY {bid: 100260, name: "北京市昌平区新龙城", address: "龙跃苑四区3号楼底商", phone : "010-53049073,010-53576707", location : point({latitude:40.07544443596149, longitude:116.3470535709328})})
CREATE
    (北京市昌平区新龙城)-[:IN_LINE {cost:189.7}]->(昌平区转运中心),
    (北京市昌平区新龙城)<-[:OUT_LINE {cost:189.7}]-(昌平区转运中心)
CREATE (北京市昌平区定泗路:AGENCY {bid: 100280, name: "北京市昌平区定泗路", address: "北七家镇定泗路苍龙街交叉口", phone : "010-86392987", location : point({latitude:40.11765281246394, longitude:116.37212849638287})})
CREATE
    (北京市昌平区定泗路)-[:IN_LINE {cost:166.2}]->(昌平区转运中心),
    (北京市昌平区定泗路)<-[:OUT_LINE {cost:166.2}]-(昌平区转运中心)
CREATE (海淀区转运中心:TLT {bid: 90002, name: "海淀区转运中心", address: "海淀区转运中心", location : point({latitude:39.959893, longitude:116.2977})})
CREATE (北京市海淀区小营:AGENCY {bid: 100347, name: "北京市海淀区小营", address: "北京市昌平区回龙观街道金燕龙大厦停车场", phone : "010-86483817,010-86483817,010-86483817", location : point({latitude:40.06177798692319, longitude:116.32706587559049})})
CREATE
    (北京市海淀区小营)-[:IN_LINE {cost:116.1}]->(海淀区转运中心),
    (北京市海淀区小营)<-[:OUT_LINE {cost:116.1}]-(海淀区转运中心)
CREATE (北京市海淀区万泉河:AGENCY {bid: 100227, name: "北京市海淀区万泉河", address: "北京市海淀区四季青镇杏石口路47号院", phone : "18521852356", location : point({latitude:39.94882822425318, longitude:116.25707017441161})})
CREATE
    (北京市海淀区万泉河)-[:IN_LINE {cost:36.8}]->(海淀区转运中心),
    (北京市海淀区万泉河)<-[:OUT_LINE {cost:36.8}]-(海淀区转运中心)
CREATE
    (昌平区转运中心)-[:IN_LINE {cost:383.3}]->(北京市转运中心),
    (昌平区转运中心)<-[:OUT_LINE {cost:383.3}]-(北京市转运中心),
    (海淀区转运中心)-[:IN_LINE {cost:112.3}]->(北京市转运中心),
    (海淀区转运中心)<-[:OUT_LINE {cost:112.3}]-(北京市转运中心)
CREATE (浦东新区转运中心:TLT {bid: 90003, name: "浦东新区转运中心", address: "浦东新区转运中心", location : point({latitude:31.221461, longitude:121.544346})})
CREATE (上海市浦东新区南汇:AGENCY {bid: 210057, name: "上海市浦东新区南汇", address: "园春路8号", phone : "18821179169", location : point({latitude:31.035240152911637, longitude:121.73459966751048})})
CREATE
    (上海市浦东新区南汇)-[:IN_LINE {cost:275.4}]->(浦东新区转运中心),
    (上海市浦东新区南汇)<-[:OUT_LINE {cost:275.4}]-(浦东新区转运中心)
CREATE (上海市浦东新区周浦:AGENCY {bid: 210127, name: "上海市浦东新区周浦", address: "川周公路3278-8号", phone : "021-68060322", location : point({latitude:31.132409729356993, longitude:121.59815370294322})})
CREATE
    (上海市浦东新区周浦)-[:IN_LINE {cost:111.6}]->(浦东新区转运中心),
    (上海市浦东新区周浦)<-[:OUT_LINE {cost:111.6}]-(浦东新区转运中心)
CREATE (奉贤区转运中心:TLT {bid: 90004, name: "奉贤区转运中心", address: "奉贤区转运中心", location : point({latitude:30.918406, longitude:121.473945})})
CREATE (上海市奉贤区东部:AGENCY {bid: 210017, name: "上海市奉贤区东部", address: "上上海市奉贤区洪庙镇洪兰路351", phone : "021-57171717", location : point({latitude:30.917752751719863, longitude:121.67587819184698})})
CREATE
    (上海市奉贤区东部)-[:IN_LINE {cost:192.9}]->(奉贤区转运中心),
    (上海市奉贤区东部)<-[:OUT_LINE {cost:192.9}]-(奉贤区转运中心)
CREATE (上海市奉贤区青村:AGENCY {bid: 210442, name: "上海市奉贤区青村", address: "姚家村1127号", phone : "021-57566663,021-57566606", location : point({latitude:30.916946897994983, longitude:121.57954144207972})})
CREATE
    (上海市奉贤区青村)-[:IN_LINE {cost:100.9}]->(奉贤区转运中心),
    (上海市奉贤区青村)<-[:OUT_LINE {cost:100.9}]-(奉贤区转运中心)
CREATE
    (浦东新区转运中心)-[:IN_LINE {cost:68.0}]->(上海市转运中心),
    (浦东新区转运中心)<-[:OUT_LINE {cost:68.0}]-(上海市转运中心),
    (奉贤区转运中心)-[:IN_LINE {cost:347.4}]->(上海市转运中心),
    (奉贤区转运中心)<-[:OUT_LINE {cost:347.4}]-(上海市转运中心)
CREATE (玄武区转运中心:TLT {bid: 90004, name: "玄武区转运中心" , location : point({latitude:32.048644, longitude:118.797779})})
CREATE (江苏省南京市玄武区紫金墨香苑:AGENCY {bid: 25073, name: "江苏省南京市玄武区紫金墨香苑", address: "栖霞区燕尧路100号", phone : "025-58765331,025-83241955,025-83241881", location : point({latitude:32.117016089520305, longitude:118.86319310255513})})
CREATE
    (江苏省南京市玄武区紫金墨香苑)-[:IN_LINE {cost:98.0}]->(玄武区转运中心),
    (江苏省南京市玄武区紫金墨香苑)<-[:OUT_LINE {cost:98.0}]-(玄武区转运中心)
CREATE (江苏省南京市玄武区长江路:AGENCY {bid: 25023, name: "江苏省南京市玄武区长江路", address: "观音阁10号", phone : "18521133265,18695799166", location : point({latitude:32.04803554410631, longitude:118.79190455263355})})
CREATE
    (江苏省南京市玄武区长江路)-[:IN_LINE {cost:5.6}]->(玄武区转运中心),
    (江苏省南京市玄武区长江路)<-[:OUT_LINE {cost:5.6}]-(玄武区转运中心)
CREATE
    (玄武区转运中心)-[:IN_LINE {cost:12.0}]->(南京市转运中心),
    (玄武区转运中心)<-[:OUT_LINE {cost:12.0}]-(南京市转运中心)

CREATE (小店区转运中心:TLT {bid: 90005, name: "小店区转运中心" , location : point({latitude:37.736865, longitude:112.565524})})
CREATE (山西省太原市青龙:AGENCY {bid: 351068, name: "山西省太原市青龙", address: "长治路33号经典家园停车场内13号商铺", phone : "0351-2025888", location : point({latitude:37.83589608758359, longitude:112.56059258109424})})
CREATE
    (山西省太原市青龙)-[:IN_LINE {cost:110.3}]->(小店区转运中心),
    (山西省太原市青龙)<-[:OUT_LINE {cost:110.3}]-(小店区转运中心)
CREATE (山西省太原市长风街:AGENCY {bid: 351045, name: "山西省太原市长风街", address: "平阳路104号省农机公司院内", phone : "18636100730", location : point({latitude:37.809964384001226, longitude:112.55299317699505})})
CREATE
    (山西省太原市长风街)-[:IN_LINE {cost:82.1}]->(小店区转运中心),
    (山西省太原市长风街)<-[:OUT_LINE {cost:82.1}]-(小店区转运中心)
CREATE
    (小店区转运中心)-[:IN_LINE {cost:149.4}]->(太原市转运中心),
    (小店区转运中心)<-[:OUT_LINE {cost:149.4}]-(太原市转运中心)

CREATE (中原区转运中心:TLT {bid: 90006, name: "中原区转运中心" , location : point({latitude:34.74828, longitude:113.612966})})
CREATE (河南省郑州市郑上路:AGENCY {bid: 371067, name: "河南省郑州市郑上路", address: "中原西路西四环西北角", phone : "0371-55116757,0371-68014786", location : point({latitude:34.74753024533005, longitude:113.57428550005442})})
CREATE
    (河南省郑州市郑上路)-[:IN_LINE {cost:35.4}]->(中原区转运中心),
    (河南省郑州市郑上路)<-[:OUT_LINE {cost:35.4}]-(中原区转运中心)
CREATE (河南省郑州市颍河路:AGENCY {bid: 371086, name: "河南省郑州市颍河路", address: "航海西路与西三环交叉口向南300米路西中贸商务", phone : "19139415556", location : point({latitude:34.71593280680163, longitude:113.60398506929064})})
CREATE
    (河南省郑州市颍河路)-[:IN_LINE {cost:36.9}]->(中原区转运中心),
    (河南省郑州市颍河路)<-[:OUT_LINE {cost:36.9}]-(中原区转运中心)
CREATE
    (中原区转运中心)-[:IN_LINE {cost:11.5}]->(郑州市转运中心),
    (中原区转运中心)<-[:OUT_LINE {cost:11.5}]-(郑州市转运中心)
```
### 4.2.2、基本查询
```cypher
MATCH (n) RETURN n  //查询所有的数据，数据量大是勿用
MATCH (n:AGENCY) RETURN n  //查询所有的网点（AGENCY）
MATCH (n:OLT {name: "北京市转运中心"}) -- (m) RETURN n,m //查询所有与“北京市转运中心”有关系的节点
MATCH (n:OLT {name:"北京市转运中心"}) --> (m:OLT) RETURN n,m //查询所有"北京市转运中心"关联的一级转运中心
MATCH (n:OLT {name:"北京市转运中心"}) -[r:IN_LINE]- (m) RETURN n,r,m //可以指定关系标签查询
MATCH p = (n:OLT {name:"北京市转运中心"}) --> (m:OLT) RETURN p //将查询赋值与变量
//通过 type()函数查询关系类型
MATCH (n:OLT {name:"北京市转运中心"}) -[r]-> (m:OLT {name:"南京市转运中心"}) RETURN type(r)



```
### 4.2.3、关系深度查询
可以指定关系的深度进行查询，语法格式：`-[:TYPE*minHops..maxHops]->`
:::info
六度分隔（Six Degrees of Separation）理论。
1967年，哈佛大学的心理学教授Stanley Milgram（1933~1984）想要描绘一个连结人与社区的人际连系网。做过一次连锁信实验，结果发现了“六度分隔”现象。简单地说：“你和任何一个陌生人之间所间隔的人不会超过六个，也就是说，最多通过六个人你就能够认识任何一个陌生人。”
:::
```cypher
//查询【北京市转运中心】关系中深度为1~2层关系的节点
MATCH (n:OLT {name:"北京市转运中心"}) -[*1..2]->(m) RETURN *
//也可以这样
MATCH (n:OLT {name:"北京市转运中心"}) -[*..2]->(m) RETURN *
//也可以通过变量的方式查询
MATCH path = (n:OLT {name:"北京市转运中心"}) -[*..2]->(m)
RETURN path

//查询关系，relationships()获取结果中的关系，WITH向后传递数据
MATCH path = (n:OLT {name:"北京市转运中心"}) -[*..2]->(m)
WITH n,m, relationships(path) AS r
RETURN r

//查询两个网点之间所有的路线，最大深度为6，可以查询到2条路线
MATCH path = (n:AGENCY) -[*..6]->(m:AGENCY)
WHERE n.name = "北京市昌平区定泗路" AND m.name = "上海市浦东新区南汇"
RETURN path

//查询两个网点之间最短路径，查询深度最大为10
MATCH path = shortestPath((n:AGENCY) -[*..10]->(m:AGENCY))
WHERE n.name = "北京市昌平区定泗路" AND m.name = "上海市浦东新区南汇"
RETURN path

//查询两个网点之间所有的路线中成本最低的路线，最大深度为10（如果成本相同，转运节点最少）
MATCH path = (n:AGENCY) -[*..10]->(m:AGENCY)
WHERE n.name = "北京市昌平区定泗路" AND m.name = "上海市浦东新区南汇"
UNWIND relationships(path) AS r
WITH sum(r.cost) AS cost, path
RETURN path ORDER BY cost ASC, LENGTH(path) ASC LIMIT 1

//UNWIND是将列表数据展开操作
//sum()是聚合统计函数，类似还有：avg()、max()、min()等
```
### 4.2.4、分页查询
```cypher
//分页查询网点，按照bid正序排序，每页查询2条数据，第一页
MATCH (n:AGENCY) 
RETURN n ORDER BY n.bid ASC SKIP 0 LIMIT 2

//第二页
MATCH (n:AGENCY) 
RETURN n ORDER BY n.bid ASC SKIP 2 LIMIT 2

//……
```
## 4.3、更新数据
更新数据是使用SET语句进行标签、属性的更新。SET操作是幂等性的。
```cypher
// 更新/设置 属性
MATCH (n:AGENCY {name:"北京市昌平区新龙城"})
SET n.address = "龙跃苑四区3号楼底商101号"
RETURN n

//通过remove移除属性
MATCH (n:AGENCY {name:"北京市昌平区新龙城"}) REMOVE n.address RETURN n

//没有address属性的增加属性
MATCH (n:AGENCY) WHERE n.address IS NULL SET n.address = "暂无地址" RETURN n
```
## 4.4、删除数据
删除数据通过DELETE、DETACH DELETE完成。其中DELETE不能删除有关系的节点，删除关系就需要DETACH DELETE了。
```cypher
//删除节点
MATCH (n:AGENCY {name:"航头营业部"}) DELETE n
//有关系的节点是不能直接删除的
MATCH (n:AGENCY {name:"北京市昌平区新龙城"}) DELETE n
//删除节点和关系
MATCH (n:AGENCY {name:"北京市昌平区新龙城"}) DETACH DELETE n

//删除所有节点和关系，慎用！
MATCH (n) DETACH DELETE n
```
## 4.5、索引
在Neo4j中同样也支持索引，对字段做索引可以提升查询速度。
```cypher
//创建索引语法：
//OPTIONS子句指定索引提供程序和配置。
CREATE [TEXT] INDEX [index_name] [IF NOT EXISTS]
FOR (n:LabelName)
ON (n.propertyName)
[OPTIONS "{" option: value[, ...] "}"]

//示例：
CREATE TEXT INDEX agency_index_bid IF NOT EXISTS FOR (n:AGENCY) ON (n.bid)

//删除索引语法：
DROP INDEX index_name

//示例：
DROP INDEX agency_index_bid
```
# 5、SDN快速入门
Spring Data Neo4j简称SDN，是Spring对Neo4j数据库操作的封装，其底层基于`neo4j-java-driver`实现。
我们使用的版本为：6.2.3，官方文档：
下面我们将基于项目中的运输路线业务进行学习，例如：
:::info
【迪士尼营业部】-> 【浦东区转运中心】 -> 【上海转运中心】 -> 【北京转运中心】-> 【昌平区转运中心】-> 【金燕龙营业部】
:::
## 5.1、创建工程
创建工程，sl-express-sdn，导入依赖：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.sl-express</groupId>
        <artifactId>sl-express-parent</artifactId>
        <version>1.4</version>
    </parent>

    <groupId>com.sl-express.sdn</groupId>
    <artifactId>sl-express-sdn</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <sl-express-common.version>1.2-SNAPSHOT</sl-express-common.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.sl-express.common</groupId>
            <artifactId>sl-express-common</artifactId>
            <version>${sl-express-common.version}</version>
        </dependency>
        <!--SDN依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-neo4j</artifactId>
        </dependency>
    </dependencies>

</project>
```
## 5.2、编写配置文件
```yaml
server:
  port: 9902
logging:
  level:
    org.springframework.data.neo4j: debug
spring:
  application:
    name: sl-express-sdn
  mvc:
    pathmatch:
      #解决异常：swagger Failed to start bean 'documentationPluginsBootstrapper'; nested exception is java.lang.NullPointerException
      #因为Springfox使用的路径匹配是基于AntPathMatcher的，而Spring Boot 2.6.X使用的是PathPatternMatcher
      matching-strategy: ant_path_matcher
  data:
    neo4j:
      database: neo4j
  neo4j:
    authentication:
      username: neo4j
      password: neo4j123
    uri: neo4j://192.168.150.101:7687
```
## 5.3、基础代码
### 5.3.1、SDNApplication
编写启动类：
```java
package com.sl.sdn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SDNApplication {

    public static void main(String[] args) {
        SpringApplication.run(SDNApplication.class, args);
    }
}
```
### 5.3.2、Entity
编写实体，在物流中，会存在网点、二级转运中心、一级转运中心，我们分别用Agency、TLT、OLT表示。
由于以上三个机构的属性是相同的，但在Neo4j中的标签是不一样的，所以既要保证不同的类，也有相同的属性，这种场景比较适合将属性写到父类中，自己继承父类来实现，这里我们采用抽象类的来实现。
```java
package com.sl.sdn.entity.node;

import com.sl.sdn.enums.OrganTypeEnum;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.geo.Point;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;

@Data
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseEntity {

    @Id
    @GeneratedValue
    @ApiModelProperty(value = "Neo4j ID", hidden = true)
    private Long id;
    @ApiModelProperty(value = "业务id", required = true)
    private Long bid;
    @ApiModelProperty(value = "名称", required = true)
    private String name;
    @ApiModelProperty(value = "电话", required = true)
    private String phone;
    @ApiModelProperty(value = "地址", required = true)
    private String address;
    @ApiModelProperty(value = "位置坐标, x: 纬度，y: 经度", required = true)
    private Point location;

    //机构类型
    public abstract OrganTypeEnum getAgencyType();

}

```
机构枚举：
```java
package com.sl.sdn.enums;

import cn.hutool.core.util.EnumUtil;
import com.sl.transport.common.enums.BaseEnum;

/**
 * 机构类型枚举
 */
public enum OrganTypeEnum implements BaseEnum {

    OLT(1, "一级转运中心"),
    TLT(2, "二级转运中心"),
    AGENCY(3, "网点");

    /**
     * 类型编码
     */
    private final Integer code;

    /**
     * 类型值
     */
    private final String value;

    OrganTypeEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

    public static OrganTypeEnum codeOf(Integer code) {
        return EnumUtil.getBy(OrganTypeEnum::getCode, code);
    }
}

```
```java
package com.sl.sdn.entity.node;

import com.sl.sdn.enums.OrganTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.neo4j.core.schema.Node;

/**
 * 网点实体
 */
@Node("AGENCY")
@Data
@ToString(callSuper = true)
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
public class AgencyEntity extends BaseEntity {

    @Override
    public OrganTypeEnum getAgencyType() {
        return OrganTypeEnum.AGENCY;
    }
}

```
```java
package com.sl.sdn.entity.node;

import com.sl.sdn.enums.OrganTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.neo4j.core.schema.Node;

/**
 * 一级转运中心实体 (OneLevelTransportEntity)
 */
@Node("OLT")
@Data
@ToString(callSuper = true)
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
public class OLTEntity extends BaseEntity {

    @Override
    public OrganTypeEnum getAgencyType() {
        return OrganTypeEnum.OLT;
    }
}

```
```java
package com.sl.sdn.entity.node;

import com.sl.sdn.enums.OrganTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.neo4j.core.schema.Node;

/**
 * 二级转运中心实体(TwoLevelTransportEntity)
 */
@Node("TLT")
@Data
@ToString(callSuper = true)
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
public class TLTEntity extends BaseEntity {

    @Override
    public OrganTypeEnum getAgencyType() {
        return OrganTypeEnum.TLT;
    }
}

```
```java
package com.sl.sdn.entity.line;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 运输路线实体
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransportLine {

    private Long id;
    private Double cost; //成本

}

```
### 5.3.3、DTO
DTO用于服务间的数据传输，会用到`OrganDTO`、`TransportLineNodeDTO`。
```java
package com.sl.sdn.dto;

import cn.hutool.core.annotation.Alias;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * 机构数据对象，网点、一级转运、二级转运都是看作是机构
 * BaseEntity中的location无法序列化，需要将经纬度拆开封装对象
 */
@Data
public class OrganDTO {

    @Alias("bid") //业务id作为id进行封装
    @ApiModelProperty(value = "机构id", required = true)
    private Long id;
    @ApiModelProperty(value = "名称", required = true)
    private String name;
    @ApiModelProperty(value = "类型，1:一级转运，2：二级转运，3:网点", required = true)
    private Integer type;
    @ApiModelProperty(value = "电话", required = true)
    private String phone;
    @ApiModelProperty(value = "地址", required = true)
    private String address;
    @ApiModelProperty(value = "纬度", required = true)
    private Double latitude;
    @ApiModelProperty(value = "经度", required = true)
    private Double longitude;

}

```
```java
package com.sl.sdn.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * 运输路线对象
 */
@Data
public class TransportLineNodeDTO {

    @ApiModelProperty(value = "节点列表", required = true)
    private List<OrganDTO> nodeList = new ArrayList<>();
    @ApiModelProperty(value = "路线成本", required = true)
    private Double cost = 0d;

}

```
## 5.4、Repository
SDN也是遵循了Spring Data JPA规范，同时也提供了Neo4jRepository，该接口中提供了基本的CRUD操作，我们定义Repository需要继承该接口。
### 5.4.1、AgencyRepository
```java
package com.sl.sdn.repository;

import com.sl.sdn.entity.node.AgencyEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;

/**
 * 网点操作
 */
public interface AgencyRepository extends Neo4jRepository<AgencyEntity, Long> {

    /**
     * 根据bid查询
     *
     * @param bid 业务id
     * @return 网点数据
     */
    AgencyEntity findByBid(Long bid);

    /**
     * 根据bid删除
     *
     * @param bid 业务id
     * @return 删除的数据条数
     */
    Long deleteByBid(Long bid);

}

```
测试：
```java
package com.sl.sdn.repository;

import com.sl.sdn.entity.node.AgencyEntity;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.*;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
class AgencyRepositoryTest {

    @Resource
    private AgencyRepository agencyRepository;

    @Test
    public void testFindByBid() {
        AgencyEntity agencyEntity = this.agencyRepository.findByBid(9001L);
        System.out.println(agencyEntity);
    }

    @Test
    public void testSave() {
        AgencyEntity agencyEntity = new AgencyEntity();
        agencyEntity.setAddress("测试数据地址");
        agencyEntity.setBid(9001L);
        agencyEntity.setName("测试节点");
        agencyEntity.setPhone("1388888888888");

        this.agencyRepository.save(agencyEntity);
        System.out.println(agencyEntity);
    }


    @Test
    public void testUpdate() {
        AgencyEntity agencyEntity = this.agencyRepository.findByBid(9001L);
        agencyEntity.setName("测试节点1");

        this.agencyRepository.save(agencyEntity);
        System.out.println(agencyEntity);
    }

    @Test
    public void testDeleteByBid() {
        Long count = this.agencyRepository.deleteByBid(9001L);
        System.out.println(count);
    }

    /**
     * 查询全部
     */
    @Test
    public void testFindAll() {
        List<AgencyEntity> list = this.agencyRepository.findAll();
        for (AgencyEntity agencyEntity : list) {
            System.out.println(agencyEntity);
        }
    }

    /**
     * 分页查询
     */
    @Test
    public void testPage() {
        //设置分页、排序条件，page从0开始
        PageRequest pageRequest = PageRequest.of(1, 2, Sort.by(Sort.Order.desc("bid")));
        Page<AgencyEntity> page = this.agencyRepository.findAll(pageRequest);
        page.getContent().forEach(agencyEntity -> {
            System.out.println(agencyEntity);
        });
    }

}
```
### 5.4.2、JPA自定义方法规则
使用jpa中的规则，进行自定义查询：

| Keyword | Sample | Cypher snippet |
| --- | --- | --- |
| After | findByLaunchDateAfter(Date date) | n.launchDate > date |
| Before | findByLaunchDateBefore(Date date) | n.launchDate < date |
| Containing (String) | findByNameContaining(String namePart) | n.name CONTAINS namePart |
| Containing (Collection) | findByEmailAddressesContains(Collection  addresses) findByEmailAddressesContains(String  address) | ANY(collectionFields IN [addresses] WHERE  collectionFields in n.emailAddresses) ANY(collectionFields IN address WHERE collectionFields  in n.emailAddresses) |
| In | findByNameIn(Iterable  names) | n.name IN names |
| Between | findByScoreBetween(double min, double  max) findByScoreBetween(Range  range) | n.score >= min AND n.score <=  max Depending on the Range definition n.score >=  min AND n.score <= max or n.score > min AND n.score <  max |
| StartingWith | findByNameStartingWith(String  nameStart) | n.name STARTS WITH nameStart |
| EndingWith | findByNameEndingWith(String nameEnd) | n.name ENDS WITH nameEnd |
| Exists | findByNameExists() | EXISTS(n.name) |
| True | findByActivatedIsTrue() | n.activated = true |
| False | findByActivatedIsFalse() | NOT(n.activated = true) |
| Is | findByNameIs(String name) | n.name = name |
| NotNull | findByNameNotNull() | NOT(n.name IS NULL) |
| Null | findByNameNull() | n.name IS NULL |
| GreaterThan | findByScoreGreaterThan(double score) | n.score > score |
| GreaterThanEqual | findByScoreGreaterThanEqual(double  score) | n.score >= score |
| LessThan | findByScoreLessThan(double score) | n.score < score |
| LessThanEqual | findByScoreLessThanEqual(double score) | n.score <= score |
| Like | findByNameLike(String name) | n.name =~ name |
| NotLike | findByNameNotLike(String name) | NOT(n.name =~ name) |
| Near | findByLocationNear(Distance distance, Point  point) | distance( point(n),point({latitude:lat,  longitude:lon}) ) < distance |
| Regex | findByNameRegex(String regex) | n.name =~ regex |
| And | findByNameAndDescription(String name, String  description) | n.name = name AND n.description =  description |
| Or | findByNameOrDescription(String name, String  description) | n.name = name OR n.description = description  (Cannot be used to OR nested properties) |

### 5.4.3、OLTRepository
```java
package com.sl.sdn.repository;

import com.sl.sdn.entity.node.OLTEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;

/**
 * 一级转运中心数据操作
 */
public interface OLTRepository extends Neo4jRepository<OLTEntity, Long> {

    /**
     * 根据bid查询
     *
     * @param bid 业务id
     * @return 一级转运中心数据
     */
    OLTEntity findByBid(Long bid);

    /**
     * 根据bid删除
     *
     * @param bid 业务id
     * @return 删除的数据条数
     */
    Long deleteByBid(Long bid);

}

```
### 5.4.4、OrganRepository
```java
package com.sl.sdn.repository;

import com.sl.sdn.dto.OrganDTO;

import java.util.List;

/**
 * 通用机构查询
 */
public interface OrganRepository {

    /**
     * 无需指定type，根据id查询
     *
     * @param bid 业务id
     * @return 机构数据
     */
    OrganDTO findByBid(Long bid);

    /**
     * 查询所有的机构，如果name不为空的按照name模糊查询
     *
     * @param name 机构名称
     * @return 机构列表
     */
    List<OrganDTO> findAll(String name);
}

```
### 5.4.5、TLTRepository
```java
package com.sl.sdn.repository;

import com.sl.sdn.entity.node.TLTEntity;
import org.springframework.data.neo4j.repository.Neo4jRepository;

/**
 * 二级转运中心数据操作
 */
public interface TLTRepository extends Neo4jRepository<TLTEntity, Long> {

    /**
     * 根据bid查询
     *
     * @param bid 业务id
     * @return 二级转运中心数据
     */
    TLTEntity findByBid(Long bid);

    /**
     * 根据bid删除
     *
     * @param bid 业务id
     * @return 删除的数据条数
     */
    Long deleteByBid(Long bid);

}

```
## 5.5、复杂查询
通过继承Neo4jRepository实现简单的查询是非常方便的，如果要实现复杂的查询就需要定义Cypher查询实现了，需要通过Neo4jClient进行查询操作，下面我们以查询两个网点间最短运输路线为例进行查询。
### 5.5.1、定义Repository
```java
package com.sl.sdn.repository;

import com.sl.sdn.dto.TransportLineNodeDTO;
import com.sl.sdn.entity.node.AgencyEntity;

/**
 * 运输路线相关操作
 */
public interface TransportLineRepository {

    /**
     * 查询两个网点之间最短的路线，查询深度为：10
     *
     * @param start 开始网点
     * @param end   结束网点
     * @return 路线
     */
    TransportLineNodeDTO findShortestPath(AgencyEntity start, AgencyEntity end);

}

```
### 5.5.2、编写实现
```java
package com.sl.sdn.repository.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.StrUtil;
import com.sl.sdn.dto.OrganDTO;
import com.sl.sdn.dto.TransportLineNodeDTO;
import com.sl.sdn.entity.node.AgencyEntity;
import com.sl.sdn.enums.OrganTypeEnum;
import com.sl.sdn.repository.TransportLineRepository;
import org.neo4j.driver.internal.value.PathValue;
import org.neo4j.driver.types.Path;
import org.springframework.data.neo4j.core.Neo4jClient;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Map;
import java.util.Optional;

@Component
public class TransportLineRepositoryImpl implements TransportLineRepository {

    @Resource
    private Neo4jClient neo4jClient;

    @Override
    public TransportLineNodeDTO findShortestPath(AgencyEntity start, AgencyEntity end) {
        //获取网点数据在Neo4j中的类型
        String type = AgencyEntity.class.getAnnotation(Node.class).value()[0];
        //构造查询语句
        String cypherQuery = StrUtil.format("MATCH path = shortestPath((start:{}) -[*..10]-> (end:{}))\n" +
                "WHERE start.bid = $startId AND end.bid = $endId \n" +
                "RETURN path", type, type);

        //执行查询
        Optional<TransportLineNodeDTO> optional = this.neo4jClient.query(cypherQuery)
                .bind(start.getBid()).to("startId") //设置参数
                .bind(end.getBid()).to("endId")//设置参数
                .fetchAs(TransportLineNodeDTO.class) //设置响应数据类型
                .mappedBy((typeSystem, record) -> { //对结果进行封装处理
                    PathValue pathValue = (PathValue) record.get(0);
                    Path path = pathValue.asPath();
                    TransportLineNodeDTO dto = new TransportLineNodeDTO();
                    // 读取节点数据
                    path.nodes().forEach(node -> {
                        Map<String, Object> map = node.asMap();
                        OrganDTO organDTO = BeanUtil.toBeanIgnoreError(map, OrganDTO.class);

                        //取第一个标签作为类型
                        organDTO.setType(OrganTypeEnum.valueOf(CollUtil.getFirst(node.labels())).getCode());
                        //查询出来的数据，x：经度，y：纬度
                        organDTO.setLatitude(BeanUtil.getProperty(map.get("location"), "y"));
                        organDTO.setLongitude(BeanUtil.getProperty(map.get("location"), "x"));

                        dto.getNodeList().add(organDTO);
                    });

                    //提取关系中的 cost 数据，进行求和计算，算出该路线的总成本
                    path.relationships().forEach(relationship -> {
                        Map<String, Object> objectMap = relationship.asMap();
                        double cost = Convert.toDouble(objectMap.get("cost"), 0d);
                        dto.setCost(NumberUtil.add(cost, dto.getCost().doubleValue()));
                    });

                    //取2位小数
                    dto.setCost(NumberUtil.round(dto.getCost(), 2).doubleValue());
                    return dto;
                }).one();

        return optional.orElse(null);
    }
}

```
### 5.5.3、测试
编写测试用例：
```java
package com.sl.sdn.repository;

import com.sl.sdn.dto.TransportLineNodeDTO;
import com.sl.sdn.entity.node.AgencyEntity;
import com.sl.sdn.repository.TransportLineRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TransportLineRepositoryTest {

    @Resource
    private TransportLineRepository transportLineRepository;

    @Test
    void findShortestPath() {
        AgencyEntity start = AgencyEntity.builder().bid(100280L).build();
        AgencyEntity end = AgencyEntity.builder().bid(210057L).build();
        TransportLineNodeDTO transportLineNodeDTO = this.transportLineRepository.findShortestPath(start, end);
        System.out.println(transportLineNodeDTO);
    }
}
```
测试结果：
:::tips
TransportLineNodeDTO(nodeList=[OrganDTO(id=100280, name=北京市昌平区定泗路, type=3, phone=010-86392987, address=北七家镇定泗路苍龙街交叉口, latitude=40.11765281246394, longitude=116.37212849638287), OrganDTO(id=90001, name=昌平区转运中心, type=2, phone=null, address=昌平区转运中心, latitude=40.220952, longitude=116.231034), OrganDTO(id=8001, name=北京市转运中心, type=1, phone=null, address=北京市转运中心, latitude=39.904179, longitude=116.407387), OrganDTO(id=8002, name=上海市转运中心, type=1, phone=null, address=上海市转运中心, latitude=31.230525, longitude=121.473667), OrganDTO(id=90003, name=浦东新区转运中心, type=2, phone=null, address=浦东新区转运中心, latitude=31.221461, longitude=121.544346), OrganDTO(id=210057, name=上海市浦东新区南汇, type=3, phone=18821179169, address=园春路8号, latitude=31.035240152911637, longitude=121.73459966751048)], cost=11577.8)
:::
# 6、练习
## 6.1、练习1
练习内容：官方电影数据示例学习，在前面体验了电影数据，其他的操作自行学习体验。
## 6.2、练习2
练习内容：实现成本优先的路线查询。
# 7、面试连环问
:::info
面试官问：

- 你所做的物流项目中，运输路线错综复杂，你们如何进行计算路线的？是距离优先还是成本优先？
- 为什么选择使用Neo4j图数据库存储路线？
- 路线运输模型在Neo4j中是如何设计的？
- 在Neo4j中如何设置关系的查询深度？
- 在SDN中如何自定义Cypher查询？可以直接定义JPA方法，为什么还要自定义查询？
:::
