import {
	request
} from "../../utils/request.js"

// 手机号登录
export const phoneLogins = (params) =>
	request({
		url: `/login/phone`,
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
		url: `/users/sendCode`,
		method: 'post',
		params
	})
// 验证码效验
export const checksmsCode = (params) =>
	request({
		url: `/users/verifyCode`,
		method: 'post',
		params
	})	
// 绑定手机号
export const bindPhone = (params) =>
	request({
		url: `/users/editPhone`,
		method: 'put',
		params
	})	
// 修改密码
export const changePass = (params) =>
	request({
		url: `/users/editPassword`,
		method: 'put',
		params
	})		
// 获取用户信息
export const getUserInfo = (params) =>
	request({
		url: `/users`,
		method: 'get',
		params
	})
	
// 我的相关接口研发
// 车辆信息	
export const getCarInfo = (params) =>
	request({
		url: `/users/truck`,
		method: 'get',
		params
	})
// 任务数据
export const getTaskData = (params) =>
	request({
		url: `/users/taskReport`,
		method: 'get',
		params
	})
// 修改手机号			
export const uptPhone = (params) =>
	request({
		url: `/users/editPhone`,
		method: 'put',
		params
	})
// 修改密码					
export const uptPassword = (params) =>
	request({
		url: `/users/editPassword`,
		method: 'put',
		params
	})					
		