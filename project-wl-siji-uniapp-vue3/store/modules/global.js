export default { // 注意：全局模块中不需要开启命名空间
  state: {
	  footStatus: 0, // 公用footer的激活状态码
	  taskStatus: 0, // 任务的Table切换状态记录
	  msgStatus: 0, // 消息的Table切换状态记录
	  isMessage: true, // 是否开启消息推送
  },
  mutations: {
	// 公用footer的激活码
	setFootStatus(state, provider) {
		state.footStatus = provider;
	},
	// 任务的Table切换状态记录
	setTaskStatus(state, provider) {
		state.taskStatus = provider;
	},
	// 消息的Table切换状态记录
	setMsgStatus(state, provider) {
		state.msgStatus = provider;
	},
	// 是否开启消息推送
	setIsMessage(state, provider){
		state.isMessage = provider;
	}
  },
}