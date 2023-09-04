import {
	getUserInfo
} from '@/pages/api/user.js';
// 用户信息模块(局部模块)
export default {
	namespaced: true, // 开启命名空间
	state() {
		return {
			userBase: {}, // 用户信息
			loacation:{},
			token: '', //token
		}
	},
	mutations: {
		// 定义mutations，用于同步修改状态
		// 设置token
		setToken(state, provider) {
			state.token = provider;
			uni.setStorageSync("token", provider);
		},
		// 设置用户信息
		setUserInfo(state, provider) {
			state.userBase = provider;
		},
		// 设置经纬度
		setlLacation(state, provider) {
			state.loacation = provider;
		},
	},
	actions: {
		// 获取用户信息
		async GetUsersInfo({state,commit},payload) {
			if (state.token !== '') {
				await getUserInfo().then((res)=>{
					// 存储用户信息
					commit('setUserInfo',res.data)
				}).catch((err)=>{
					
				})
				
			}
		}
	},
	getters: {
		
	}
}
