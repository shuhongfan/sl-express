# 课程安排
- MongoDB快速入门
- Spring Data MongoDB入门
- 分析作业范围功能需求
- 实现机构与快递员的作业范围
# 1、背景说明
通过前面的学习，智能调度系统已经可以生成了车辆运输任务以及司机作业单，接下来要做的事情就是要生成快递员的取派件任务，想一下，用户下单寄件的订单，哪个快递员为其服务呢？所以我们必须通过用户的寄件地址找到对应服务范围的快递员，为快递员分配取件任务，快递员上门取件，同样，派件是类似的到道理。
所以，需要设定每个快递员或机构的作业范围，而范围是一组经纬度数据，如果存储到mysql中，并不能很好通过范围查询，在这里我们给出的技术解决方案是，通过MongoDB存储作业范围数据。因此，我们需要对MongoDB做入门的学习。
![w.gif](https://cdn.nlark.com/yuque/0/2022/gif/27683667/1663069921428-10172c3d-e504-4a03-8887-d70d1bb081e6.gif#averageHue=%23ece2cd&clientId=u23641af5-1396-4&errorMessage=unknown%20error&from=paste&height=145&id=uc45f8a8b&name=w.gif&originHeight=240&originWidth=240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=87315&status=error&style=none&taskId=u9cb6bdae-bbf4-41ff-ac7a-56ad74883a2&title=&width=145.45453704749963)
# 2、MongoDB快速入门
## 2.1、MongoDB简介
![mongo.svg](https://cdn.nlark.com/yuque/0/2022/svg/27683667/1663075345721-5773cbfa-8294-4c79-a869-7efb121c6b92.svg#clientId=ub9d7be12-9c53-4&errorMessage=unknown%20error&from=ui&height=70&id=GgDva&name=mongo.svg&originHeight=278&originWidth=1102&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11390&status=error&style=none&taskId=u4d813da3-12fc-43e3-b65d-6159cc63a70&title=&width=276)

- MongoDB是一个基于分布式文件存储的数据库，由C++语言编写。
- MongoDB是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的，它支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。
- MongoDB的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现了类似关系数据库单表查询的绝大部分功能（可以通过聚合的方式实现多表查询），而且还支持对数据建立索引。

官网：
## 2.2、部署安装
:::info
推荐使用Docker部署安装MongoDB，在101机器中已经完成了安装。
:::
```shell
docker run -d \
--name mongodb \
-p 27017:27017 \
--restart=always \
-v mongodb:/data/db \
-e MONGO_INITDB_ROOT_USERNAME=sl \
-e MONGO_INITDB_ROOT_PASSWORD=123321 \
mongo:4.4

#进入容器进行设置
docker exec -it mongodb /bin/bash
#进行认证
mongo -u "sl" -p "123321" --authenticationDatabase "admin"

#测试命令，查看已有数据库
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```
## 2.3、基本概念
为了更好的理解，下面与SQL中的概念进行对比：

| **SQL术语/概念** | **MongoDB术语/概念** | **解释/说明** |
| --- | --- | --- |
| database | database | 数据库 |
| table | collection | 数据库表/集合 |
| row | document | 数据记录行/文档 |
| column | field | 数据字段/域 |
| index | index | 索引 |
| table joins |  | 表连接,MongoDB不支持 |
| primary key | primary key | 主键,MongoDB自动将_id字段设置为主键 |

![Figure-1-Mapping-Table-to-Collection-1.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663122725512-37729247-c1a4-4a3f-a5df-e48a6c7b4993.png#averageHue=%23dfc79b&clientId=ub9d7be12-9c53-4&errorMessage=unknown%20error&from=paste&height=212&id=u055a1ea9&name=Figure-1-Mapping-Table-to-Collection-1.png&originHeight=282&originWidth=858&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23583&status=error&style=shadow&taskId=uead319a9-7abd-4405-9e7a-8374df8371f&title=&width=644)
## 2.4、MongoDB基本操作
### 2.4.1、数据库以及表的操作
```shell
#查看所有的数据库
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

#通过use关键字切换数据库
> use admin
switched to db admin

#创建数据库
#说明：在MongoDB中，数据库是自动创建的，通过use切换到新数据库中，进行插入数据即可自动创建数据库
> use testdb
switched to db testdb
> show dbs #并没有创建数据库
admin   0.000GB
config  0.000GB
local   0.000GB
> db.user.insert({id:1,name:'zhangsan'})  #插入数据
WriteResult({ "nInserted" : 1 })
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
testdb  0.000GB #数据库自动创建

#查看表
> show tables
user
> show collections
user
> 

#删除集合（表）
> db.user.drop()
true  #如果成功删除选定集合，则 drop() 方法返回 true，否则返回 false。

#删除数据库
> use testdb #先切换到要删除的数据库中
switched to db testdb
> db.dropDatabase()  #删除数据库
{ "dropped" : "testdb", "ok" : 1 }
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```
### 2.4.2、新增数据
在MongoDB中，存储的文档结构是一种类似于json的结构，称之为bson（全称为：Binary JSON）。
```shell
#插入数据

#语法：db.COLLECTION_NAME.insert(document)
> db.user.insert({id:1,username:'zhangsan',age:20})
WriteResult({ "nInserted" : 1 })

> db.user.save({id:2,username:'lisi',age:25})
WriteResult({ "nInserted" : 1 })

> db.user.find()  #查询数据
{ "_id" : ObjectId("5c08c0024b318926e0c1f6dc"), "id" : 1, "username" : "zhangsan", "age" : 20 }
{ "_id" : ObjectId("5c08c0134b318926e0c1f6dd"), "id" : 2, "username" : "lisi", "age" : 25 }

```
:::info

- _id 是集合中文档的主键，用于区分文档（记录），_id自动编入索引。
- 默认情况下，_id 字段的类型为 ObjectID，是 MongoDB 的 BSON 类型之一，如果需要，用户还可以将 _id 覆盖为 ObjectID 以外的其他内容。
- ObjectID 长度为 12 字节，由几个 2-4 字节的链组成。每个链代表并指定文档身份的具体内容。以下的值构成了完整的 12 字节组合：
   - 一个 4 字节的值，表示自 Unix 纪元以来的秒数
   - 一个 3 字节的机器标识符
   - 一个 2 字节的进程 ID
   - 一个 3字节的计数器，以随机值开始
:::
### 2.4.3、更新数据
update() 方法用于更新已存在的文档。语法格式如下：
```shell
db.collection.update(
   <query>,
   <update>,
   [
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   ]
)
```
**参数说明：**

- **query** : update的查询条件，类似sql update查询内where后面的。
- **update** : update的对象和一些更新的操作符（如![](https://g.yuque.com/gr/latex?%2C#card=math&code=%2C&id=vTMNw)inc...）等，也可以理解为sql update查询内set后面的
- **upsert** : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- **multi** : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- **writeConcern** :可选，抛出异常的级别。
```shell
> db.user.find()
{ "_id" : ObjectId("5c08c0024b318926e0c1f6dc"), "id" : 1, "username" : "zhangsan", "age" : 20 }
{ "_id" : ObjectId("5c08c0134b318926e0c1f6dd"), "id" : 2, "username" : "lisi", "age" : 25 }

> db.user.update({id:1},{$set:{age:22}}) #更新数据

WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

> db.user.find()
{ "_id" : ObjectId("5c08c0024b318926e0c1f6dc"), "id" : 1, "username" : "zhangsan", "age" : 22 }
{ "_id" : ObjectId("5c08c0134b318926e0c1f6dd"), "id" : 2, "username" : "lisi", "age" : 25 }

#注意：如果这样写，会删除掉其他的字段
> db.user.update({id:1},{age:25})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.user.find()
{ "_id" : ObjectId("5c08c0024b318926e0c1f6dc"), "age" : 25 }
{ "_id" : ObjectId("5c08c0134b318926e0c1f6dd"), "id" : 2, "username" : "lisi", "age" : 25 }

#更新不存在的字段，会新增字段
> db.user.update({id:2},{$set:{sex:1}}) #更新数据
> db.user.find()
{ "_id" : ObjectId("5c08c0024b318926e0c1f6dc"), "age" : 25 }
{ "_id" : ObjectId("5c08c0134b318926e0c1f6dd"), "id" : 2, "username" : "lisi", "age" : 25, "sex" : 1 }

#更新不存在的数据，默认不会新增数据
> db.user.update({id:3},{$set:{sex:1}})
WriteResult({ "nMatched" : 0, "nUpserted" : 0, "nModified" : 0 })
> db.user.find()
{ "_id" : ObjectId("5c08c0024b318926e0c1f6dc"), "age" : 25 }
{ "_id" : ObjectId("5c08c0134b318926e0c1f6dd"), "id" : 2, "username" : "lisi", "age" : 25, "sex" : 1 }

#如果设置第一个参数为true，就是新增数据
> db.user.update({id:3},{$set:{sex:1}},true)
WriteResult({
	"nMatched" : 0,
	"nUpserted" : 1,
	"nModified" : 0,
	"_id" : ObjectId("5c08cb281418d073246bc642")
})
> db.user.find()
{ "_id" : ObjectId("5c08c0024b318926e0c1f6dc"), "age" : 25 }
{ "_id" : ObjectId("5c08c0134b318926e0c1f6dd"), "id" : 2, "username" : "lisi", "age" : 25, "sex" : 1 }
{ "_id" : ObjectId("5c08cb281418d073246bc642"), "id" : 3, "sex" : 1 }

```
### 2.4.4、删除数据
通过remove()方法进行删除数据，语法如下：
```shell
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```
**参数说明：**

- **query** :（可选）删除的文档的条件。
- **justOne** : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
- **writeConcern** :（可选）抛出异常的级别。
```shell
> db.user.remove({age:25})
WriteResult({ "nRemoved" : 2 })  #删除了2条数据

#插入4条测试数据
db.user.insert({id:1,username:'zhangsan',age:20})
db.user.insert({id:2,username:'lisi',age:21})
db.user.insert({id:3,username:'wangwu',age:22})
db.user.insert({id:4,username:'zhaoliu',age:22})

> db.user.remove({age:22},true)
WriteResult({ "nRemoved" : 1 })  #删除了1条数据

#删除所有数据
> db.user.remove({})

#说明：为了简化操作，官方推荐使用deleteOne()与deleteMany()进行删除数据操作。
db.user.deleteOne({id:1})
db.user.deleteMany({})  #删除所有数据

```
### 2.4.5、查询数据
MongoDB 查询数据的语法格式为：`db.user.find([query],[fields])`

- **query** ：可选，使用查询操作符指定查询条件
- **fields** ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式为：`db.col.find().pretty()`
条件查询：

| **操作** | **格式** | **范例** | **RDBMS中的类似语句** |
| --- | --- | --- | --- |
| 等于 | {<key>:<value>} | db.col.find({"by":"黑马程序员"}).pretty() | where by = '黑马程序员' |
| 小于 | {<key>:{$lt:<value>}} | db.col.find({"likes":{$lt:50}}).pretty() | where likes < 50 |
| 小于或等于 | {<key>:{$lte:<value>}} | db.col.find({"likes":{$lte:50}}).pretty() | where likes <= 50 |
| 大于 | {<key>:{$gt:<value>}} | db.col.find({"likes":{$gt:50}}).pretty() | where likes > 50 |
| 大于或等于 | {<key>:{$gte:<value>}} | db.col.find({"likes":{$gte:50}}).pretty() | where likes >= 50 |
| 不等于 | {<key>:{$ne:<value>}} | db.col.find({"likes":{$ne:50}}).pretty() | where likes != 50 |

```shell
#插入测试数据
db.user.insert({id:1,username:'zhangsan',age:20})
db.user.insert({id:2,username:'lisi',age:21})
db.user.insert({id:3,username:'wangwu',age:22})
db.user.insert({id:4,username:'zhaoliu',age:22})

db.user.find()  #查询全部数据
db.user.find({},{id:1,username:1})  #只查询id与username字段
db.user.find().count()  #查询数据条数
db.user.find({id:1}) #查询id为1的数据
db.user.find({age:{$lte:21}}) #查询小于等于21的数据
db.user.find({age:{$lte:21}, id:{$gte:2}}) #and查询，age小于等于21并且id大于等于2
db.user.find({$or:[{id:1},{id:2}]}) #查询id=1 or id=2

#分页查询：Skip()跳过几条，limit()查询条数
db.user.find().limit(2).skip(1)  #跳过1条数据，查询2条数据
db.user.find().sort({id:-1}) #按照age倒序排序，-1为倒序，1为正序
```
## 2.5、索引
索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。
MongoDB支持的索引类型有：

- **单字段索引（Single Field）**
   - 支持所有数据类型中的单个字段索引
- **复合索引（Compound Index）**
   - 基于多个字段的索引，创建复合索引时要注意字段顺序与索引方向
- **多键索引（Multikey indexes）**
   - 针对属性包含数组数据的情况，MongoDB支持针对数组中每一个element创建索引。
- **全文索引（Text Index）**
   - 支持任意属性值为string或string数组元素的索引查询。
   - 注意：一个集合仅支持最多一个Text Index，中文分词不理想，推荐Elasticsearch。
- **地理空间索引（Geospatial Index）**
   - 2dsphere索引，用于存储和查找球面上的点
   - 2d索引，用于存储和查找平面上的点
- **哈希索引（Hashed Index）**
   - 针对属性的哈希值进行索引查询，当要使用Hashed index时，MongoDB能够自动的计算hash值，无需程序计算hash值。
   - hash index仅支持等于查询，不支持范围查询。

我们重点需要掌握的是【单字段索引】、【2dsphere索引】。
```shell
#单字段索引，1表示升序创建索引，-1表示降序创建索引
db.集合名.createIndex({"字段名":排序方式})

#2dsphere索引
db.集合名.createIndex({"字段名":"2dsphere"})

#示例，创建user集合，其中username和loc字段设置索引
db.user.createIndex({"username":1})
db.user.createIndex({"loc":"2dsphere"})

db.user.insert({id:1,username:'zhangsan',age:20,loc:{type:"Point",coordinates:[116.343847,40.060539]}})
db.user.insert({id:2,username:'lisi',age:22,loc:{type:"Point",coordinates:[121.612112,31.034633]}})

#查看索引
db.user.getIndexes()
#查看索引大小，单位：字节
db.user.totalIndexSize()

#删除索引
db.user.dropIndex("loc_2dsphere")
#或者，删除除了_id之外的索引
db.user.dropIndexes()

```
地理空间索引的type可以是下列的类型：

- **Point**（坐标点），coordinates必须是单个位置
- **MultiPoint**（多个点），coordinates必须是位置数组
- **LineString**（线形），coordinates必须是两个或多个位置的数组
- **MultiLineString**（多行线形），coordinates必须是LineString坐标数组的数组
- **Polygon**（多边形），coordinates成员必须是 LinearRing 坐标数组的数组，必须是闭环，也就是第一个和最后一个坐标点要相同。
- **MultiPolygon**（多个多边形），coordinates成员必须是 Polygon 坐标数组的数组。
- **GeometryCollection**（几何集合）,geometries是任何一个对象的集合。
## 2.6、UI客户端工具
前面我们是通过命令行操作MongoDB，这样不太方便，可以通过可视化工具操作MongoDB，在这里推荐使用Studio 3T。
官网：[https://studio3t.com/](https://studio3t.com/)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663150840273-d1af66b5-5d12-4b90-a758-aed609a5ba82.png#averageHue=%23f3f3f2&clientId=ubab3d346-4be9-4&errorMessage=unknown%20error&from=paste&height=615&id=ua2c374b1&name=image.png&originHeight=1014&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=131844&status=error&style=shadow&taskId=ua8bd5a94-f3bc-4a60-a0f3-33419d1e3a1&title=&width=1163.636296379997)
下载地址：[https://studio3t.com/download/](https://studio3t.com/download/) （或使用课程资料中提供的安装包进行安装）
> Studio 3T提供了30天的试用期，时期用到后可以永久使用免费版，免费版比收费版功能要少一些，对我们而言免费版也够用了。
> Studio 3T需要注册账号，自习注册即可。
> ![Snipaste_2022-09-14_17-20-08.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/27683667/1663151373366-a8bdc5d5-460b-4173-87d4-d8c1dd528429.jpeg#averageHue=%23f7f7f6&clientId=ubab3d346-4be9-4&errorMessage=unknown%20error&from=paste&height=401&id=ud5933399&name=Snipaste_2022-09-14_17-20-08.jpg&originHeight=662&originWidth=916&originalType=binary&ratio=1&rotation=0&showTitle=false&size=63863&status=error&style=shadow&taskId=u77e9970a-7455-45ba-b269-f852d498f1b&title=&width=555.1514830646236)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663151303212-fb974ec2-bb23-42cf-9bc8-5912666b9d8f.png#averageHue=%23efeeee&clientId=ubab3d346-4be9-4&errorMessage=unknown%20error&from=paste&height=519&id=u58215be0&name=image.png&originHeight=856&originWidth=1121&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60013&status=error&style=shadow&taskId=ue1ae5f4b-1508-4cca-8fca-399878770c7&title=&width=679.3939001260295)
新建链接，输入链接字符串：`mongodb://sl:123321@192.168.150.101:27017/admin`
链接字符串的格式：
`mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663151510545-fb3e6af5-cc08-4c8c-8fe8-47f449086210.png#averageHue=%23efeeee&clientId=ubab3d346-4be9-4&errorMessage=unknown%20error&from=paste&height=171&id=u01bf432c&name=image.png&originHeight=282&originWidth=709&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9046&status=error&style=shadow&taskId=ua9d53019-bc94-4f61-9f07-0db7a42e548&title=&width=429.69694486115515)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663151564305-cc1b4099-81d2-4408-93d0-618a7c699672.png#averageHue=%23f0efee&clientId=ubab3d346-4be9-4&errorMessage=unknown%20error&from=paste&height=547&id=u7eb2cde7&name=image.png&originHeight=902&originWidth=944&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58642&status=error&style=shadow&taskId=uc2d38a6f-63c3-4188-adbf-f68a78f5905&title=&width=572.1211790534985)
查看数据以及索引：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663151606075-bf237799-d615-45d2-8a84-8c3114ea941d.png#averageHue=%23f2f1f0&clientId=ubab3d346-4be9-4&errorMessage=unknown%20error&from=paste&height=419&id=u3101adb6&name=image.png&originHeight=691&originWidth=1738&originalType=binary&ratio=1&rotation=0&showTitle=false&size=98855&status=error&style=shadow&taskId=ue30e55cd-9e74-45be-bc3f-305589b23ed&title=&width=1053.3332724523098)
查看json结构数据：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663151764882-11096f41-d664-462d-9ab9-bcceaa217dfa.png#averageHue=%23f5f5f4&clientId=ubab3d346-4be9-4&errorMessage=unknown%20error&from=paste&height=227&id=u87beb6fe&name=image.png&originHeight=374&originWidth=1428&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47483&status=error&style=shadow&taskId=u4f6124d4-0c24-4d4a-8a01-c0cddf0fd59&title=&width=865.4544954326228)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663151651622-f9d5ec11-d1e9-4ada-adb6-4df9d44422ec.png#averageHue=%23fafafa&clientId=ubab3d346-4be9-4&errorMessage=unknown%20error&from=paste&height=502&id=u6582cedb&name=image.png&originHeight=829&originWidth=971&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31611&status=error&style=shadow&taskId=u6c542330-9a4f-4bb4-990a-282fb120d2e&title=&width=588.4848144713422)
其他功能后续使用中逐步熟悉。
# 3、Spring Data MongoDB
spring-data对MongoDB做了支持，使用spring-data-mongodb可以简化MongoDB的操作。
## 3.1、创建工程
创建`sl-express-mongodb`工程对Spring Data MongoDB的使用做基本的学习。导入依赖：
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

    <groupId>com.sl-express.mongodb</groupId>
    <artifactId>sl-express-mongodb</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>
    </dependencies>

</project>
```
## 3.2、配置
```yaml
spring:
  application:
    name: sl-express-mongodb
  data:
    mongodb:
      host: 192.168.150.101
      port: 27017
      database: sl
      authentication-database: admin #认证数据库
      username: sl
      password: "123321"
      auto-index-creation: true #自动创建索引
```
## 3.3、Entity
```java
package com.sl.mongo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document("sl_person") //指定表名
public class Person {

    @Id // 标识为主键
    private ObjectId id;
    @Indexed //标识索引字段
    private String name;
    private int age;
    /**
     * 用户位置
     * x: 经度，y：纬度
     */
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location;
    //存储嵌套对象数据
    private Address address;
}
```
```java
package com.sl.mongo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document("sl_address") //指定表名
public class Address {
    private String street;
    private String city;
    private String zip;
}
```
## 3.4、Service
```java
package com.sl.mongo.service;

import com.sl.mongo.entity.Person;

import java.util.List;

public interface PersonService {

    /**
     * 新增数据
     *
     * @param person 数据
     */
    void savePerson(Person person);

    /**
     * 更新数据
     *
     * @param person 数据
     */
    void update(Person person);

    /**
     * 根据名字查询用户列表
     *
     * @param name 用户名字
     * @return 用户列表
     */
    List<Person> queryPersonListByName(String name);

    /**
     * 分页查询用户列表
     *
     * @param page     页数
     * @param pageSize 页面大小
     * @return 用户列表
     */
    List<Person> queryPersonPageList(int page, int pageSize);

    /**
     * 根据id删除用户
     *
     * @param id 主键
     */
    void deleteById(String id);
}

```
接口实现类：
```java
package com.sl.mongo.service.impl;

import com.sl.mongo.entity.Person;
import com.sl.mongo.service.PersonService;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {

    @Resource
    private MongoTemplate mongoTemplate;

    @Override
    public void savePerson(Person person) {
        this.mongoTemplate.save(person);
    }

    @Override
    public void update(Person person) {
        //条件
        Query query = Query.query(Criteria.where("id").is(person.getId()));

        //更新的数据
        Update update = Update.update("age", person.getAge())
                .set("name", person.getName())
                .set("location", person.getLocation())
                .set("address", person.getAddress());

        //更新数据
        this.mongoTemplate.updateFirst(query, update, Person.class);
    }

    @Override
    public List<Person> queryPersonListByName(String name) {
        Query query = Query.query(Criteria.where("name").is(name)); //构造查询条件
        return this.mongoTemplate.find(query, Person.class);
    }

    @Override
    public List<Person> queryPersonPageList(int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page - 1, pageSize);
        Query query = new Query().with(pageRequest);
        return this.mongoTemplate.find(query, Person.class);
    }

    @Override
    public void deleteById(String id) {
        Query query = Query.query(Criteria.where("id").is(new ObjectId(id)));
        this.mongoTemplate.remove(query, Person.class);
    }
}

```
## 3.5、启动类
```java
package com.sl.mongo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MongoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MongoApplication.class, args);
    }

}

```
## 3.6、测试
```java
package com.sl.mongo.service;

import com.sl.mongo.entity.Address;
import com.sl.mongo.entity.Person;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import javax.annotation.Resource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PersonServiceTest {

    @Resource
    PersonService personService;

    @Test
    void savePerson() {
        Person person = Person.builder()
                .id(ObjectId.get())
                .name("张三")
                .age(20)
                .location(new GeoJsonPoint(116.343847, 40.060539))
                .address(new Address("人民路", "上海市", "666666")).build();
        this.personService.savePerson(person);
    }

    @Test
    void update() {
        Person person = Person.builder()
                .id(new ObjectId("632283c08139e535c2bd7579"))
                .name("张三")
                .age(22) //修改数据
                .location(new GeoJsonPoint(116.343847, 40.060539))
                .address(new Address("人民路", "上海市", "666666")).build();
        this.personService.update(person);
    }

    @Test
    void queryPersonListByName() {
        List<Person> personList = this.personService.queryPersonListByName("张三");
        personList.forEach(System.out::println);
    }

    @Test
    void queryPersonPageList() {
        List<Person> personList = this.personService.queryPersonPageList(1, 10);
        personList.forEach(System.out::println);
    }

    @Test
    void deleteById() {
        this.personService.deleteById("632283c08139e535c2bd7579");
    }
}
```
数据：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663208737781-8f0eae5b-8a6f-4567-8e93-c99719612e88.png#averageHue=%23fcfcfb&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=293&id=u1db9ee04&name=image.png&originHeight=483&originWidth=799&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32416&status=error&style=shadow&taskId=uf64fafa0-6a70-4fa1-a966-d8b748be783&title=&width=484.2423962539675)
# 4、作业范围
在项目中，会有两个作业范围，分别是机构作业范围和快递员作业范围，这两个作业范围的逻辑是一致的，就是在地图中进行画出范围，就是其作业范围。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663210119071-6b9b3bdb-ee87-470d-b43f-0007cb4d355e.png#averageHue=%23f4efe4&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=554&id=ubdb3c07e&name=image.png&originHeight=914&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=true&size=880467&status=error&style=shadow&taskId=ua0e394f8-40d7-438a-b455-6c06f54c1dd&title=%E6%9C%BA%E6%9E%84%E4%BD%9C%E4%B8%9A%E8%8C%83%E5%9B%B4&width=1163.636296379997 "机构作业范围")
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663210223882-a30fbe1f-5eff-4324-96be-dff4721804f1.png#averageHue=%23d8e0cb&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=553&id=uc2fe4267&name=image.png&originHeight=913&originWidth=1684&originalType=binary&ratio=1&rotation=0&showTitle=true&size=743330&status=error&style=shadow&taskId=u3ef1e46b-9834-44f0-8ae3-6ebc6e67b95&title=%E5%BF%AB%E9%80%92%E5%91%98%E4%BD%9C%E4%B8%9A%E8%8C%83%E5%9B%B4&width=1020.6060016166224 "快递员作业范围")
## 4.1、实现分析
对于作业范围是一个由多个坐标点组成的多边形，并且必须是闭合的多边形，这个就比较适合用MongoDB来存储。
现在想一个实际需求，用户小王下了订单，如何找到属于该服务范围内的快递员呢？这个就需要使用MongoDB的`$geoIntersects`查询操作，其原理就是查找小王的位置坐标点与哪个多边形有交叉，这个就是为其服务的快递员。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663211895037-3ce231d3-d58d-421d-a282-900c245248fe.png#averageHue=%23f5eee0&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=373&id=u5790ea5f&name=image.png&originHeight=615&originWidth=1421&originalType=binary&ratio=1&rotation=0&showTitle=false&size=604383&status=error&style=shadow&taskId=u99d4f633-62d0-4532-9abb-87e528c826d&title=&width=861.212071435404)
## 4.2、搭建工程
### 4.2.1、拉取工程
作业范围的代码同样也是存放至git中，如下：

| sl-express-ms-service-scope-domain | [http://git.sl-express.com/sl/sl-express-ms-service-scope-domain.git](http://git.sl-express.com/sl/sl-express-ms-service-scope-domain.git) |
| --- | --- |
| sl-express-ms-service-scope-api | [http://git.sl-express.com/sl/sl-express-ms-service-scope-api.git](http://git.sl-express.com/sl/sl-express-ms-service-scope-api.git) |
| sl-express-ms-service-scope-service | [http://git.sl-express.com/sl/sl-express-ms-service-scope-service.git](http://git.sl-express.com/sl/sl-express-ms-service-scope-service.git) |

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663228268367-fe754b0a-efc5-4eb6-a85c-53bbba860980.png#averageHue=%23fcfbfa&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=329&id=u6913bc1c&name=image.png&originHeight=543&originWidth=630&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22955&status=error&style=shadow&taskId=u10b9d70b-5134-418b-b449-e2745987dbc&title=&width=381.8181597496865)
### 4.2.2、配置
在配置中引入了MongoDB和EagleMap的共享配置。
```yaml
server:
  port: 18089
  tomcat:
    uri-encoding: UTF-8
    threads:
      max: 1000
      min-spare: 30
spring:
  cloud:
    nacos:
      username: nacos
      password: nacos
      server-addr: 192.168.150.101:8848
      discovery:
        namespace: ecae68ba-7b43-4473-a980-4ddeb6157bdc
      config:
        namespace: ecae68ba-7b43-4473-a980-4ddeb6157bdc
        shared-configs: #共享配置
          - data-id: shared-spring-mongodb.yml
            group: SHARED_GROUP
            refresh: false
          - data-id: shared-spring-eaglemap.yml
            group: SHARED_GROUP
            refresh: false
```
### 4.2.3、ServiceScopeEntity
机构和快递员的逻辑是一样的，所以可以共存一张表中，通过type进行区分，1-机构，2-快递员。
代码如下：
```java
package com.sl.ms.scope.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 服务范围实体
 */
@Data
@Document("sl_service_scope")
public class ServiceScopeEntity {

    @Id
    @JsonIgnore
    private ObjectId id;

    /**
     * 业务id，可以是机构或快递员
     */
    @Indexed
    private Long bid;

    /**
     * 类型 {@link com.sl.ms.scope.enums.ServiceTypeEnum}
     */
    @Indexed
    private Integer type;

    /**
     * 多边形范围，是闭合的范围,开始经纬度与结束经纬度必须一样
     * x: 经度，y：纬度
     */
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPolygon polygon;

    private Long created; //创建时间
    private Long updated; //更新时间
}

```
服务类型枚举：
```java
package com.sl.ms.scope.enums;

import cn.hutool.core.util.EnumUtil;

/**
 * 服务类型枚举
 */
public enum ServiceTypeEnum {

    ORGAN(1, "机构"),
    COURIER(2, "快递员");

    /**
     * 类型编码
     */
    private final Integer code;

    /**
     * 类型值
     */
    private final String value;


    ServiceTypeEnum(Integer code, String value) {
        this.code = code;
        this.value = value;
    }

    public Integer getCode() {
        return code;
    }

    public String getValue() {
        return value;
    }

    public static ServiceTypeEnum codeOf(Integer code) {
        return EnumUtil.getBy(ServiceTypeEnum::getCode, code);
    }
}

```
### 4.2.4、ScopeService
在ScopeService中主要定义了如下方法：

- 新增或更新服务范围
- 根据主键id删除数据
- 根据业务id和类型删除数据
- 根据主键查询数据
- 根据业务id和类型查询数据
- 根据坐标点查询所属的服务对象
- 根据详细地址查询所属的服务对象
```java
package com.sl.ms.scope.service;

import com.sl.ms.scope.entity.ServiceScopeEntity;
import com.sl.ms.scope.enums.ServiceTypeEnum;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;

import java.util.List;

/**
 * 服务范围Service
 */
public interface ScopeService {

    /**
     * 新增或更新服务范围
     *
     * @param bid     业务id
     * @param type    类型
     * @param polygon 多边形坐标点
     * @return 是否成功
     */
    Boolean saveOrUpdate(Long bid, ServiceTypeEnum type, GeoJsonPolygon polygon);

    /**
     * 根据主键id删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    Boolean delete(String id);

    /**
     * 根据业务id和类型删除数据
     *
     * @param bid  业务id
     * @param type 类型
     * @return 是否成功
     */
    Boolean delete(Long bid, ServiceTypeEnum type);

    /**
     * 根据主键查询数据
     *
     * @param id 主键
     * @return 服务范围数据
     */
    ServiceScopeEntity queryById(String id);

    /**
     * 根据业务id和类型查询数据
     *
     * @param bid  业务id
     * @param type 类型
     * @return 服务范围数据
     */
    ServiceScopeEntity queryByBidAndType(Long bid, ServiceTypeEnum type);

    /**
     * 根据坐标点查询所属的服务对象
     *
     * @param type  类型
     * @param point 坐标点
     * @return 服务范围数据
     */
    List<ServiceScopeEntity> queryListByPoint(ServiceTypeEnum type, GeoJsonPoint point);

    /**
     * 根据详细地址查询所属的服务对象
     *
     * @param type    类型
     * @param address 详细地址，如：北京市昌平区金燕龙办公楼传智教育总部
     * @return 服务范围数据
     */
    List<ServiceScopeEntity> queryListByPoint(ServiceTypeEnum type, String address);
}

```
### 4.2.5、ScopeController
```java
package com.sl.ms.scope.controller;

import com.sl.ms.scope.dto.ServiceScopeDTO;
import com.sl.ms.scope.entity.ServiceScopeEntity;
import com.sl.ms.scope.enums.ServiceTypeEnum;
import com.sl.ms.scope.service.ScopeService;
import com.sl.ms.scope.util.EntityUtils;
import com.sl.transport.common.util.ResponseEntityUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 服务范围
 */
@Api(tags = "服务范围")
@RestController
@RequestMapping("scopes")
@Validated
public class ScopeController {

    @Resource
    private ScopeService scopeService;

    /**
     * 新增或更新服务服务范围
     *
     * @return REST标准响应
     */
    @ApiOperation(value = "新增/更新", notes = "新增或更新服务服务范围")
    @PostMapping
    public ResponseEntity<Void> saveScope(@RequestBody ServiceScopeDTO serviceScopeDTO) {
        ServiceScopeEntity serviceScopeEntity = EntityUtils.toEntity(serviceScopeDTO);
        Long bid = serviceScopeEntity.getBid();
        ServiceTypeEnum type = ServiceTypeEnum.codeOf(serviceScopeEntity.getType());
        Boolean result = this.scopeService.saveOrUpdate(bid, type, serviceScopeEntity.getPolygon());
        if (result) {
            return ResponseEntityUtils.ok();
        }
        return ResponseEntityUtils.error();
    }

    /**
     * 删除服务范围
     *
     * @param bid  业务id
     * @param type 类型
     * @return REST标准响应
     */
    @ApiImplicitParams({
            @ApiImplicitParam(name = "bid", value = "业务id，可以是机构或快递员", dataTypeClass = Long.class),
            @ApiImplicitParam(name = "type", value = "类型，1-机构，2-快递员", dataTypeClass = Integer.class)
    })
    @ApiOperation(value = "删除", notes = "删除服务范围")
    @DeleteMapping("{bid}/{type}")
    public ResponseEntity<Void> delete(@NotNull(message = "bid不能为空") @PathVariable("bid") Long bid,
                                       @NotNull(message = "type不能为空") @PathVariable("type") Integer type) {
        Boolean result = this.scopeService.delete(bid, ServiceTypeEnum.codeOf(type));
        if (result) {
            return ResponseEntityUtils.ok();
        }
        return ResponseEntityUtils.error();
    }

    /**
     * 查询服务范围
     *
     * @param bid  业务id
     * @param type 类型
     * @return 服务范围数据
     */
    @ApiImplicitParams({
            @ApiImplicitParam(name = "bid", value = "业务id，可以是机构或快递员", dataTypeClass = Long.class),
            @ApiImplicitParam(name = "type", value = "类型，1-机构，2-快递员", dataTypeClass = Integer.class)
    })
    @ApiOperation(value = "查询", notes = "查询服务范围")
    @GetMapping("{bid}/{type}")
    public ResponseEntity<ServiceScopeDTO> queryServiceScope(@NotNull(message = "bid不能为空") @PathVariable("bid") Long bid,
                                                             @NotNull(message = "type不能为空") @PathVariable("type") Integer type) {
        ServiceScopeEntity serviceScopeEntity = this.scopeService.queryByBidAndType(bid, ServiceTypeEnum.codeOf(type));
        return ResponseEntityUtils.ok(EntityUtils.toDTO(serviceScopeEntity));
    }

    /**
     * 地址查询服务范围
     *
     * @param type    类型，1-机构，2-快递员
     * @param address 详细地址，如：北京市昌平区金燕龙办公楼传智教育总部
     * @return 服务范围数据列表
     */
    @ApiImplicitParams({
            @ApiImplicitParam(name = "type", value = "类型，1-机构，2-快递员", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "address", value = "详细地址，如：北京市昌平区金燕龙办公楼传智教育总部", dataTypeClass = String.class)
    })
    @ApiOperation(value = "地址查询服务范围", notes = "地址查询服务范围")
    @GetMapping("address")
    public ResponseEntity<List<ServiceScopeDTO>> queryListByAddress(@NotNull(message = "type不能为空") @RequestParam("type") Integer type,
                                                                    @NotNull(message = "address不能为空") @RequestParam("address") String address) {
        List<ServiceScopeEntity> serviceScopeEntityList = this.scopeService.queryListByPoint(ServiceTypeEnum.codeOf(type), address);
        return ResponseEntityUtils.ok(EntityUtils.toDTOList(serviceScopeEntityList));
    }

    /**
     * 位置查询服务范围
     *
     * @param type      类型，1-机构，2-快递员
     * @param longitude 经度
     * @param latitude  纬度
     * @return 服务范围数据列表
     */
    @ApiImplicitParams({
            @ApiImplicitParam(name = "type", value = "类型，1-机构，2-快递员", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "longitude", value = "经度", dataTypeClass = Double.class),
            @ApiImplicitParam(name = "latitude", value = "纬度", dataTypeClass = Double.class)
    })
    @ApiOperation(value = "位置查询服务范围", notes = "位置查询服务范围")
    @GetMapping("location")
    public ResponseEntity<List<ServiceScopeDTO>> queryListByAddress(@NotNull(message = "type不能为空") @RequestParam("type") Integer type,
                                                                    @NotNull(message = "longitude不能为空") @RequestParam("longitude") Double longitude,
                                                                    @NotNull(message = "latitude不能为空") @RequestParam("latitude") Double latitude) {
        List<ServiceScopeEntity> serviceScopeEntityList = this.scopeService.queryListByPoint(ServiceTypeEnum.codeOf(type), new GeoJsonPoint(longitude, latitude));
        return ResponseEntityUtils.ok(EntityUtils.toDTOList(serviceScopeEntityList));
    }
}

```
## 4.3、实现接口
```java
package com.sl.ms.scope.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.itheima.em.sdk.EagleMapTemplate;
import com.itheima.em.sdk.enums.ProviderEnum;
import com.itheima.em.sdk.vo.Coordinate;
import com.itheima.em.sdk.vo.GeoResult;
import com.sl.ms.scope.entity.ServiceScopeEntity;
import com.sl.ms.scope.enums.ServiceTypeEnum;
import com.sl.ms.scope.service.ScopeService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@Service
public class ScopeServiceImpl implements ScopeService {

    @Resource
    private MongoTemplate mongoTemplate;
    @Resource
    private EagleMapTemplate eagleMapTemplate;

    @Override
    public Boolean saveOrUpdate(Long bid, ServiceTypeEnum type, GeoJsonPolygon polygon) {
        Query query = Query.query(Criteria.where("bid").is(bid).and("type").is(type.getCode())); //构造查询条件
        ServiceScopeEntity serviceScopeEntity = this.mongoTemplate.findOne(query, ServiceScopeEntity.class);
        if (ObjectUtil.isEmpty(serviceScopeEntity)) {
            //新增
            serviceScopeEntity = new ServiceScopeEntity();
            serviceScopeEntity.setBid(bid);
            serviceScopeEntity.setType(type.getCode());
            serviceScopeEntity.setPolygon(polygon);
            serviceScopeEntity.setCreated(System.currentTimeMillis());
            serviceScopeEntity.setUpdated(serviceScopeEntity.getCreated());
        } else {
            //更新
            serviceScopeEntity.setPolygon(polygon);
            serviceScopeEntity.setUpdated(System.currentTimeMillis());
        }

        try {
            this.mongoTemplate.save(serviceScopeEntity);
            return true;
        } catch (Exception e) {
            log.error("新增/更新服务范围数据失败！ bid = {}, type = {}, points = {}", bid, type, polygon.getPoints(), e);
        }
        return false;
    }

    @Override
    public Boolean delete(String id) {
        Query query = Query.query(Criteria.where("id").is(new ObjectId(id))); //构造查询条件
        return this.mongoTemplate.remove(query, ServiceScopeEntity.class).getDeletedCount() > 0;
    }

    @Override
    public Boolean delete(Long bid, ServiceTypeEnum type) {
        Query query = Query.query(Criteria.where("bid").is(bid).and("type").is(type.getCode())); //构造查询条件
        return this.mongoTemplate.remove(query, ServiceScopeEntity.class).getDeletedCount() > 0;
    }

    @Override
    public ServiceScopeEntity queryById(String id) {
        return this.mongoTemplate.findById(new ObjectId(id), ServiceScopeEntity.class);
    }

    @Override
    public ServiceScopeEntity queryByBidAndType(Long bid, ServiceTypeEnum type) {
        Query query = Query.query(Criteria.where("bid").is(bid).and("type").is(type.getCode())); //构造查询条件
        return this.mongoTemplate.findOne(query, ServiceScopeEntity.class);
    }

    @Override
    public List<ServiceScopeEntity> queryListByPoint(ServiceTypeEnum type, GeoJsonPoint point) {
        Query query = Query.query(Criteria.where("polygon").intersects(point)
                .and("type").is(type.getCode()));
        return this.mongoTemplate.find(query, ServiceScopeEntity.class);
    }

    @Override
    public List<ServiceScopeEntity> queryListByPoint(ServiceTypeEnum type, String address) {
        //根据详细地址查询坐标
        GeoResult geoResult = this.eagleMapTemplate.opsForBase().geoCode(ProviderEnum.AMAP, address, null);
        Coordinate coordinate = geoResult.getLocation();
        return this.queryListByPoint(type, new GeoJsonPoint(coordinate.getLongitude(), coordinate.getLatitude()));
    }
}

```
## 4.4、测试
```java
package com.sl.ms.scope.service;

import com.sl.ms.scope.entity.ServiceScopeEntity;
import com.sl.ms.scope.enums.ServiceTypeEnum;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class ScopeServiceTest {

    @Resource
    private ScopeService scopeService;

    @Test
    void saveOrUpdate() {
        List<Point> pointList = Arrays.asList(new Point(116.340064,40.061245),
                new Point(116.347081,40.061836),
                new Point(116.34751,40.05842),
                new Point(116.342446,40.058092),
                new Point(116.340064,40.061245));
        Boolean result = this.scopeService.saveOrUpdate(2L, ServiceTypeEnum.ORGAN, new GeoJsonPolygon(pointList));
        System.out.println(result);
    }

    @Test
    void testQueryListByPoint() {
        GeoJsonPoint point = new GeoJsonPoint(116.344828,40.05911);
        List<ServiceScopeEntity> serviceScopeEntities = this.scopeService.queryListByPoint(ServiceTypeEnum.ORGAN, point);
        serviceScopeEntities.forEach(serviceScopeEntity -> System.out.println(serviceScopeEntity));
    }

    @Test
    void testQueryListByPoint2() {
        String address = "北京市昌平区金燕龙办公楼";
        List<ServiceScopeEntity> serviceScopeEntities = this.scopeService.queryListByPoint(ServiceTypeEnum.ORGAN, address);
        serviceScopeEntities.forEach(serviceScopeEntity -> System.out.println(serviceScopeEntity));
    }
}
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663233942822-3f4e5db1-e963-48b5-a94a-c0843a6f9aed.png#averageHue=%23f9f9f8&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=496&id=u87d58634&name=image.png&originHeight=819&originWidth=979&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49983&status=error&style=shadow&taskId=u81b4af1a-b03b-40b6-ad8e-c1bd2e17f2b&title=&width=593.3332990395922)
## 4.5、Jenkins发布
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663234668200-5e528c4f-8908-43d5-97c7-cb153ce210cb.png#averageHue=%23f4f5f7&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=400&id=u2aa97e6b&name=image.png&originHeight=660&originWidth=1327&originalType=binary&ratio=1&rotation=0&showTitle=false&size=94621&status=error&style=shadow&taskId=uef0cb5a2-c5d9-4b94-bd49-afe331ab413&title=&width=804.2423777584667)
构建成功：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663235176148-8707c8ca-0e46-4055-8626-68b11ba20d9c.png#averageHue=%23f3f3f3&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=389&id=u5a0c44f8&name=image.png&originHeight=642&originWidth=1341&originalType=binary&ratio=1&rotation=0&showTitle=false&size=108814&status=error&style=shadow&taskId=u71480695-ecfe-4291-a47b-2d58ddf8951&title=&width=812.7272257529041)
测试：[http://192.168.150.101:18089/doc.html](http://192.168.150.101:18089/doc.html)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663235140579-8746e248-fd9e-4a5d-80f1-78a31d966a6b.png#averageHue=%23fcfcfc&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=479&id=u9e88ab00&name=image.png&originHeight=790&originWidth=1314&originalType=binary&ratio=1&rotation=0&showTitle=false&size=87507&status=error&style=shadow&taskId=u77d7403b-44f9-415c-8193-42dd5d64900&title=&width=796.3635903350604)
## 4.6、整合测试
启动必要的服务：
```shell
docker start sl-express-gateway
docker start sl-express-ms-web-manager
docker start sl-express-ms-transport-service
docker start sl-express-ms-service-scope-service
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663241691095-b199fc78-772c-468c-be29-a23871a7637c.png#averageHue=%23f4eee0&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=455&id=u00ac1380&name=image.png&originHeight=750&originWidth=1587&originalType=binary&ratio=1&rotation=0&showTitle=false&size=465805&status=error&style=shadow&taskId=u77c63d62-83f7-4152-b44e-871df2b24ee&title=&width=961.8181262265913)
对应的数据：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1663241712353-548096b1-ba0c-424e-9ca5-759cb385a241.png#averageHue=%23fefdfd&clientId=u880ae199-c3a4-4&errorMessage=unknown%20error&from=paste&height=402&id=u1a681318&name=image.png&originHeight=664&originWidth=887&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34812&status=error&style=shadow&taskId=uaf5c89c4-014a-4a08-83c4-838d5582b8b&title=&width=537.5757265047174)
# 5、练习
## 5.1、练习1
难度系数：★★☆☆☆
描述：阅读后台系统中对于作业范围的管理相关代码。
## 5.2、练习2
难度系数：★★★☆☆
描述：阅读订单微服务中的下单时定位起点、终点机构的逻辑。
# 6、面试连环问
:::info
面试官问：

- MongoDB存储的数据结构与MySQL存储的数据结构有什么区别？
- 为什么会使用到MongoDB？MongoDB中如何存储坐标位置数据？如何实现附近的人查询？
- 用户下单后如何确定为其服务的快递员？如何确定起点、终点的机构？
- 作业范围如果不使用MongoDB，还可以使用其他技术实现吗？
:::

```java
    /**
     * 查询附近的人的所有用户id
     *
     * @param userId 用户id，中心点用户
     * @param metre  距离，单位：米
     * @return 附近的人
     */
    @Override
    public List<Long> queryNearUser(Long userId, Double metre) {
        //1、根据用户id，查询用户的位置信息
        Query query = Query.query(Criteria.where("userId").is(userId));
        UserLocation location = mongoTemplate.findOne(query, UserLocation.class);
        if (location == null) {
            return null;
        }
        //2、以当前用户位置绘制原点
        GeoJsonPoint point = location.getLocation();
        //3、绘制半径
        Distance distance = new Distance(metre / 1000, Metrics.KILOMETERS);
        //5、构建查询对象
        NearQuery nearQuery = NearQuery.near(point).maxDistance(distance);
        //6、执行查询，由近到远排序
        GeoResults<UserLocation> geoResults = mongoTemplate.geoNear(nearQuery, UserLocation.class);

        //7、获取结果对象，其中userLocationGeoResult.getDistance()可以获取目标点与中心点的位置
        return geoResults.getContent().stream()
                .map(userLocationGeoResult -> userLocationGeoResult.getContent().getUserId())
                .collect(Collectors.toList());
    }
```
