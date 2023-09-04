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
			pages:0,//总页数
			page:1, //当前页码
			token: '', //token
			taskId:'', //任务id
			detailsData:{},//任务详情
			taskType:1, //当前进入的是取件详情还是派件详情  1取件，2派件
			taskStatus:0,//已取件\已取消\去派件\已签收状态
			detailType:0,//历史订单或者已经取件的详情页
			tabIndex:0, //储存当前触发的tab值
			reasonVal:'',//取消订单原因选择内容
			reasonDesc:'',//取消订单描述
			orderDistance:null, //距离筛选值
			orderTime:null,//时间筛选值
			filterOverTime:null,//超时值
			deliveryData:[] ,//待取件数据储存
			cancelData:[] ,//已取件数据储存
			alreadyData:[] ,//取消数据储存
			isRedistribute:false, //取消订单原因是否退回到网点
			isFiltrate:false, //是否触发了距离、时间、超时任务筛选
			taskDetailData:{} ,//任务详情
			selectTaskData:[], //已经选择的任务，任务对选单选
			payData:{},//去取件的时候储存订单信息，二维码付款要用一些信息
			isBack:null,//是否返回
			istabChange:null, //是否tab切换
			isDelete:null ,//已经取消订单是否删除了
			paymentMethod:null,//付款方式
			isPickUp:false ,//是否触发了取件
			isCollect:false ,//是否触发了取件
			isSign:false,
			isDelivery:false ,//是否跳转派件页面
			newType:null,
			cardData:null,//身份信息
			timeData:null,//全部取派时间
			isInput:false,//是否在文本框里输入了文字
			isSearch:false,//是否从搜索页进的详情页
			searchText:'',//储存需要搜索的文本
			isSearchClear:false,//是否清空搜索内容
			isNew:false,//是否从消息页的取件、派件进的详情
		}
	},
	mutations: {
		// 定义mutations，用于同步修改状态
		// 设置token
		setToken(state, provider) {
			state.token = provider;
		},
		// 设置用户信息
		setUserInfo(state, provider) {
			state.userBase = provider;
		},
		// 设置经纬度
		setlLacation(state, provider) {
			state.loacation = provider;
		},
		// 设置当前页数
		setPage(state, provider) {
			state.page = provider;
		},
		
		// 设置总页数
		setPages(state, provider) {
			state.pages = provider;
		},
		// 设置距离筛选值
		setOrderDistance(state, provider) {
			state.orderDistance = provider;
		},
		// 设置时间筛选值
		setOrderTime(state, provider) {
			state.orderTime = provider;
		},
		// 设置超时筛选值
		setFilterOverTime(state, provider) {
			state.filterOverTime = provider;
		},
		// 设置待取件数据储存
		setDeliveryData(state, provider) {
			state.deliveryData = provider;
		},
		// 设置已取件数据储存
		setAlreadyData(state, provider) {
			state.alreadyData = provider;
		},
		// 设置取消数据储存
		setCancelData(state, provider) {
			state.cancelData = provider;
		},
		// 设置任务id，方便其他页面用
		setTaskId(state, provider) {
			state.taskId = provider;
		},
		// 
		setTaskType(state, provider) {
			state.taskType = provider;
		},
		// 设置任务详情，方便其他页面用，较少加载接口次数
		setTaskDetailData(state, provider) {
			state.taskDetailData = provider;
		},
		// 设置 取消订单原因选择内容
		setReasonVal(state, provider) {
			state.reasonVal = provider;
		},
		// 设置 取消订单原因描述
		setReasonDesc(state, provider) {
			state.reasonDesc = provider;
		},
		// 设置 取消订单原因是否退回到网点
		setRedistribute(state, provider) {
			state.isRedistribute = provider;
		},
		// 设置已经选择的任务
		setSelectTaskData(state, provider) {
			state.selectTaskData = provider;
		},
		// 距离、时间、超时任务筛选
		setIsFiltrate(state, provider) {
			state.isFiltrate = provider;
		},
		// 设置消息触发的当前tab值
		setTabIndex(state, provider) {
			state.tabIndex = provider;
		},
		// 设置已取件\已取消\去派件\已签收状态
		setTaskStatus(state, provider) {
			state.taskStatus = provider;
		},
		// 设置储存订单信息，二维码付款要用一些信息
		setPayData(state, provider) {
			state.payData = provider;
		},
		// 设置任务详情
		setDetailsData(state, provider) {
			state.detailsData = provider;
		},
		// 设置消息跳转
		setNewType(state, provider) {
			state.newType = provider;
		},
		// 设置是否返回
		setIstabChange(state, provider) {
			state.istabChange = provider;
		},
		// 订单是否删除
		setIsDelete(state, provider) {
			state.isDelete = provider;
		},
		// 设置付款方式
		setPaymentMethod(state, provider) {
			state.paymentMethod = provider;
		},
		// 历史订单或者已经取件的详情页
		setDetailType (state, provider) {
			state.detailType = provider;
		},
		//设置  是否去取件
		setIsPickUp (state, provider) {
			state.isPickUp = provider;
		},
		// 到付的情况下，是否触发去取件后到，显示按钮为已取件
		setIsCollect(state, provider) {
			state.isCollect = provider;
		},
		setIsSign(state, provider) {
			state.isSign= provider;
		},
		setIsDelivery(state, provider) {
			state.isDelivery= provider;
		},
		// 设置身份校验身份信息
		setCardData(state, provider) {
			state.cardData= provider;
		},
		// 设置全部取派的时间
		setTimeData(state, provider) {
			state.timeData= provider;
		},
		// 设置是否在文本框里输入了文字
		setIsInput(state, provider) {
			state.isInput= provider;
		},
		// 设置是否由搜索页进的详情页，方便详情页返回
		setIsSearch(state, provider) {
			state.isSearch= provider;
		},
		// 设置搜索的内容，从详情页返回搜索页的时候显示默认搜索的内容
		setSearchText(state, provider) {
			state.searchText= provider;
		},
		//是否清空搜索
		setSearchClear(state, provider) {
			state.isSearchClear= provider;
		},
		// 设置是否从消息页的取件、派件进的详情
		setIsNew(state, provider) {
			state.isNew= provider;
		}
	},
	actions: {
		// 获取用户信息
		async GetUsersInfo({state,commit},payload) {
			if (state.token !== '') {
				await getUserInfo().then((res)=>{
					// 存储用户信息
					uni.setStorageSync('userInfo',res.data)
					commit('setUserInfo',res.data)
				})
				
			}
		}

	},
	getters: {

	}
}
