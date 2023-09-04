/*
 * @Author: zhangyanxin
 * @Date: 2020-03-03
 *
 * 货品管理
 */

import { createAPI } from '@/utils/request'

// 获取货物分页数据
export const carGoList = data => createAPI(`/order-manager/cargo`, 'get', data)
// 添加货物分页数据
export const carGoAdd = data => createAPI(`/order-manager/cargo`, 'post', data)
// 删除货物
export const carGoDel = data => createAPI(`/order-manager/cargo/${data}`, 'delete', data)

// 编辑货物
export const carGoEdit = (data, id) => createAPI(`/order-manager/cargo/${id}`, 'put', data)
