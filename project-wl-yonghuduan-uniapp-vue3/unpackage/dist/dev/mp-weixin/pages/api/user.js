"use strict";
var utils_request = require("../../utils/request.js");
const getUserInfo = (params) => utils_request.request({
  url: `/users/get`,
  method: "get",
  params
});
exports.getUserInfo = getUserInfo;
