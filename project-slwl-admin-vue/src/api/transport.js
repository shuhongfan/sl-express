/*
 * @Author: zhangyanxin
 * @Date: 2020-02-20
 *
 * 运输任务管理
 */

import { createAPI } from '@/utils/request'

// 分页查询运输任务接口
export const transportList = data => createAPI(`/transport-task-manager/page`, 'post', data)
// 获取运输任务统计接口
export const transportListCount = data => createAPI(`/transport-task-manager/count`, 'get', data)
// 分页查询司机单作业单接口
export const driverJobList = data => createAPI(`/web-manager/driver-job-manager/page`, 'post', data)
// 获取运输任务详情接口
export const transportJobDetail = data => createAPI(`/transport-task-manager/${data}`, 'get', data)
// 获取运输任务轨迹-画线
export const transportLocus = data => createAPI(`/apache-druid/query/selectOne`, 'get', data)
// 获取运输任务轨迹-途径点
export const transportPoint = data => createAPI(`/web-manager/transport-task-manager/point/${data}`, 'get', data)

// 空车取消运输任务
export const cancelTransportTask = data => createAPI(`/transport-task-manager/cancel/${data}`, 'put')
// 运输任务分配车辆
export const dispatchTransportTask = data => createAPI(`/transport-task-manager/adjust/${data.id}`, 'put', data)
// 获取已启用并且未绑定过车次的车辆
export const getUseCarSuccess = data => createAPI(`/workingTrucks`, 'get', data)

