import {
	request
} from "../../utils/request.js"
// 公告/公告详情/系统通知列表公用接口
export const getNewList = (params) =>
	request({
		url: `/messages/page`,  //3代表快递员端接口
		method: 'get',
		params
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
		url: `/messages/readAll?ids=${params}`,
		method: 'put',
		params
	})
