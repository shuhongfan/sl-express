
// 线上环境
// export const baseUrl = 'http://slwl-geteway.itheima.net/customer'
// 本地和测试环境
export const baseUrl = 'http://god-express-gateway-t.itheima.net/customer'


//不需要跳转到登录页面的接口
export const notToLoginApiUrl = [
	'/order-manager/order/page',
	'/user/profile',
	'/order-manager/order/count'
]