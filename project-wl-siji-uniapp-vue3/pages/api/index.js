import {
	request,
	requestUpload
} from "../../utils/request.js"

/**
 * 
 * 任务的相关接口
 */

// 获取任务列表（包含待提货、在途、已完成）
export const GetTasksList = (params) =>
	request({
		url: '/tasks/list',
		method: 'get',
		params
	})
	
// 获取任务详情
export const GetTaskDetails = (jobId) =>
	request({
		url: `/tasks/details/${jobId}`,
		method: 'get',
	})
	
// 获取任务详情 - 订单
export const GetTaskDetailsOrders = (params) =>
	request({
		url: `/tasks/orders`,
		method: 'get',
		params
	})

// 延迟提货 - 提交
export const PutDelay = (params) =>
	request({
		url: `/tasks/delay`,
		method: 'put',
		params
	})
// 联系调度中心电话
export const GetPhone = () =>
	request({
		url: `/tasks/dispatchCenterPhone`,
		method: 'get',

	})	
// 提货
export const TakeDelivery = (params) =>
	request({
		url: `/tasks/takeDelivery`,
		method: 'post',
		params
	})	

// 上报异常
export const Exception = (params) =>
	request({
		url: `/tasks/exception`,
		method: 'post',
		params
	})		
// 异常详情
export const ExceptionDetails = (id) =>
	request({
		url: `/tasks/exception/${id}`,
		method: 'get',
	})	
// 回车等级
export const TruckRegistration = (params) =>
	request({
		url: `/tasks/truckRegistration`,
		method: 'post',
		params
	})
// 交付	
export const Deliver = (params) =>
	request({
		url: `/tasks/deliver`,
		method: 'post',
		params
	})
	
// 图片上传
export const upload = (params) =>
	requestUpload({
		url: `/files/imageUpload`,
		method: 'post',
		data:params,
		params
	})
	
// 上报位置	
export const PositionUpload = (params) =>
	request({
		url: `/track/upload`,
		method: 'put',
		data:params,
		params
	})