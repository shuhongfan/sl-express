/*
 * @Author: zhangyanxin
 * @Date: 2020-02-10
 *
 * 网点管理
 */

import { createAPI } from '@/utils/request'

// 获取货物类型分页数据
export const goodsTypeList = data => createAPI(`/goodsType/page`, 'get', data)
// 添加货物类型数据
export const goodsTypeAdd = data => createAPI(`/goodsType`, 'post', data)
// 删除货物类型
export const goodsTypeDel = data => createAPI(`/goodsType/${data}`, 'delete', data)
// 获取货物类型详情数据
export const goodsTypeDetail = data => createAPI(`/goodsType/${data}`, 'get', data)
// 更新货物类型数据
export const goodsTypeUpdate = (id, data) => createAPI(`/goodsType/${id}`, 'put', data)
// 获取快递员分页数据
export const courierList = data => createAPI(`/business-hall/courier/page`, 'get', data)
// 获取快递员详情
export const courierDetail = data => createAPI(`/business-hall/courier/${data}`, 'get', data)
// 获取快递员/机构作业范围,type(1:机构,2:快递员)
export const courierScopeList = (data, type) => createAPI(`/business-hall/scope/${data}/${type}`, 'get', data)
// 保存机构范围/快递员详情
export const courierAdd = data => createAPI(`/business-hall/scope`, 'post', data)
// 取、派件任务分页查询接口
export const pickupTaskList = data => createAPI(`/pickup-dispatch-task-manager/page`, 'post', data)
// 更新取派件任务
export const pickupTaskUpdate = (id, courierId, data) => createAPI(`/pickup-dispatch-task-manager/${id}/${courierId}`, 'put', data)

// 删除快递员作业范围接口
export const deleteCourierScope = (id, type) => createAPI(`/business-hall/scope/${id}/${type}`, 'delete')

// 回车登记列表接口
export const carRegisterList = data => createAPI(`/truck-return-register/pageQuery`, 'post', data)

// 回车登记详情接口
export const carRegisterInfo = data => createAPI(`/truck-return-register/detail/${data}`, 'get', data)

// 给快递员分配作业
export const dispatchTaskForCourier = data => createAPI(`/pickup-dispatch-task-manager/${data.courierId}`, 'put', data.ids)
