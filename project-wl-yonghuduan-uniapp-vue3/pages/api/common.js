import {
	request
} from "../../utils/request.js"

// 获取省市区
export const getProvinces = (params) =>
	request({
		url: '/areas/children',
		method: 'get',
		params
	})