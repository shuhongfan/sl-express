/*
 * @Author: zhangyanxin
 * @Date: 2020-02-04
 *
 * 机构管理
 */

import { createAPI } from '@/utils/request'

// 获取树状机构信息
export const agencyList = data => createAPI(`/business-hall/tree`, 'get', data)
// 获取组织机构详情
export const detail = data => createAPI(`/business-hall/${data}`, 'get', data)
// 获取组织机构下的员工分页数据
export const getuserByAgency = data => createAPI(`/business-hall/user/page`, 'get', data)

// 添加机构
export const add = data => createAPI(`/web-manager/agency`, 'post', data)
// 更新机构
export const update = (data) => createAPI(`/business-hall`, 'post', data)
// 删除机构
export const deleteAgency = data => createAPI(`/web-manager/agency/${data}/disable`, 'put', data)
// 获取机构业务范围
export const agencyScopelist = data => createAPI(`/web-manager/agency/${data}/scope`, 'get', data)
// 保存机构业务范围
export const addAgencyScope = data => createAPI(`/web-manager/agency/scope`, 'post', data)
// 获取机员工信息
export const agencyUserList = data => createAPI(`/web-manager/agency/user/page`, 'get', data)
// 获取机员工详情
export const agencyUserDetail = data => createAPI(`/web-manager/agency/user/${data}`, 'get', data)
// 添加机构员工
export const agencyAdduser = data => createAPI(`/web-manager/agency/user`, 'post', data)
// 更新机构员工
export const updateAgencyUser = (id, data) => createAPI(`/web-manager/agency/user/${id}`, 'put', data)
// 删除机构-员工
export const delAgencyUser = data => createAPI(`/web-manager/agency/user/${data}`, 'delete', data)
// 启用/禁用机构-员工
export const forbiddenUser = (id, data) => createAPI(`/web-manager/agency/user/${id}/usability`, 'put', data)
// 获取角色分页数据
export const agencyRolelist = data => createAPI(`/web-manager/agency/role`, 'get', data)
// 添加角色
export const agencyRoleAdd = data => createAPI(`/web-manager/agency/role`, 'post', data)
// 获取角色详情
export const roleDetail = data => createAPI(`/web-manager/agency/role/${data}`, 'get', data)
// 更新角色详情
export const updateRole = (id, data) => createAPI(`/web-manager/agency/role/${id}`, 'put', data)
// 删除角色
export const delRole = data => createAPI(`/web-manager/agency/role/${data}`, 'delete', data)

// 保存机构业务范围
export const addMapScope = data => createAPI(`/agency/scope`, 'post', data)

// 获取作业范围分配
export const getMapScope = data => createAPI(`/business-hall/courier/scope/${data}`, 'get', data)
