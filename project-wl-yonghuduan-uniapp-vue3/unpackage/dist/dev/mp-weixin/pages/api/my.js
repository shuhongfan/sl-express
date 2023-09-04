"use strict";
var utils_request = require("../../utils/request.js");
const getUserInfo = (params) => utils_request.request({
  url: `/user/profile`,
  method: "get",
  params
});
const getRealNameStatusApi = (params) => utils_request.request({
  url: `/user/realNameVerify`,
  method: "post",
  params
});
const updateUserInfo = (params) => utils_request.request({
  url: `/user/profile`,
  method: "put",
  params
});
exports.getRealNameStatusApi = getRealNameStatusApi;
exports.getUserInfo = getUserInfo;
exports.updateUserInfo = updateUserInfo;
