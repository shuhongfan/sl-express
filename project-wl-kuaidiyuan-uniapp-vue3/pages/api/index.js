import {
	request
} from "../../utils/request.js"

// 获取相关消息
export const getHomeInfo = (params) =>
	request({
		url: '/messages/home/get',
		method: 'get',
		params
	})
// 获取首页相关任务、取件、派件、今日已取、已签
export const getHomeData = () =>
	request({
		url: '/tasks/taskStatistics',
		method: 'get'
	})
// 获取首页取件派件列表
export const getExpressage = (params) =>
	request({
		url: `/tasks/${params.type}/${params.state}`,
		method: 'get',
		params
	})
// 取件派件分页列表
export const getDeliveryList = (params) =>
	request({
		url: '/tasks/page',
		method: 'get',
		params
	})
// 转单
export const transferBatch = (params) =>
	request({
		url: '/tasks/transfer/batch',
		method: 'post',
		params
	})
// 删除任务
export const taskDelete = (id) =>
	request({
		url: `/tasks/${id}`,
		method: 'delete'
	})
// 批量删除
export const taskBatchDelete = (params) =>
	request({
		url: `/tasks/batch`,
		method: 'delete',
		params
	})
// 取件、派件取消
export const taskCancel = (params) =>
	request({
		url: `/tasks/cancel`,
		method: 'post',
		params
	})
// 获取任务详情
export const getDetail = (id) =>
	request({
		url: `/tasks/get/${id}`,
		method: 'get'
	})
// 身份证号验证
export const idCardCheck = (params) =>
	request({
		url: `/tasks/idCard/check`,
		method: 'post',
		params
	})
// 去取件
export const getPickup = (params) =>
	request({
		url: `/tasks/pickup`,
		method: 'put',
		params
	})
// 获取快递员列表
export const getSameAgency = (params) =>
	request({
		url: `/users/sameAgency`,
		method: 'get',
		params
	})
// 拒收
export const rejection = (id) =>
	request({
		url: `/tasks/reject/${id}`,
		method: 'put'
	})
// 签收
export const tasksSign = (params) =>
	request({
		url: `/tasks/sign`,
		method: 'put',
		params
	})
// 获取支付二维码
export const getQrCode = (params) =>
	request({
		url: `/pays/qrCode/get`,
		method: 'post',
		params
	})
// 是否支付成功
export const paySucceed = (id) =>
	request({
		url: `/pays/status/${id}`,
		method: 'get'
	})
// 获取运单轨迹
export const getTracks = (id) =>
	request({
		url: `/tasks/tracks/${id}`,
		method: 'get'
	})
// 搜索、首页、取件、派件
export const getSearch = (params) =>
	request({
		url: `/tasks/search`,
		method: 'post',
		params
	})
// 最近查找
export const getRecentSearch = () =>
	request({
		url: `/tasks/recentSearch`,
		method: 'get'
	})
// 标记为最近查找
export const setMarkRecent = (transportOrderId) =>
	request({
		url: `/tasks/markRecent/${transportOrderId}`,
		method: 'get'
	})
// 清空最近查找
export const clearRecentSearch = () =>
	request({
		url: `/tasks/recentSearch`,
		method: 'delete'
	})
// 上报位置	
export const PositionUpload = (params) =>
	request({
		url: `/track/upload`,
		method: 'put',
		data:params,
		params
	})
