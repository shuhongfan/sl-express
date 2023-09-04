import store from './../store'
// import { baseUrl } from './env'
// 统一错误输出 
const isTest = true // 是否是测试环境  PIP 部署请设置为false
function showTot(msg) {
	if (isTest) {
		uni.showToast({
			title: msg,
			duration: 3000,
			icon: 'error'
		});
		return
	}
}

// 参数： url:请求地址  param：请求参数  method：请求方式 callBack：回调函数
export function request({
	url = '',
	params = {},
	method = 'GET'
}) {
	// baseUrl改为可配置地址
	if (!uni.getStorageSync('baseUrl')) {
		uni.showToast({
			title: '请先配置，请求Url！',
			duration: 3000,
			icon: 'none'
		});
		uni.setStorageSync('baseUrl',
			'') // 测试环境 'http://slwl-geteway-t.itheima.net/driver'  默认配置地址：http://slwl-geteway.itheima.net/driver
			setTimeout(function() {
				uni.hideLoading();
			}, 500)
			clearTimeout(times)
	}
	let baseUrl = uni.getStorageSync('baseUrl')

	const storeInfo = store.state
	const token = uni.getStorageSync('token')
	let header = {}
	if (url == '/track/upload') {
		header['Authorization'] = token
		header['Content-Type'] = 'application/x-www-form-urlencoded'
	} else if (url == '/files/imageUpload') {
		header['Content-Type'] = 'multipart/form-data';
		header['Authorization'] = token
	} else {
		header['Content-Type'] = 'application/json;',
			header['Authorization'] = token
	}

	const requestRes = new Promise((resolve, reject) => {
		console.log(baseUrl + url)
		uni.request({
			url: baseUrl + url,
			data: params,
			header: header,
			method: method,
		}).then((res) => {
			const {
				data
			} = res
			// 清除loading
			const times = setTimeout(function() {
				uni.hideLoading();
			}, 500);
			clearTimeout(times)
			if (res.statusCode == 400) {
				// showTot(data.msg)
				uni.showToast({
					title: '权限不足，无法登录！',
					duration: 3000,
					icon: 'none'
				});
				uni.redirectTo({
					url: '/pages/login/index'
				});
				return false
			}
			if (res.statusCode == 401) {
				// showTot(data.msg)
				uni.showToast({
					title: '登录超时，请重新登录！',
					duration: 3000,
					icon: 'none'
				});
				uni.redirectTo({
					url: '/pages/login/index'
				});
				return false
			}
			if (data.code == 1) {
				showTot(data.msg)
				uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'error'
				});
				return false
			}
			if (data.code == 0 || data.code == 200) {
				resolve(res.data)
			} else {
				console.log(5000)
				showTot(data.msg)
				uni.showToast({
					title: '请求出错了',
					duration: 1000,
					icon: 'error'
				});
			}
		}).catch((err) => {
			reject(err)
		});
	})
	return requestRes
}

// 图片上传 参数： url:请求地址  param：请求参数  method：请求方式 callBack：回调函数
export function requestUpload({
	url = '',
	params = {},
	method = 'post'
}) {
	// baseUrl改为可配置地址
	if (!uni.getStorageSync('baseUrl')) {
		uni.setStorageSync('baseUrl', 'http://slwl-geteway.itheima.net/driver')
	}
	let baseUrl = uni.getStorageSync('baseUrl')

	const token = uni.getStorageSync('token')
	let header = {
		'Authorization': token
	}
	const requestRes = new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseUrl + url,
			// files: file.tempFiles,  // 使用files 会将传参的数据改为 name: 文件名  ： 二进制文件 - {xxx.png: {二进制文件}} 我们需要的是{file: {二进制文件}}
			filePath: params.tempFilePaths[0],
			name: 'file',
			header: {
				// Content-Type: multipart/form-data; boundary=----WebKitFormBoundarybf5YhYJ8fOBadphN  加上这个 会失败
				'Authorization': uni.getStorageSync('token')
			}
		}).then(res => {
			const data = JSON.parse(res.data)
			if (data.code == 0 || data.code == 200) {
				resolve(data)
			} else {
				showTot(data.msg)
				uni.showToast({
					title: '请求出错了！',
					duration: 1000,
					icon: 'error'
				});
			}
		}).catch((err) => {
			reject(err)
		});
	})
	return requestRes
}
