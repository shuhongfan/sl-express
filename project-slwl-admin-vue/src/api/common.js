/*
 * @Author: zhangyanxin
 * @Date: 2020-02-19
 *
 * 公共信息接口
 */

import { createAPI } from '@/utils/request'

// 获取线路类型数据
export const lineTypeCommonList = data => createAPI(`/web-manager/common/transportLineType/simple`, 'get', data)
// 获取车辆类型数据
export const truckTypeCommonList = data => createAPI(`/truckType/simple`, 'get', data)
// 获取负责人数据
export const principalCommonList = data => createAPI(`/common/user/simple`, 'get', data)
// 获取车队数据
export const fleetCommonList = data => createAPI(`/web-manager/common/fleet/simple`, 'get', data)
// 获取货物类型数据
export const goodsTypeCommonList = data => createAPI(`/goodsType/simple`, 'get', data)
// 获取行政区域简要信息列表
export const areaList = data => createAPI(`/areas/children`, 'get', data)

// 登录成功后的回调，记录登录日志，最后登录时间等
export const dictionaryEnums = data => createAPI(`/gate/dictionary/enums`, 'get', data)
// 获取工作台数据
export const dashboardData = data => createAPI(`/workspace`, 'get', data)
