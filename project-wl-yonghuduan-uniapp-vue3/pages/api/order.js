import {
	request
} from "../../utils/request.js"
// 省市区三级联动
export const getArea = (params) =>
	request({
		url: `/areas/children`,
		method: 'get',
		params
	})


//获取常用货物列表
export const usualGoodsList = (params) =>
	request({
		url: `/order-manager/cargo/hot`,
		method: 'get',
		params
	})

//获取货物列表
export const goodsList = (params) =>
	request({
		url: `/order-manager/cargo/last`,
		method: 'get',
		params
	})

//下单
export const doOrder = (params) =>
	request({
		url: `/order-manager/order`,
		method: 'post',
		params
	})
//获取订单详情
export const getOrderDetail = (params) =>
	request({
		url: `/order-manager/order/` + params,
		method: 'get',
	})
//获取订单列表
export const getOrderList = (params) =>
	request({
		url: `/order-manager/order/page`,
		method: 'post',
		params
	})
//获取预估总价
export const getEstimatePrice = (params) =>
	request({
		url: `/order-manager/order/totalPrice`,
		method: 'post',
		params
	})
//取消订单
export const cancelOrder = (params) =>
	request({
		url: `/order-manager/order/cancel/` + params,
		method: 'put',
		params
	})
//支付订单
export const payOrder = (params) =>
	request({
		url: `/order-manager/order/pay`,
		method: 'put',
		params
	})
//删除订单
export const deleteOrder = (params) =>
	request({
		url: `/order-manager/order/del/` + params,
		method: 'put',
		params
	})
//获取查快递的寄件和收件的数量
export const getGoodsNum = (params) =>
	request({
		url: `/order-manager/order/count`,
		method: 'get',
	})
//获取订单轨迹
export const getOrderLine = (params) =>
	request({
		url: `/order-manager/order/track/` + params,
		method: 'get',
	})
