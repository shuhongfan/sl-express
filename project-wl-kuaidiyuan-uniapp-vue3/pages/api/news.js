import {
	request
} from "../../utils/request.js"
// 公告/公告详情/系统通知列表公用接口
export const getNewList = (type) =>
	request({
		url: `/messages/list?bussinessType=3&contentType=${type}`,  //3代表快递员端接口
		method: 'get'
	})
// 取件、派件、签收、取消列表接口
export const getMessagesList = (params) =>
	request({
		url: `/messages/page`,
		method: 'get',
		params
	})
// 获取系统通知
export const getNotice = (params) =>
	request({
		url: '/messages/notice/new/get',
		method: 'get',
		params
	})
// 获取公告详情
export const getDetail= (id) =>
	request({
		url: `messages/bulletins/get/${id}`,
		method: 'get'
	})
// 标记已读
export const msgRead= (id) =>
	request({
		url: `/messages/${id}`,
		method: 'put'
	})
// 全部已读
export const msgAllRead= (params) =>
	request({
		url: `/messages/readAll/${params}`,
		method: 'put',
		params
	})
