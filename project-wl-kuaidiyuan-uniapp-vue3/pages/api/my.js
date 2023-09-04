import {
	request
} from "../../utils/request.js"
// 作业范围
export const getUserScope = (params) =>
	request({
		url: `/users/scope`,
		method: 'get',
		params
	})
