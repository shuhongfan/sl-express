// import { baseUrl } from "./env";
// 参数： url:请求地址  param：请求参数  method：请求方式 callBack：回调函数
export function request({ url = "", params = {}, method = "GET" }) {
  // baseUrl改为可配置地址
  	if (!uni.getStorageSync('baseUrl')){
  		uni.setStorageSync('baseUrl', 'http://slwl-geteway.itheima.net/courier')
  	}
  	let baseUrl = uni.getStorageSync('baseUrl')
		
  // 获取token
  const token = uni.getStorageSync("token");
  let header = {
    // 'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: token,
  };
	if (url == '/track/upload'){
		header['Content-Type'] = 'application/x-www-form-urlencoded'
	}
  const requestRes = new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      data: params,
      header: header,
      method: method,
    }).then((res)=>{
			const { data } = res
			if (res.statusCode == 401){
				uni.showToast({
					title: '您的登录已过期！请重新登录后操作！',
					duration: 2000,
					icon: 'none',
				});
				uni.redirectTo({
					url: '/pages/login/user'
				});
				return false
			}
			if (res.statusCode == 400){
				uni.showToast({
					title: '权限不足，无法登录！',
					duration: 2000,
					icon: 'none',
					
				});
				uni.redirectTo({
					url: '/pages/login/user'
				});
				return false
			}
			if (data.code == 1) {
				uni.showToast({
					title: data.msg,
					duration: 2000,
					icon: 'none',
				});
				return false
			}
			  if (data.code == 0 || data.code == 200) {
			    resolve(res.data);
			  } else {
			    reject(res.data);
			  }
		}).catch((err)=>{
			  const error = { data: { msg: err.data } };
			  reject(error);
		});
  });
  return requestRes;
}
