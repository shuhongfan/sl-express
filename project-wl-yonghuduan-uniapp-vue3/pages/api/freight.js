import {
	request
} from "../../utils/request.js"

// 计算运费
export const calculateFreight = (params) =>
	request({
		url: '/tasks/calculate',
		method: 'post',
		params
	})