import {
	request
} from "../../utils/request.js"

// 手机号登录
export const phoneLogins = (params) =>
	request({
		url: `/logins/phone`,
		method: 'post',
		params
	})
// 账号登录
export const userLogins = (params) =>
	request({
		url: `/login/account`,
		method: 'post',
		params
	})
// 发送短信验证码
export const getsmsCode = (params) =>
	request({
		url: `/verifyCodes/smsCode`,
		method: 'post',
		params
	})
// 获取用户信息
export const getUserInfo = (params) =>
	request({
		url: `/users/get`,
		method: 'get',
		params
	})