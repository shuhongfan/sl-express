# sl-express-ms-courier使用手册

## 1.说明

**该模块为快递员相关微服务，主要提供根据经纬度查询范围内快递员的服务。**<br />主要功能：

- 条件查询快递员列表（结束取件时间当天快递员有排班）

## 2.使用

### 2.1导入依赖

如需使用快递员相关的服务功能，需要引入快递员微服务api

```xml
<dependency>
    <groupId>com.sl-express.ms.courier</groupId>
    <artifactId>sl-express-ms-courier-api</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

### 2.2feign方法

```java
@FeignClient(name = "sl-express-ms-courier", contextId = "courier", path = "couriers")
@ApiIgnore
public interface CourierFeign {

    /**
     * 条件查询快递员列表（结束取件时间当天快递员有排班）
     * 如果服务范围内无快递员，或满足服务范围的快递员无排班，则返回该网点所有满足排班的快递员
     *
     * @param agencyId         网点id
     * @param longitude        用户地址的经度
     * @param latitude         用户地址的纬度
     * @param estimatedEndTime 结束取件时间
     * @return 快递员id列表
     */
    @GetMapping("{agencyId}/{longitude}/{latitude}")
    List<Long> queryCourierIdListByCondition(@PathVariable("agencyId") Long agencyId,
                                             @PathVariable("longitude") Double longitude,
                                             @PathVariable("latitude") Double latitude,
                                             @RequestParam("estimatedEndTime") Long estimatedEndTime);
}
```

### 2.3条件查询快递员接口

**接口地址**:`/couriers/{agencyId}/{longitude}/{latitude}`

**请求方式**:`GET`

**请求参数**:

| 参数名称             | 参数说明   | 请求类型  | 是否必须 | 数据类型           |
|------------------|--------|-------|------|----------------|
| agencyId         | 网点id   | path  | true | integer(int64) |
| estimatedEndTime | 结束取件时间 | query | true | integer(int64) |
| latitude         | 纬度     | path  | true | number(double) |
| longitude        | 经度     | path  | true | number(double) |

## 3.服务架构

### 3.1条件查询快递员流程图

![条件查询快递员流程图](../../docs/zh-cn/assets/条件查询快递员列表流程图.png)
