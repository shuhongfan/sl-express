/*
 * @Author: zhangyanxin
 * @Date: 2020-03-04
 *
 * 运单管理
 */

import { createAPI } from '@/utils/request'
// 获取运单统计数据
export const waybillStatic = data => createAPI(`/transport-order-manager/count`, 'get', data)
// 获取运单分页数据
export const waybillList = data => createAPI(`/transport-order-manager/page`, 'post', data)
// 获取运单详情数据
export const waybillDetail = data => createAPI(`/transport-order-manager/${data}`, 'get', data)
// 获取订单轨迹参数
export const orderLocusParamsList = data => createAPI(`/orderLocus/${data}`, 'get', data)
// 获取订单轨迹-画线
export const orderLocusList = data => createAPI(`/web-druid/apache-druid/query/selectByList`, 'post', data)
// 获取订单轨迹-打点
export const orderLocusPointList = data => createAPI(`/web-dispatch/orderLocus/point/${data}`, 'get', data)
// 获取调度配置
export const getDispatchConfig = data => createAPI(`/dispatch-configuration-manager`, 'get', data)
// 设置调度配置
export const setDispatchConfig = data => createAPI(`/dispatch-configuration-manager`, 'post', data)
