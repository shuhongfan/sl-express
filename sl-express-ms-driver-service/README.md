# sl-express-ms-driver使用手册
## 1.说明
**该模块为司机相关微服务，主要提供司机作业单的操作和司机提货、交付、回车登记等动作。**<br />主要功能：

- 司机作业单的复杂查询、统计
- 司机作业单的增、删、改操作
- 司机提货、交付、回车登记、延迟提货的动作逻辑

## 2.使用
### 2.1导入依赖
如需使用司机作业单相关的服务功能，需要引入司机微服务api
```xml
<dependency>
    <groupId>com.sl-express.ms.driver</groupId>
    <artifactId>sl-express-ms-driver-api</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

### 2.2feign方法
```java
@FeignClient(value = "sl-express-ms-driver", contextId = "DriverJob", path = "driver-job")
public interface DriverJobFeign {

    /**
     * 更新司机作业状态，不允许 PENDING 状态，PROCESSING：出库业务，COMPLETED：入库业务
     *
     * @param id     司机作业单id
     * @param status 司机任务状态
     * @return 是否成功
     */
    @PutMapping
    boolean updateStatus(@RequestParam("id") Long id, @RequestParam("status") DriverJobStatus status);

    /**
     * 获取司机作业单分页数据
     *
     * @param page            页码
     * @param pageSize        页尺寸
     * @param id              司机作业单id
     * @param driverId        司机id
     * @param status          作业状态
     * @param transportTaskId 运输任务id
     * @return 作业单数据
     */
    @GetMapping("page")
    PageResponse<DriverJobDTO> findByPage(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                          @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
                                          @RequestParam(value = "id", required = false) Long id,
                                          @RequestParam(value = "driverId", required = false) Long driverId,
                                          @RequestParam(value = "status", required = false) DriverJobStatus status,
                                          @RequestParam(value = "transportTaskId", required = false) Long transportTaskId);

    /**
     * 根据id获取司机作业单信息
     *
     * @param id 司机作业单id
     * @return 司机作业单信息
     */
    @GetMapping("{id}")
    DriverJobDTO findById(@PathVariable("id") Long id);

    /**
     * 根据运输任务删除司机作业单
     *
     * @param transportTaskId 运输任务id
     * @return 是否成功
     */
    @PutMapping("removeByTransportTaskId/{transportTaskId}")
    boolean removeByTransportTaskId(@PathVariable("transportTaskId") Long transportTaskId);

    /**
     * 根据运输任务生成司机作业单
     *
     * @param transportTaskId 运输任务id
     * @param driverId        司机id
     * @return 司机作业单id
     */
    @PostMapping("createDriverJob/{transportTaskId}/{driverId}")
    Long createDriverJob(@PathVariable("transportTaskId") Long transportTaskId, @PathVariable("driverId") Long driverId);

    /**
     * 司机入库，修改运单的当前节点和下个节点 以及 修改运单为待调度状态，结束运输任务
     *
     * @param driverDeliverDTO 司机作业单id
     */
    @PostMapping("intoStorage")
    void intoStorage(@RequestBody DriverDeliverDTO driverDeliverDTO);

    /**
     * 司机出库，修改运单为运输中状态，开始运输任务
     *
     * @param driverPickUpDTO 提货对象
     */
    @PostMapping("outStorage")
    void outStorage(@RequestBody DriverPickUpDTO driverPickUpDTO);

    /**
     * 条件分页查询
     *
     * @param driverJobConditionPageDTO 查询条件
     * @return 司机作业单分页结果
     */
    @PostMapping("conditionPage")
    PageResponse<DriverJobDTO> conditionQueryByPage(@RequestBody DriverJobConditionPageDTO driverJobConditionPageDTO);

    /**
     * 延迟提货,延迟时间以提货时间往后推最多不超过2小时
     *
     * @param driverDelayDeliveryDTO 运输任务延时对象
     */
    @PutMapping("delayDelivery")
    void delayedDelivery(@RequestBody DriverDelayDeliveryDTO driverDelayDeliveryDTO);

    /**
     * 回车登记
     *
     * @param driverReturnRegisterDTO 回车登记对象
     */
    @PostMapping("returnRegister")
    void returnRegister(@RequestBody DriverReturnRegisterDTO driverReturnRegisterDTO);

