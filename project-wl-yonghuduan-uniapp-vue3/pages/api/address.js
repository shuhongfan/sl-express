import {
	request
} from "../../utils/request.js"

//地址簿列表
export const getAddressList = (params) =>
	request({
		url: `/address/page`,
		method: 'get',
		params
	})

//查询地址详情
export const getAddressInfoDetail = (params) =>
	request({
		url: `/address/detail/` + params,
		method: 'get',
		params
	})

//新建地址簿
export const addAddress = (params) =>
	request({
		url: `/address`,
		method: 'post',
		params
	})

//修改地址簿
export const editAddress = (params) =>
	request({
		url: `/address`,
		method: 'put',
		params
	})

//删除地址簿
export const deleteAddress = (params) =>
	request({
		url: `/address`,
		method: 'delete',
		params
	})
//查询用户默认寄件地址
export const defaultAddress = (params) =>
	request({
		url: `/address/defaultAddress`,
		method: 'post',
		params
	})