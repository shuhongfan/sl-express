/*
 * @Author: zhangyanxin
 * @Date: 2020-02-10
 *
 * 转运中心-业务信息管理
 */

import { createAPI } from '@/utils/request'

// 获取统计车辆
export const getCarTypeStatics = data => createAPI(`/count`, 'get', data)
// 获取车辆类型下拉
export const getCarTypeList = data => createAPI(`/truckType/simple`, 'get', data)
// 获取车辆类型分页数据
export const list = data => createAPI(`/truckType/page`, 'get', data)
// 获取车辆详情
export const detail = data => createAPI(`/truckType/${data}`, 'get', data)
// 添加车辆类型
export const add = data => createAPI(`/truckType`, 'post', data)
// 更新车辆类型
export const update = (id, data) => createAPI(`/truckType/${id}`, 'put', data)
// 删除车辆类型
export const del = data => createAPI(`/truckType/${data}`, 'delete', data)
// 根据车辆获取绑定司机
export const getDriverListByCar = data => createAPI(`/bindingDrivers/${data}`, 'get', data)
// 获取司机分页数据
export const driverList = data => createAPI(`/driver/page`, 'get', data)
// 获取未绑定的司机分页数据
export const unBindDriverList = data => createAPI(`/unBindingDrivers/`, 'get', data)
// 获取司机详情
export const driverDetail = data => createAPI(`/driver/${data}`, 'get', data)
// 司机更改车队
export const driverChangeFleet = (id, data) => createAPI(`/web-manager/transfor-center/bussiness/driver/${id}`, 'put', data)
// 更新司机详情-基本信息
export const driverDetailUpdate = (id, data) => createAPI(`/driver/${id}`, 'put', data)
// 获取司机驾驶证信息
export const driverLicenseDetail = data => createAPI(`/driverLicense/${data}`, 'get', data)
// 更新司机驾驶证信息
export const driverLicenseDetailUpdate = data => createAPI(`/driverLicense`, 'post', data)
// 获取司机车辆安排
export const driverTruckList = data => createAPI(`/web-manager/transfor-center/bussiness/driver/${data}/truck`, 'get', data)
// 安排车辆（车次）
export const arrangeCar = data => createAPI(`/transportLine/trips/${data.transportTripsId}/truckDrivers`, 'post', data)
// 安排车辆（司机）
export const driverArrangeCar = data => createAPI(`/driver/truckDrivers`, 'post', data)
// 安排司机（车辆）
export const carArrangeDriver = data => createAPI(`/truck/truckDrivers`, 'post', data)
// 获取车辆分页数据
export const truckList = data => createAPI(`/truck/page`, 'get', data)
// 获取司机配置车辆弹出框中车辆下拉的数据（已停用并且绑定司机数少于两个）
export const getTruckListInDriver = data => createAPI(`/unWorkingTrucks`, 'get', data)
// 添加车辆
export const truckTypeAdd = data => createAPI(`/truck`, 'post', data)
// 获取车辆详情-基本信息
export const truckTypeDetail = data => createAPI(`/truck/${data}`, 'get', data)
// 更新车辆详情-基本信息
export const truckTypeUpdate = (id, data) => createAPI(`/truck/${id}`, 'put', data)
// 获取车辆详情-行驶证信息
export const truckTypeDrivingLicenseDetail = data => createAPI(`/truck/${data}/license`, 'get', data)
// 获取车辆详情-保存行驶证信息
export const truckTypeDrivingLicense = (id, data) => createAPI(`/truck/${id}/license`, 'post', data)
// 获取车辆车系
export const truckTripsList = data => createAPI(`/truck/${data}/transportTrips`, 'get', data)
// 删除车辆
export const truckDel = data => createAPI(`/del/${data}`, 'delete', data)
// 启用车辆
export const truckStatusUse = data => createAPI(`/enable/${data}`, 'PUT', data)
// 停用车辆
export const truckStatusNoUse = data => createAPI(`/disable/${data}`, 'PUT', data)
// 获取线路类型分页数据
export const lineTypeList = data => createAPI(`/web-manager/transfor-center/bussiness/transportLineType/page`, 'get', data)
// 获取线路类型详情
export const lineTypeDetail = data => createAPI(`/web-manager/transfor-center/bussiness/transportLineType/${data}`, 'get', data)
// 更新线路类型
export const lineTypeUpdate = (id, data) => createAPI(`/web-manager/transfor-center/bussiness/transportLineType/${id}`, 'put', data)
// 添加线路类型
export const lineTypeAdd = data => createAPI(`/web-manager/transfor-center/bussiness/transportLineType`, 'post', data)
// 删除线路类型
export const lineTypeDel = data => createAPI(`/web-manager/transfor-center/bussiness/transportLineType/${data}`, 'delete', data)
// 获取线路分页数据
export const lineList = data => createAPI(`/transportLine/page`, 'post', data)
// 添加线路
export const lineAdd = data => createAPI(`/transportLine`, 'post', data)
// 删除线路
export const lineDel = data => createAPI(`/transportLine/${data}`, 'delete', data)
// 获取线路详情
export const lineDetail = data => createAPI(`/transportLine/${data}`, 'get', data)
// 更新线路
export const lineUpdate = (id, data) => createAPI(`/transportLine/${id}`, 'put', data)
// 获取车次下对应的车辆
export const carByTrips = data => createAPI(`/transportLine/trips/truckDrivers`, 'get', data)
// 根据线路id获取车次列表
export const tripsList = data => createAPI(`/transportLine/trips`, 'get', data)
// 添加车次
export const tripsAdd = data => createAPI(`/transportLine/trips`, 'post', data)
// 更新车次
export const tripsUpdate = (id, data) => createAPI(`/transportLine/trips/${id}`, 'put', data)
// 获取车次详情
export const tripsDetail = data => createAPI(`/transportLine/trips/${data}`, 'get', data)
// 删除车次
export const tripsDel = data => createAPI(`/transportLine/trips/${data}`, 'delete', data)
// 车次-安排车辆和司机
export const arrangeTripsTruckDrive = (id, data) => createAPI(`/web-manager/transfor-center/bussiness/transportLine/trips/${id}/truckDriver`, 'post', data)
// 车辆位置
export const truckPlace = data => createAPI(`/web-druid/apache-druid/query/select`, 'get', data)
// 车辆位置详情
export const truckPlaceInfo = data => createAPI(`/web-manager/transfor-center/truck-place-info/${data}`, 'get', data)