    /**
     * 司机作业单月度统计
     *
     * @param driverId 司机id
     * @param month    月份
     * @return 统计数据
     */
    @GetMapping("jobMonthlyStatistics/{driverId}/{month}")
    DriverJobStatisticsDTO jobMonthlyStatistics(@PathVariable("driverId") String driverId, @PathVariable("month") String month);
}
```

### 2.3司机出库接口

**接口地址**:`/driver-job/outStorage`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**接口描述**:<p>司机出库，修改运单为运输中状态，开始运输任务</p>



**请求示例**:


```javascript
{
  "cargoPickUpPicture": "",
  "cargoPicture": "",
  "id": ""
}
```

**请求参数**:


| 参数名称                           | 参数说明              | 请求类型 | 是否必须   | 数据类型 |
|--------------------------------|-------------------|------|--------|------|
| driverPickUpDTO                | driverPickUpDTO   | body | true   | 提货对象 |
| &emsp;&emsp;cargoPickUpPicture | 提货凭证,多个图片url以逗号分隔 || true | string |
| &emsp;&emsp;cargoPicture       | 货物照片,多个图片url以逗号分隔 || true | string |
| &emsp;&emsp;id                 | 司机作业id            || true | string |


### 2.4司机入库接口

**接口地址**:`/driver-job/intoStorage`


**请求方式**:`POST`

**请求数据类型**:`application/json`

**接口描述**:<p>司机入库，修改运单的当前节点和下个节点 以及 修改运单为待调度状态，结束运输任务</p>



**请求示例**:


```javascript
{
  "deliverPicture": "",
  "id": "",
  "transportCertificate": ""
}
```

**请求参数**:


| 参数名称                             | 参数说明              | 请求类型 | 是否必须   | 数据类型   |
|----------------------------------|-------------------|------|--------|--------|
| driverDeliverDTO                 | driverDeliverDTO  | body | true   | 司机交付对象 |
| &emsp;&emsp;deliverPicture       | 交付图片,多个图片url以逗号分隔 || true | string |
| &emsp;&emsp;id                   | 司机作业id            || true | string |
| &emsp;&emsp;transportCertificate | 交付凭证,多个图片url以逗号分隔 || true | string |

### 2.5回车登记接口

**接口地址**:`/driver-job/returnRegister`

**请求方式**:`POST`

**请求数据类型**:`application/json`

**接口描述**:<p>回车登记,并设置下一次车辆计划</p>

**请求示例**:

```javascript
{
  "accidentDescription": "",
  "accidentImages": "",
  "accidentType": "",
  "breakRulesDescription": "",
  "breakRulesType": "",
  "deductPoints": 0,
  "faultDescription": "",
  "faultImages": "",
  "faultType": "",
  "id": "",
  "intoStorageTime": "2022-07-18 17:00:00",
  "isAccident": true,
  "isAvailable": true,
  "isBreakRules": true,
  "isFault": true,
  "outStorageTime": "2022-07-18 17:00:00",
  "penaltyAmount": 0
}
```

**请求参数**:


| 参数名称                              | 参数说明                                                                | 请求类型  | 是否必须           | 数据类型                    |
|-----------------------------------|---------------------------------------------------------------------|-------|----------------|-------------------------|
| driverReturnRegisterDTO           | driverReturnRegisterDTO                                             | body  | true           | DriverReturnRegisterDTO |
| &emsp;&emsp;accidentDescription   | 事故说明，类型为“其他”时填写                                                     || false | string         |
| &emsp;&emsp;accidentImages        | 事故图片                                                                || false | string         |
| &emsp;&emsp;accidentType          | 事故类型，1-直行事故，2-追尾事故，3-超车事故，4-左转弯事故，5-右转弯事故，6-弯道事故，7-坡道事故，8-会车事故，9-其他 || false | string         |
| &emsp;&emsp;breakRulesDescription | 违章说明，类型为“其他”时填写                                                     || false | string         |
| &emsp;&emsp;breakRulesType        | 违章类型，1-闯红灯，2-无证驾驶，3-超载，4-酒后驾驶，5-超速行驶，6-其他                           || false | string         |
| &emsp;&emsp;deductPoints          | 扣分数据                                                                || false | integer(int32) |
| &emsp;&emsp;faultDescription      | 故障说明，类型为“其他”时填写                                                     || false | string         |
| &emsp;&emsp;faultImages           | 故障图片                                                                || false | string         |
| &emsp;&emsp;faultType             | 故障类型，1-发动机启动困难，2-不着车，3-漏油，4-漏水，5-照明失灵，6-有异响，7-排烟异常，8-温度异常，9-其他      || false | string         |
| &emsp;&emsp;id                    | 运输任务id                                                              || true  | string         |
| &emsp;&emsp;intoStorageTime       | 回车时间                                                                || true  | string         |
| &emsp;&emsp;isAccident            | 是否出现事故                                                              || true  | boolean        |
| &emsp;&emsp;isAvailable           | 车辆是否可用                                                              || false | boolean        |
| &emsp;&emsp;isBreakRules          | 车辆是否违章                                                              || true  | boolean        |
| &emsp;&emsp;isFault               | 车辆是否故障                                                              || true  | boolean        |
| &emsp;&emsp;outStorageTime        | 出车时间                                                                || true  | string         |
| &emsp;&emsp;penaltyAmount         | 罚款金额                                                                || false | number         |


## 3.服务架构
### 3.1司机出库业务流程图
![司机出库业务流程图](../../docs/zh-cn/assets/司机出库业务流程图.png)

### 3.2司机入库业务流程图
![司机入库业务流程图](../../docs/zh-cn/assets/司机入库业务流程图.png)

### 3.3回车登记业务流程图
![回车登记业务流程图](../../docs/zh-cn/assets/回车登记业务流程图.png)






