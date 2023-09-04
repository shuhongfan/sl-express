import {
	request
} from "../../utils/request.js"
// 获取用户信息
export const getUserInfo = (params) =>
	request({
		url: `/user/profile`,
		method: 'get',
		params
	})
// 获取用户实名认证
export const getRealNameStatusApi = (params) =>
	request({
		url: `/user/realNameVerify`,
		method: 'post',
		params
	})
//修改用户信息
export const updateUserInfo = (params) =>
	request({
		url: `/user/profile`,
		method: 'put',
		params
	})
