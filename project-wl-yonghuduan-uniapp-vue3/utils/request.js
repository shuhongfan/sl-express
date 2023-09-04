import {
	baseUrl,
	notToLoginApiUrl
} from './env'
import {
	resetToken
} from '@/pages/api/login.js'
// 参数： url:请求地址  param：请求参数  method：请求方式 callBack：回调函数
export function request({
	url = '',
	params = {},
	method = 'GET'
}) {
	// 获取token（短令牌）
	const token = uni.getStorageSync('token')
	//获取长令牌
	const refreshToken = uni.getStorageSync('refreshToken')
	const header = {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json;charset=UTF-8',
		'access_token': token
	}
	let refreshHeader = {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json;charset=UTF-8',
		'refresh_token': refreshToken
	}
	console.log(url, 'url')
	const requestRes = new Promise((resolve, reject) => {
		let requestFunc = ''
		uni.request({
			timeout:20000,
			url: baseUrl + url,
			data: params,
			header: url === '/user/refresh' ? refreshHeader : header,
			method: method,
			success: (res) => {
				const {
					data
				} = res
				if (data.code == 0 || data.code == 200) {
					resolve(res.data)
				} else {
					console.log(res, '112233')
					// resolve(res.data)
					handleError(res, resolve, url, params, method)
				}
			},
			fail: (err) => {
				const error = {
					data: {
						msg: err.data
					}
				}
				reject(error)
			}

		})
	})
	const handleError = (error, resolve, url, params, method) => {
		var errorCode = error.statusCode;
		if (errorCode == 401) {
			if (token && refreshToken) {
				//刷新token
				resetToken().then((res) => {
					console.log(res, 'resetToken')
					if (res.code === 200) {
						uni.setStorageSync('token', res.data.accessToken);
						uni.setStorageSync('refreshToken', res.data.refreshToken);
						//当重新刷新短token的时候，重新执行上一个401的接口，保证页面的无感正常交互
						let newHeader = {
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/json;charset=UTF-8',
							'access_token': uni.getStorageSync('token')
						}
						uni.request({
							url: baseUrl + url,
							data: params,
							header: newHeader,
							method: method,
							success: (res) => {
								const {
									data
								} = res
								if (data.code == 0 || data.code == 200) {
									resolve(res.data)
								} else {
									resolve()
									uni.showToast({
										title: res.msg || '网络异常',
										duration: 2000,
										icon: 'none',
									});
								}
							},
							fail: (err) => {
								const error = {
									data: {
										msg: err.data
									}
								}
								reject(error)
							}

						})
					} else if (res.data.code === 1) {
						console.log(1, res)
						uni.removeStorageSync('token')
						uni.removeStorageSync('refreshToken')
						uni.showToast({
							title: res.data.msg || '刷新token失败，请重新登录.',
							icon: "none",
							duration: 1000,
							success: () => {
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/login/index'
									});
								}, 2000)

							},
							fail: () => {}
						});
					}
				}).catch((err) => {
					uni.showToast({
						title: '网络异常',
						duration: 2000,
						icon: 'none'
					});
				})
			}
		} else if (errorCode == 500) {
			if (uni.getStorageSync("token") == "") {
				uni.showToast({
					title: "请先登录",
					icon: "none",
					duration: 2000,
					success: () => {

					},
					fail: () => {

					}
				});
			} else {
				uni.showToast({
					title: error.data.error.message + "",
					icon: "none",
					duration: 3000
				});
			}
		} else {
			resolve(error)
		}
	}
	return requestRes
}
