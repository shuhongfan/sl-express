import {
	request
} from "../../utils/request.js"

// 手机号登录
export const login = (params) =>
	request({
		url: `/user/login`,
		method: 'post',
		params
	})
// 刷新token
export const resetToken = (params) =>
	request({
		url: `/user/refresh`,
		method: 'post',
		params
	})
