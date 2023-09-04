# sl-express-ms-web-courier使用手册

## 1.说明

**该模块为快递员端web微服务，主要提供快递员端APP各项服务。**<br />主要功能：

- 快递员账号登录
- 用户个人信息、服务范围、查询同网点其他快递员
- 快递员任务查询、数据统计
- 快递员修改订单运费、用户身份验证
- 快递员取件、转单、签收、拒收、取消任务
- 快递运单跟踪
- 订单支付、获取支付状态
- 公告、取件、签收、取消的消息通知

## 2.服务配置

### 2.1配置信息

- 服务需要接入权限系统，所以需要配置权限系统应用id
- 快递员取件时，如果寄件人未实名认证，需进行身份校验，所以配置实名认证工具
- 快递员取件时，支持寄件人扫码付款，所以配置微信/支付宝商户号

>实名认证技术：https://market.aliyun.com/products/57000002/cmapi026109.html?spm=5176.2020520132.101.1.7c7772181uNceG#sku=yuncode2010900004

```properties
#权限系统应用id
authority.applicationId=981194468570960001
#实名认证（默认关闭）
real-name-registration.enable=false
spring.eidverify.url=https://eid.shumaidata.com/eid/check
spring.eidverify.appCode=你的AppCode
#微信 神领物流商户号
sl.wechat.enterpriseId=1561414331
#支付宝 神领物流商户号
sl.ali.enterpriseId=2088241317544335
```

### 2.2依赖引入

| 依赖服务                             | 版本           | 参考文档                                                                |
|----------------------------------|--------------|---------------------------------------------------------------------|
| sl-express-common                | 1.1-SNAPSHOT | [sl-express-common](/zh-cn/new-function.md)                         |
| sl-express-ms-base-api           | 1.0-SNAPSHOT | [基础微服务](/zh-cn/modules/sl-express-ms-base.md)                       |
| sl-express-ms-work-api           | 1.0-SNAPSHOT | [work微服务](/zh-cn/modules/sl-express-ms-work.md)                     |
| sl-express-ms-oms-api            | 1.0-SNAPSHOT | [订单微服务](/zh-cn/modules/sl-express-ms-oms.md)                        |
| sl-express-ms-user-api           | 1.0-SNAPSHOT | [用户微服务](/zh-cn/modules/sl-express-ms-user.md)                       |
| sl-express-ms-carriage-api       | 1.0-SNAPSHOT | [运费微服务](/zh-cn/modules/sl-express-ms-carriage.md)                   |
| sl-express-ms-courier-api        | 1.0-SNAPSHOT | [快递员微服务](/zh-cn/modules/sl-express-ms-courier.md)                   |
| sl-express-ms-service-scope-api  | 1.0-SNAPSHOT | [service-scope微服务](/zh-cn/modules/sl-express-ms-service-scope.md)   |
| sl-express-ms-transport-info-api | 1.0-SNAPSHOT | [transport-info微服务](/zh-cn/modules/sl-express-ms-transport-info.md) |
| sl-express-ms-trade-api          | 1.0-SNAPSHOT | [trade微服务](/zh-cn/modules/sl-express-ms-trade.md)                   |

## 3.服务架构

### 3.1取件业务流程

![取件业务流程](../../docs/zh-cn/assets/取件业务流程.png)

### 3.2签收业务流程

![签收业务流程](../../docs/zh-cn/assets/签收业务流程.png)

### 3.3拒单业务流程

![拒单业务流程](../../docs/zh-cn/assets/拒单业务流程.png)

### 3.4取消任务流程

![取消任务流程](../../docs/zh-cn/assets/取消任务流程.png)



