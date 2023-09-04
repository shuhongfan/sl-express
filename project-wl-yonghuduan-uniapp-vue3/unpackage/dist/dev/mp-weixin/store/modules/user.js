"use strict";
var pages_api_user = require("../../pages/api/user.js");
var user = {
  namespaced: true,
  state() {
    return {
      long: "",
      width: "",
      height: "",
      volume: "",
      goodsInfo: {},
      weight: 1,
      expense: 0,
      computeWeight: 0,
      firstWeight: 0,
      continuousWeight: 0,
      toDoorTimeLabel: "",
      toDoorTime: String(new Date().getFullYear()) + "-" + String(new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + String(new Date().getHours() + 1) + ":" + String(Number(new Date().getMinutes()) < 10 ? "0" + Number(new Date().getMinutes()) : Number(new Date().getMinutes())) + ":00",
      indexList: [],
      isToOrderInfo: false,
      payMethod: 1,
      isLoginSuccess: true
    };
  },
  mutations: {
    setIsLoginSuccess(state, provider) {
      state.isLoginSuccess = provider;
    },
    setPayMethod(state, provider) {
      state.payMethod = provider;
    },
    setIsToOrderInfo(state, provider) {
      state.isToOrderInfo = provider;
    },
    setIndexList(state, provider) {
      state.indexList = provider;
    },
    setToDoorTime(state, provider) {
      state.toDoorTime = provider;
    },
    setToDoorTimeLabel(state, provider) {
      state.toDoorTimeLabel = provider;
    },
    setExpense(state, provider) {
      state.expense = provider;
    },
    setComputeWeight(state, provider) {
      state.computeWeight = provider;
    },
    setFirstWeight(state, provider) {
      state.firstWeight = provider;
    },
    setContinuousWeight(state, provider) {
      state.continuousWeight = provider;
    },
    setGoodsInfo(state, provider) {
      state.goodsInfo = provider;
    },
    setLong(state, provider) {
      state.long = provider;
    },
    setWidth(state, provider) {
      state.width = provider;
    },
    setHeight(state, provider) {
      state.height = provider;
    },
    setVolume(state, provider) {
      state.volume = provider;
    },
    setWeight(state, provider) {
      state.weight = provider;
    }
  },
  actions: {
    async GetUsersInfo({
      state,
      commit
    }, payload) {
      if (state.token !== "") {
        await pages_api_user.getUserInfo().then((res) => {
          commit("setUserInfo", res.data);
        }).catch((err) => {
        });
      }
    }
  },
  getters: {}
};
exports.user = user;
