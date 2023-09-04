"use strict";
var global = {
  state: {
    footStatus: 0
  },
  mutations: {
    setFootStatus(state, provider) {
      state.footStatus = provider;
    }
  },
  actions: {},
  getters: {}
};
exports.global = global;
