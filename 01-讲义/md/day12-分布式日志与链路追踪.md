# 1、课程安排
- 了解什么是分布式日志
- Graylog的部署安装
- 使用Graylog进行日志收集
- Graylog的搜索语法
- 了解什么是链路追踪
- Skywalking的基本使用
- 整合微服务使用Skywalking
- 将Skywalking整合到Docker中
# 2、背景说明
在微服务架构体系中，微服务上线后，有两个不容忽略的问题，一是日志该怎么存储、查看，二是如何在复杂的调用链中排查问题。
![kb.gif](https://cdn.nlark.com/yuque/0/2022/gif/27683667/1669510190769-eebfcb94-24d6-4850-b744-c458b8984623.gif#averageHue=%23ede2c7&clientId=u1f75cbc1-a4f9-4&from=paste&height=160&id=u27aa7f5b&name=kb.gif&originHeight=240&originWidth=240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58970&status=done&style=none&taskId=udfc5c253-ae55-4356-b47f-476eda9558f&title=&width=160)
## 2.1、日志问题
在微服务架构下，微服务被拆分成多个微小的服务，每个微小的服务都部署在不同的服务器实例上，当我们定位问题，检索日志的时候需要依次登录每台服务器进行检索。
这样是不是感觉很繁琐和效率低下？所以我们还需要一个工具来帮助集中收集、存储和搜索这些跟踪信息。
集中化管理日志后，日志的统计和检索又成为一件比较麻烦的事情。以前，我们通过使用grep、awk和wc等Linux命令能实现检索和统计，但是对于要求更高的查询、排序和统计等要求和庞大的机器数量依然使用这样的方法难免有点力不从心。
所以，需要通过**分布式日志服务**来帮我们解决上述问题的。
## 2.2、调用链问题
在微服务架构下，如何排查异常的微服务，比如：发布新版本后发现系统处理用户请求变慢了，要想解决这个问首先是要找出“慢”的环节，此时就需要对整个微服务的调用链有清晰的监控，否则是不容易找出问题的。下面所展现的就是通过skywalking可以查看微服务的调用链，就会比较容易的找出问题：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665457114129-8f54e80a-3f7c-480d-906f-e08ef182da7b.png#averageHue=%23dddfe2&clientId=u04256736-5a5a-4&errorMessage=unknown%20error&from=paste&id=u0a6d7f24&name=image.png&originHeight=987&originWidth=1920&originalType=url&ratio=1&rotation=0&showTitle=true&size=228016&status=error&style=shadow&taskId=u2969321e-f566-4492-b87a-35eb322867d&title=skywalking%E5%B1%95%E7%A4%BA%E7%9A%84%E8%B0%83%E7%94%A8%E9%93%BE "skywalking展示的调用链")
# 3、分布式日志
## 3.1、实现思路
分布式日志框架服务的实现思路基本是一致的，如下：

- **日志收集器：**微服务中引入日志客户端，将记录的日志发送到日志服务端的收集器，然后以某种方式存储
- **数据存储：**一般使用ElasticSearch分布式存储，把收集器收集到的日志格式化，然后存储到分布式存储中
- **web服务：**利用ElasticSearch的统计搜索功能，实现日志查询和报表输出

比较知名的分布式日志服务包括：

- ELK：elasticsearch、Logstash、Kibana
- GrayLog

本课程主要是基于GrayLog讲解。
## 3.2、为什么选择GrayLog？
业界比较知名的分布式日志服务解决方案是ELK，而我们今天要学习的是GrayLog。为什么呢？
ELK解决方案的问题：

1. 不能处理多行日志，比如Mysql慢查询，Tomcat/Jetty应用的Java异常打印
2. 不能保留原始日志，只能把原始日志分字段保存，这样搜索日志结果是一堆Json格式文本，无法阅读。
3. 不符合正则表达式匹配的日志行，被全部丢弃。

GrayLog方案的优势：

1. 一体化方案，安装方便，不像ELK有3个独立系统间的集成问题。
2. 采集原始日志，并可以事后再添加字段，比如http_status_code，response_time等等。
3. 自己开发采集日志的脚本，并用curl/nc发送到Graylog Server，发送格式是自定义的GELF，Flunted和Logstash都有相应的输出GELF消息的插件。自己开发带来很大的自由度。实际上只需要用inotifywait监控日志的modify事件，并把日志的新增行用curl/netcat发送到Graylog Server就可。
4. 搜索结果高亮显示，就像google一样。
5. 搜索语法简单，比如： `source:mongo AND reponse_time_ms:>5000`，避免直接输入elasticsearch搜索json语法
6. 搜索条件可以导出为elasticsearch的搜索json文本，方便直接开发调用elasticsearch rest api的搜索脚本。
## 3.3、GrayLog简介
GrayLog是一个轻量型的分布式日志管理平台，一个开源的日志聚合、分析、审计、展示和预警工具。在功能上来说，和 ELK类似，但又比 ELK要简单轻量许多。依靠着更加简洁，高效，部署使用简单的优势很快受到许多公司的青睐。
官网：[https://www.graylog.org/](https://www.graylog.org/)
其基本框架如图：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665713490597-11282e05-d6f4-49f4-862a-dcf0a953aa74.png#averageHue=%23f2f2f2&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=382&id=ua942d9a9&name=image.png&originHeight=631&originWidth=697&originalType=binary&ratio=1&rotation=0&showTitle=false&size=87287&status=error&style=shadow&taskId=ub55301f5-bacc-42b3-b72e-ad20cb32035&title=&width=422.42421800878014)
流程如下：

- 微服务中的GrayLog客户端发送日志到GrayLog服务端
- GrayLog把日志信息格式化，存储到Elasticsearch
- 客户端通过浏览器访问GrayLog，GrayLog访问Elasticsearch

这里MongoDB是用来存储GrayLog的配置信息的，这样搭建集群时，GrayLog的各节点可以共享配置。
## 3.4、部署安装
我们在虚拟机中选择使用Docker来安装。需要安装的包括：

- MongoDB：用来存储GrayLog的配置信息
- Elasticsearch：用来存储日志信息
- GrayLog：GrayLog服务端

下面将通过docker的方式部署，镜像已经下载到101虚拟机中，部署脚本如下：
```shell
#部署Elasticsearch
docker run -d \
    --name elasticsearch \
    -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
    -e "discovery.type=single-node" \
    -v es-data:/usr/share/elasticsearch/data \
    -v es-plugins:/usr/share/elasticsearch/plugins \
    --privileged \
    -p 9200:9200 \
    -p 9300:9300 \
elasticsearch:7.17.5

#部署MongoDB（使用之前部署的服务即可）
docker run -d \
--name mongodb \
-p 27017:27017 \
--restart=always \
-v mongodb:/data/db \
-e MONGO_INITDB_ROOT_USERNAME=sl \
-e MONGO_INITDB_ROOT_PASSWORD=123321 \
mongo:4.4

#部署
docker run \
--name graylog \
-p 9000:9000 \
-p 12201:12201/udp \
-e GRAYLOG_HTTP_EXTERNAL_URI=http://192.168.150.101:9000/ \
-e GRAYLOG_ELASTICSEARCH_HOSTS=http://192.168.150.101:9200/ \
-e GRAYLOG_ROOT_TIMEZONE="Asia/Shanghai"  \
-e GRAYLOG_WEB_ENDPOINT_URI="http://192.168.150.101:9000/:9000/api" \
-e GRAYLOG_PASSWORD_SECRET="somepasswordpepper" \
-e GRAYLOG_ROOT_PASSWORD_SHA2=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918 \
-e GRAYLOG_MONGODB_URI=mongodb://sl:123321@192.168.150.101:27017/admin \
-d \
graylog/graylog:4.3
```
命令解读：

- 端口信息： 
   - `-p 9000:9000`：GrayLog的http服务端口，9000
   - `-p 12201:12201/udp`：GrayLog的GELF UDP协议端口，用于接收从微服务发来的日志信息
- 环境变量 
   - `-e GRAYLOG_HTTP_EXTERNAL_URI`：对外开放的ip和端口信息，这里用9000端口
   - `-e GRAYLOG_ELASTICSEARCH_HOSTS`：GrayLog依赖于ES，这里指定ES的地址
   - `-e GRAYLOG_WEB_ENDPOINT_URI`：对外开放的API地址
   - `-e GRAYLOG_PASSWORD_SECRET`：密码加密的秘钥
   - `-e GRAYLOG_ROOT_PASSWORD_SHA2`：密码加密后的密文。明文是`admin`，账户也是`admin`
   - `-e GRAYLOG_ROOT_TIMEZONE="Asia/Shanghai"`：GrayLog容器内时区
   - `-e GRAYLOG_MONGODB_URI`：指定MongoDB的链接信息
- `graylog/graylog:4.3`：使用的镜像名称，版本为4.3

访问地址 [http://192.168.150.101:9000/](http://192.168.150.101:9000/) ， 如果可以看到如下界面说明启动成功。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665718695596-41a7353a-a858-4d0a-99ec-ff4df7bd95d1.png#averageHue=%23989898&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=523&id=u84b53aa1&name=image.png&originHeight=863&originWidth=1326&originalType=binary&ratio=1&rotation=0&showTitle=false&size=494188&status=error&style=shadow&taskId=u86bfd8fa-1ab8-471a-b7a9-9a6a6c80311&title=&width=803.6363171874355)
通过 `admin/admin`登录，即可看到欢迎页面，目前还没有数据：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665719184394-1795f164-604b-4c55-ab47-0a282cf9312f.png#averageHue=%23f5f5f5&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=552&id=uee9b51d6&name=image.png&originHeight=911&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=149235&status=error&style=shadow&taskId=ub03ddbd9-3d47-46f9-89a7-e7a55877d6c&title=&width=1163.636296379997)
## 3.5、收集日志
### 3.5.1、配置Inputs
部署完成GrayLog后，需要配置Inputs才能接收微服务发来的日志数据。
第一步，在`System`菜单中选择`Inputs`：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665730687617-25502471-f2ae-418b-9de3-b7996d55aa92.png#averageHue=%23f6f6f6&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=455&id=uc4696273&name=image.png&originHeight=750&originWidth=910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=84042&status=error&style=shadow&taskId=u513ee479-0478-48da-9efa-1a6ffaac67e&title=&width=551.5151196384361)
第二步，在页面的下拉选框中，选择`GELF UDP`：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665730827378-5283cb34-bf3a-4959-b5c3-c251870c6d79.png#averageHue=%23ecf0f3&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=417&id=u680a55c9&name=image.png&originHeight=688&originWidth=970&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47547&status=error&style=shadow&taskId=u0b8d5a53-e55d-4e50-bc1d-96b0a7e3dc7&title=&width=587.878753900311)
然后点击`Launch new input`按钮：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665730956478-958196cb-1aef-4f24-a64f-7ec45e7fd6e5.png#averageHue=%23f9f9f9&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=494&id=udabecb1c&name=image.png&originHeight=815&originWidth=898&originalType=binary&ratio=1&rotation=0&showTitle=false&size=69022&status=error&style=shadow&taskId=u3da5731a-22a6-4541-acb4-987722587f6&title=&width=544.2423927860611)
点击`save`保存：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665731011719-861d7c86-f696-4d0c-8265-5199890ddd25.png#averageHue=%23f6f6f6&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=264&id=u94327a49&name=image.png&originHeight=436&originWidth=1844&originalType=binary&ratio=1&rotation=0&showTitle=false&size=84868&status=error&style=shadow&taskId=u403036f4-1950-4006-93c7-eee3c9c0c33&title=&width=1117.575692981622)
可以看到，GELF UDP Inputs 保存成功。
### 3.5.2、集成微服务
现在，GrayLog的服务端日志收集器已经准备好，我们还需要在项目中添加GrayLog的客户端，将项目日志发送到GrayLog服务中，保存到ElasticSearch。
基本步骤如下：

- 引入GrayLog客户端依赖
- 配置Logback，集成GrayLog的Appender
- 启动并测试

这里，我们以work微服务为例，其他的类似。
导入依赖：
```xml
<dependency>
    <groupId>biz.paluch.logging</groupId>
    <artifactId>logstash-gelf</artifactId>
    <version>1.15.0</version>
</dependency>
```
配置Logback，在配置文件中增加 GELF的appender：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--scan: 当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true。-->
<!--scanPeriod: 设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。-->
<!--debug: 当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。默认值为false。-->
<configuration debug="false" scan="false" scanPeriod="60 seconds">
    <springProperty scope="context" name="appName" source="spring.application.name"/>
    <!--文件名-->
    <property name="logback.appname" value="${appName}"/>
    <!--文件位置-->
    <property name="logback.logdir" value="/data/logs"/>

    <!-- 定义控制台输出 -->
    <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} - [%thread] - %-5level - %logger{50} - %msg%n</pattern>
        </layout>
    </appender>


    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>DEBUG</level>
        </filter>
        <File>${logback.logdir}/${logback.appname}/${logback.appname}.log</File>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <FileNamePattern>${logback.logdir}/${logback.appname}/${logback.appname}.%d{yyyy-MM-dd}.log.zip</FileNamePattern>
            <maxHistory>90</maxHistory>
        </rollingPolicy>
        <encoder>
            <charset>UTF-8</charset>
            <pattern>%d [%thread] %-5level %logger{36} %line - %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="GELF" class="biz.paluch.logging.gelf.logback.GelfLogbackAppender">
        <!--GrayLog服务地址-->
        <host>udp:192.168.150.101</host>
        <!--GrayLog服务端口-->
        <port>12201</port>
        <version>1.1</version>
        <!--当前服务名称-->
        <facility>${appName}</facility>
        <extractStackTrace>true</extractStackTrace>
        <filterStackTrace>true</filterStackTrace>
        <mdcProfiling>true</mdcProfiling>
        <timestampPattern>yyyy-MM-dd HH:mm:ss,SSS</timestampPattern>
        <maximumMessageSize>8192</maximumMessageSize>
    </appender>

    <!--evel:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，-->
    <!--不能设置为INHERITED或者同义词NULL。默认是DEBUG。-->
    <root level="INFO">
        <appender-ref ref="stdout"/>
        <appender-ref ref="GELF"/>
    </root>
</configuration>
```
修改代码，`com.sl.ms.work.controller.TransportOrderController#findStatusCount()`进入打印日志便于查看数据，启动服务，点击search按钮即可看到日志数据：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665732664103-806504aa-709d-4592-8b90-1dc73933df56.png#averageHue=%23f8f8f8&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=554&id=uce4c7405&name=image.png&originHeight=914&originWidth=1877&originalType=binary&ratio=1&rotation=0&showTitle=false&size=176672&status=error&style=shadow&taskId=ue1b84a11-493a-4b86-8eb3-97d2b4f53e8&title=&width=1137.5756918256534)
## 3.6、日志回收策略
到此graylog的基础配置就算完成了，已经可以收到日志数据。
但是在实际工作中，服务日志会非常多，这么多的日志，如果不进行存储限制，那么不久就会占满磁盘，查询变慢等等，而且过久的历史日志对于实际工作中的有效性也会很低。
Graylog则自身集成了日志数据限制的配置，可以通过如下进行设置：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665734251521-3d3830c0-0909-4dd6-b454-62e6860b33d4.png#averageHue=%23f7f7f7&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=393&id=u4a8d1f26&name=image.png&originHeight=649&originWidth=738&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53036&status=error&style=shadow&taskId=u90c415d2-359a-4983-baca-c9246539fae&title=&width=447.27270142106136)
选择`Default index set`的`Edit`按钮：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665734837159-06c3759c-59bb-471c-ba1a-54d85e027453.png#averageHue=%23f7f7f7&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=548&id=udd2c6aae&name=image.png&originHeight=904&originWidth=1882&originalType=binary&ratio=1&rotation=0&showTitle=false&size=205260&status=error&style=shadow&taskId=u3dbc7dee-3fbc-47dc-800e-a30ee8abe2f&title=&width=1140.6059946808095)
GrayLog有3种日志回收限制，触发以后就会开始回收空间，删除索引：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665736710572-73b4d2e4-159f-4aa2-983d-792c8e2083c3.png#averageHue=%23f3f3f3&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=273&id=u31870223&name=image.png&originHeight=450&originWidth=1228&originalType=binary&ratio=1&rotation=0&showTitle=false&size=73096&status=error&style=shadow&taskId=u5ef1495a-013c-49c3-9bd1-d654eda8c9a&title=&width=744.242381226373)
分别是：

- `Index Message Count`：按照日志数量统计，默认超过`20000000`条日志开始清理
   - 我们测试时，设置`100000`即可
- `Index Size`：按照日志大小统计，默认超过`1GB`开始清理
- `Index Message Count`：按照日志日期清理，默认日志存储1天
## 3.7、搜索语法
在search页面，可以完成基本的日志搜索功能：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665757134198-27c16be2-9e1d-48a4-a8a3-b3b0f125b870.png#averageHue=%23f8f8f8&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=385&id=u8bef9bc1&name=image.png&originHeight=636&originWidth=1295&originalType=binary&ratio=1&rotation=0&showTitle=false&size=183455&status=error&style=shadow&taskId=u9c9d1145-d445-42aa-810c-b82fdf60be5&title=&width=784.8484394854668)
### 3.7.1、搜索语法
搜索语法非常简单，输入关键字或指定字段进行搜索：
```shell
#不指定字段，默认从message字段查询
输入：undo

#输入两个关键字，关系为or
undo 统计

#加引号是需要完整匹配
"undo 统计"

#指定字段查询，level表示日志级别，ERROR（3）、WARNING（4）、NOTICE（5）、INFO（6）、DEBUG（7）
level: 6

#或条件
level:(6 OR 7)
```
更多查询官网文档：[https://docs.graylog.org/docs/query-language](https://docs.graylog.org/docs/query-language)
### 3.7.2、自定义展示字段
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665758961482-31458a4c-eeee-4ffe-8485-8034464be829.png#averageHue=%23f1f0f0&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=531&id=u6b33b395&name=image.png&originHeight=876&originWidth=429&originalType=binary&ratio=1&rotation=0&showTitle=false&size=93165&status=error&style=shadow&taskId=u92c6fa71-b0a6-4cdc-a653-cf56187b277&title=&width=259.99998497240557)
效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665759022999-35b70e1d-f691-4839-b614-196c19e1f2c3.png#averageHue=%23f9f9f9&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=302&id=u7ab79c6c&name=image.png&originHeight=499&originWidth=1791&originalType=binary&ratio=1&rotation=0&showTitle=false&size=172199&status=error&style=shadow&taskId=u3d34b8f0-0516-4508-b604-30b6d60c0a0&title=&width=1085.454482716966)
## 3.8、日志统计仪表盘
GrayLog支持把日志按照自己需要的方式形成统计报表，并把许多报表组合一起，形成DashBoard（仪表盘），方便对日志统计分析。
### 3.8.1、创建仪表盘
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665761796118-02380a03-a66d-4360-8262-6bd9e7e90db0.png#averageHue=%23f9f8f7&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=193&id=u71a54336&name=image.png&originHeight=319&originWidth=1902&originalType=binary&ratio=1&rotation=0&showTitle=false&size=68744&status=error&style=shadow&taskId=u317fb222-abad-4309-a156-a430670a208&title=&width=1152.7272061014346)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665761915494-2165047d-d9b7-44c7-b681-56bc0cceb7c3.png#averageHue=%23f3f2f2&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=193&id=ue630cc79&name=image.png&originHeight=319&originWidth=1874&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43983&status=error&style=shadow&taskId=ud04b3923-9713-4e84-ad31-0065694083c&title=&width=1135.7575101125597)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665761860314-c6669d51-b30b-4ab2-b38b-768dcf056321.png#averageHue=%23fafafa&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=416&id=u0dd11058&name=image.png&originHeight=687&originWidth=1356&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47368&status=error&style=shadow&taskId=u8f2c8e4d-e453-4e9b-836f-351041a1930&title=&width=821.8181343183729)
可以设置各种指标：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665762220352-ca29ff53-65b5-41f8-8ec5-22804d3a0b14.png#averageHue=%23fafafa&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=488&id=uf4f3f05a&name=image.png&originHeight=805&originWidth=1844&originalType=binary&ratio=1&rotation=0&showTitle=false&size=94379&status=error&style=shadow&taskId=ue3d0df4e-c470-4dea-9cca-7f3b5818eec&title=&width=1117.575692981622)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665762302983-e9799d67-5ce5-4820-ac4d-88b92644f9e3.png#averageHue=%23fcf9f7&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=487&id=u1954796e&name=image.png&originHeight=803&originWidth=1842&originalType=binary&ratio=1&rotation=0&showTitle=false&size=78186&status=error&style=shadow&taskId=uc55d262d-1361-4fbd-aa00-ee9dbdc0f27&title=&width=1116.3635718395597)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665762338843-14e8fef9-39ea-47ab-941e-7fbeae56d912.png#averageHue=%23f6f6f6&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=487&id=u3828a630&name=image.png&originHeight=803&originWidth=1842&originalType=binary&ratio=1&rotation=0&showTitle=false&size=75564&status=error&style=shadow&taskId=u784f4d23-3771-479f-a54a-487c70e60d8&title=&width=1116.3635718395597)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665762353846-71fab462-eaf1-4d6e-aefd-edb2617b1419.png#averageHue=%23fcfcfc&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=487&id=u4e177505&name=image.png&originHeight=803&originWidth=1842&originalType=binary&ratio=1&rotation=0&showTitle=false&size=81190&status=error&style=shadow&taskId=u9c6d22fa-323c-46c5-b1da-4432c91c8ca&title=&width=1116.3635718395597)
最终效果：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665762156480-7420a34b-8f14-4906-8c9a-6001c285536f.png#averageHue=%23f9f8f8&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=524&id=ud75efdfb&name=image.png&originHeight=864&originWidth=1870&originalType=binary&ratio=1&rotation=0&showTitle=false&size=76293&status=error&style=shadow&taskId=u9c4362ed-22da-40c8-9621-4270c7faf1b&title=&width=1133.3332678284346)
官方给出的效果：
![dashboardexamplev2.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665762476313-1ae6a64b-d903-41b2-ba66-7b295b619220.png#averageHue=%23e8e7e6&clientId=u4043fa1c-d2c6-4&errorMessage=unknown%20error&from=paste&height=761&id=u52d85903&name=dashboardexamplev2.png&originHeight=1256&originWidth=2545&originalType=binary&ratio=1&rotation=0&showTitle=false&size=298680&status=error&style=shadow&taskId=u6950f082-54f1-4587-a157-c68b34c398f&title=&width=1542.4241532745273)
# 4、链路追踪
## 4.1、APM
### 4.1.1、什么是APM
随着微服务架构的流行，一次请求往往需要涉及到多个服务，因此服务性能监控和排查就变得更复杂

- 不同的服务可能由不同的团队开发、甚至可能使用不同的编程语言来实现
- 服务有可能布在了几千台服务器，横跨多个不同的数据中心

因此，就需要一些可以帮助理解系统行为、用于分析性能问题的工具，以便发生故障的时候，能够快速定位和解决问题，这就是APM系统，全称是（**A**pplication **P**erformance **M**onitor，当然也有叫 **A**pplication **P**erformance **M**anagement tools）
APM最早是谷歌公开的论文提到的 [Google Dapper](http://bigbully.github.io/Dapper-translation)。Dapper是Google生产环境下的分布式跟踪系统，自从Dapper发展成为一流的监控系统之后，给google的开发者和运维团队帮了大忙，所以谷歌公开论文分享了Dapper。
### 4.1.2、原理
先来看一次请求调用示例：

1. 包括：前端（A），两个中间层（B和C），以及两个后端（D和E）
2. 当用户发起一个请求时，首先到达前端A服务，然后分别对B服务和C服务进行RPC调用；
3. B服务处理完给A做出响应，但是C服务还需要和后端的D服务和E服务交互之后再返还给A服务，最后由A服务来响应用户的请求；

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665806359627-f2bc61f7-62c0-425d-b36e-2150c9f9cf90.png#averageHue=%23f2f1f1&clientId=u57ee922a-a96e-4&errorMessage=unknown%20error&from=paste&height=420&id=ud324fc17&name=image.png&originHeight=693&originWidth=787&originalType=binary&ratio=1&rotation=0&showTitle=false&size=149216&status=error&style=shadow&taskId=u4543b1f7-d382-421b-999a-bc64e1e2ce1&title=&width=476.9696694015925)
如何才能实现跟踪呢？需要明白下面几个概念：

- 探针：负责在客户端程序运行时收集服务调用链路信息，发送给收集器
- 收集器：负责将数据格式化，保存到存储器
- 存储器：保存数据
- UI界面：统计并展示

探针会在链路追踪时记录每次调用的信息，Span是**基本单元**，一次链路调用（可以是RPC，DB等没有特定的限制）创建一个span，通过一个64位ID标识它；同时附加（Annotation）作为payload负载信息，用于记录性能等数据。
一个Span的基本数据结构：
```c
type Span struct {
    TraceID    int64 // 用于标示一次完整的请求id
    Name       string //名称
    ID         int64 // 当前这次调用span_id
    ParentID   int64 // 上层服务的调用span_id  最上层服务parent_id为null，代表根服务root
    Annotation []Annotation // 记录性能等数据
    Debug      bool
}
```
一次请求的每个链路，通过spanId、parentId就能串联起来：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665806483716-970f2477-c3f0-4862-98cf-c404aee123d3.png#averageHue=%23f1f1f1&clientId=u57ee922a-a96e-4&errorMessage=unknown%20error&from=paste&height=467&id=u8772c60d&name=image.png&originHeight=770&originWidth=992&originalType=binary&ratio=1&rotation=0&showTitle=false&size=161615&status=error&style=shadow&taskId=ua5df2b7f-fa74-424a-a291-d056e4bcd58&title=&width=601.2120864629984)
当然，从请求到服务器开始，服务器返回response结束，每个span存在相同的唯一标识trace_id。
### 4.1.3、技术选型
市面上的全链路监控理论模型大多都是借鉴Google Dapper论文，重点关注以下三种APM组件：

- [**Zipkin**](https://link.juejin.im/?target=http%3A%2F%2Fzipkin.io%2F)：由Twitter公司开源，开放源代码分布式的跟踪系统，用于收集服务的定时数据，以解决微服务架构中的延迟问题，包括：数据的收集、存储、查找和展现。
- [**Pinpoint**](https://pinpoint.com/)：一款对Java编写的大规模分布式系统的APM工具，由韩国人开源的分布式跟踪组件。
- [**Skywalking**](https://skywalking.apache.org/zh/)：国产的优秀APM组件，是一个对JAVA分布式应用程序集群的业务运行情况进行追踪、告警和分析的系统。现在是Apache的顶级项目之一。

选项就是对比各个系统的使用差异，主要对比项：

1.  **探针的性能**
主要是agent对服务的吞吐量、CPU和内存的影响。微服务的规模和动态性使得数据收集的成本大幅度提高。 
2.  **collector的可扩展性**
能够水平扩展以便支持大规模服务器集群。 
3.  **全面的调用链路数据分析**
提供代码级别的可见性以便轻松定位失败点和瓶颈。 
4.  **对于开发透明，容易开关**
添加新功能而无需修改代码，容易启用或者禁用。 
5.  **完整的调用链应用拓扑**
自动检测应用拓扑，帮助你搞清楚应用的架构 

三者对比如下：

| 对比项 | zipkin | pinpoint | skywalking |
| --- | --- | --- | --- |
| 探针性能 | 中 | 低 | **高** |
| collector扩展性 | **高** | 中 | **高** |
| 调用链路数据分析 | 低 | **高** | 中 |
| 对开发透明性 | 中 | **高** | **高** |
| 调用链应用拓扑 | 中 | **高** | 中 |
| 社区支持 | **高** | 中 | **高** |

综上所述，使用skywalking是最佳的选择。
## 4.2、Skywalking简介
SkyWalking创建与2015年，提供分布式追踪功能，是一个功能完备的APM系统。
官网地址：[http://skywalking.apache.org/](http://skywalking.apache.org/)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665817027063-8dfabe2a-c38d-4dca-8270-d489d90a9dae.png#averageHue=%23fefefe&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=554&id=u7f75e23d&name=image.png&originHeight=914&originWidth=1851&originalType=binary&ratio=1&rotation=0&showTitle=false&size=104769&status=error&style=shadow&taskId=uea4ab7cf-efa1-4deb-a221-57e81ad2dbe&title=&width=1121.8181169788409)
主要的特征：

-  多语言探针或类库 
   - Java自动探针，追踪和监控程序时，不需要修改源码。
   - 社区提供的其他多语言探针 
      - [.NET Core](https://github.com/OpenSkywalking/skywalking-netcore)
      - [Node.js](https://github.com/OpenSkywalking/skywalking-nodejs)
-  多种后端存储： ElasticSearch， H2 
-  支持OpenTracing 
   - Java自动探针支持和OpenTracing API协同工作
-  轻量级、完善功能的后端聚合和分析 
-  现代化Web UI 
-  日志集成 
-  应用、实例和服务的告警 

官方架构图：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665817915313-275041aa-123c-47fc-a155-308fe4b007e4.png#averageHue=%23e5ddc3&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=345&id=u875b5625&name=image.png&originHeight=570&originWidth=1245&originalType=binary&ratio=1&rotation=0&showTitle=false&size=317245&status=error&style=shadow&taskId=u76466d1c-5af1-436b-a4dc-9183f978554&title=&width=754.5454109339043)
大致分四个部分：

- skywalking-oap-server：就是**O**bservability **A**nalysis **P**latform的服务，用来收集和处理探针发来的数据
- skywalking-UI：就是skywalking提供的Web UI 服务，图形化方式展示服务链路、拓扑图、trace、性能监控等
- agent：探针，获取服务调用的链路信息、性能信息，发送到skywalking的OAP服务
- Storage：存储，一般选择elasticsearch

因此我们安装部署也从这四个方面入手，目前elasticsearch已经安装完成，只需要部署其他3个即可。
## 4.3、部署安装
通过docker部署，需要部署两部分，分别是`skywalking-oap-server`和`skywalking-UI`。
```shell
#oap服务，需要指定Elasticsearch以及链接信息
docker run -d \
-e TZ=Asia/Shanghai \
--name oap \
-p 12800:12800 \
-p 11800:11800 \
-e SW_STORAGE=elasticsearch \
-e SW_STORAGE_ES_CLUSTER_NODES=192.168.150.101:9200 \
apache/skywalking-oap-server:9.1.0


#部署ui，需要指定oap服务
docker run -d \
--name oap-ui \
-p 48080:8080 \
-e TZ=Asia/Shanghai \
-e SW_OAP_ADDRESS=http://192.168.150.101:12800 \
apache/skywalking-ui:9.1.0
```
启动成功后，访问地址[http://192.168.150.101:48080/](http://192.168.150.101:48080/)，即可查看skywalking的ui界面。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665820744968-6e9db592-ba30-4596-9f9f-33177539c89e.png#averageHue=%23dadbdc&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=554&id=u319194fd&name=image.png&originHeight=914&originWidth=1887&originalType=binary&ratio=1&rotation=0&showTitle=false&size=84680&status=error&style=shadow&taskId=u0bf6faae-343b-40bd-9b16-0d593560832&title=&width=1143.6362975359657)
## 4.4、微服务探针
现在，Skywalking的服务端已经启动完成，我们还需要在微服务中加入服务探针，来收集数据。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665821845095-f1c06252-e7b1-40f4-9dcc-9dc9b9f9a19f.png#averageHue=%23acc69d&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=119&id=u2a1af4d9&name=image.png&originHeight=197&originWidth=592&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22553&status=error&style=shadow&taskId=ub25d279e-6d54-415c-91d6-b843ecf0d89&title=&width=358.7878580504991)
将`skywalking-agent`解压到非中文目录。
在微服务中设置启动参数，以work微服务为例：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665821931309-0410b721-084d-4d11-97f5-89376b463b8e.png#averageHue=%23f4f4f3&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=612&id=u50912d81&name=image.png&originHeight=1009&originWidth=1424&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58632&status=error&style=shadow&taskId=u0210466b-c9ea-4aea-989e-20f9cef916c&title=&width=863.0302531484978)
输入如下内容：
```shell
-javaagent:F:\code\sl-express\docs\resources\skywalking-agent\skywalking-agent.jar
-Dskywalking.agent.service_name=ms::sl-express-ms-work
-Dskywalking.collector.backend_service=192.168.150.101:11800
```
参数说明：

- javaagent： 将skywalking-agent以代理的方式整合到微服务中
- skywalking.agent.service_name：指定服务名称，格式：[${group name}::]${logic name}
- skywalking.collector.backend_service：指定oap服务，注意端口要走11800

设置完成后，重新启动work微服务，多请求几次接口，即可自oap-ui中看到数据。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665822382586-481265e1-843c-486a-b847-ef8d41310ebd.png#averageHue=%23dadbdc&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=554&id=ua1d16c8d&name=image.png&originHeight=914&originWidth=1870&originalType=binary&ratio=1&rotation=0&showTitle=false&size=96850&status=error&style=shadow&taskId=u356c239b-fa94-4af8-a743-3ee1455cbfb&title=&width=1133.3332678284346)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665822458416-42250bcf-800b-4990-b032-301d1192ec84.png#averageHue=%23fcfcfc&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=486&id=u9515525e&name=image.png&originHeight=802&originWidth=1595&originalType=binary&ratio=1&rotation=0&showTitle=false&size=100086&status=error&style=shadow&taskId=uc46dc9c9-0043-4bb1-8284-0ef0477ae6d&title=&width=966.6666107948413)
查看链路：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665822528883-d5ea8dc2-1dd6-4908-aab8-3669d2839dd6.png#averageHue=%23fcfcfc&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=518&id=u3f3c941a&name=image.png&originHeight=855&originWidth=1595&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134489&status=error&style=shadow&taskId=ud2e903e2-ddc3-454e-aa51-01ae14a9d27&title=&width=966.6666107948413)
服务关系拓扑图：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665822607797-7c98ffd4-a4eb-4556-abd7-75db0d111c78.png#averageHue=%233a3f47&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=486&id=u33739925&name=image.png&originHeight=802&originWidth=1511&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67601&status=error&style=shadow&taskId=u69f56727-a603-4662-b083-76b146dc9d4&title=&width=915.7575228282163)
## 4.5、整合到docker服务
前面的测试是在本地测试，如何将SkyWalking整合到docker服务中呢？
这里以`sl-express-ms-web-courier`为例，其他的服务类似。
第一步，修改Dockerfile文件
```shell
#FROM openjdk:11-jdk
#修改为基于整合了skywalking的镜像，其他的不需要动
FROM apache/skywalking-java-agent:8.11.0-java11
LABEL maintainer="研究院研发组 <research@itcast.cn>"
 
# 时区修改为东八区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
 
WORKDIR /app
ARG JAR_FILE=target/*.jar
ADD ${JAR_FILE} app.jar

EXPOSE 8080
ENTRYPOINT ["sh","-c","java -Djava.security.egd=file:/dev/./urandom -jar $JAVA_OPTS app.jar"]
```
第二步，在Jenkins中编辑修改配置：
`名称：skywalkingServiceName   值：ms::sl-express-ms-web-courier`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665845455649-0487b907-8c8d-42b7-979a-e36d72d20380.png#averageHue=%23fefefe&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=382&id=u08bb1b12&name=image.png&originHeight=630&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33004&status=error&style=shadow&taskId=u0915bce5-7665-4bf0-841b-96bf3dd8d39&title=&width=727.2726852374981)
`名称：skywalkingBackendService   值：192.168.150.101:11800`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665845518413-a6d23451-c723-47c1-b8ae-62688a74994f.png#averageHue=%23fefefe&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=388&id=ufa8a7442&name=image.png&originHeight=640&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32243&status=error&style=shadow&taskId=ue725b03c-3ba8-40fa-b99c-87463e5efa2&title=&width=727.2726852374981)
修改运行脚本，增加系统环境变量：
`-e SW_AGENT_NAME=${skywalkingServiceName} -e SW_AGENT_COLLECTOR_BACKEND_SERVICES=${skywalkingBackendService}`
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665845769585-55bf9a62-9aa9-4668-be3f-8bdf950e079d.png#averageHue=%23fcfcfc&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=238&id=ube43c4f3&name=image.png&originHeight=392&originWidth=1226&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23455&status=error&style=shadow&taskId=u73158888-a62f-415f-ab8b-b4cbe46006a&title=&width=743.0302600843106)
第三步，重新部署服务：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665845821820-4b51060d-c699-4ec5-9bc5-984003d1db15.png#averageHue=%23fefefe&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=333&id=udfa87043&name=image.png&originHeight=549&originWidth=1353&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26237&status=error&style=shadow&taskId=uf75ec4b6-6b33-42e4-8cce-5a5fd395684&title=&width=819.9999526052792)
第四步，测试接口，查看数据。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665845875609-784508e6-7e83-4b46-a056-888f5581272c.png#averageHue=%23fefefe&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=359&id=ufe733253&name=image.png&originHeight=592&originWidth=1555&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49780&status=error&style=shadow&taskId=u11c0e4c3-1f6f-4869-b8f0-a458756c53e&title=&width=942.4241879535913)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1665845974023-d8178d4c-5df9-48a6-95bb-53b0e5e11f72.png#averageHue=%23393f47&clientId=u59fdcfb3-0f57-4&errorMessage=unknown%20error&from=paste&height=382&id=u0c355cdb&name=image.png&originHeight=631&originWidth=1565&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58066&status=error&style=shadow&taskId=u2cc42f4c-9722-4808-abc4-2c143cb5bd4&title=&width=948.4847936639038)
# 5、练习
## 5.1、练习1
难度系数：★★☆☆☆
描述：修改所有微服务中的`logback-spring.xml`完成Graylog的整合。
## 5.1、练习2
难度系数：★★★★☆
描述：将所有的微服务与skywalking整合。
