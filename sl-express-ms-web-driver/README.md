# sl-express-ms-web-driver使用手册
## 1.说明
**该模块为司机端web微服务，主要提供司机端APP各项服务。**<br />主要功能：

- 司机账号登录
- 用户个人信息、绑定车辆信息、任务数据（任务数量、里程统计）
- 司机任务查询、延迟提货、提货、交付、回车登记、联系调度中心
- 公告、系统通知的消息通知

## 2.服务配置
### 2.1配置信息
- 服务需要接入权限系统，所以需要配置权限系统应用id
- 司机取消任务需要联系调度员，所以需要配置调度员角色id
- 司机提货、交付、回车登记需要上传图片，所以需要配置阿里云oss

```properties
#权限系统应用id
authority.applicationId = 981194468570960001

#角色id
role.manager = 986227712144197857,989278284569131905,996045142395786081,996045927523359809
role.driver = 989559028277315009
role.courier = 989559057641637825
role.dispatcher = 996045927523359809

#阿里云OSS
#yourEndpoint填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为 oss-cn-hangzhou.aliyuncs.com。
spring.alioss.endpoint = yourEndpoint
#阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
spring.alioss.accessKeyId = yourAccessKeyId
spring.alioss.accessKeySecret = yourAccessKeySecret
# 自定义的存储bucket名称
spring.alioss.bucketName = yjy-slwl-oss
```

### 2.2依赖引入

| 依赖服务                        | 版本           | 参考文档                                               |
|-----------------------------|--------------|----------------------------------------------------|
| sl-express-common           | 1.1-SNAPSHOT | [sl-express-common](/zh-cn/new-function.md)        |
| sl-express-ms-base-api      | 1.0-SNAPSHOT | [基础微服务](/zh-cn/modules/sl-express-ms-base.md)      |
| sl-express-ms-work-api      | 1.0-SNAPSHOT | [work微服务](/zh-cn/modules/sl-express-ms-work.md)    |
| sl-express-ms-transport-api | 1.0-SNAPSHOT | [运输微服务](/zh-cn/modules/sl-express-ms-transport.md) |
| sl-express-ms-driver-api    | 1.0-SNAPSHOT | [司机微服务](/zh-cn/modules/sl-express-ms-driver.md)    |

## 3.技术方案
阿里云OSS：
[阿里云OSS-SDK示例](https://help.aliyun.com/document_detail/84781.htm?spm=a2c4g.11186623.0.0.56636ac1wg2W0I#t22269.html)

## 4.使用
概述：司机的每个任务要经过三个阶段：`提货-->交付-->回车登记`，只有三个阶段完全完成才可以进行下一个任务。

### 4.1待提货说明
1. 司机只有不存在在途或者已交付任务时才可以提货
2. 司机有且只能有一个任务可以提货，而且最早提货时间的任务
3. 提货时必须上传回单凭证和货品图片

### 4.2交付说明
1. 交付任务任何时候最多只有一个
2. 交付时必须上传回单凭证和货品图片

### 4.3回车登记说明
1. 任务交付完成之后还必须进行回车登记，否则无法开启下一个任务
2. 回车登记必须填写是否违章、是否故障、是否事故信息
3. 回车登记默认车辆是可用状态，如果车辆不可用，`是否可用`选项必选`是`