// 获取运费模板列表
export const freightManageList = data => createAPI(`/carriages`, 'get', data)

// 新增修改运费模板
export const freightManageOperate = data => createAPI(`/carriages`, 'post', data)

// 删除运费模板
export const freightManageDelete = data => createAPI(`/carriages/${data}`, 'delete', data)

// 新增工作模式
export const addWorkHistory = data => createAPI(`/work-patterns`, 'post', data)

// 修改工作模式
export const updateWorkHistory = data => createAPI(`/work-patterns`, 'put', data)

// 工作模式列表（带分页）
export const workHistoryList = data => createAPI(`/work-patterns/page`, 'get', data)

// 工作模式列表（下拉）
export const selectWorkHistoryList = data => createAPI(`/work-patterns/all`, 'get', data)

// 查看工作模式详情
export const workHistoryInfo = data => createAPI(`/work-patterns/${data}`, 'get', data)

// 删除工作模式
export const deleteWorkHistory = data => createAPI(`/work-patterns/${data}`, 'delete', data)

// 排班管理列表
export const workManage = data => createAPI(`/work-schedulings`, 'get', data)

// 人工调整排班
export const peopleSet = data => createAPI(`/work-schedulings`, 'put', data)

// 下载排班管理模板
export const downLoadFile = data => createAPI(`/work-schedulings/downExcelTemplate`, 'get', data, 'blob')

// 批量上传排班管理
export const batchUpload = data => createAPI(`/work-schedulings/uploadExcel`, 'post', data)

// 图片上传
export const imgUpload = data => createAPI(`/files/imageUpload`, 'post', data)

// 查询成本配置
export const getCostSetting = data => createAPI(`/cost-configuration-manager`, 'get', data)

// 设置成本
export const setCostSetting = data => createAPI(`/cost-configuration-manager`, 'post', data)
