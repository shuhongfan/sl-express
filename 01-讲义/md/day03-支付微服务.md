# 课程安排
- 支付微服务的需求
- 了解项目中的代码规范
- 阅读渠道管理相关的代码
- 理解分布式锁的应用
- 阅读支付宝扫码支付的代码
- 阅读微信支付扫码支付的代码
- xxl-job的入门学习
- 读懂同步支付状态的两种方式
# 1、背景说明
新入职的你加入了开发一组，也接到了开发任务，并且你也顺利的完成了网关的鉴权业务的开发。现在开发三组所负责的支付微服务需要你来支援一下，目前支付微服务完成了支付宝和微信的对接，主要实现的功能有支付渠道的维护、扫码支付（微信称Native支付，支付宝称当面付）、退款等功能。
其中扫码支付功能是快递员上门取件时，会亮出二维码，用户可以通过支付宝或微信进行扫描后，对运费的支付。
![sh.gif](https://cdn.nlark.com/yuque/0/2022/gif/27683667/1660306096062-e1952ad5-853e-4bfe-b46a-0a95b8b683b1.gif#averageHue=%23e8ddc0&clientId=u6ea92de1-dd76-4&errorMessage=unknown%20error&from=paste&height=145&id=uf885d498&name=sh.gif&originHeight=240&originWidth=240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=61974&status=error&style=none&taskId=u870c2889-3a25-4fcd-9bbd-3acb622611c&title=&width=145.45453704749963)
# 2、需求分析
## 2.1、整体流程
![](https://cdn.nlark.com/yuque/0/2022/jpeg/27683667/1660360908435-85b5b255-307b-4704-8126-94670d817327.jpeg)
流程说明：

- 用户下单成功后，系统会为其分配快递员
- 快递员根据取件任务进行上门取件，与用户确认物品信息、重量、体积、运费等内容，确认无误后，取件成功
- 快递员会询问用户，是支付宝还是微信付款，根据用户的选择，展现支付二维码
- 用户使用手机，打开支付宝或微信进行扫描操作，用户进行付款操作，最终会有支付成功或失败情况
- 后续的逻辑暂时不考虑，支付微服务只考虑支付部分的逻辑即可
## 2.2、业务功能
![image-20220810153452854.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660306430991-fe065c18-4d7b-41e2-b0e5-5a1d74979176.png#averageHue=%23e3e3e3&clientId=ub232f52d-243c-4&errorMessage=unknown%20error&from=paste&height=419&id=u23bc0cef&name=image-20220810153452854.png&originHeight=691&originWidth=524&originalType=binary&ratio=1&rotation=0&showTitle=true&size=89089&status=error&style=shadow&taskId=u1fedff30-b400-4d1d-bd7e-4c7c3f5abe2&title=%E6%89%AB%E6%8F%8F%E6%94%AF%E4%BB%98%EF%BC%9A%EF%BC%88%E5%8F%AF%E9%80%89%E6%94%AF%E4%BB%98%E5%AE%9D%E6%88%96%E5%BE%AE%E4%BF%A1%EF%BC%89&width=318 "扫描支付：（可选支付宝或微信）")   ![image-20220810153615785.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660306492264-b76a9c63-c45a-4426-ac45-3470ad760f0e.png#averageHue=%23b3b3b3&clientId=ub232f52d-243c-4&errorMessage=unknown%20error&from=paste&height=415&id=ub8fcaeae&name=image-20220810153615785.png&originHeight=685&originWidth=528&originalType=binary&ratio=1&rotation=0&showTitle=true&size=78586&status=error&style=none&taskId=uedc4ad47-1fff-4365-946b-14ab94e79e0&title=%E6%94%AF%E4%BB%98%E6%88%90%E5%8A%9F&width=319.9999815044992 "支付成功")
## 2.3、产品需求
【付款方式】判断寄付/到付交互

1.  寄付→点击【取件】进入取件成功页面，点击左上方返回按钮返回待取件任务列表；点击【去收款】按钮进入扫码支付页面，此时用户有双向选择： 
   1. 在用户端【待支付】页面进行支付
   2. 在快递员端【扫码支付】页面进行支付，可选择微信或支付宝进行支付，分别生成不同的收款码，用户进行扫码支付；
   3. 点击页面左上方返回按钮页面返回至上一页；
   4. 两种方式支付成功，均显示支付成功页面，点击【知道了】，返回任务列表首页
2.  到付→点击【取件】按钮，进入取件成功页面，点击返回主页按钮进入任务列表主页 
## 2.4、分析
支付业务与其他业务相比，相对独立，所以比较适合将支付业务划分为一个微服务，而支付业务并不关系物流业务中运输、取派件等业务，只关心付款金额、付款平台、所支付的订单等。
支付微服务在整个系统架构中的业务时序图：
![](https://cdn.nlark.com/yuque/__puml/050a0c2e7f32582b466f0ccd303ae2f0.svg#lake_card_v2=eyJ0eXBlIjoicHVtbCIsImNvZGUiOiJAc3RhcnR1bWxcblxuYXV0b251bWJlclxuXG5hY3RvciBcIueUqOaIt1wiIGFzIHVzZXJcbnBhcnRpY2lwYW50IFwi5b-r6YCS5ZGYXCIgYXMgY291cmllclxucGFydGljaXBhbnQgXCLorqLljZXlvq7mnI3liqFcIiBhcyBvbXNcbnBhcnRpY2lwYW50IFwi5pSv5LuY5b6u5pyN5YqhXCIgYXMgdHJhZGVcbnBhcnRpY2lwYW50IFwi5LiJ5pa55pSv5LuY5bmz5Y-wXCIgYXMgemZ5dFxuXG5hY3RpdmF0ZSB1c2VyXG51c2VyIC0-IG9tcyAtLSsrOiDkuIvljZVcblxub21zIC0-IG9tczog55Sf5oiQ6K6i5Y2VXG5vbXMgLT4gY291cmllciAtLSsrOiDnlJ_miJDlj5bku7bku7vliqFcbmNvdXJpZXIgLT4gdXNlcjog5LiK6Zeo5Y-W5Lu2XFxu56Gu5a6a6YeN6YeP5ZKM5L2T56evXG5hY3RpdmF0ZSB1c2VyXG5cbmNvdXJpZXIgLT4gdHJhZGU6IOeUs-ivt-aUr-S7mFxuYWN0aXZhdGUgdHJhZGVcbnRyYWRlIC0-IHRyYWRlOiDliJvlu7rkuqTmmJPljZVcblxudHJhZGUgLT4gemZ5dCArKzog55Sz6K-35pSv5LuYXG5cbnpmeXQgLT4gemZ5dDog5YaF6YOo6YC76L6RXG56Znl0IC0-IHRyYWRlIC0tOiDmlK_ku5jpk77mjqVcblxudHJhZGUgLT4gY291cmllcjog55Sf5oiQ5LqM57u056CBXG5kZWFjdGl2YXRlIHRyYWRlXG5jb3VyaWVyIC0-IHVzZXI6IOWxleekuuS6jOe7tOeggVxuXG51c2VyIC0-IHVzZXI6IOmAmui_h-aJi-acuuaJq-eggeaUr-S7mFxudXNlciAtPiB6Znl0ICsrIDog5LuY5qy-XG5cbmNvdXJpZXIgIC0tPiB0cmFkZTog5p-l6K-i5pSvXFxu5LuY54q25oCB77yI6L2u6K-i77yJXG5hY3RpdmF0ZSBjb3VyaWVyI0ZGRkZDQ1xuXG56Znl0IC0-IHpmeXQ6IOWGhemDqOmAu-i-kVxuemZ5dCAtLT4gdXNlcjog5LuY5qy-5oiQ5YqfL-Wksei0pVxuZGVhY3RpdmF0ZSB1c2VyXG56Znl0ICAtPiB0cmFkZSAtLSsrOiDpgJrnn6XvvJrku5jmrL7miJDlip9cblxudHJhZGUgIC0-IHRyYWRlOiDmm7TmlrDkuqTmmJPljZXnirbmgIFcbnRyYWRlIC0tPiBvbXMgLS0rKzog5Y-R5raI5oGv6YCa55-lXFxu5pSv5LuY5oiQ5YqfXG5cbm9tcyAgLT4gb21zIDog5pu05paw6K6i5Y2VXFxu5pSv5LuY54q25oCBXG5jb3VyaWVyICAtLT4gdHJhZGU6IOafpeivouaUr1xcbuS7mOeKtuaAge-8iOi9ruivou-8iVxuZGVhY3RpdmF0ZSBvbXNcbmRlYWN0aXZhdGUgY291cmllclxuXG5jb3VyaWVyICAtLT4gdXNlcjog5pSv5LuY5oiQ5Yqf77yI5bGV56S677yJXG5kZWFjdGl2YXRlIGNvdXJpZXJcbkBlbmR1bWwiLCJ1cmwiOiJodHRwczovL2Nkbi5ubGFyay5jb20veXVxdWUvX19wdW1sLzA1MGEwYzJlN2YzMjU4MmI0NjZmMGNjZDMwM2FlMmYwLnN2ZyIsImlkIjoieEFXVjkiLCJtYXJnaW4iOnsidG9wIjp0cnVlLCJib3R0b20iOnRydWV9LCJjYXJkIjoiZGlhZ3JhbSJ9)## 2.5、开发环境
### 2.5.1、微服务工程规范
在神领物流项目中，微服务代码是独立的工程（**非聚合项目结构**），这样更适合多团队间的协作，在部署方面更加的独立方便。
1个微服务需要创建3个工程，分别是：

- sl-express-ms-xxx-api（定义Feign接口）
- sl-express-ms-xxx-domain（定义DTO、枚举对象）
- sl-express-ms-xxx-service（微服务的实现）

它们之间的依赖关系如下：
![](https://cdn.nlark.com/yuque/0/2022/jpeg/27683667/1659427097656-95e0bd13-0c12-4a3e-a01d-7aff19ad9147.jpeg)
### 2.5.2、拉取代码
需要拉取的工程有3个：

| 工程名 | git地址 |
| --- | --- |
| sl-express-ms-trade-domain | [http://git.sl-express.com/sl/sl-express-ms-trade-domain.git](http://git.sl-express.com/sl/sl-express-ms-trade-domain.git) |
| sl-express-ms-trade-api | [http://git.sl-express.com/sl/sl-express-ms-trade-api.git](http://git.sl-express.com/sl/sl-express-ms-trade-api.git) |
| sl-express-ms-trade-service | [http://git.sl-express.com/sl/sl-express-ms-trade-service.git](http://git.sl-express.com/sl/sl-express-ms-trade-service.git) |

在idea中拉取开发会有2种方式：

- 每一个工程打开一个idea窗口
- 将多个工程合并到一个idea窗口开发（非maven聚合），每一个工程作为一个module进行开发

在这里我们建议使用第2中方法，这样在开发过程中可以减少多窗口间的切换。
拉取代码完成后，需要添加到项目的modules中：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672109033249-7dd0c02c-3244-443c-93eb-fd844b6c6435.png#averageHue=%23f1f0ef&clientId=udf258544-f47a-4&from=paste&height=673&id=u08b72498&name=image.png&originHeight=1009&originWidth=1535&originalType=binary&ratio=1&rotation=0&showTitle=false&size=157969&status=done&style=none&taskId=u61726120-6578-495a-88bb-500643bde3e&title=&width=1023.3333333333334)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672109232275-2dff532c-0dcd-4008-beca-164cfae9db49.png#averageHue=%23deba79&clientId=udf258544-f47a-4&from=paste&height=83&id=u4eb2f496&name=image.png&originHeight=124&originWidth=575&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16874&status=done&style=none&taskId=ud352c0f4-d513-4b2b-b3e3-50b73d59f3b&title=&width=383.3333333333333)
git分支说明：
![image-20220802180251513.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061283161-f6aed357-395c-43b7-949a-e32187357e2f.png#averageHue=%23f7f7f6&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=221&id=u005c9233&name=image-20220802180251513.png&originHeight=365&originWidth=585&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38969&status=error&style=none&taskId=u951c3776-7c51-4d0b-8808-d5913563565&title=&width=354.54543405328036)
在学习阶段我们统一使用**master**分支。
下面展现了支付微服务的工程结构：
```erlang
├─sl-express-ms-trade-api               支付Feign接口
├─sl-express-ms-trade-domain            接口DTO实体
└─sl-express-ms-trade-service           支付具体实现
    ├─com.sl.ms.trade.config				配置包，二维码、Redisson、xxl-job
	├─com.sl.ms.trade.constant				常量类包
	├─com.sl.ms.trade.controller			web控制器包
	├─com.sl.ms.trade.entity				数据库实体包
	├─com.sl.ms.trade.enums					枚举包
	├─com.sl.ms.trade.handler				三方平台的对接实现（支付宝、微信）
	├─com.sl.ms.trade.job					定时任务，扫描支付状态
	├─com.sl.ms.trade.mapper				mybatis接口
	├─com.sl.ms.trade.service				服务包
	├─com.sl.ms.trade.util					工具包
```
### 2.5.3、代码规范
#### 2.5.3.1、DTO对象
在神领物流项目中，微服务之间的对象传输都使用DTO，命名规范：XxxxDTO（DTO必须大写），并且将DTO类放置到domain工程中，如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672110760539-3f746f6d-982a-4f2a-9067-4bbc327c78f8.png#averageHue=%23f8f7f6&clientId=udf258544-f47a-4&from=paste&height=283&id=u2a4b6843&name=image.png&originHeight=424&originWidth=504&originalType=binary&ratio=1&rotation=0&showTitle=false&size=20401&status=done&style=shadow&taskId=u3716ae53-f08d-4abf-a5e2-debe1849b86&title=&width=336)

DTO类中统一使用lombok的@Data注解进行标注。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672110787934-a442612f-3ce5-456b-bf93-4200e5366744.png#averageHue=%23fdfcfa&clientId=udf258544-f47a-4&from=paste&height=169&id=u34b9f4e1&name=image.png&originHeight=254&originWidth=926&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22962&status=done&style=shadow&taskId=ueb209841-c899-477f-bb87-e8f8727f9c1&title=&width=617.3333333333334)
#### 2.5.3.2、数据校验
微服务之间的接口调用，对于传输的数据是需要做校验的，一般校验方式有2种：

-  方式一：采用hibernate-validator注解方式校验，如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672110999841-9cf549aa-63b7-4126-a274-85777f3f7c82.png#averageHue=%23fdfcfa&clientId=udf258544-f47a-4&from=paste&height=387&id=u06ae846d&name=image.png&originHeight=581&originWidth=1075&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67197&status=done&style=shadow&taskId=udfb3a0ab-4829-49aa-8b22-8d8927172c1&title=&width=716.6666666666666)
-  方式二：在程序中通过if()进行判断，如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672111042328-75888a60-7fff-4fea-84ff-d3b7269f162a.png#averageHue=%23fbfaf8&clientId=udf258544-f47a-4&from=paste&height=256&id=ua8945bee&name=image.png&originHeight=384&originWidth=1038&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41570&status=done&style=shadow&taskId=u3e4cadee-d80c-4793-9b43-e954b21513d&title=&width=692)

我们采用哪一种方式呢？实际上在项目中，我们采用二者结合的方式进行校验。
对于第一种方式的补充说明：

- 在Controller中需要增加`@Validated`注解，来开启校验
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672111211671-b15ea91b-49f4-48cf-aab7-6e99b84ef8ee.png#averageHue=%23fdfcfa&clientId=udf258544-f47a-4&from=paste&height=233&id=ucf16aa1c&name=image.png&originHeight=349&originWidth=976&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31413&status=done&style=shadow&taskId=uadf75880-9268-40df-b9a1-8d833855bd5&title=&width=650.6666666666666)
- 对于表单、url参数校验，在Controller中方法增加校验规则
![image-20220802194215132.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061344673-aa10c434-c7c8-4999-a40b-503670f76300.png#averageHue=%23fcfbfa&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=216&id=u1d06d5f3&name=image-20220802194215132.png&originHeight=356&originWidth=1669&originalType=binary&ratio=1&rotation=0&showTitle=false&size=44762&status=error&style=none&taskId=ubdbd138c-8e23-4d07-880b-2ce846e848e&title=&width=1011.5150930511536)
- 对于@RequestBody对象的校验，校验规则写的DTO对象中，统一通过Spring的AOP进行校验，具体在common工程中的`com.sl.transport.common.aspect.ValidatedAspect`进实现：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672111338691-534620b1-1a8a-4134-8f1a-530538d0f837.png#averageHue=%23fbfaf9&clientId=udf258544-f47a-4&from=paste&height=219&id=u82de49b4&name=image.png&originHeight=328&originWidth=1519&originalType=binary&ratio=1&rotation=0&showTitle=false&size=55281&status=done&style=shadow&taskId=u9589bc30-78c5-4c0c-8a52-dc57b70d816&title=&width=1012.6666666666666)
![image-20220802194942996.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061360366-170705b5-0d5d-454e-af37-da574a5cd1be.png#averageHue=%23fbf9f8&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=439&id=u064c242b&name=image-20220802194942996.png&originHeight=725&originWidth=1424&originalType=binary&ratio=1&rotation=0&showTitle=false&size=110147&status=error&style=none&taskId=ub3168933-e25b-4142-92ec-7c98becee84&title=&width=863.0302531484978)
#### 2.5.3.3、自定义异常
在神领物流项目中，我们统一做了自定义异常的处理。
定义了2个异常：

- `com.sl.transport.common.exception.SLException` 
   - 用于微服务之前接口调用抛出的异常
- `com.sl.transport.common.exception.SLWebException` 
   - 用于前后端交互时抛出的异常

SLException的定义：
![image-20220802200045853.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061569180-db891c11-a3c6-4b28-818f-6716cf970442.png#averageHue=%23fcfcfa&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=301&id=u4ad456b6&name=image-20220802200045853.png&originHeight=496&originWidth=1268&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48361&status=error&style=none&taskId=udb625d02-01cb-4f85-8bc1-2b0ca47476a&title=&width=768.484804067623)
SLWebException的定义：
![image-20220802200108011.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061581769-6ed17b11-29ca-4717-8739-1c43561410a5.png#averageHue=%23fbfbf9&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=226&id=u760d12f1&name=image-20220802200108011.png&originHeight=373&originWidth=1368&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40956&status=error&style=none&taskId=u16cf8667-8da6-41c2-93c0-182a1800bb2&title=&width=829.0908611707479)
这两个异常的区别在于code、status的值不同。
:::danger
**疑问：为什么不使用一个，而是要设置两个？**
这个主要是前端和后端的设计不同，一般在微服务间接口调用时会采用标准的RESTful方式，按照RESTful的规范响应的状态码要使用标准的http状态码，成功->200，失败->500，没有权限->401等。
而前后端进行交互时，一般都是响应200，即使出错也是200，只是**响应结果中**通过msg和code进行表达是否成功。
基于以上的场景，所以设置了两个异常类。
:::
统一异常处理：
具体的业务逻辑在`com.sl.transport.common.handler.GlobalExceptionHandler`中实现。
关键代码如下：
![image-20220802201311058.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061645867-4e017538-0c59-43aa-8d74-eafc32789a10.png#averageHue=%23faf9f9&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=137&id=u4c11c0b1&name=image-20220802201311058.png&originHeight=226&originWidth=931&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15373&status=error&style=none&taskId=ue4fe76e2-e96d-425a-9392-8676a463789&title=&width=564.2423916300922)
在该类中对于4种异常做处理，分别是：

- `ValidationException`
![image-20220802201538202.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061655334-065dce60-c5d5-47ac-8161-e6bee3723e56.png#averageHue=%23fafaf9&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=150&id=u1d0f7cb7&name=image-20220802201538202.png&originHeight=247&originWidth=1225&originalType=binary&ratio=1&rotation=0&showTitle=false&size=24084&status=error&style=shadow&taskId=u13501e78-371f-4994-b5c4-0e5470604c7&title=&width=742.4241995132793)
- `SLException`
![image-20220802201553399.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061661402-10766f4e-d288-4e2b-a761-01ced4d55f16.png#averageHue=%23fafaf9&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=145&id=u91c9f0bc&name=image-20220802201553399.png&originHeight=240&originWidth=1096&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21551&status=error&style=none&taskId=u94009247-ab6c-492d-9509-c3a1ee2f34a&title=&width=664.2423858502483)
- `SLWebException`
![image-20220802201608636.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061671577-c2c363f3-a57a-4aef-9855-b0728c65023d.png#averageHue=%23faf9f9&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=159&id=ueafa9ed5&name=image-20220802201608636.png&originHeight=262&originWidth=1125&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25731&status=error&style=none&taskId=ueed5d7c2-0c7e-48f8-8db7-15d326fc973&title=&width=681.8181424101545)
- `Exception`
![image-20220802201620980.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061677616-b432a70f-e33d-46a3-90e6-b2c374a41c3d.png#averageHue=%23fbfafa&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=155&id=udfa8dd24&name=image-20220802201620980.png&originHeight=256&originWidth=1124&originalType=binary&ratio=1&rotation=0&showTitle=false&size=20908&status=error&style=none&taskId=u24c952b4-88f7-4c9a-95a9-42cc08dc567&title=&width=681.2120818391232)
#### 2.5.3.4、@Resource注入
在项目中，涉及到注入Spring容器中bean对象时，均使用`@Resource`，目前IDEA不推荐使用`@Autowired`，原因是它是Spring提供，并非是Java标准，而`@Resource`是Java标准中定义的，建议使用。
如果想要使用`@Autowired`的话，建议通过构造器注入。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672111693572-7fa2beb0-cae3-462d-9a0e-4eb1cbfcb6e6.png#averageHue=%23fdfcfa&clientId=udf258544-f47a-4&from=paste&height=251&id=uee91d9c0&name=image.png&originHeight=377&originWidth=875&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31761&status=done&style=shadow&taskId=uceb91c20-1629-42f6-b09b-3f9b698ea65&title=&width=583.3333333333334)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672111743441-951a0467-43e6-4ae7-ad98-3488ea8dd2d7.png#averageHue=%23fdfcfb&clientId=udf258544-f47a-4&from=paste&height=225&id=ub71f2773&name=image.png&originHeight=337&originWidth=954&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34530&status=done&style=shadow&taskId=u2581da74-d47d-4a2e-bbdd-6d648fcc796&title=&width=636)
两者区别：

- @Autowired：默认是ByType，可以使用@Qualifier指定Name，可以对构造器、方法、参数、字段使用。
- @Resource：默认ByName，如果找不到则ByType，只能对方法、字段使用，不能用于构造器。
- @Autowired是Spring提供的，@Resource是JSR-250提供的。
- 总结：基本上@Resource可以完全替代@Autowired。
### 2.5.4、配置文件
#### 2.5.4.1、SpringBoot配置文件
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27683667/1678417946021-b0e99b3e-665f-4290-800b-b7a8dd7b1765.png#averageHue=%23f7f5f3&clientId=u2fef969b-fea0-4&from=paste&height=152&id=ua884a796&name=image.png&originHeight=228&originWidth=329&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=12611&status=done&style=shadow&taskId=u77ff5061-ee4b-4f7b-9f67-0ddee1e19c9&title=&width=219.33333333333334)

| 文件 | 说明 |
| --- | --- |
| bootstrap.yml | 通用配置项，服务名、日志文件、swagger配置等 |
| bootstrap-local.yml | 多环境配置，本地开发环境 |
| bootstrap-prod.yml | 多环境配置，生成环境（学习阶段忽略该文件） |
| bootstrap-stu.yml | 多环境配置，学生101环境 |
| bootstrap-test.yml | 多环境配置，开发组测试环境（学习阶段忽略该文件） |

对于配置文件的补充说明：

-  关于swagger的配置，统一在【`com.sl.transport.common.properties.SwaggerConfigProperties`】中读取，并且在【`com.sl.transport.common.config.Knife4jConfiguration`】中进行了初始化Knife4j。 
-  `spring.profiles.active`默认`local`，部署发布到101机器，在Jenkins中发布时设置为stu。 
```shell
#启动dokcer命令
docker run -d -p $SERVER_PORT:8080 --name $SERVER_NAME -e SERVER_PORT=8080 -e SPRING_CLOUD_NACOS_DISCOVERY_IP=${SPRING_CLOUD_NACOS_DISCOVERY_IP} -e  SPRING_CLOUD_NACOS_DISCOVERY_PORT=${port} -e SPRING_PROFILES_ACTIVE=stu $SERVER_NAME:$SERVER_VERSION
```

:::danger
通过环境变量的方式配置了spring.profiles.active、发布到注册中心的ip和端口。
规则：环境变量统一采用大写字母，不允许使用.-符号，采用下划线“_”取代点“.” 减号“-”直接删除。
:::

-  为了与101环境中服务互通，所以在local环境中固定设置了注册到注册中心的服务地址
![image-20220803100404395.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1666061838995-11ba9852-3e88-4d78-adeb-38ee591e2976.png#averageHue=%23f8f7f3&clientId=u2cb4a146-73dd-4&errorMessage=unknown%20error&from=paste&height=84&id=u04c52219&name=image-20220803100404395.png&originHeight=139&originWidth=877&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10334&status=error&style=none&taskId=u9f216612-01f2-480c-9811-1b11fe5a9ef&title=&width=531.5151207944049)
-  具体的一些项目配置统一使用nacos的配置中心管理，并且在这里使用nacos的共享配置机制，这样可以在多个项目中共享相同的配置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672112174210-7af7d1e7-530c-42aa-8d10-49173485e60b.png#averageHue=%23fcfcfb&clientId=udf258544-f47a-4&from=paste&height=477&id=ua3f2d864&name=image.png&originHeight=716&originWidth=965&originalType=binary&ratio=1&rotation=0&showTitle=false&size=54138&status=done&style=shadow&taskId=u0e23191f-4504-4556-9545-855d66daaa6&title=&width=643.3333333333334)
#### 2.5.4.2、seata配置
```yaml
seata:
  registry:
    type: nacos
    nacos:
      server-addr: 192.168.150.101:8848
      namespace: ecae68ba-7b43-4473-a980-4ddeb6157bdc
      group: DEFAULT_GROUP
      application: seata-server
      username: nacos
      password: nacos
  tx-service-group: sl-seata # 事务组名称
  service:
    vgroup-mapping: # 事务组与cluster的映射关系
      sl-seata: default
```
seata服务的配置：
```properties
#指定seata存储的数据库
store.mode = db
store.db.datasource = druid
store.db.dbType = mysql
store.db.driverClassName = com.mysql.cj.jdbc.Driver
store.db.url = jdbc:mysql://192.168.150.101:3306/seata?useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true&useSSL=false
store.db.user = root
store.db.password = 123
store.db.minConn = 5
store.db.maxConn = 100
store.db.globalTable = global_table
store.db.branchTable = branch_table
store.db.lockTable = lock_table
store.db.distributedLockTable = distributed_lock
store.db.queryLimit = 100
store.db.maxWait = 5000
```
seata服务地址：  [http://seata.sl-express.com/](http://seata.sl-express.com/)   账号信息：seata/seata
#### 2.5.4.3、mysql配置
```yaml
spring:
  datasource: #数据库的配置
    driver-class-name: ${jdbc.driver:com.mysql.cj.jdbc.Driver}
    url: ${jdbc.url}
    username: ${jdbc.username}
    password: ${jdbc.password}
```
具体的配置项在每个微服务自己的配置文件中，例如支付服务：
```properties
jdbc.url = jdbc:mysql://192.168.150.101:3306/sl_trade?useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true&useSSL=false
jdbc.username = root
jdbc.password = 123
```
:::danger
需要说明的是，${jdbc.driver:com.mysql.cj.jdbc.Driver} 这种写法冒号后面的是默认值，如果不配置jdbc.driver就采用默认值。
:::
#### 2.5.4.4、mybatis-plus配置
```yaml
mybatis-plus:
  configuration:
    #在映射实体或者属性时，将数据库中表名和字段名中的下划线去掉，按照驼峰命名法映射
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    #log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl
  global-config:
    db-config:
      id-type: ASSIGN_ID
```
在配置文件中指定的默认的id策略为ASSIGN_ID，只当插入对象ID为空时，自动填充雪花id。
#### 2.5.4.5、redis配置
```yaml
spring:
  redis: #redis的配置
    port: ${redis.port}
    host: ${redis.host}
    password: ${redis.password}
```
具体的配置在微服务自身的配置文件中：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672113535509-cebebf65-8d3f-41d7-b9bc-7b41e2bd97f9.png#averageHue=%23212121&clientId=uc5f8ce1a-730c-4&from=paste&height=94&id=u6fa03c95&name=image.png&originHeight=141&originWidth=514&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17289&status=done&style=shadow&taskId=u25b9f2ba-08bd-4fc2-b32f-9184bab0114&title=&width=342.6666666666667)
#### 2.5.4.6、xxl-job配置
```yaml
xxl:
  job:
    admin:
      addresses: http://192.168.150.101:28080/xxl-job-admin
    executor:
      ip: 192.168.150.101
      appname: ${xxl.job.executor.appname}
      #执行器运行日志文件存储磁盘路径
      logpath: /data/applogs/xxl-job/jobhandler
      #执行器日志文件保存天数
      logretentiondays: 30
```
### 2.5.5、日志
项目中统一使用logback日志框架，其配置文件如下：
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

    <!--evel:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF，-->
    <!--不能设置为INHERITED或者同义词NULL。默认是DEBUG。-->
    <root level="INFO">
        <appender-ref ref="stdout"/>
    </root>
</configuration>
```
# 3、支付渠道管理【阅读代码】
支付是对接支付平台完成的，例如支付宝、微信、京东支付等，一般在这些平台上需要申请账号信息，通过这些账号信息完成与支付平台的交互，在我们的支付微服务中，将这些数据称之为【支付渠道】，并且将其存储到数据库中，通过程序可以支付渠道进行管理。
## 3.1、表结构
支付微服务的数据是：sl_trade，支付渠道的表为：sl_pay_channel，表结构如下：
![image-20220811113247995.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660306752824-440088b7-b4c6-4c85-ae06-42fbd619acc8.png#averageHue=%23f7f6f5&clientId=ub232f52d-243c-4&errorMessage=unknown%20error&from=paste&height=314&id=u14c2fc09&name=image-20220811113247995.png&originHeight=518&originWidth=1477&originalType=binary&ratio=1&rotation=0&showTitle=false&size=109425&status=error&style=none&taskId=uf6f035db-5b23-4138-b9e5-8caeb4dae0e&title=&width=895.1514634131539)
> **其中表中已经包含了2条数据，分别是支付宝和微信的账号信息，可以直接与支付平台对接。**

![image-20220811114631642.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660306781396-2d4dd046-0574-425b-826b-c716c06ab1a3.png#averageHue=%23f6f5f4&clientId=ub232f52d-243c-4&errorMessage=unknown%20error&from=paste&height=64&id=u1a037f41&name=image-20220811114631642.png&originHeight=105&originWidth=1579&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16772&status=error&style=none&taskId=ud7423f50-7de1-45a6-b55a-7ab573d789e&title=&width=956.9696416583413)
## 3.2、阅读代码
阅读代码顺序：Entity → Mapper → Service → Controller
代码git地址：

| 工程 | 地址 |
| --- | --- |
| sl-express-ms-trade-service | [http://git.sl-express.com/sl/sl-express-ms-trade-service](http://git.sl-express.com/sl/sl-express-ms-trade-service) |
| sl-express-ms-trade-api | [http://git.sl-express.com/sl/sl-express-ms-trade-api](http://git.sl-express.com/sl/sl-express-ms-trade-api) |
| sl-express-ms-trade-domain | [http://git.sl-express.com/sl/sl-express-ms-trade-domain](http://git.sl-express.com/sl/sl-express-ms-trade-domain) |

> 注意：由于渠道管理目前项目中没有需求进行维护操作，所以不对外提供Feign接口。

### 3.2.1、PayChannelEntity
:::info
PayChannelEntity类是对sl_pay_channel表的映射，Entity类继承BaseEntity，在BaseEntity中统一定义了id、created、updated，其中created、updated是使用MybatisPlus自动填充的。
:::
```java
package com.sl.ms.trade.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sl.transport.common.entity.BaseEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
* @Description：交易渠道表
*/
@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@EqualsAndHashCode(callSuper = true)
	@TableName("sl_pay_channel")
	public class PayChannelEntity extends BaseEntity {

		private static final long serialVersionUID = -1452774366739615656L;

		@ApiModelProperty(value = "通道名称")
		private String channelName;

		@ApiModelProperty(value = "通道唯一标记")
		private String channelLabel;

		@ApiModelProperty(value = "域名")
		private String domain;

		@ApiModelProperty(value = "商户appid")
		private String appId;

		@ApiModelProperty(value = "支付公钥")
		private String publicKey;

		@ApiModelProperty(value = "商户私钥")
		private String merchantPrivateKey;

		@ApiModelProperty(value = "其他配置")
		private String otherConfig;

		@ApiModelProperty(value = "AES混淆密钥")
		private String encryptKey;

		@ApiModelProperty(value = "说明")
		private String remark;

		@ApiModelProperty(value = "回调地址")
		private String notifyUrl;

		@ApiModelProperty(value = "是否有效")
		protected String enableFlag;

		@ApiModelProperty(value = "商户号")
		private Long enterpriseId;

	}

```
### 3.2.2、PayChannelMapper
:::info
PayChannelMapper继承了MP的BaseMapper，并且加了@Mapper注解。
:::
```java
package com.sl.ms.trade.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sl.ms.trade.entity.PayChannelEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 交易渠道表Mapper接口
 */
@Mapper
public interface PayChannelMapper extends BaseMapper<PayChannelEntity> {

}

```
### 3.2.3、PayChannelService
:::info
该Service中定义了6个方法，可以对支付渠道的数据进行CRUD的管理，其中findByEnterpriseId()方法将是我们常用的一个方法，根据业务商户id查询和通道唯一标记符查询支付渠道。该方法是需要对数据做缓存的，目前并没有实现缓存，这个需要由你来实现。
:::
```java
package com.sl.ms.trade.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sl.ms.trade.domain.PayChannelDTO;
import com.sl.ms.trade.entity.PayChannelEntity;

import java.util.List;

/**
 * @Description： 支付通道服务类
 */
public interface PayChannelService extends IService<PayChannelEntity> {

    /**
     * @param payChannelDTO 查询条件
     * @param pageNum       当前页
     * @param pageSize      当前页
     * @return Page<PayChannel> 分页对象
     * @Description 支付通道列表
     */
    Page<PayChannelEntity> findPayChannelPage(PayChannelDTO payChannelDTO, int pageNum, int pageSize);

    /**
     * 根据商户id查询渠道配置，该配置会被缓存10分钟
     *
     * @param enterpriseId 商户id
     * @param channelLabel 通道唯一标记
     * @return PayChannelEntity 交易渠道对象
     */
    PayChannelEntity findByEnterpriseId(Long enterpriseId, String channelLabel);

    /**
     * @param payChannelDTO 对象信息
     * @return PayChannelEntity 交易渠道对象
     * @Description 创建支付通道
     */
    PayChannelEntity createPayChannel(PayChannelDTO payChannelDTO);

    /**
     * @param payChannelDTO 对象信息
     * @return Boolean 是否成功
     * @Description 修改支付通道
     */
    Boolean updatePayChannel(PayChannelDTO payChannelDTO);

    /**
     * @param checkedIds 选择的支付通道ID
     * @return Boolean 是否成功
     * @Description 删除支付通道
     */
    Boolean deletePayChannel(String[] checkedIds);

    /**
     * @param channelLabel 支付通道标识
     * @return 支付通道列表
     * @Description 查找渠道标识
     */
    List<PayChannelEntity> findPayChannelList(String channelLabel);
}

```
### 3.2.4、PayChannelServiceImpl
:::info

- 该类继承了MP的ServiceImpl，可以实现基本的CRUD方法
- findByEnterpriseId()方法中的TODO需要在实战中完成
:::
```java
package com.sl.ms.trade.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sl.ms.trade.constant.Constants;
import com.sl.ms.trade.domain.PayChannelDTO;
import com.sl.ms.trade.entity.PayChannelEntity;
import com.sl.ms.trade.mapper.PayChannelMapper;
import com.sl.ms.trade.service.PayChannelService;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * @Description： 服务实现类
 */
@Service
public class PayChannelServiceImpl extends ServiceImpl<PayChannelMapper, PayChannelEntity> implements PayChannelService {

    @Override
    public Page<PayChannelEntity> findPayChannelPage(PayChannelDTO payChannelDTO, int pageNum, int pageSize) {
        Page<PayChannelEntity> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<PayChannelEntity> queryWrapper = new LambdaQueryWrapper<>();

        //设置条件
        queryWrapper.eq(StrUtil.isNotEmpty(payChannelDTO.getChannelLabel()), PayChannelEntity::getChannelLabel, payChannelDTO.getChannelLabel());
        queryWrapper.likeRight(StrUtil.isNotEmpty(payChannelDTO.getChannelName()), PayChannelEntity::getChannelName, payChannelDTO.getChannelName());
        queryWrapper.eq(StrUtil.isNotEmpty(payChannelDTO.getEnableFlag()), PayChannelEntity::getEnableFlag, payChannelDTO.getEnableFlag());
        //设置排序
        queryWrapper.orderByAsc(PayChannelEntity::getCreated);

        return super.page(page, queryWrapper);
    }

    @Override
    public PayChannelEntity findByEnterpriseId(Long enterpriseId, String channelLabel) {
        LambdaQueryWrapper<PayChannelEntity> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(PayChannelEntity::getEnterpriseId, enterpriseId)
                .eq(PayChannelEntity::getChannelLabel, channelLabel)
                .eq(PayChannelEntity::getEnableFlag, Constants.YES);
        //TODO 缓存
        return super.getOne(queryWrapper);
    }

    @Override
    public PayChannelEntity createPayChannel(PayChannelDTO payChannelDTO) {
        PayChannelEntity payChannel = BeanUtil.toBean(payChannelDTO, PayChannelEntity.class);
        boolean flag = super.save(payChannel);
        if (flag) {
            return payChannel;
        }
        return null;
    }

    @Override
    public Boolean updatePayChannel(PayChannelDTO payChannelDTO) {
        PayChannelEntity payChannel = BeanUtil.toBean(payChannelDTO, PayChannelEntity.class);
        return super.updateById(payChannel);
    }

    @Override
    public Boolean deletePayChannel(String[] checkedIds) {
        List<String> ids = Arrays.asList(checkedIds);
        return super.removeByIds(ids);
    }

    @Override
    public List<PayChannelEntity> findPayChannelList(String channelLabel) {
        LambdaQueryWrapper<PayChannelEntity> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(PayChannelEntity::getChannelLabel, channelLabel)
                .eq(PayChannelEntity::getEnableFlag, Constants.YES);
        return list(queryWrapper);
    }
}

```
### 3.2.5、PayChannelController
:::info
该类中对于支付渠道维护的各种方法的维护，确保可以对外提供服务。
:::
```java
package com.sl.ms.trade.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sl.ms.trade.domain.PayChannelDTO;
import com.sl.ms.trade.entity.PayChannelEntity;
import com.sl.ms.trade.service.PayChannelService;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.util.PageResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@Slf4j
@RestController
@Api(tags = "支付通道")
@RequestMapping("payChannel")
public class PayChannelController {

    @Resource
    private PayChannelService payChannelService;

    /**
     * 支付通道列表
     *
     * @param payChannelDTO 查询条件
     * @return 分页数据对象
     */
    @PostMapping("page/{pageNum}/{pageSize}")
    @ApiOperation(value = "查询支付通道分页", notes = "查询支付通道分页")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "payChannelDTO", value = "支付通道查询对象", required = true),
            @ApiImplicitParam(name = "pageNum", value = "页码"),
            @ApiImplicitParam(name = "pageSize", value = "每页条数")
    })
    public PageResponse<PayChannelDTO> findPayChannelPage(
            @RequestBody PayChannelDTO payChannelDTO,
            @PathVariable("pageNum") int pageNum,
            @PathVariable("pageSize") int pageSize) {
        Page<PayChannelEntity> payChannelVoPage = payChannelService.findPayChannelPage(payChannelDTO, pageNum, pageSize);
        return new PageResponse<>(payChannelVoPage, PayChannelDTO.class);
    }

    /**
     * 添加支付通道
     *
     * @param payChannelDTO 对象信息
     */
    @PostMapping
    @ApiOperation(value = "添加支付通道", notes = "添加支付通道")
    @ApiImplicitParam(name = "payChannelDTO", value = "支付通道对象", required = true)
    public void createPayChannel(@RequestBody PayChannelDTO payChannelDTO) {
        PayChannelEntity payChannel = this.payChannelService.createPayChannel(payChannelDTO);
        if (null != payChannel) {
            return;
        }
        throw new SLException("添加支付通道失败", HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    /**
     * 修改支付通道
     *
     * @param payChannelDTO 对象信息
     */
    @PutMapping
    @ApiOperation(value = "修改支付通道", notes = "修改支付通道")
    @ApiImplicitParam(name = "payChannelDTO", value = "支付通道对象", required = true)
    public void updatePayChannel(@RequestBody PayChannelDTO payChannelDTO) {
        Boolean flag = this.payChannelService.updatePayChannel(payChannelDTO);
        if (flag) {
            return;
        }
        throw new SLException("修改支付通道失败", HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    /**
     * 删除支付通道
     *
     * @param payChannelDTO 查询对象
     */
    @DeleteMapping
    @ApiOperation(value = "删除支付通道", notes = "删除支付通道")
    @ApiImplicitParam(name = "payChannelDTO", value = "支付通道查询对象", required = true)
    public void deletePayChannel(@RequestBody PayChannelDTO payChannelDTO) {
        String[] checkedIds = payChannelDTO.getCheckedIds();
        Boolean flag = this.payChannelService.deletePayChannel(checkedIds);
        if (flag) {
            return;
        }
        throw new SLException("删除支付通道失败", HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    @PutMapping("update-payChannel-enableFlag")
    @ApiOperation(value = "修改支付通道状态", notes = "修改支付通道状态")
    @ApiImplicitParam(name = "payChannelDTO", value = "支付通道查询对象", required = true)
    public void updatePayChannelEnableFlag(@RequestBody PayChannelDTO payChannelDTO) {
        Boolean flag = this.payChannelService.updatePayChannel(payChannelDTO);
        if (flag) {
            return;
        }
        throw new SLException("修改支付通道状态失败", HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
}

```
## 3.3、测试
通过swagger接口进行测试：[http://192.168.150.101:18096/doc.html](http://192.168.150.101:18096/doc.html)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660310302679-8655a8ca-b1b1-4521-a083-abf5f8b4eebb.png#averageHue=%23fbfbfb&clientId=ubc393699-ee46-4&errorMessage=unknown%20error&from=paste&height=470&id=u21d54692&name=image.png&originHeight=775&originWidth=1455&originalType=binary&ratio=1&rotation=0&showTitle=false&size=83159&status=error&style=none&taskId=ucd99e953-d3f5-49e9-aa2d-e6cdd45a146&title=&width=881.8181308504664)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660310329782-37da3c79-0ce5-4f25-8501-dc457440899f.png#averageHue=%23fbfbfb&clientId=ubc393699-ee46-4&errorMessage=unknown%20error&from=paste&height=362&id=ufcd1bae0&name=image.png&originHeight=598&originWidth=1312&originalType=binary&ratio=1&rotation=0&showTitle=false&size=120313&status=error&style=none&taskId=uce861f4a-e3cd-4df2-b5f6-4338372b61c&title=&width=795.151469192998)
其他的方法就不进行测试了，同学们可以自行测试。
# 4、扫码支付【阅读代码】
扫码支付的基本原理就是通过调用支付平台的接口，提交支付请求，支付平台会返回支付链接，将此支付链接生成二维码，用户通过手机上的支付宝或微信进行扫码支付。流程如下：
![](https://cdn.nlark.com/yuque/0/2022/jpeg/27683667/1660357248742-432f6132-c53c-49b8-84ab-69ac7e971176.jpeg)
## 4.1、交易单表结构
【交易单表 sl_trading】是指，针对于订单进行支付的记录表，其中记录了订单号，支付状态、支付平台、金额、是否有退款等信息。具体表结构如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660468286257-c566d252-7a98-4d88-afb9-45e9cca8d186.png#averageHue=%23f7f5f4&clientId=u29b51633-f123-4&errorMessage=unknown%20error&from=paste&height=514&id=ucff18f14&name=image.png&originHeight=848&originWidth=1569&originalType=binary&ratio=1&rotation=0&showTitle=false&size=186507&status=error&style=shadow&taskId=uf856f015-5f3b-48d5-939c-5ac3bc7d2b2&title=&width=950.9090359480288)
## 4.2、代码流程
下面展现了整体的扫描支付代码调用流程，我们将按照下面的流程进行代码的阅读。
![](https://cdn.nlark.com/yuque/__puml/1f7915d8c3dd735642835a17a2091c49.svg#lake_card_v2=eyJ0eXBlIjoicHVtbCIsImNvZGUiOiJAc3RhcnR1bWxcblxuYXV0b251bWJlclxuXG5hY3RvciBcIuW_q-mAkuWRmFwiIGFzIFVzZXJcbnBhcnRpY2lwYW50IFwiTmF0aXZlUGF5Q29udHJvbGxlclwiIGFzIENvbnRyb2xsZXJcbnBhcnRpY2lwYW50IFwiTmF0aXZlUGF5U2VydmljZVwiIGFzIFNlcnZpY2VcbnBhcnRpY2lwYW50IFwiSGFuZGxlckZhY3RvcnlcIiBhcyBGYWN0b3J5XG5wYXJ0aWNpcGFudCBcIk5hdGl2ZVBheUhhbmRsZXJcIiBhcyBOYXRpdmVQYXlIYW5kbGVyXG5cbmFjdGl2YXRlIFVzZXJcblVzZXIgLT4gQ29udHJvbGxlciArKzogY3JlYXRlRG93bkxpbmVUcmFkaW5nKClcXG7lj4LmlbDvvJpOYXRpdmVQYXlEVE9cbkNvbnRyb2xsZXIgLT4gQ29udHJvbGxlcjogRFRPIHRvIEVudGl0eVxuQ29udHJvbGxlciAtPiBTZXJ2aWNlICsrOiBjcmVhdGVEb3duTGluZVRyYWRpbmcoKVxcbuWPguaVsO-8mlRyYWRpbmdFbnRpdHlcblNlcnZpY2UgLT4gU2VydmljZSA6IOajgOa1i-S6pOaYk-WNleWPguaVsFxuU2VydmljZSAtPiBTZXJ2aWNlIDog5Lqk5piT6K6i5Y2V5Yqg6ZSBXG5TZXJ2aWNlIC0tPiBDb250cm9sbGVyIDog5Yqg6ZSB5aSx6LSlXFxu5oqb5Ye6U0xFeGNlcHRpb25cblNlcnZpY2UgLT4gU2VydmljZSA6IOW5guetieaAp-WkhOeQhlxuU2VydmljZSAtPiBGYWN0b3J5ICsrOiDojrflj5ZOYXRpdmVQYXlIYW5kbGVyXFxu57G75Z6L77yaQUxJX1BBWVxuRmFjdG9yeSAtPiBGYWN0b3J5IDogU3ByaW5n5a655Zmo5Lit6I635Y-WXG5GYWN0b3J5IC0-IFNlcnZpY2UgOiBBbGlOYXRpdmVQYXlIYW5kbGVyXG5TZXJ2aWNlIC0-IEZhY3RvcnkgOiDojrflj5ZOYXRpdmVQYXlIYW5kbGVyXFxu57G75Z6L77yaV0VDSEFUX1BBWVxuRmFjdG9yeSAtPiBGYWN0b3J5IDogU3ByaW5n5a655Zmo5Lit6I635Y-WXG5GYWN0b3J5IC0-IFNlcnZpY2UgLS06IFdlY2hhdE5hdGl2ZVBheUhhbmRsZXJcblNlcnZpY2UgLT4gTmF0aXZlUGF5SGFuZGxlciArKzogY3JlYXRlRG93bkxpbmVUcmFkaW5nKFRyYWRpbmdFbnRpdHkpXG5OYXRpdmVQYXlIYW5kbGVyIC0-IE5hdGl2ZVBheUhhbmRsZXIgOiDosIPnlKjmlK_ku5jlubPlj7DmjqXlj6Ncbk5hdGl2ZVBheUhhbmRsZXIgLT4gU2VydmljZSAtLTog6L-U5Zue5pSv5LuY6ZO-5o6lXG5TZXJ2aWNlIC0-IFNlcnZpY2UgOiDnlJ_miJDkuoznu7TnoIHvvIhiYXNlNjTvvIlcblNlcnZpY2UgLT4gQ29udHJvbGxlciAtLTogcmV0dXJuIFRyYWRpbmdFbnRpdHlcbkNvbnRyb2xsZXIgLT4gQ29udHJvbGxlciA6IEVudGl0eSB0byBEVE9cbkNvbnRyb2xsZXIgLT4gVXNlciAtLTogcmV0dXJuIERUT1xuXG5AZW5kdW1sIiwidXJsIjoiaHR0cHM6Ly9jZG4ubmxhcmsuY29tL3l1cXVlL19fcHVtbC8xZjc5MTVkOGMzZGQ3MzU2NDI4MzVhMTdhMjA5MWM0OS5zdmciLCJpZCI6Im5mMG5MIiwibWFyZ2luIjp7InRvcCI6dHJ1ZSwiYm90dG9tIjp0cnVlfSwiY2FyZCI6ImRpYWdyYW0ifQ==)## 4.3、幂等性处理
在向支付平台申请支付之前对交易单对象做幂等性处理，主要是防止重复的生成交易单以及一些业务逻辑的处理，具体是在`com.sl.ms.trade.handler.impl.BeforePayHandlerImpl#idempotentCreateTrading()`方法中完成的。
其代码如下：
```java
    @Override
    public void idempotentCreateTrading(TradingEntity tradingEntity) throws SLException {
        TradingEntity trading = tradingService.findTradByProductOrderNo(tradingEntity.getProductOrderNo());
        if (ObjectUtil.isEmpty(trading)) {
            //新交易单，生成交易号
            Long id = Convert.toLong(identifierGenerator.nextId(tradingEntity));
            tradingEntity.setId(id);
            tradingEntity.setTradingOrderNo(id);
            return;
        }

        TradingStateEnum tradingState = trading.getTradingState();
        if (ObjectUtil.equalsAny(tradingState, TradingStateEnum.YJS, TradingStateEnum.MD)) {
            //已结算、免单：直接抛出重复支付异常
            throw new SLException(TradingEnum.TRADING_STATE_SUCCEED);
        } else if (ObjectUtil.equals(TradingStateEnum.FKZ, tradingState)) {
            //付款中，如果支付渠道一致，说明是重复，抛出支付中异常，否则需要更换支付渠道
            //举例：第一次通过支付宝付款，付款中用户取消，改换了微信支付
            if (StrUtil.equals(trading.getTradingChannel(), tradingEntity.getTradingChannel())) {
                throw new SLException(TradingEnum.TRADING_STATE_PAYING);
            } else {
                tradingEntity.setId(trading.getId()); // id设置为原订单的id
                //重新生成交易号，在这里就会出现id 与 TradingOrderNo 数据不同的情况，其他情况下是一样的
                tradingEntity.setTradingOrderNo(Convert.toLong(identifierGenerator.nextId(tradingEntity)));
            }
        } else if (ObjectUtil.equalsAny(tradingState, TradingStateEnum.QXDD, TradingStateEnum.GZ)) {
            //取消订单,挂账：创建交易号，对原交易单发起支付
            tradingEntity.setId(trading.getId()); // id设置为原订单的id
            //重新生成交易号，在这里就会出现id 与 TradingOrderNo 数据不同的情况，其他情况下是一样的
            tradingEntity.setTradingOrderNo(Convert.toLong(identifierGenerator.nextId(tradingEntity)));
        } else {
            //其他情况：直接交易失败
            throw new SLException(TradingEnum.PAYING_TRADING_FAIL);
        }
    }
```
在此代码中，主要是逻辑是：

- 如果根据订单号查询交易单数据，如果不存在说明新交易单，生成交易单号后直接返回，这里的交易单号也是使用雪花id。
- 如果支付状态是已经【支付成功】或是【免单 - 不需要支付】，直接抛出异常。
- 如果支付状态是【付款中】，此时有两种情况
   - 如果支付渠道相同（此前使用支付宝付款，本次也是使用支付宝付款），这种情况抛出异常
   - 如果支付渠道不同，我们是允许在生成二维码后更换支付渠道，此时需要重新生成交易单号，此时交易单号与id将不同。
- 如果支付状态是【取消订单】或【挂账】，将id设置为原交易号，交易号重新生成，这样做的目的是既保留了原订单的交易号，又可以生成新的交易号（不重新生成的话，没有办法在支付平台进行支付申请），与之前不会有影响。
## 4.4、HandlerFactory
对于NativePayHandler会有不同平台的实现，比如：支付宝、微信，每个平台的接口参数、返回值都不一样，所以是没有办法共用的，只要是每个平台都去编写一个实现类。
那问题来了，我们该如何选择呢？
在这里我们采用了**工厂模式**进行获取对应的NativePayHandler实例，在不同的渠道实现类中，都指定了`@PayChannel`注解，通过`type`属性指定具体的平台（支付宝/微信）：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672037863479-c340f314-0b92-43b0-9d47-d94d1994c5b2.png#averageHue=%23fcfbf9&clientId=udc3667fb-b31b-4&from=paste&height=116&id=uddc60350&name=image.png&originHeight=174&originWidth=1002&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17594&status=done&style=shadow&taskId=u14ffec9d-30ae-4c85-8737-358e4c6bcb1&title=&width=668)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672037891337-a7e1f053-b3b0-4123-94c6-114005f52b98.png#averageHue=%23fbfaf8&clientId=udc3667fb-b31b-4&from=paste&height=85&id=ua8bc23f8&name=image.png&originHeight=127&originWidth=1043&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17626&status=done&style=shadow&taskId=u7fbf1d5d-f608-4484-816b-a133fb6e4ce&title=&width=695.3333333333334)
有了这个注解标识后，在HandlerFactory中就可以根据指定的参数获取对应的渠道实现。
核心代码如下：
```java
    public static <T> T get(PayChannelEnum payChannel, Class<T> handler) {
        Map<String, T> beans = SpringUtil.getBeansOfType(handler);
        for (Map.Entry<String, T> entry : beans.entrySet()) {
            PayChannel payChannelAnnotation = entry.getValue().getClass().getAnnotation(PayChannel.class);
            if (ObjectUtil.isNotEmpty(payChannelAnnotation) && ObjectUtil.equal(payChannel, payChannelAnnotation.type())) {
                return entry.getValue();
            }
        }
        return null;
    }
```
使用：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1672038897251-710bebde-01cf-4c10-a0c5-678718ede3b4.png#averageHue=%23fbf9f7&clientId=udc3667fb-b31b-4&from=paste&height=148&id=uda1c7efa&name=image.png&originHeight=222&originWidth=1460&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26423&status=done&style=shadow&taskId=uce3580e5-e52d-4194-86ec-a1c1e1905e4&title=&width=973.3333333333334)
## 4.4、生成二维码
支付宝或微信的扫码支付返回是一个链接，并不是二维码，所以我们需要根据链接生成二维码，生成二维码的库使用的是：（最终生成的二维码图片使用的base64字符串返回给前端）
具体代码实现：
```java
package com.sl.ms.trade.service.impl;

import cn.hutool.core.img.ImgUtil;
import cn.hutool.core.util.HexUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.extra.qrcode.QrCodeUtil;
import cn.hutool.extra.qrcode.QrConfig;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import com.sl.ms.trade.config.QRCodeConfig;
import com.sl.ms.trade.enums.PayChannelEnum;
import com.sl.ms.trade.service.QRCodeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class QRCodeServiceImpl implements QRCodeService {

    @Resource
    private QRCodeConfig qrCodeConfig;

    @Override
    public String generate(String content, PayChannelEnum payChannel) {
        QrConfig qrConfig = new QrConfig();
        //设置边距
        qrConfig.setMargin(this.qrCodeConfig.getMargin());
        //二维码颜色
        qrConfig.setForeColor(HexUtil.decodeColor(this.qrCodeConfig.getForeColor()));
        //设置背景色
        qrConfig.setBackColor(HexUtil.decodeColor(this.qrCodeConfig.getBackColor()));
        //纠错级别
        qrConfig.setErrorCorrection(ErrorCorrectionLevel.valueOf(this.qrCodeConfig.getErrorCorrectionLevel()));
        //设置宽
        qrConfig.setWidth(this.qrCodeConfig.getWidth());
        //设置高
        qrConfig.setHeight(this.qrCodeConfig.getHeight());
        if (ObjectUtil.isNotEmpty(payChannel)) {
            //设置logo
            qrConfig.setImg(this.qrCodeConfig.getLogo(payChannel));
        }
        return QrCodeUtil.generateAsBase64(content, qrConfig, ImgUtil.IMAGE_TYPE_PNG);
    }

    @Override
    public String generate(String content) {
        return generate(content, null);
    }

}

```
具体的配置存储在nacos中：
```properties
#二维码配置
#边距，二维码和背景之间的边距
qrcode.margin = 2
#二维码颜色，默认黑色
qrcode.fore-color = #000000
#背景色，默认白色
qrcode.back-color = #ffffff
#低级别的像素块更大，可以远距离识别，但是遮挡就会造成无法识别。高级别则相反，像素块小，允许遮挡一定范围，但是像素块更密集。
#纠错级别，可选参数：L、M、Q、H，默认：M
qrcode.error-correction-level = M
#宽
qrcode.width = 300
#高
qrcode.height = 300
```
配置的映射类：
```java
package com.sl.ms.trade.config;

import cn.hutool.core.img.ImgUtil;
import cn.hutool.core.io.resource.ResourceUtil;
import com.sl.ms.trade.enums.PayChannelEnum;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.awt.*;

/**
 * 二维码生成参数配置
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "sl.qrcode")
public class QRCodeConfig {

    private static Image WECHAT_LOGO;
    private static Image ALIPAY_LOGO;

    static {
        WECHAT_LOGO = ImgUtil.read(ResourceUtil.getResource("logos/wechat.png"));
        ALIPAY_LOGO = ImgUtil.read(ResourceUtil.getResource("logos/alipay.png"));
    }

    //边距，二维码和背景之间的边距
    private Integer margin = 2;
    // 二维码颜色，默认黑色
    private String foreColor = "#000000";
    //背景色，默认白色
    private String backColor = "#ffffff";
    //纠错级别，可选参数：L、M、Q、H，默认：M
    //低级别的像素块更大，可以远距离识别，但是遮挡就会造成无法识别。高级别则相反，像素块小，允许遮挡一定范围，但是像素块更密集。
    private String errorCorrectionLevel = "M";
    //宽
    private Integer width = 300;
    //高
    private Integer height = 300;

    public Image getLogo(PayChannelEnum payChannelEnum) {
        switch (payChannelEnum) {
            case ALI_PAY: {
                return ALIPAY_LOGO;
            }
            case WECHAT_PAY: {
                return WECHAT_LOGO;
            }
            default: {
                return null;
            }
        }
    }
}

```
生成的效果：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660551333847-1e40c1a9-b63b-42fa-8971-eb043069c213.png#averageHue=%23a2a2a2&clientId=u0318d2df-6861-4&errorMessage=unknown%20error&from=paste&height=182&id=u3098bd90&name=image.png&originHeight=301&originWidth=301&originalType=binary&ratio=1&rotation=0&showTitle=true&size=1429&status=error&style=shadow&taskId=uae533437-f1d1-445c-a847-e19c18a1d9f&title=%E5%86%85%E5%AE%B9%EF%BC%9A%E7%A5%9E%E9%A2%86%E7%89%A9%E6%B5%81&width=182.42423188040578 "内容：神领物流") ![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660551759871-2960fe01-64d7-4dc7-86b9-ddb6d1a2eaac.png#averageHue=%23a4a4a4&clientId=u0318d2df-6861-4&errorMessage=unknown%20error&from=paste&height=182&id=u1ae31a38&name=image.png&originHeight=301&originWidth=301&originalType=binary&ratio=1&rotation=0&showTitle=true&size=5404&status=error&style=shadow&taskId=u1bced394-406f-48d2-b1c1-fae263c41b9&title=%E5%86%85%E5%AE%B9%EF%BC%9A%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98&width=182.42423188040578 "内容：微信支付") ![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660551932403-1465805d-4af8-49e0-acc5-5cb1c4c9011c.png#averageHue=%23aaaaaa&clientId=u0318d2df-6861-4&errorMessage=unknown%20error&from=paste&height=182&id=uf6b8dbb3&name=image.png&originHeight=301&originWidth=301&originalType=binary&ratio=1&rotation=0&showTitle=true&size=3929&status=error&style=shadow&taskId=u2254f757-2cad-40c7-b673-30654133dfa&title=%E5%86%85%E5%AE%B9%EF%BC%9A%E6%94%AF%E4%BB%98%E5%AE%9D%E6%94%AF%E4%BB%98&width=182.42423188040578 "内容：支付宝支付")
以上二维码对应的base64字符串如下：
```java
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAXL0lEQVR4Xu2UwYokuxbE7v//9Hvr0mJEkA5st49AmwERPjlN/fe/YRiGS/iP/zAMw3Aq84M1DMM1zA/WMAzXMD9YwzBcw/xgDcNwDfODNQzDNcwP1jAM1zA/WMMwXMP8YA3DcA3zgzUMwzXMD9YwDNcwP1jDMFzD/GANw3AN84M1DMM1zA/WMAzXMD9YwzBcw/xgDcNwDfODNQzDNcwP1jAM1zA/WMMwXMP8YA3DcA3zgzUMwzXMD9YwDNdQ/8H677//xoWmsDdPg+8zU9iP32xTX+BB4zdT2JunwfeZKezHb7apL/Cg8Zsp7M3T4PvMFPbjN9vUF3jQ+M0U9uZp8H1mCvvxm23qCzxo/GYKe/M0+D4zhf34zTb1BR40fjOFvXkafJ+Zwn78Zpv6Ag8av5nC3jwNvs9MYT9+s019gQeN30xhb54G32emsB+/2aa+wIPGb6awN0+D7zNT2I/fbFNf4EHjN1PYm6fB95kp7Mdvtqkv8KDxmynszdPg+8wU9uM329QXeND4zRT25mnwfWYK+/GbbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMh8Dd5vtuHeak+D7zNfg/ebbeoLPMhMYb/bFPZmCnvzNPg+M4W9mcJ+tynszTb1BR5kprDfbQp7M4W9eRp8n5nC3kxhv9sU9mab+gIPMlPY7zaFvZnC3jwNvs9MYW+msN9tCnuzTX2BB5kp7Hebwt5MYW+eBt9nprA3U9jvNoW92aa+wIPMFPa7TWFvprA3T4PvM1PYmynsd5vC3mxTX+BBZgr73aawN1PYm6fB95kp7M0U9rtNYW+2qS/wIDOF/W5T2Jsp7M3T4PvMFPZmCvvdprA329QXeJCZwn63KezNFPbmafB9Zgp7M4X9blPYm23qCzzITGG/2xT2Zgp78zT4PjOFvZnCfrcp7M029QUeZKaw320KezOFvXkafJ+Zwt5MYb/bFPZmm/oCDzJT2O82hb2Zwt48Db7PTGFvprDfbQp7s019gQeZKex3m8LeTGFvngbfZ6awN1PY7zaFvdmmvsCDzBT2u01hb7bhnpnCfrUp7M0U9rtNYW+2qS/wIDOF/W5T2JttuGemsF9tCnszhf1uU9ibbeoLPMhMYb/bFPZmG+6ZKexXm8LeTGG/2xT2Zpv6Ag8yU9jvNoW92YZ7Zgr71aawN1PY7zaFvdmmvsCDzBT2u01hb7bhnpnCfrUp7M0U9rtNYW+2qS/wIDOF/W5T2JttuGemsF9tCnszhf1uU9ibbeoLPMhMYb/bFPZmG+6ZKexXm8LeTGG/2xT2Zpv6Ag8yU9jvNoW92YZ7Zgr71aawN1PY7zaFvdmmvsCDzBT2u01hb7bhnpnCfrUp7M0U9rtNYW+2qS/wIDOF/W5T2JttuGemsF9tCnszhf1uU9ibbeoLPMhMYb/bFPZmG+6ZKexXm8LeTGG/2xT2Zpv6Ag8yU9jvNoW92YZ7Zgr71aawN1PY7zaFvdmmvsCDzBT2u01hb7bh3m2msDdT2O82hb3Zpr7Ag8wU9rtNYW+24d5tprA3U9jvNoW92aa+wIPMFPa7TWFvtuHebaawN1PY7zaFvdmmvsCDzBT2u01hb7bh3m2msDdT2O82hb3Zpr7Ag8wU9rtNYW+24d5tprA3U9jvNoW92aa+wIPMFPa7TWFvtuHebaawN1PY7zaFvdmmvsCDzBT2u01hb7bh3m2msDdT2O82hb3Zpr7Ag8wU9rtNYW+24d5tprA3U9jvNoW92aa+wIPMFPa7TWFvtuHebaawN1PY7zaFvdmmvsCDzBT2u01hb7bh3m2msDdT2O82hb3Zpr7Ag8wU9rtNYW+24d5tprA3U9jvNoW92aa+wIPMFPa7TWFvtuHebaawN1PY7zaFvdmmvsCDzNfg/WYKezOFvXkafJ/5GrzfbFNf4EHma/B+M4W9mcLePA2+z3wN3m+2qS/wIPM1eL+Zwt5MYW+eBt9nvgbvN9vUF3iQ+Rq830xhb6awN0+D7zNfg/ebbeoLPMh8Dd5vprA3U9ibp8H3ma/B+8029QUeZL4G7zdT2Jsp7M3T4PvM1+D9Zpv6Ag8yX4P3mynszRT25mnwfeZr8H6zTX2BB5mvwfvNFPZmCnvzNPg+8zV4v9mmvsCDzNfg/WYKezOFvXkafJ/5GrzfbFNf4EHma/B+M4W9mcLePA2+z3wN3m+2qS/wIPM1eL+Zwt5MYW+eBt9nvgbvN9vUF3iQ+Rq830xhb6awN0+D7zNfg/ebbeoLPGj8Zgp7M4W9mcLeTGE/frNNfYEHjd9MYW+msDdT2Jsp7Mdvtqkv8KDxmynszRT2Zgp7M4X9+M029QUeNH4zhb2Zwt5MYW+msB+/2aa+wIPGb6awN1PYmynszRT24zfb1Bd40PjNFPZmCnszhb2Zwn78Zpv6Ag8av5nC3kxhb6awN1PYj99sU1/gQeM3U9ibKezNFPZmCvvxm23qCzxo/GYKezOFvZnC3kxhP36zTX2BB43fTGFvprA3U9ibKezHb7apL/Cg8Zsp7M0U9mYKezOF/fjNNvUFHjR+M4W9mcLeTGFvprAfv9mmvzD8afgHaw7DF+YvaPgEf5DMYfjC/AUNn+APkjkMX5i/oOET/EEyh+EL8xc0fII/SOYwfGH+goZP8AfJHIYvzF/Q8An+IJnD8IX5Cxo+wR8kcxi+MH9Bwyf4g2QOwxfmL2j4BH+QzGH4wvwFDZ/gD5I5DF+Yv6DhE/xBMofhC/W/IP7BminszdPg+1abwv4223DPbMM9M4W92aa+wIPMFPbmafB9q01hf5ttuGe24Z6Zwt5sU1/gQWYKe/M0+L7VprC/zTbcM9twz0xhb7apL/AgM4W9eRp832pT2N9mG+6ZbbhnprA329QXeJCZwt48Db5vtSnsb7MN98w23DNT2Jtt6gs8yExhb54G37faFPa32YZ7ZhvumSnszTb1BR5kprA3T4PvW20K+9tswz2zDffMFPZmm/oCDzJT2JunwfetNoX9bbbhntmGe2YKe7NNfYEHmSnszdPg+1abwv4223DPbMM9M4W92aa+wIPMFPbmafB9q01hf5ttuGe24Z6Zwt5sU1/gQWYKe/M0+L7VprC/zTbcM9twz0xhb7apL/AgM4W9eRp832pT2N9mG+6ZbbhnprA32/QXLof/Ias9Db5vtynsV5vCfre3c/8FZfgfvtrT4Pt2m8J+tSnsd3s7919Qhv/hqz0Nvm+3KexXm8J+t7dz/wVl+B++2tPg+3abwn61Kex3ezv3X1CG/+GrPQ2+b7cp7Febwn63t3P/BWX4H77a0+D7dpvCfrUp7Hd7O/dfUIb/4as9Db5vtynsV5vCfre3c/8FZfgfvtrT4Pt2m8J+tSnsd3s7919Qhv/hqz0Nvm+3KexXm8J+t7dz/wVl+B++2tPg+3abwn61Kex3ezv3X1CG/+GrPQ2+b7cp7Febwn63t3P/BWX4H77a0+D7dpvCfrUp7Hd7O/UL+MFWm8J+/DWF/W224d5qX6N+MT/walPYj7+msL/NNtxb7WvUL+YHXm0K+/HXFPa32YZ7q32N+sX8wKtNYT/+msL+Nttwb7WvUb+YH3i1KezHX1PY32Yb7q32NeoX8wOvNoX9+GsK+9tsw73Vvkb9Yn7g1aawH39NYX+bbbi32teoX8wPvNoU9uOvKexvsw33Vvsa9Yv5gVebwn78NYX9bbbh3mpfo34xP/BqU9iPv6awv8023Fvta9Qv5gdebQr78dcU9rfZhnurfY36xfzAq01hP/6awv4223Bvta9Rv5gf+DZPg+/b7WnwfeZp8H3ma9Qv5ge+zdPg+3Z7GnyfeRp8n/ka9Yv5gW/zNPi+3Z4G32eeBt9nvkb9Yn7g2zwNvm+3p8H3mafB95mvUb+YH/g2T4Pv2+1p8H3mafB95mvUL+YHvs3T4Pt2exp8n3kafJ/5GvWL+YFv8zT4vt2eBt9nngbfZ75G/WJ+4Ns8Db5vt6fB95mnwfeZr1G/mB/4Nk+D79vtafB95mnwfeZr1C/mB77N0+D7dnsafJ95Gnyf+Rr1i/mBb/M0+L7dngbfZ54G32e+Rv1ifuDbPA2+b7enwfeZp8H3ma/x3MX8DzfbcM9MYW+msF/tafB95mnwfatt0184DH5gsw33zBT2Zgr71Z4G32eeBt+32jb9hcPgBzbbcM9MYW+msF/tafB95mnwfatt0184DH5gsw33zBT2Zgr71Z4G32eeBt+32jb9hcPgBzbbcM9MYW+msF/tafB95mnwfatt0184DH5gsw33zBT2Zgr71Z4G32eeBt+32jb9hcPgBzbbcM9MYW+msF/tafB95mnwfatt0184DH5gsw33zBT2Zgr71Z4G32eeBt+32jb9hcPgBzbbcM9MYW+msF/tafB95mnwfatt0184DH5gsw33zBT2Zgr71Z4G32eeBt+32jb9hcPgBzbbcM9MYW+msF/tafB95mnwfatt0184DH5gsw33zBT2Zgr71Z4G32eeBt+32jb9hWEr/IMy23DPbMM9M4W9mcLevJ37Lxj+Cf9gzTbcM9twz0xhb6awN2/n/guGf8I/WLMN98w23DNT2Jsp7M3buf+C4Z/wD9Zswz2zDffMFPZmCnvzdu6/YPgn/IM123DPbMM9M4W9mcLevJ37Lxj+Cf9gzTbcM9twz0xhb6awN2/n/guGf8I/WLMN98w23DNT2Jsp7M3buf+C4Z/wD9Zswz2zDffMFPZmCnvzdu6/YPgn/IM123DPbMM9M4W9mcLevJ37Lxj+Cf9gzTbcM9twz0xhb6awN2/n/guGf8I/WLMN98w23DNT2Jsp7M3buf+C4Z/wD9Zswz2zDffMFPZmCnvzduoX8ION30xhv9sU9uOvbbhntqkv8KDxmynsd5vCfvy1DffMNvUFHjR+M4X9blPYj7+24Z7Zpr7Ag8ZvprDfbQr78dc23DPb1Bd40PjNFPa7TWE//tqGe2ab+gIPGr+Zwn63KezHX9twz2xTX+BB4zdT2O82hf34axvumW3qCzxo/GYK+92msB9/bcM9s019gQeN30xhv9sU9uOvbbhntqkv8KDxmynsd5vCfvy1DffMNvUFHjR+M4X9blPYj7+24Z7Zpr7Ag8ZvprDfbQr78dc23DPb1Bd4kPkavN+8Hd6z2hT2Zgr71bbhntmmvsCDzNfg/ebt8J7VprA3U9ivtg33zDb1BR5kvgbvN2+H96w2hb2Zwn61bbhntqkv8CDzNXi/eTu8Z7Up7M0U9qttwz2zTX2BB5mvwfvN2+E9q01hb6awX20b7plt6gs8yHwN3m/eDu9ZbQp7M4X9attwz2xTX+BB5mvwfvN2eM9qU9ibKexX24Z7Zpv6Ag8yX4P3m7fDe1abwt5MYb/aNtwz29QXeJD5GrzfvB3es9oU9mYK+9W24Z7Zpr7Ag8zX4P3m7fCe1aawN1PYr7YN98w29QUeZL4G7zdvh/esNoW9mcJ+tW24Z7apL/Ag8zV4v3k7vGe1KezNFParbcM9s019gQeZKex3m8LebMO93bbh3mrbcG+1p1F/ET+AmcJ+tynszTbc220b7q22DfdWexr1F/EDmCnsd5vC3mzDvd224d5q23BvtadRfxE/gJnCfrcp7M023NttG+6ttg33Vnsa9RfxA5gp7Hebwt5sw73dtuHeattwb7WnUX8RP4CZwn63KezNNtzbbRvurbYN91Z7GvUX8QOYKex3m8LebMO93bbh3mrbcG+1p1F/ET+AmcJ+tynszTbc220b7q22DfdWexr1F/EDmCnsd5vC3mzDvd224d5q23BvtadRfxE/gJnCfrcp7M023NttG+6ttg33Vnsa9RfxA5gp7Hebwt5sw73dtuHeattwb7WnUX8RP4CZwn63KezNNtzbbRvurbYN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LebMO91aawN1PYr7YN91Z7GvUX8QOYKex3m8LeTGG/2xT2q01hb7bh3m7b1Bd4kJnCfrcp7M0U9rtNYb/aFPZmG+7ttk19gQeZKex3m8LeTGG/2xT2q01hb7bh3m7b1Bd4kJnCfrcp7M0U9rtNYb/aFPZmG+7ttk19gQeZKex3m8LeTGG/2xT2q01hb7bh3m7b1Bd4kJnCfrcp7M0U9rtNYb/aFPZmG+7ttk19gQeZKex3m8LeTGG/2xT2q01hb7bh3m7b1Bd4kJnCfrcp7M0U9rtNYb/aFPZmG+7ttk19gQeZKex3m8LeTGG/2xT2q01hb7bh3m7b1Bd4kJnCfrcp7M0U9rtNYb/aFPZmG+7ttk19gQeZKex3m8LeTGG/2xT2q01hb7bh3m7b1Bd4kJnCfrcp7M0U9rtNYb/aFPZmG+7ttk19gQeZr8H7zTbcM9twz0xhb6aw/+u2qS/wIPM1eL/ZhntmG+6ZKezNFPZ/3Tb1BR5kvgbvN9twz2zDPTOFvZnC/q/bpr7Ag8zX4P1mG+6ZbbhnprA3U9j/ddvUF3iQ+Rq832zDPbMN98wU9mYK+79um/oCDzJfg/ebbbhntuGemcLeTGH/121TX+BB5mvwfrMN98w23DNT2Jsp7P+6beoLPMh8Dd5vtuGe2YZ7Zgp7M4X9X7dNfYEHma/B+8023DPbcM9MYW+msP/rtqkv8CDzNXi/2YZ7ZhvumSnszRT2f9029QUeZL4G7zfbcM9swz0zhb2Zwv6v26a+wIPM1+D9ZhvumW24Z6awN1PY/3Xb1Bd40PjNFPa7PQ2+z2zDPbMN98w29QUeNH4zhf1uT4PvM9twz2zDPbNNfYEHjd9MYb/b0+D7zDbcM9twz2xTX+BB4zdT2O/2NPg+sw33zDbcM9vUF3jQ+M0U9rs9Db7PbMM9sw33zDb1BR40fjOF/W5Pg+8z23DPbMM9s019gQeN30xhv9vT4PvMNtwz23DPbFNf4EHjN1PY7/Y0+D6zDffMNtwz29QXeND4zRT2uz0Nvs9swz2zDffMNvUFHjR+M4X9bk+D7zPbcM9swz2zTX2BB43fTGG/29Pg+8w23DPbcM9sU1/gQeM3U9jv9jT4PrMN98w23DPb9BeGYRgWMT9YwzBcw/xgDcNwDfODNQzDNcwP1jAM1zA/WMMwXMP8YA3DcA3zgzUMwzXMD9YwDNcwP1jDMFzD/GANw3AN84M1DMM1zA/WMAzXMD9YwzBcw/xgDcNwDfODNQzDNcwP1jAM1zA/WMMwXMP8YA3DcA3zgzUMwzXMD9YwDNcwP1jDMFzD/GANw3AN84M1DMM1/B8cwr4Y+1EOXgAAAABJRU5ErkJggg==
data:image/png;base64,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
data:image/png;base64,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
```
在线base64转图片工具：
## 4.5、测试
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660552517706-d4c1ff2b-f4a6-470f-abd6-d59663f7e434.png#averageHue=%23fdfdfd&clientId=ue735ae75-6b53-4&errorMessage=unknown%20error&from=paste&height=362&id=u7465f120&name=image.png&originHeight=598&originWidth=1269&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43926&status=error&style=shadow&taskId=ube7938f1-7e87-456a-86b9-6b11cf70538&title=&width=769.0908646386542)
```json
{
  "enterpriseId": 2088241317544335,
  "memo": "运费",
  "productOrderNo": 11112241,
  "tradingAmount": 1,
  "tradingChannel": "ALI_PAY"
}
```
```json
{
  "qrCode": "data:image/png;base64,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",
  "productOrderNo": "11112241",
  "tradingOrderNo": "1559096271641808897",
  "tradingChannel": "ALI_PAY"
}
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660552747909-69cba66b-6e84-443e-8e19-583b44b4bdb8.png#averageHue=%23989898&clientId=ue735ae75-6b53-4&errorMessage=unknown%20error&from=paste&height=182&id=u6469ad49&name=image.png&originHeight=301&originWidth=301&originalType=binary&ratio=1&rotation=0&showTitle=true&size=4390&status=error&style=shadow&taskId=u392ebd08-7dec-44b6-8a0a-e6a6ef5672b&title=%E7%94%9F%E6%88%90%E7%9A%84%E6%94%AF%E4%BB%98%E4%BA%8C%E7%BB%B4%E7%A0%81&width=182.42423188040578 "生成的支付二维码")
![56e099385ef1cc6a55ba45496d4fa29.jpg](https://cdn.nlark.com/yuque/0/2022/jpeg/27683667/1660552831088-c14c4ae3-cdde-45d0-aecc-c61ce32e2ab7.jpeg#averageHue=%23383836&clientId=ue735ae75-6b53-4&errorMessage=unknown%20error&from=paste&height=600&id=u3819616b&name=56e099385ef1cc6a55ba45496d4fa29.jpg&originHeight=2400&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=true&size=333942&status=error&style=shadow&taskId=uae8b1326-5304-4ca9-a753-aabd1d1b1e9&title=%E6%89%8B%E6%9C%BA%E6%89%AB%E6%8F%8F%E5%90%8E%E7%9A%84%E6%95%88%E6%9E%9C&width=270 "手机扫描后的效果")
## 4.6、优化（练习）
在生成二维码时，我们采用的是服务端生成二维码方式，这种方式会比较消耗服务器的CPU、内存资源，比较好的做法是生成二维码的动作交由客户端（前端）来生成。
实际上，我们前端已经做了兼容处理，在返回的【qrCode】字段中，如果内容以【data:image/png;】开头，直接展现，否则就将返回的数据（支付宝或微信返回的原始数据，例如：https://qr.alipay.com/bax034140c7lyawo6oiy55f2）生成二维码。
这个优化交由学生来完成。
## 4.7、支付宝扫码支付
### 4.7.1、AlipayConfig
在项目中，通`com.sl.ms.trade.handler.alipay.AlipayConfig#getConfig(Long enterpriseId)`方法可以按照商户id查询支付宝的配置，如果配置查询不到会抛出异常。
代码如下：
```java
package com.sl.ms.trade.handler.alipay;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.alipay.easysdk.kernel.Config;
import com.sl.ms.trade.constant.TradingConstant;
import com.sl.ms.trade.entity.PayChannelEntity;
import com.sl.ms.trade.enums.TradingEnum;
import com.sl.ms.trade.service.PayChannelService;
import com.sl.transport.common.exception.SLException;

/**
 * 支付宝支付的配置
 */
public class AlipayConfig {

    /**
     * 将支付渠道配置转化为支付宝的配置
     *
     * @param enterpriseId 商户ID
     * @return 支付宝的配置
     */
    public static Config getConfig(Long enterpriseId) {
        // 查询配置
        PayChannelService payChannelService = SpringUtil.getBean(PayChannelService.class);
        PayChannelEntity payChannel = payChannelService.findByEnterpriseId(enterpriseId, TradingConstant.TRADING_CHANNEL_ALI_PAY);

        if (ObjectUtil.isEmpty(payChannel)) {
            throw new SLException(TradingEnum.CONFIG_EMPTY);
        }

        Config config = new Config();
        config.protocol = "https";
        config.gatewayHost = payChannel.getDomain();
        config.signType = "RSA2";
        config.appId = payChannel.getAppId();
        //配置应用私钥
        config.merchantPrivateKey = payChannel.getMerchantPrivateKey();
        //配置支付宝公钥
        config.alipayPublicKey = payChannel.getPublicKey();
        //可设置异步通知接收服务地址（可选）
        config.notifyUrl = StrUtil.replace(payChannel.getNotifyUrl(), "{enterpriseId}", Convert.toStr(enterpriseId));
        //设置AES密钥，调用AES加解密相关接口时需要（可选）
        config.encryptKey = payChannel.getEncryptKey();
        return config;
    }

}

```
关于异步通知的url的说明：
数据库表中存储的数据类似这样：`[https://61d25503.cpolar.cn/trade/notify/alipay/{enterpriseId}](https://61d25503.cpolar.cn/trade/notify/alipay/{enterpriseId})`
其中，`61d25503.cpolar.cn`这个域名是内网穿透的地址，后面会将，暂时忽略。`{enterpriseId}`这个是占位符，在真正设置值时，会用【商户id】进行替换，最终的通知地址类似：`[https://61d25503.cpolar.cn/trade/notify/alipay/2088241317544335](https://61d25503.cpolar.cn/trade/notify/alipay/2088241317544335)`
### 4.7.2、具体实现
```java
package com.sl.ms.trade.handler.alipay;

import cn.hutool.core.convert.Convert;
import cn.hutool.json.JSONUtil;
import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.kernel.Config;
import com.alipay.easysdk.kernel.util.ResponseChecker;
import com.alipay.easysdk.payment.facetoface.models.AlipayTradePrecreateResponse;
import com.sl.ms.trade.annotation.PayChannel;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.ms.trade.enums.PayChannelEnum;
import com.sl.ms.trade.enums.TradingEnum;
import com.sl.ms.trade.enums.TradingStateEnum;
import com.sl.ms.trade.handler.NativePayHandler;
import com.sl.transport.common.exception.SLException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * 支付宝的扫描支付的具体实现
 */
@Slf4j
@Component("aliNativePayHandler")
@PayChannel(type = PayChannelEnum.ALI_PAY)
public class AliNativePayHandler implements NativePayHandler {

    @Override
    public void createDownLineTrading(TradingEntity tradingEntity) throws SLException {
        //查询配置
        Config config = AlipayConfig.getConfig(tradingEntity.getEnterpriseId());
        //Factory使用配置
        Factory.setOptions(config);
        AlipayTradePrecreateResponse response;
        try {
            //调用支付宝API面对面支付
            response = Factory
                    .Payment
                    .FaceToFace()
                    .preCreate(tradingEntity.getMemo(), //订单描述
                            Convert.toStr(tradingEntity.getTradingOrderNo()), //业务订单号
                            Convert.toStr(tradingEntity.getTradingAmount())); //金额
        } catch (Exception e) {
            log.error("支付宝统一下单创建失败：tradingEntity = {}", tradingEntity, e);
            throw new SLException(TradingEnum.NATIVE_PAY_FAIL, e);
        }

        //受理结果【只表示请求是否成功，而不是支付是否成功】
        boolean isSuccess = ResponseChecker.success(response);
        //6.1、受理成功：修改交易单
        if (isSuccess) {
            String subCode = response.getSubCode();
            String subMsg = response.getQrCode();
            tradingEntity.setPlaceOrderCode(subCode); //返回的编码
            tradingEntity.setPlaceOrderMsg(subMsg); //二维码需要展现的信息
            tradingEntity.setPlaceOrderJson(JSONUtil.toJsonStr(response));
            tradingEntity.setTradingState(TradingStateEnum.FKZ);
            return;
        }
        throw new SLException(JSONUtil.toJsonStr(response), TradingEnum.NATIVE_PAY_FAIL.getCode(), TradingEnum.NATIVE_PAY_FAIL.getStatus());
    }

}

```
## 4.8、微信扫码支付
### 4.8.1、SDK二次封装
> 在sl_pay_channel表中已经提供了微信对接的相关信息。

```java
package com.sl.ms.trade.handler.wechat;

import cn.hutool.core.net.url.UrlBuilder;
import cn.hutool.core.net.url.UrlPath;
import cn.hutool.core.net.url.UrlQuery;
import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.sl.ms.trade.constant.TradingConstant;
import com.sl.ms.trade.entity.PayChannelEntity;
import com.sl.ms.trade.enums.TradingEnum;
import com.sl.ms.trade.handler.wechat.response.WeChatResponse;
import com.sl.ms.trade.service.PayChannelService;
import com.sl.transport.common.exception.SLException;
import com.wechat.pay.contrib.apache.httpclient.auth.PrivateKeySigner;
import com.wechat.pay.contrib.apache.httpclient.auth.WechatPay2Credentials;
import com.wechat.pay.contrib.apache.httpclient.auth.WechatPay2Validator;
import com.wechat.pay.contrib.apache.httpclient.cert.CertificatesManager;
import com.wechat.pay.contrib.apache.httpclient.util.PemUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.util.Map;

/**
 * 微信支付远程调用对象
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WechatPayHttpClient {

    private String mchId; //商户号
    private String appId; //应用号
    private String privateKey; //私钥字符串
    private String mchSerialNo; //商户证书序列号
    private String apiV3Key; //V3密钥
    private String domain; //请求域名
    private String notifyUrl; //请求地址

    public static WechatPayHttpClient get(Long enterpriseId) {
        // 查询配置
        PayChannelService payChannelService = SpringUtil.getBean(PayChannelService.class);
        PayChannelEntity payChannel = payChannelService.findByEnterpriseId(enterpriseId, TradingConstant.TRADING_CHANNEL_WECHAT_PAY);

        if (ObjectUtil.isEmpty(payChannel)) {
            throw new SLException(TradingEnum.CONFIG_EMPTY);
        }

        //通过渠道对象转化成微信支付的client对象
        JSONObject otherConfig = JSONUtil.parseObj(payChannel.getOtherConfig());
        return WechatPayHttpClient.builder()
                .appId(payChannel.getAppId())
                .domain(payChannel.getDomain())
                .privateKey(payChannel.getMerchantPrivateKey())
                .mchId(otherConfig.getStr("mchId"))
                .mchSerialNo(otherConfig.getStr("mchSerialNo"))
                .apiV3Key(otherConfig.getStr("apiV3Key"))
                .notifyUrl(payChannel.getNotifyUrl())
                .build();
    }

    /***
     * 构建CloseableHttpClient远程请求对象
     * @return org.apache.http.impl.client.CloseableHttpClient
     */
    public CloseableHttpClient createHttpClient() throws Exception {
        // 加载商户私钥（privateKey：私钥字符串）
        PrivateKey merchantPrivateKey = PemUtil.loadPrivateKey(new ByteArrayInputStream(privateKey.getBytes(StandardCharsets.UTF_8)));

        // 加载平台证书（mchId：商户号,mchSerialNo：商户证书序列号,apiV3Key：V3密钥）
        PrivateKeySigner privateKeySigner = new PrivateKeySigner(mchSerialNo, merchantPrivateKey);
        WechatPay2Credentials wechatPay2Credentials = new WechatPay2Credentials(mchId, privateKeySigner);

        // 向证书管理器增加需要自动更新平台证书的商户信息
        CertificatesManager certificatesManager = CertificatesManager.getInstance();
        certificatesManager.putMerchant(mchId, wechatPay2Credentials, apiV3Key.getBytes(StandardCharsets.UTF_8));

        // 初始化httpClient
        return com.wechat.pay.contrib.apache.httpclient.WechatPayHttpClientBuilder.create()
                .withMerchant(mchId, mchSerialNo, merchantPrivateKey)
                .withValidator(new WechatPay2Validator(certificatesManager.getVerifier(mchId)))
                .build();
    }

    /***
     * 支持post请求的远程调用
     *
     * @param apiPath api地址
     * @param params 携带请求参数
     * @return 返回字符串
     */
    public WeChatResponse doPost(String apiPath, Map<String, Object> params) throws Exception {
        String url = StrUtil.format("https://{}{}", this.domain, apiPath);
        HttpPost httpPost = new HttpPost(url);
        httpPost.addHeader("Accept", "application/json");
        httpPost.addHeader("Content-type", "application/json; charset=utf-8");

        String body = JSONUtil.toJsonStr(params);
        httpPost.setEntity(new StringEntity(body, CharsetUtil.UTF_8));

        CloseableHttpResponse response = this.createHttpClient().execute(httpPost);
        return new WeChatResponse(response);
    }

    /***
     * 支持get请求的远程调用
     * @param apiPath api地址
     * @param params 在路径中请求的参数
     * @return 返回字符串
     */
    public WeChatResponse doGet(String apiPath, Map<String, Object> params) throws Exception {
        URI uri = UrlBuilder.create()
                .setHost(this.domain)
                .setScheme("https")
                .setPath(UrlPath.of(apiPath, CharsetUtil.CHARSET_UTF_8))
                .setQuery(UrlQuery.of(params))
                .setCharset(CharsetUtil.CHARSET_UTF_8)
                .toURI();
        return this.doGet(uri);
    }

    /***
     * 支持get请求的远程调用
     * @param apiPath api地址
     * @return 返回字符串
     */
    public WeChatResponse doGet(String apiPath) throws Exception {
        URI uri = UrlBuilder.create()
                .setHost(this.domain)
                .setScheme("https")
                .setPath(UrlPath.of(apiPath, CharsetUtil.CHARSET_UTF_8))
                .setCharset(CharsetUtil.CHARSET_UTF_8)
                .toURI();
        return this.doGet(uri);
    }

    private WeChatResponse doGet(URI uri) throws Exception {
        HttpGet httpGet = new HttpGet(uri);
        httpGet.addHeader("Accept", "application/json");
        CloseableHttpResponse response = this.createHttpClient().execute(httpGet);
        return new WeChatResponse(response);
    }

}

```
代码说明：

- 通过`get(Long enterpriseId)`方法查询商户对应的配置信息，最后封装到`WechatPayHttpClient`对象中。
- 通过`createHttpClient()`方法封装了请求微信接口必要的参数，最后返回`CloseableHttpClient`对象。
- 封装了`doGet()、doPost()`方便对微信接口进行调用。
### 4.8.2、具体实现
```java
package com.sl.ms.trade.handler.wechat;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.json.JSONUtil;
import com.sl.ms.trade.annotation.PayChannel;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.ms.trade.enums.PayChannelEnum;
import com.sl.ms.trade.enums.TradingEnum;
import com.sl.ms.trade.enums.TradingStateEnum;
import com.sl.ms.trade.handler.NativePayHandler;
import com.sl.ms.trade.handler.wechat.response.WeChatResponse;
import com.sl.ms.trade.service.PayChannelService;
import com.sl.transport.common.exception.SLException;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Map;

/**
 * 微信二维码支付
 */
@Component("wechatNativePayHandler")
@PayChannel(type = PayChannelEnum.WECHAT_PAY)
public class WechatNativePayHandler implements NativePayHandler {

    @Override
    public void createDownLineTrading(TradingEntity tradingEntity) throws SLException {
        // 查询配置
        WechatPayHttpClient client = WechatPayHttpClient.get(tradingEntity.getEnterpriseId());
        //请求地址
        String apiPath = "/v3/pay/transactions/native";

        //请求参数
        Map<String, Object> params = MapUtil.<String, Object>builder()
                .put("mchid", client.getMchId())
                .put("appid", client.getAppId())
                .put("description", tradingEntity.getMemo())
                .put("notify_url", client.getNotifyUrl())
                .put("out_trade_no", Convert.toStr(tradingEntity.getTradingOrderNo()))
                .put("amount", MapUtil.<String, Object>builder()
                        .put("total", Convert.toInt(NumberUtil.mul(tradingEntity.getTradingAmount(), 100))) //金额，单位：分
                        .put("currency", "CNY") //人民币
                        .build())
                .build();

        try {
            WeChatResponse response = client.doPost(apiPath, params);
            if (!response.isOk()) {
                //下单失败
                throw new SLException(TradingEnum.NATIVE_PAY_FAIL);
            }
            //指定统一下单code
            tradingEntity.setPlaceOrderCode(Convert.toStr(response.getStatus()));
            //二维码需要展现的信息
            tradingEntity.setPlaceOrderMsg(JSONUtil.parseObj(response.getBody()).getStr("code_url"));
            //指定统一下单json字符串
            tradingEntity.setPlaceOrderJson(JSONUtil.toJsonStr(response));
            //指定交易状态
            tradingEntity.setTradingState(TradingStateEnum.FKZ);
        } catch (Exception e) {
            throw new SLException(TradingEnum.NATIVE_PAY_FAIL);
        }
    }
}

```
# 5、基础服务【阅读代码】
在支付宝或微信平台中，支付方式是多种多样的，对于一些服务而言是通用的，比如：查询交易单、退款、查询退款等，所以我们将基于这些通用的接口封装基础服务。
## 5.1、查询交易
用户创建交易后，到底有没有支付成功，还是取消支付，这个可以通过查询交易单接口查询的，支付宝和微信也都提供了这样的接口服务。
### 5.1.1、Controller
```java
    /***
     * 统一收单线下交易查询
     * 该接口提供所有支付订单的查询，商户可以通过该接口主动查询订单状态，完成下一步的业务逻辑。
     *
     * @param tradingOrderNo 交易单号
     * @return 交易单
     */
    @PostMapping("query/{tradingOrderNo}")
    @ApiOperation(value = "查询统一收单线下交易", notes = "查询统一收单线下交易")
    @ApiImplicitParam(name = "tradingOrderNo", value = "交易单", required = true)
    public TradingDTO queryTrading(@PathVariable("tradingOrderNo") Long tradingOrderNo) {
        return this.basicPayService.queryTrading(tradingOrderNo);
    }
```
### 5.1.2、Service
在Service中实现了交易单查询的逻辑，代码结构与扫描支付类似。具体与支付平台的对接由BasicPayHandler完成。
```java
    @Override
    public TradingDTO queryTrading(Long tradingOrderNo) throws SLException {
        //通过单号查询交易单数据
        TradingEntity trading = this.tradingService.findTradByTradingOrderNo(tradingOrderNo);
        //查询前置处理：检测交易单参数
        this.beforePayHandler.checkQueryTrading(trading);

        String key = TradingCacheConstant.QUERY_PAY + tradingOrderNo;
        RLock lock = redissonClient.getFairLock(key);
        try {
            //获取锁
            if (lock.tryLock(TradingCacheConstant.REDIS_WAIT_TIME, TimeUnit.SECONDS)) {
                //选取不同的支付渠道实现
                BasicPayHandler handler = HandlerFactory.get(trading.getTradingChannel(), BasicPayHandler.class);
                Boolean result = handler.queryTrading(trading);
                if (result) {
                    //如果交易单已经完成，需要将二维码数据删除，节省数据库空间，如果有需要可以再次生成
                    if (ObjectUtil.equalsAny(trading.getTradingState(), TradingStateEnum.YJS, TradingStateEnum.QXDD)) {
                        trading.setQrCode("");
                    }
                    //更新数据
                    this.tradingService.saveOrUpdate(trading);
                }
                return BeanUtil.toBean(trading, TradingDTO.class);
            }
            throw new SLException(TradingEnum.NATIVE_QUERY_FAIL);
        } catch (SLException e) {
            throw e;
        } catch (Exception e) {
            log.error("查询交易单数据异常: trading = {}", trading, e);
            throw new SLException(TradingEnum.NATIVE_QUERY_FAIL);
        } finally {
            lock.unlock();
        }
    }
```
### 5.1.3、支付宝实现
```java
    @Override
    public Boolean queryTrading(TradingEntity trading) throws SLException {
        //查询配置
        Config config = AlipayConfig.getConfig(trading.getEnterpriseId());
        //Factory使用配置
        Factory.setOptions(config);
        AlipayTradeQueryResponse queryResponse;
        try {
            //调用支付宝API：通用查询支付情况
            queryResponse = Factory
                    .Payment
                    .Common()
                    .query(String.valueOf(trading.getTradingOrderNo()));
        } catch (Exception e) {
            String msg = StrUtil.format("查询支付宝统一下单失败：trading = {}", trading);
            log.error(msg, e);
            throw new SLException(msg, TradingEnum.NATIVE_QUERY_FAIL.getCode(), TradingEnum.NATIVE_QUERY_FAIL.getStatus());
        }

        //修改交易单状态
        trading.setResultCode(queryResponse.getSubCode());
        trading.setResultMsg(queryResponse.getSubMsg());
        trading.setResultJson(JSONUtil.toJsonStr(queryResponse));

        boolean success = ResponseChecker.success(queryResponse);
        //响应成功，分析交易状态
        if (success) {
            String tradeStatus = queryResponse.getTradeStatus();
            if (StrUtil.equals(TradingConstant.ALI_TRADE_CLOSED, tradeStatus)) {
                //支付取消：TRADE_CLOSED（未付款交易超时关闭，或支付完成后全额退款）
                trading.setTradingState(TradingStateEnum.QXDD);
            } else if (StrUtil.equalsAny(tradeStatus, TradingConstant.ALI_TRADE_SUCCESS, TradingConstant.ALI_TRADE_FINISHED)) {
                // TRADE_SUCCESS（交易支付成功）
                // TRADE_FINISHED（交易结束，不可退款）
                trading.setTradingState(TradingStateEnum.YJS);
            } else {
                //非最终状态不处理，当前交易状态：WAIT_BUYER_PAY（交易创建，等待买家付款）不处理
                return false;
            }
            return true;
        }
        throw new SLException(trading.getResultJson(), TradingEnum.NATIVE_QUERY_FAIL.getCode(), TradingEnum.NATIVE_QUERY_FAIL.getStatus());
    }
```
### 5.1.4、微信支付实现
```java
    @Override
    public Boolean queryTrading(TradingEntity trading) throws SLException {
        // 获取微信支付的client对象
        WechatPayHttpClient client = WechatPayHttpClient.get(trading.getEnterpriseId());

        //请求地址
        String apiPath = StrUtil.format("/v3/pay/transactions/out-trade-no/{}", trading.getTradingOrderNo());

        //请求参数
        Map<String, Object> params = MapUtil.<String, Object>builder()
                .put("mchid", client.getMchId())
                .build();

        WeChatResponse response;
        try {
            response = client.doGet(apiPath, params);
        } catch (Exception e) {
            log.error("调用微信接口出错！apiPath = {}, params = {}", apiPath, JSONUtil.toJsonStr(params), e);
            throw new SLException(NATIVE_REFUND_FAIL, e);
        }
        if (response.isOk()) {
            JSONObject jsonObject = JSONUtil.parseObj(response.getBody());
            // 交易状态，枚举值：
            // SUCCESS：支付成功
            // REFUND：转入退款
            // NOTPAY：未支付
            // CLOSED：已关闭
            // REVOKED：已撤销（仅付款码支付会返回）
            // USERPAYING：用户支付中（仅付款码支付会返回）
            // PAYERROR：支付失败（仅付款码支付会返回）
            String tradeStatus = jsonObject.getStr("trade_state");
            if (StrUtil.equalsAny(tradeStatus, TradingConstant.WECHAT_TRADE_CLOSED, TradingConstant.WECHAT_TRADE_REVOKED)) {
                trading.setTradingState(TradingStateEnum.QXDD);
            } else if (StrUtil.equalsAny(tradeStatus, TradingConstant.WECHAT_REFUND_SUCCESS, TradingConstant.WECHAT_TRADE_REFUND)) {
                trading.setTradingState(TradingStateEnum.YJS);
            } else if (StrUtil.equalsAny(tradeStatus, TradingConstant.WECHAT_TRADE_NOTPAY)) {
                //如果是未支付，需要判断下时间，超过2小时未知的订单需要关闭订单以及设置状态为QXDD
                long between = LocalDateTimeUtil.between(trading.getCreated(), LocalDateTimeUtil.now(), ChronoUnit.HOURS);
                if (between >= 2) {
                    return this.closeTrading(trading);
                }
            } else {
                //非最终状态不处理
                return false;
            }
            //修改交易单状态
            trading.setResultCode(tradeStatus);
            trading.setResultMsg(jsonObject.getStr("trade_state_desc"));
            trading.setResultJson(response.getBody());
            return true;
        }
        throw new SLException(response.getBody(), NATIVE_REFUND_FAIL.getCode(), NATIVE_REFUND_FAIL.getCode());
    }
```
## 5.2、退款
### 5.2.1、Controller
```java
    /***
     * 统一收单交易退款接口
     * 当交易发生之后一段时间内，由于买家或者卖家的原因需要退款时，卖家可以通过退款接口将支付款退还给买家，
     * 将在收到退款请求并且验证成功之后，按照退款规则将支付款按原路退到买家帐号上。
     * @param tradingOrderNo 交易单号
     * @param refundAmount 退款金额
     * @return
     */
    @PostMapping("refund")
    @ApiOperation(value = "统一收单交易退款", notes = "统一收单交易退款")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "tradingOrderNo", value = "交易单号", required = true),
            @ApiImplicitParam(name = "refundAmount", value = "退款金额", required = true)
    })
    public void refundTrading(@RequestParam("tradingOrderNo") Long tradingOrderNo,
                              @RequestParam("refundAmount") BigDecimal refundAmount) {
        Boolean result = this.basicPayService.refundTrading(tradingOrderNo, refundAmount);
        if (!result) {
            throw new SLException(TradingEnum.BASIC_REFUND_COUNT_OUT_FAIL);
        }
    }
```
### 5.2.2、Service
```java
    @Override
    @Transactional
    public Boolean refundTrading(Long tradingOrderNo, BigDecimal refundAmount) throws SLException {
        //通过单号查询交易单数据
        TradingEntity trading = this.tradingService.findTradByTradingOrderNo(tradingOrderNo);
        //设置退款金额
        trading.setRefund(NumberUtil.add(refundAmount, trading.getRefund()));

        //入库前置检查
        this.beforePayHandler.checkRefundTrading(trading);

        String key = TradingCacheConstant.REFUND_PAY + tradingOrderNo;
        RLock lock = redissonClient.getFairLock(key);
        try {
            //获取锁
            if (lock.tryLock(TradingCacheConstant.REDIS_WAIT_TIME, TimeUnit.SECONDS)) {
                //幂等性的检查
                RefundRecordEntity refundRecord = this.beforePayHandler.idempotentRefundTrading(trading, refundAmount);
                if (null == refundRecord) {
                    return false;
                }

                //选取不同的支付渠道实现
                BasicPayHandler handler = HandlerFactory.get(refundRecord.getTradingChannel(), BasicPayHandler.class);
                Boolean result = handler.refundTrading(refundRecord);
                if (result) {
                    //更新退款记录数据
                    this.refundRecordService.saveOrUpdate(refundRecord);

                    //设置交易单是退款订单
                    trading.setIsRefund(Constants.YES);
                    this.tradingService.saveOrUpdate(trading);
                }
                return true;
            }
            throw new SLException(TradingEnum.NATIVE_QUERY_FAIL);
        } catch (SLException e) {
            throw e;
        } catch (Exception e) {
            log.error("查询交易单数据异常:{}", ExceptionUtil.stacktraceToString(e));
            throw new SLException(TradingEnum.NATIVE_QUERY_FAIL);
        } finally {
            lock.unlock();
        }
    }
```
### 5.2.3、支付宝实现
```java
    @Override
    public Boolean refundTrading(RefundRecordEntity refundRecord) throws SLException {
        //查询配置
        Config config = AlipayConfig.getConfig(refundRecord.getEnterpriseId());
        //Factory使用配置
        Factory.setOptions(config);
        //调用支付宝API：通用查询支付情况
        AlipayTradeRefundResponse refundResponse;
        try {
            // 支付宝easy sdk
            refundResponse = Factory
                    .Payment
                    .Common()
                    //扩展参数：退款单号
                    .optional("out_request_no", refundRecord.getRefundNo())
                    .refund(Convert.toStr(refundRecord.getTradingOrderNo()),
                            Convert.toStr(refundRecord.getRefundAmount()));
        } catch (Exception e) {
            String msg = StrUtil.format("调用支付宝退款接口出错！refundRecord = {}", refundRecord);
            log.error(msg, e);
            throw new SLException(msg, TradingEnum.NATIVE_REFUND_FAIL.getCode(), TradingEnum.NATIVE_REFUND_FAIL.getStatus());
        }
        refundRecord.setRefundCode(refundResponse.getSubCode());
        refundRecord.setRefundMsg(JSONUtil.toJsonStr(refundResponse));
        boolean success = ResponseChecker.success(refundResponse);
        if (success) {
            refundRecord.setRefundStatus(RefundStatusEnum.SUCCESS);
            return true;
        }
        throw new SLException(refundRecord.getRefundMsg(), TradingEnum.NATIVE_REFUND_FAIL.getCode(), TradingEnum.NATIVE_REFUND_FAIL.getStatus());
    }
```
### 5.2.4、微信实现
```java
    @Override
    public Boolean refundTrading(RefundRecordEntity refundRecord) throws SLException {
        // 获取微信支付的client对象
        WechatPayHttpClient client = WechatPayHttpClient.get(refundRecord.getEnterpriseId());
        //请求地址
        String apiPath = "/v3/refund/domestic/refunds";
        //请求参数
        Map<String, Object> params = MapUtil.<String, Object>builder()
                .put("out_refund_no", Convert.toStr(refundRecord.getRefundNo()))
                .put("out_trade_no", Convert.toStr(refundRecord.getTradingOrderNo()))
                .put("amount", MapUtil.<String, Object>builder()
                        .put("refund", NumberUtil.mul(refundRecord.getRefundAmount(), 100)) //本次退款金额
                        .put("total", NumberUtil.mul(refundRecord.getTotal(), 100)) //原订单金额
                        .put("currency", "CNY") //币种
                        .build())
                .build();
        WeChatResponse response;
        try {
            response = client.doPost(apiPath, params);
        } catch (Exception e) {
            log.error("调用微信接口出错！apiPath = {}, params = {}", apiPath, JSONUtil.toJsonStr(params), e);
            throw new SLException(NATIVE_REFUND_FAIL, e);
        }
        refundRecord.setRefundCode(Convert.toStr(response.getStatus()));
        refundRecord.setRefundMsg(response.getBody());
        if (response.isOk()) {
            JSONObject jsonObject = JSONUtil.parseObj(response.getBody());
            // SUCCESS：退款成功
            // CLOSED：退款关闭
            // PROCESSING：退款处理中
            // ABNORMAL：退款异常
            String status = jsonObject.getStr("status");
            if (StrUtil.equals(status, TradingConstant.WECHAT_REFUND_PROCESSING)) {
                refundRecord.setRefundStatus(RefundStatusEnum.SENDING);
            } else if (StrUtil.equals(status, TradingConstant.WECHAT_REFUND_SUCCESS)) {
                refundRecord.setRefundStatus(RefundStatusEnum.SUCCESS);
            } else {
                refundRecord.setRefundStatus(RefundStatusEnum.FAIL);
            }
            return true;
        }
        throw new SLException(refundRecord.getRefundMsg(), NATIVE_REFUND_FAIL.getCode(), NATIVE_REFUND_FAIL.getStatus());
    }
```
## 5.3、查询退款
### 5.3.1、Controller
```java
    /***
     * 统一收单交易退款查询接口
     * @param refundNo 退款交易单号
     * @return
     */
    @PostMapping("refund/{refundNo}")
    @ApiOperation(value = "查询统一收单交易退款", notes = "查询统一收单交易退款")
    @ApiImplicitParam(name = "refundNo", value = "退款交易单", required = true)
    public RefundRecordDTO queryRefundDownLineTrading(@PathVariable("refundNo") Long refundNo) {
        return this.basicPayService.queryRefundTrading(refundNo);
    }
```
### 5.3.2、Service
```java
    @Override
    public RefundRecordDTO queryRefundTrading(Long refundNo) throws SLException {
        //通过单号查询交易单数据
        RefundRecordEntity refundRecord = this.refundRecordService.findByRefundNo(refundNo);
        //查询前置处理
        this.beforePayHandler.checkQueryRefundTrading(refundRecord);

        String key = TradingCacheConstant.REFUND_QUERY_PAY + refundNo;
        RLock lock = redissonClient.getFairLock(key);
        try {
            //获取锁
            if (lock.tryLock(TradingCacheConstant.REDIS_WAIT_TIME, TimeUnit.SECONDS)) {

                //选取不同的支付渠道实现
                BasicPayHandler handler = HandlerFactory.get(refundRecord.getTradingChannel(), BasicPayHandler.class);
                Boolean result = handler.queryRefundTrading(refundRecord);
                if (result) {
                    //更新数据
                    this.refundRecordService.saveOrUpdate(refundRecord);
                }
                return BeanUtil.toBean(refundRecord, RefundRecordDTO.class);
            }
            throw new SLException(TradingEnum.REFUND_FAIL);
        } catch (SLException e) {
            throw e;
        } catch (Exception e) {
            log.error("查询退款交易单数据异常: refundRecord = {}", refundRecord, e);
            throw new SLException(TradingEnum.REFUND_FAIL);
        } finally {
            lock.unlock();
        }
    }
```
### 5.3.3、支付宝实现
```java
    @Override
    public Boolean queryRefundTrading(RefundRecordEntity refundRecord) throws SLException {
        //查询配置
        Config config = AlipayConfig.getConfig(refundRecord.getEnterpriseId());
        //Factory使用配置
        Factory.setOptions(config);
        AlipayTradeFastpayRefundQueryResponse response;
        try {
            response = Factory.Payment.Common().queryRefund(
                    Convert.toStr(refundRecord.getTradingOrderNo()),
                    Convert.toStr(refundRecord.getRefundNo()));
        } catch (Exception e) {
            log.error("调用支付宝查询退款接口出错！refundRecord = {}", refundRecord, e);
            throw new SLException(TradingEnum.NATIVE_REFUND_FAIL, e);
        }

        refundRecord.setRefundCode(response.getSubCode());
        refundRecord.setRefundMsg(JSONUtil.toJsonStr(response));
        boolean success = ResponseChecker.success(response);
        if (success) {
            refundRecord.setRefundStatus(RefundStatusEnum.SUCCESS);
            return true;
        }
        throw new SLException(refundRecord.getRefundMsg(), TradingEnum.NATIVE_REFUND_FAIL.getCode(), TradingEnum.NATIVE_REFUND_FAIL.getStatus());
    }
```
### 5.3.4、微信支付实现
```java
    @Override
    public Boolean queryRefundTrading(RefundRecordEntity refundRecord) throws SLException {
        // 获取微信支付的client对象
        WechatPayHttpClient client = WechatPayHttpClient.get(refundRecord.getEnterpriseId());

        //请求地址
        String apiPath = StrUtil.format("/v3/refund/domestic/refunds/{}", refundRecord.getRefundNo());

        WeChatResponse response;
        try {
            response = client.doGet(apiPath);
        } catch (Exception e) {
            log.error("调用微信接口出错！apiPath = {}", apiPath, e);
            throw new SLException(NATIVE_QUERY_REFUND_FAIL, e);
        }

        refundRecord.setRefundCode(Convert.toStr(response.getStatus()));
        refundRecord.setRefundMsg(response.getBody());
        if (response.isOk()) {
            JSONObject jsonObject = JSONUtil.parseObj(response.getBody());
            // SUCCESS：退款成功
            // CLOSED：退款关闭
            // PROCESSING：退款处理中
            // ABNORMAL：退款异常
            String status = jsonObject.getStr("status");
            if (StrUtil.equals(status, TradingConstant.WECHAT_REFUND_PROCESSING)) {
                refundRecord.setRefundStatus(RefundStatusEnum.SENDING);
            } else if (StrUtil.equals(status, TradingConstant.WECHAT_REFUND_SUCCESS)) {
                refundRecord.setRefundStatus(RefundStatusEnum.SUCCESS);
            } else {
                refundRecord.setRefundStatus(RefundStatusEnum.FAIL);
            }
            return true;
        }
        throw new SLException(response.getBody(), NATIVE_QUERY_REFUND_FAIL.getCode(), NATIVE_QUERY_REFUND_FAIL.getStatus());
    }
```
# 6、同步支付状态【阅读代码】
在支付平台创建交易单后，如果用户支付成功，我们怎么知道支付成功了呢？一般的做法有两种，分别是【异步通知】和【主动查询】，基本的流程如下：
![](https://cdn.nlark.com/yuque/__puml/15378349a11b8b852184c447e308a412.svg#lake_card_v2=eyJ0eXBlIjoicHVtbCIsImNvZGUiOiJAc3RhcnR1bWxcblxuYXV0b251bWJlclxuXG5hY3RvciBcIueUqOaIt1wiIGFzIHVzZXJcbnBhcnRpY2lwYW50IFwi5b-r6YCS5ZGYXCIgYXMgY291cmllclxucGFydGljaXBhbnQgXCLmlK_ku5jlvq7mnI3liqFcIiBhcyB0cmFkZVxucGFydGljaXBhbnQgXCLkuInmlrnmlK_ku5jlubPlj7BcIiBhcyB6ZnB0XG5cbmFjdGl2YXRlIGNvdXJpZXJcbmNvdXJpZXIgLT4gdXNlciAtLSsrOiDlsZXnpLrmlK_ku5hcXG7kuoznu7TnoIFcXHRcbnVzZXIgLT4gemZwdCsrOiDmlK_ku5hcbnpmcHQgLS0-IHVzZXI6IOaUr-S7mOaIkOWKn1xuZGVhY3RpdmF0ZSB1c2VyXG56ZnB0IC1bIzAwMDBGRl0tPiB0cmFkZSArKzog5pSv5LuY5oiQ5YqfXG50cmFkZSAtPiB0cmFkZSA6IOabtOaWsOeKtuaAgVxuemZwdCAtWyMwMDAwRkZdLT5YIHRyYWRlIC0tOiDmlK_ku5jmiJDlip9cXG7osIPnlKjlpLHotKVcXHRcblxudHJhZGUgLT4gemZwdCArKzog5a6a5pe25Lu75Yqh5p-l6K-iXG56ZnB0IC0-IHRyYWRlIC0tOiDov5Tlm57nirbmgIHkv6Hmga9cbnRyYWRlIC0-IHRyYWRlIDog5pu05paw54q25oCBXG5cbmFjdGl2YXRlIGNvdXJpZXJcbmNvdXJpZXIgLT4gdHJhZGUgOiDmn6Xor6LnirbmgIHvvIjova7or6LvvIlcblxuQGVuZHVtbCIsInVybCI6Imh0dHBzOi8vY2RuLm5sYXJrLmNvbS95dXF1ZS9fX3B1bWwvMTUzNzgzNDlhMTFiOGI4NTIxODRjNDQ3ZTMwOGE0MTIuc3ZnIiwiaWQiOiJ0ZDQwZSIsIm1hcmdpbiI6eyJ0b3AiOnRydWUsImJvdHRvbSI6dHJ1ZX0sImNhcmQiOiJkaWFncmFtIn0=)说明：

- 在用户支付成功后，【步骤4】支付平台会通知【支付微服务】，这个就是异步通知，需要在【支付微服务】中对外暴露接口
- 由于网络的不确定性，异步通知可能出现故障【步骤6】
- 支付微服务中需要有定时任务，查询正在支付中的订单的状态
- 可以看出【异步通知】与【主动定时查询】这两种方式是互不的，缺一不可。
## 6.1、异步通知
支付宝和微信都提供了异步通知功能，具体参考官方文档：
### 6.1.1、内网穿透
异步通知的是需要通过外网的域名地址请求到的，由于我们还没有真正上线，那支付平台如何请求到我们本地服务的呢？
这里可以使用【内网穿透】技术来实现，通过【内网穿透软件】将内网与外网通过隧道打通，外网可以读取内网中的数据。
在这里推荐2个免费的内网穿透服务，分别是：
这里以【cpolar】为例，介绍使用方法：
**第一步，安装cpolar：**
Windows的安装包在资料目录中，101机器的已经按照完成，在 `/usr/local/src/cpolar`目录下。
**第二步，注册账号并且登录。**
**第三步，设置token：**
请求 [https://dashboard.cpolar.com/get-started](https://dashboard.cpolar.com/get-started) 页面，查看命令`./cpolar authtoken xxxx`后面的【xxxx】就是你自己的token，每个人是不一样的。token只需要设置一次。
**第四步，设置端口映射：**
例如：`./cpolar http 18096`端口改成你自己的端口。
在线查看：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660744824692-1f17569a-02eb-4270-b946-43345612e9ac.png#averageHue=%23fbf6f4&clientId=u62b8e50d-4630-4&errorMessage=unknown%20error&from=paste&height=272&id=u70a8a076&name=image.png&originHeight=448&originWidth=1537&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67203&status=error&style=shadow&taskId=uc80724c8-19a6-4bf5-986d-1f7bb17752a&title=&width=931.5150976750289)
将`https`协议的url写入到`sl_pay_channel`表的`notify_url`字段中，例如：`[https://39808c89.vip.cpolar.cn/trade/notify/wx/{enterpriseId}](https://39808c89.vip.cpolar.cn/trade/notify/wx/{enterpriseId})`。
:::danger
注意：cpolar的域名每次启动服务都不一样，每个人的也都不一样，需要改成你自己的那个域名。
:::
### 6.1.2、NotifyController
```java
package com.sl.ms.trade.controller;

import cn.hutool.core.map.MapUtil;
import com.sl.ms.trade.service.NotifyService;
import com.sl.transport.common.exception.SLException;
import com.wechat.pay.contrib.apache.httpclient.notification.NotificationRequest;
import io.swagger.annotations.Api;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 支付结果的通知
 */
@RestController
@Api(tags = "支付通知")
@RequestMapping("notify")
public class NotifyController {

    @Resource
    private NotifyService notifyService;

    /**
     * 微信支付成功回调（成功后无需响应内容）
     *
     * @param httpEntity   微信请求信息
     * @param enterpriseId 商户id
     * @return 正常响应200，否则响应500
     */
    @PostMapping("wx/{enterpriseId}")
    public ResponseEntity<Object> wxPayNotify(HttpEntity<String> httpEntity, @PathVariable("enterpriseId") Long enterpriseId) {
        try {
            //获取请求头
            HttpHeaders headers = httpEntity.getHeaders();

            //构建微信请求数据对象
            NotificationRequest request = new NotificationRequest.Builder()
                    .withSerialNumber(headers.getFirst("Wechatpay-Serial")) //证书序列号（微信平台）
                    .withNonce(headers.getFirst("Wechatpay-Nonce"))  //随机串
                    .withTimestamp(headers.getFirst("Wechatpay-Timestamp")) //时间戳
                    .withSignature(headers.getFirst("Wechatpay-Signature")) //签名字符串
                    .withBody(httpEntity.getBody())
                    .build();

            //微信通知的业务处理
            this.notifyService.wxPayNotify(request, enterpriseId);

        } catch (SLException e) {
            Map<String, Object> result = MapUtil.<String, Object>builder()
                    .put("code", "FAIL")
                    .put("message", e.getMsg())
                    .build();
            //响应500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
        return ResponseEntity.ok(null);
    }

    /**
     * 支付宝支付成功回调（成功后需要响应success）
     *
     * @param enterpriseId 商户id
     * @return 正常响应200，否则响应500
     */
    @PostMapping("alipay/{enterpriseId}")
    public ResponseEntity<String> aliPayNotify(HttpServletRequest request,
                                               @PathVariable("enterpriseId") Long enterpriseId) {
        try {
            //支付宝通知的业务处理
            this.notifyService.aliPayNotify(request, enterpriseId);
        } catch (SLException e) {
            //响应500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok("success");
    }
}

```
:::danger
异步通知debug测试时，三方支付平台会发起多个重试请求，会导致debug无法拦截每个请求，需要将debug模式设置成单线程模式，如下：（断点红球上点右键进行设置）
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27683667/1677637803220-ada64007-c4ae-4443-ab71-7df090a3fbb5.png#averageHue=%23f7f5f4&clientId=u87572e71-e8bb-4&from=paste&height=371&id=u2042e0f4&name=image.png&originHeight=557&originWidth=1431&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=99723&status=done&style=shadow&taskId=u0104a64d-fb14-4b34-87c2-0e4310703ef&title=&width=954)
:::
### 6.1.3、NotifyService
```java
package com.sl.ms.trade.service;

import com.sl.transport.common.exception.SLException;
import com.wechat.pay.contrib.apache.httpclient.notification.NotificationRequest;

import javax.servlet.http.HttpServletRequest;

/**
 * 支付通知
 */
public interface NotifyService {


    /**
     * 微信支付通知，官方文档：https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_5.shtml
     *
     * @param request      微信请求对象
     * @param enterpriseId 商户id
     * @throws SLException 抛出SL异常，通过异常决定是否响应200
     */
    void wxPayNotify(NotificationRequest request, Long enterpriseId) throws SLException;

    /**
     * 支付宝支付通知，官方文档：https://opendocs.alipay.com/open/194/103296?ref=api
     *
     * @param request      请求对象
     * @param enterpriseId 商户id
     * @throws SLException 抛出SL异常，通过异常决定是否响应200
     */
    void aliPayNotify(HttpServletRequest request, Long enterpriseId) throws SLException;
}

```
### 6.1.4、NotifyServiceImpl
:::info
注意：

- 支付成功的通知请求，一定要确保是真正来自支付平台，防止伪造请求造成数据错误，导致财产损失
- 对于响应会数据需要进行解密处理
:::
```java
package com.sl.ms.trade.service.impl;

import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.kernel.Config;
import com.sl.ms.base.api.common.MQFeign;
import com.sl.ms.trade.constant.TradingCacheConstant;
import com.sl.ms.trade.constant.TradingConstant;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.ms.trade.enums.TradingStateEnum;
import com.sl.ms.trade.handler.alipay.AlipayConfig;
import com.sl.ms.trade.handler.wechat.WechatPayHttpClient;
import com.sl.ms.trade.service.NotifyService;
import com.sl.ms.trade.service.TradingService;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.exception.SLException;
import com.sl.transport.common.vo.TradeStatusMsg;
import com.wechat.pay.contrib.apache.httpclient.auth.Verifier;
import com.wechat.pay.contrib.apache.httpclient.cert.CertificatesManager;
import com.wechat.pay.contrib.apache.httpclient.notification.Notification;
import com.wechat.pay.contrib.apache.httpclient.notification.NotificationHandler;
import com.wechat.pay.contrib.apache.httpclient.notification.NotificationRequest;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 支付成功的通知处理
 */
@Slf4j
@Service
public class NotifyServiceImpl implements NotifyService {

    @Resource
    private TradingService tradingService;
    @Resource
    private RedissonClient redissonClient;
    @Resource
    private MQFeign mqFeign;

    @Override
    public void wxPayNotify(NotificationRequest request, Long enterpriseId) throws SLException {
        // 查询配置
        WechatPayHttpClient client = WechatPayHttpClient.get(enterpriseId);

        JSONObject jsonData;

        //验证签名，确保请求来自微信
        try {
            //确保在管理器中存在自动更新的商户证书
            client.createHttpClient();

            CertificatesManager certificatesManager = CertificatesManager.getInstance();
            Verifier verifier = certificatesManager.getVerifier(client.getMchId());

            //验签和解析请求数据
            NotificationHandler notificationHandler = new NotificationHandler(verifier, client.getApiV3Key().getBytes(StandardCharsets.UTF_8));
            Notification notification = notificationHandler.parse(request);

            if (!StrUtil.equals("TRANSACTION.SUCCESS", notification.getEventType())) {
                //非成功请求直接返回，理论上都是成功的请求
                return;
            }

            //获取解密后的数据
            jsonData = JSONUtil.parseObj(notification.getDecryptData());
        } catch (Exception e) {
            throw new SLException("验签失败");
        }

        if (!StrUtil.equals(jsonData.getStr("trade_state"), TradingConstant.WECHAT_TRADE_SUCCESS)) {
            return;
        }

        //交易单号
        Long tradingOrderNo = jsonData.getLong("out_trade_no");
        log.info("微信支付通知：tradingOrderNo = {}, data = {}", tradingOrderNo, jsonData);

        //更新交易单
        this.updateTrading(tradingOrderNo, jsonData.getStr("trade_state_desc"), jsonData.toString());
    }

    private void updateTrading(Long tradingOrderNo, String resultMsg, String resultJson) {
        String key = TradingCacheConstant.CREATE_PAY + tradingOrderNo;
        RLock lock = redissonClient.getFairLock(key);
        try {
            //获取锁
            if (lock.tryLock(TradingCacheConstant.REDIS_WAIT_TIME, TimeUnit.SECONDS)) {
                TradingEntity trading = this.tradingService.findTradByTradingOrderNo(tradingOrderNo);
                if (trading.getTradingState() == TradingStateEnum.YJS) {
                    // 已付款
                    return;
                }

                //设置成付款成功
                trading.setTradingState(TradingStateEnum.YJS);
                //清空二维码数据
                trading.setQrCode("");
                trading.setResultMsg(resultMsg);
                trading.setResultJson(resultJson);
                this.tradingService.saveOrUpdate(trading);

                // 发消息通知其他系统支付成功
                TradeStatusMsg tradeStatusMsg = TradeStatusMsg.builder()
                        .tradingOrderNo(trading.getTradingOrderNo())
                        .productOrderNo(trading.getProductOrderNo())
                        .statusCode(TradingStateEnum.YJS.getCode())
                        .statusName(TradingStateEnum.YJS.name())
                        .build();

                String msg = JSONUtil.toJsonStr(Collections.singletonList(tradeStatusMsg));
                this.mqFeign.sendMsg(Constants.MQ.Exchanges.TRADE, Constants.MQ.RoutingKeys.TRADE_UPDATE_STATUS, msg);
                return;
            }
        } catch (Exception e) {
            throw new SLException("处理业务失败");
        } finally {
            lock.unlock();
        }
        throw new SLException("处理业务失败");
    }

    @Override
    public void aliPayNotify(HttpServletRequest request, Long enterpriseId) throws SLException {
        //获取参数
        Map<String, String[]> parameterMap = request.getParameterMap();
        Map<String, String> param = new HashMap<>();
        for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
            param.put(entry.getKey(), StrUtil.join(",", entry.getValue()));
        }

        String tradeStatus = param.get("trade_status");
        if (!StrUtil.equals(tradeStatus, TradingConstant.ALI_TRADE_SUCCESS)) {
            return;
        }

        //查询配置
        Config config = AlipayConfig.getConfig(enterpriseId);
        Factory.setOptions(config);
        try {
            Boolean result = Factory
                    .Payment
                    .Common().verifyNotify(param);
            if (!result) {
                throw new SLException("验签失败");
            }
        } catch (Exception e) {
            throw new SLException("验签失败");
        }

        //获取交易单号
        Long tradingOrderNo = Convert.toLong(param.get("out_trade_no"));
        //更新交易单
        this.updateTrading(tradingOrderNo, "支付成功", JSONUtil.toJsonStr(param));
    }
}

```
### 6.1.5、网关对外暴露接口
bootsarp-{profile}.yml文件中增加如下内容：
```yaml
        - id: sl-express-ms-trade
          uri: lb://sl-express-ms-trade
          predicates:
            - Path=/trade/notify/**
          filters:
            - StripPrefix=1
            - AddRequestHeader=X-Request-From, sl-express-gateway
```
:::danger
说明：对于支付系统在网关中的暴露仅仅暴露通知接口，其他接口不暴露。
:::
## 6.2、定时任务
一般在项目中实现定时任务主要是两种技术方案，一种是Spring Task，另一种是xxl-job，其中Spring Task是适合单体项目中使用，而xxl-job是分布式任务调度框架，更适合在分布式项目中使用，所以在支付微服务中我们将采用xxl-job来实现。
### 6.2.1、分布式任务调度
在微服务架构体系中，服务之间通过网络交互来完成业务处理的，在分布式架构下，一个服务往往会部署多个实例来运行我们的业务，如果在这种分布式系统环境下运行任务调度，我们称之为**分布式任务调度**。
![image-20210729230059884.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660727716302-03ff804d-6d1e-40c0-83f6-eb14ad6c9bc4.png#averageHue=%23fcf8f8&clientId=u62b8e50d-4630-4&errorMessage=unknown%20error&from=paste&height=303&id=ubfd1fa26&name=image-20210729230059884.png&originHeight=500&originWidth=1087&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45264&status=error&style=shadow&taskId=uede183f8-3e90-441b-89fe-58851a03a87&title=&width=658.7878407109671)
分布式系统的特点，并且提高任务的调度处理能力：

- 并行任务调度
   - 集群部署单个服务，这样就可以多台计算机共同去完成任务调度，我们可以将任务分割为若干个分片，由不同的实例并行执行，来提高任务调度的处理效率。
- 高可用
   - 若某一个实例宕机，不影响其他实例来执行任务。
- 弹性扩容
   - 当集群中增加实例就可以提高并执行任务的处理效率。
- 任务管理与监测
   - 对系统中存在的所有定时任务进行统一的管理及监测。
   - 让开发人员及运维人员能够时刻了解任务执行情况，从而做出快速的应急处理响应。
### 6.2.2、xxl-Job简介
XXL-JOB是一个分布式任务调度平台，其核心设计目标是开发迅速、学习简单、轻量级、易扩展。现已开放源代码并接入多家公司线上产品线，开箱即用。
官网地址：
xxl-job架构图（官图）：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1668650336008-88649f9c-99e7-430a-88be-92f41176aab0.png#averageHue=%23a7cd95&clientId=u2f2a908c-6d1b-4&from=paste&id=ud3b6e178&name=image.png&originHeight=824&originWidth=1554&originalType=url&ratio=1&rotation=0&showTitle=false&size=323827&status=done&style=shadow&taskId=uda90c84f-b9d6-4650-ba21-504ab2f5c10&title=)
### 7.2.3、部署安装
我们采用docker进行部署安装xxl-job的调度中心，目前已经安装完成，直接访问即可：[http://xxl-job.sl-express.com/xxl-job-admin/](http://xxl-job.sl-express.com/xxl-job-admin/)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660730266412-31b767ae-10e7-44d9-8b6b-8d3b8b23bf55.png#averageHue=%23d3d4a0&clientId=u62b8e50d-4630-4&errorMessage=unknown%20error&from=paste&height=553&id=u25a703cd&name=image.png&originHeight=912&originWidth=1895&originalType=binary&ratio=1&rotation=0&showTitle=false&size=100071&status=error&style=shadow&taskId=u9a0a15d7-0f87-4e9b-b842-c92c590b8bd&title=&width=1148.4847821042158)
安装命令：
```shell
docker run \
-e PARAMS="--spring.datasource.url=jdbc:mysql://192.168.150.101:3306/xxl_job?Unicode=true&characterEncoding=UTF-8 \
--spring.datasource.username=root \
--spring.datasource.password=123" \
--restart=always \
-p 28080:8080 \
-v xxl-job-admin-applogs:/data/applogs \
--name xxl-job-admin \
-d \
xuxueli/xxl-job-admin:2.3.0
```
:::tips

- 默认端口映射到28080
- 日志挂载到/var/lib/docker/volumes/xxl-job-admin-applogs
- 通过PARAMS环境变量设置数据库链接参数
- 数据库脚本：[https://gitee.com/xuxueli0323/xxl-job/blob/2.3.0/doc/db/tables_xxl_job.sql](https://gitee.com/xuxueli0323/xxl-job/blob/2.3.0/doc/db/tables_xxl_job.sql)
:::
xxl-job共用到8张表，如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660730135181-1133ee6f-192a-462c-999a-c7a30cf6ff9e.png#averageHue=%23ebe9e7&clientId=u62b8e50d-4630-4&errorMessage=unknown%20error&from=paste&height=155&id=u72868509&name=image.png&originHeight=255&originWidth=262&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6538&status=error&style=shadow&taskId=ubf7bcbdd-cd21-415f-8f12-764cd573251&title=&width=158.7878696101871)
:::tips

- xxl_job_lock：任务调度锁表；
- xxl_job_group：执行器信息表，维护任务执行器信息；
- xxl_job_info：调度扩展信息表： 用于保存XXL-JOB调度任务的扩展信息，如任务分组、任务名、机器地址、执行器、执行入参和报警邮件等等；
- xxl_job_log：调度日志表： 用于保存XXL-JOB任务调度的历史信息，如调度结果、执行结果、调度入参、调度机器和执行器等等；
- xxl_job_log_report：调度日志报表：用户存储XXL-JOB任务调度日志的报表，调度中心报表功能页面会用到；
- xxl_job_logglue：任务GLUE日志：用于保存GLUE更新历史，用于支持GLUE的版本回溯功能；
- xxl_job_registry：执行器注册表，维护在线的执行器和调度中心机器地址信息；
- xxl_job_user：系统用户表；
:::
### 6.2.4、编写任务代码
拉取编写任务的示例代码进行学习：[http://git.sl-express.com/sl/sl-express-xxl-job](http://git.sl-express.com/sl/sl-express-xxl-job)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660736517360-29cbf2ca-7561-4687-b16f-33f6019a5a76.png#averageHue=%23fcfbfa&clientId=u62b8e50d-4630-4&errorMessage=unknown%20error&from=paste&height=296&id=u3e0bfea2&name=image.png&originHeight=488&originWidth=573&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21727&status=error&style=shadow&taskId=uc1aa34cc-3d1c-4f71-8430-4bd999c9668&title=&width=347.27270720090536)
运行之前，首先需要创建执行管理器：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660736615838-3b5ac79c-d7e6-4316-a40b-9c4173bc3d31.png#averageHue=%23f8f8f8&clientId=u62b8e50d-4630-4&errorMessage=unknown%20error&from=paste&height=364&id=u3b0ac1c1&name=image.png&originHeight=601&originWidth=879&originalType=binary&ratio=1&rotation=0&showTitle=true&size=32936&status=error&style=shadow&taskId=u5913d20a-9d1c-4a06-9e9d-b36ffb013e0&title=%E6%B3%A8%E5%86%8C%E6%96%B9%E5%BC%8F%EF%BC%9A%E8%87%AA%E5%8A%A8%E6%B3%A8%E5%86%8C&width=532.7272419364674 "注册方式：自动注册")
创建任务：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660736697229-144d39d0-3225-4034-976c-be70c45efcc8.png#averageHue=%23fbfbfb&clientId=u62b8e50d-4630-4&errorMessage=unknown%20error&from=paste&height=431&id=uc0a6944a&name=image.png&originHeight=711&originWidth=1325&originalType=binary&ratio=1&rotation=0&showTitle=false&size=56278&status=error&style=shadow&taskId=ua2bd4b89-a98c-4428-a738-eaeb252ad0c&title=&width=803.0302566164041)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1660736720001-763427ff-aa1a-4659-bac7-e06268ed55c7.png#averageHue=%23fafafa&clientId=u62b8e50d-4630-4&errorMessage=unknown%20error&from=paste&height=235&id=u033a00b3&name=image.png&originHeight=387&originWidth=1331&originalType=binary&ratio=1&rotation=0&showTitle=false&size=36994&status=error&style=shadow&taskId=u9103f23a-d86c-4daa-8775-38a14af8695&title=&width=806.6666200425917)
:::info
xxl-job支持的路由策略非常丰富：

- FIRST（第一个）：固定选择第一个机器；
- LAST（最后一个）：固定选择最后一个机器；
- ROUND（轮询）：在线的机器按照顺序一次执行一个
- RANDOM（随机）：随机选择在线的机器；
- CONSISTENT_HASH（一致性HASH）：每个任务按照Hash算法固定选择某一台机器，且所有任务均匀散列在不同机器上。
- LEAST_FREQUENTLY_USED（最不经常使用）：使用频率最低的机器优先被选举；
- LEAST_RECENTLY_USED（最近最久未使用）：最久未使用的机器优先被选举；
- FAILOVER（故障转移）：按照顺序依次进行心跳检测，第一个心跳检测成功的机器选定为目标执行器并发起调度；
- BUSYOVER（忙碌转移）：按照顺序依次进行空闲检测，第一个空闲检测成功的机器选定为目标执行器并发起调度；
- SHARDING_BROADCAST(分片广播)：广播触发对应集群中所有机器执行一次任务，同时系统自动传递分片参数；可根据分片参数开发分片任务；
:::
xxl-job配置：
```java
package com.sl.xxljob.config;

import com.xxl.job.core.executor.impl.XxlJobSpringExecutor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
* xxl-job config
*/
@Configuration
	public class XxlJobConfig {
		private Logger logger = LoggerFactory.getLogger(XxlJobConfig.class);

		@Value("${xxl.job.admin.addresses}")
		private String adminAddresses;

		@Value("${xxl.job.accessToken:}")
		private String accessToken;

		@Value("${xxl.job.executor.appname}")
		private String appname;

		@Value("${xxl.job.executor.address:}")
		private String address;

		@Value("${xxl.job.executor.ip:}")
		private String ip;

		@Value("${xxl.job.executor.port:0}")
		private int port;

		@Value("${xxl.job.executor.logpath:}")
		private String logPath;

		@Value("${xxl.job.executor.logretentiondays:}")
		private int logRetentionDays;


		@Bean
		public XxlJobSpringExecutor xxlJobExecutor() {
			logger.info(">>>>>>>>>>> xxl-job config init.");
			XxlJobSpringExecutor xxlJobSpringExecutor = new XxlJobSpringExecutor();
			xxlJobSpringExecutor.setAdminAddresses(adminAddresses);
			xxlJobSpringExecutor.setAppname(appname);
			xxlJobSpringExecutor.setAddress(address);
			xxlJobSpringExecutor.setIp(ip);
			xxlJobSpringExecutor.setPort(port);
			xxlJobSpringExecutor.setAccessToken(accessToken);
			xxlJobSpringExecutor.setLogPath(logPath);
			xxlJobSpringExecutor.setLogRetentionDays(logRetentionDays);
			return xxlJobSpringExecutor;
		}


	}
```
任务代码：
```java
package com.sl.xxljob.job;

import cn.hutool.core.util.NumberUtil;
import cn.hutool.core.util.RandomUtil;
import com.xxl.job.core.context.XxlJobHelper;
import com.xxl.job.core.handler.annotation.XxlJob;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

/**
 * 任务处理器
 */
@Component
public class JobHandler {

    private List<Integer> dataList = Arrays.asList(1, 2, 3, 4, 5);

    /**
     * 普通任务
     */
    @XxlJob("firstJob")
    public void firstJob() throws Exception {
        System.out.println("firstJob执行了.... " + LocalDateTime.now());
        for (Integer data : dataList) {
            XxlJobHelper.log("data= {}", data);
            Thread.sleep(RandomUtil.randomInt(100, 500));
        }
        System.out.println("firstJob执行结束了.... " + LocalDateTime.now());
    }

    /**
     * 分片式任务
     */
    @XxlJob("shardingJob")
    public void shardingJob() throws Exception {
        // 分片参数
        // 分片节点总数
        int shardTotal = XxlJobHelper.getShardTotal();
        // 当前节点下标，从0开始
        int shardIndex = XxlJobHelper.getShardIndex();

        System.out.println("shardingJob执行了.... " + LocalDateTime.now());
        for (Integer data : dataList) {
            if (data % shardTotal == shardIndex) {
                XxlJobHelper.log("data= {}", data);
                Thread.sleep(RandomUtil.randomInt(100, 500));
            }
        }
        System.out.println("shardingJob执行结束了.... " + LocalDateTime.now());
    }
}

```
分片式任务的测试：
```verilog
2022-08-17 19:32:45 [com.xxl.job.core.thread.JobThread#run]-[130]-[Thread-10] 
----------- xxl-job job execute start -----------
----------- Param:
2022-08-17 19:32:45 [com.sl.xxljob.job.JobHandler#shardingJob]-[40]-[Thread-10] data= 1
2022-08-17 19:32:45 [com.sl.xxljob.job.JobHandler#shardingJob]-[40]-[Thread-10] data= 3
2022-08-17 19:32:45 [com.sl.xxljob.job.JobHandler#shardingJob]-[40]-[Thread-10] data= 5
2022-08-17 19:32:46 [com.xxl.job.core.thread.JobThread#run]-[176]-[Thread-10] 
----------- xxl-job job execute end(finish) -----------
----------- Result: handleCode=200, handleMsg = null
2022-08-17 19:32:46 [com.xxl.job.core.thread.TriggerCallbackThread#callbackLog]-[197]-[xxl-job, executor TriggerCallbackThread] 
----------- xxl-job job callback finish.

[Load Log Finish]
```
```verilog
2022-08-17 19:32:45 [com.xxl.job.core.thread.JobThread#run]-[130]-[Thread-10] 
----------- xxl-job job execute start -----------
----------- Param:
2022-08-17 19:32:45 [com.sl.xxljob.job.JobHandler#shardingJob]-[40]-[Thread-10] data= 2
2022-08-17 19:32:45 [com.sl.xxljob.job.JobHandler#shardingJob]-[40]-[Thread-10] data= 4
2022-08-17 19:32:45 [com.xxl.job.core.thread.JobThread#run]-[176]-[Thread-10] 
----------- xxl-job job execute end(finish) -----------
----------- Result: handleCode=200, handleMsg = null
2022-08-17 19:32:45 [com.xxl.job.core.thread.TriggerCallbackThread#callbackLog]-[197]-[xxl-job, executor TriggerCallbackThread] 
----------- xxl-job job callback finish.

[Load Log Finish]

```
可以看出，2个节点共同完成的任务处理，并且没有重复，这样提高了任务处理能力。
### 6.2.5、调度流程
![](https://cdn.nlark.com/yuque/__puml/16c44a3bc156656847a983498216e1f1.svg#lake_card_v2=eyJ0eXBlIjoicHVtbCIsImNvZGUiOiJAc3RhcnR1bWxcblxuYXV0b251bWJlclxuXG5hY3RvciBcIueUqOaIt1wiIGFzIFVzZXJcbnBhcnRpY2lwYW50IFwieHhsLWpvYuiwg-W6puS4reW_g1wiIGFzIHh4bFxucGFydGljaXBhbnQgXCJzbC1leHByZXNzLXh4bC1qb2JcIiBhcyBqb2JcblxuYWN0aXZhdGUgam9iXG5qb2IgLT4gam9iOiDlkK_liqjvvIjpu5jorqTnm5HlkKznq6_lj6M5OTk577yJXG5qb2IgLT4geHhsIC0tKys6IOazqOWGjOaJp-ihjOWZqFxuXG5hY3RpdmF0ZSBVc2VyXG5Vc2VyIC0-IHh4bCAtLTog5Yib5bu65a6a5pe25Lu75YqhXG54eGwgLT4geHhsOiDmjInnhafop4TliJnosIPluqZcbnh4bCAtPiBqb2IgKys6IOWPkemAgWh0dHDosIPluqbor7fmsYJcbmpvYiAtPiBqb2I6IOaJp-ihjGpvYu-8iOS4muWKoemAu-i-keWkhOeQhu-8iVxuam9iIC0-IHh4bC0tOiBodHRw6K-35rGC77yM5oql5ZGK57uT5p6cXG54eGwgLT4geHhsOuiusOW9leaXpeW_l1xuXG5hY3RpdmF0ZSBVc2VyXG5Vc2VyIC0-IHh4bCAtLTog5p-l55yL5pel5b-XXG5cbkBlbmR1bWwiLCJ1cmwiOiJodHRwczovL2Nkbi5ubGFyay5jb20veXVxdWUvX19wdW1sLzE2YzQ0YTNiYzE1NjY1Njg0N2E5ODM0OTgyMTZlMWYxLnN2ZyIsImlkIjoiSVNXM0QiLCJtYXJnaW4iOnsidG9wIjp0cnVlLCJib3R0b20iOnRydWV9LCJjYXJkIjoiZGlhZ3JhbSJ9)## 6.3、TradeJob
在此任务中包含两个任务，一个是查询支付状态，另一个是查询退款状态。
```java
package com.sl.ms.trade.job;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.json.JSONUtil;
import com.sl.ms.base.api.common.MQFeign;
import com.sl.ms.trade.domain.RefundRecordDTO;
import com.sl.ms.trade.domain.TradingDTO;
import com.sl.ms.trade.entity.RefundRecordEntity;
import com.sl.ms.trade.entity.TradingEntity;
import com.sl.ms.trade.enums.RefundStatusEnum;
import com.sl.ms.trade.enums.TradingStateEnum;
import com.sl.ms.trade.service.BasicPayService;
import com.sl.ms.trade.service.RefundRecordService;
import com.sl.ms.trade.service.TradingService;
import com.sl.transport.common.constant.Constants;
import com.sl.transport.common.vo.TradeStatusMsg;
import com.xxl.job.core.context.XxlJobHelper;
import com.xxl.job.core.handler.annotation.XxlJob;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 交易任务，主要是查询订单的支付状态 和 退款的成功状态
 */
@Slf4j
@Component
public class TradeJob {

    @Value("${sl.job.trading.count:100}")
    private Integer tradingCount;
    @Value("${sl.job.refund.count:100}")
    private Integer refundCount;
    @Resource
    private TradingService tradingService;
    @Resource
    private RefundRecordService refundRecordService;
    @Resource
    private BasicPayService basicPayService;
    @Resource
    private MQFeign mqFeign;

    /**
     * 分片广播方式查询支付状态
     * 逻辑：每次最多查询{tradingCount}个未完成的交易单，交易单id与shardTotal取模，值等于shardIndex进行处理
     */
    @XxlJob("tradingJob")
    public void tradingJob() {
        // 分片参数
        int shardIndex = NumberUtil.max(XxlJobHelper.getShardIndex(), 0);
        int shardTotal = NumberUtil.max(XxlJobHelper.getShardTotal(), 1);

        List<TradingEntity> list = this.tradingService.findListByTradingState(TradingStateEnum.FKZ, tradingCount);
        if (CollUtil.isEmpty(list)) {
            XxlJobHelper.log("查询到交易单列表为空！shardIndex = {}, shardTotal = {}", shardIndex, shardTotal);
            return;
        }

        //定义消息通知列表，只要是状态不为【付款中】就需要通知其他系统
        List<TradeStatusMsg> tradeMsgList = new ArrayList<>();
        for (TradingEntity trading : list) {
            if (trading.getTradingOrderNo() % shardTotal != shardIndex) {
                continue;
            }
            try {
                //查询交易单
                TradingDTO tradingDTO = this.basicPayService.queryTrading(trading.getTradingOrderNo());
                if (TradingStateEnum.FKZ != tradingDTO.getTradingState()) {
                    TradeStatusMsg tradeStatusMsg = TradeStatusMsg.builder()
                            .tradingOrderNo(trading.getTradingOrderNo())
                            .productOrderNo(trading.getProductOrderNo())
                            .statusCode(tradingDTO.getTradingState().getCode())
                            .statusName(tradingDTO.getTradingState().name())
                            .build();
                    tradeMsgList.add(tradeStatusMsg);
                }
            } catch (Exception e) {
                XxlJobHelper.log("查询交易单出错！shardIndex = {}, shardTotal = {}, trading = {}", shardIndex, shardTotal, trading, e);
            }
        }

        if (CollUtil.isEmpty(tradeMsgList)) {
            return;
        }

        //发送消息通知其他系统
        String msg = JSONUtil.toJsonStr(tradeMsgList);
        this.mqFeign.sendMsg(Constants.MQ.Exchanges.TRADE, Constants.MQ.RoutingKeys.TRADE_UPDATE_STATUS, msg);
    }

    /**
     * 分片广播方式查询退款状态
     */
    @XxlJob("refundJob")
    public void refundJob() {
        // 分片参数
        int shardIndex = NumberUtil.max(XxlJobHelper.getShardIndex(), 0);
        int shardTotal = NumberUtil.max(XxlJobHelper.getShardTotal(), 1);

        List<RefundRecordEntity> list = this.refundRecordService.findListByRefundStatus(RefundStatusEnum.SENDING, refundCount);
        if (CollUtil.isEmpty(list)) {
            XxlJobHelper.log("查询到退款单列表为空！shardIndex = {}, shardTotal = {}", shardIndex, shardTotal);
            return;
        }

        //定义消息通知列表，只要是状态不为【退款中】就需要通知其他系统
        List<TradeStatusMsg> tradeMsgList = new ArrayList<>();

        for (RefundRecordEntity refundRecord : list) {
            if (refundRecord.getRefundNo() % shardTotal != shardIndex) {
                continue;
            }
            try {
                //查询退款单
                RefundRecordDTO refundRecordDTO = this.basicPayService.queryRefundTrading(refundRecord.getRefundNo());
                if (RefundStatusEnum.SENDING != refundRecordDTO.getRefundStatus()) {
                    TradeStatusMsg tradeStatusMsg = TradeStatusMsg.builder()
                            .tradingOrderNo(refundRecord.getTradingOrderNo())
                            .productOrderNo(refundRecord.getProductOrderNo())
                            .refundNo(refundRecord.getRefundNo())
                            .statusCode(refundRecord.getRefundStatus().getCode())
                            .statusName(refundRecord.getRefundStatus().name())
                            .build();
                    tradeMsgList.add(tradeStatusMsg);
                }
            } catch (Exception e) {
                XxlJobHelper.log("查询退款单出错！shardIndex = {}, shardTotal = {}, refundRecord = {}", shardIndex, shardTotal, refundRecord, e);
            }
        }

        if (CollUtil.isEmpty(tradeMsgList)) {
            return;
        }

        //发送消息通知其他系统
        String msg = JSONUtil.toJsonStr(tradeMsgList);
        this.mqFeign.sendMsg(Constants.MQ.Exchanges.TRADE, Constants.MQ.RoutingKeys.REFUND_UPDATE_STATUS, msg);
    }
}

```
## 6.4、xxl-job任务
创建xxl-job的任务，首先创建执行器（AppName在nacos中的`sl-express-ms-trade.properties`配置文件中指定）：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1668420371350-8166a24f-4466-4bf5-8272-9de4fb9e4f24.png#averageHue=%23f8f8f8&clientId=u69b89388-5a4e-4&from=paste&height=413&id=ud098bb62&name=image.png&originHeight=619&originWidth=889&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33976&status=done&style=shadow&taskId=ue9e45a2b-7ee8-4aa3-a228-db29ab655e4&title=&width=592.6666666666666)
创建【查询支付状态】任务：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1668421730857-ece2139e-1283-4c43-b9db-1579461dbc6b.png#averageHue=%23fbfbfb&clientId=u69b89388-5a4e-4&from=paste&height=595&id=uab0cde82&name=image.png&originHeight=892&originWidth=1062&originalType=binary&ratio=1&rotation=0&showTitle=false&size=84610&status=done&style=shadow&taskId=u75ddab3f-9e3e-4158-9aba-57b140f7d3a&title=&width=708)
创建【查询退款状态】任务：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1668429689147-7dfb6529-e4f3-4967-af46-0ab0a6ee4ade.png#averageHue=%23fbfbfb&clientId=u69b89388-5a4e-4&from=paste&height=572&id=u9170f012&name=image.png&originHeight=858&originWidth=1001&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65917&status=done&style=shadow&taskId=u6b7ed740-1253-4715-8940-3f4fb4ad0e7&title=&width=667.3333333333334)

本地启动服务后会看到注册的ip地址，可能是在101机器无法访问的，如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1668428424483-a490ff8f-f864-481b-8aff-356b9244d1f3.png#averageHue=%23b7b7b7&clientId=u69b89388-5a4e-4&from=paste&height=347&id=oHcxY&name=image.png&originHeight=521&originWidth=1553&originalType=binary&ratio=1&rotation=0&showTitle=false&size=66331&status=done&style=shadow&taskId=udd5da2c4-5780-423e-8d60-3d5beeb4256&title=&width=1035.3333333333333)
如果出现此情况，需要在配置文件中设置参数指定ip地址，如下：
配置可参考官方文档：[https://www.xuxueli.com/xxl-job/](https://www.xuxueli.com/xxl-job/)
```yaml
xxl:
  job:
    executor:
      ip: 192.168.150.1
```
重新启动，效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27683667/1668428853262-215fb2a7-b58a-43bb-9c8e-640bbd91617e.png#averageHue=%23b7b7b7&clientId=u69b89388-5a4e-4&from=paste&height=335&id=u5ee08bd9&name=image.png&originHeight=502&originWidth=1552&originalType=binary&ratio=1&rotation=0&showTitle=false&size=66011&status=done&style=shadow&taskId=u486b55f1-0019-4db4-9dc7-67f50d7231b&title=&width=1034.6666666666667)
# 7、面试连环问
:::info
面试官问：

- 支付二维码的生成你们是在服务端还是在客户端？为什么不在服务端？在客户端生成有什么好处？
- 用户在选择支付渠道后，可能会反复的切换支付渠道，这块你们是怎么处理的？
- 用户在申请支付后，发现并没有展示出二维码，这时用户可能会不断的重试，你们有考虑这种情况吗？具体是怎么处理的？
- 支付渠道可能是多样的，你们的代码是怎么设计的？如果需要停用某个渠道，但是不重启服务，怎么能做到？
- 支付成功的通知你们是怎处理的？有考虑幂等性吗？如何确保请求是真正来源支付平台的？如果通知没有接收到，你们怎么处理的？
- xxl-job的分片式广播用过吗？他是如何确保任务节点处理不重复数据的？
:::
